import { useState, useEffect, useMemo } from "react";
import React from "react";
import { type EventDtoo } from "../types/event";
import { pageStyles } from "../styles/BudgetItemsStyle";
import {
  fetchCategoryPriceRange,
  buildBudgetPayload,
  saveAllBudgetItems,
} from "../services/BudgetItemService";
import { redistributeBudget } from "../utils/budgetUtils";
import type { CategoryBudget } from "../types/budgetItem";




interface Props {
  event: EventDtoo;
  initialBudgets?: CategoryBudget[]; // ← חדש
  onBack: () => void;
  onProceedToVendors: (budgets: CategoryBudget[]) => void;
  onEventUpdate?: (updatedBudgets: CategoryBudget[]) => void;
}

const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

const EventDetailPage = ({
  event,
  initialBudgets, // ← חדש
  onBack,
  onProceedToVendors,
  onEventUpdate,
}: Props) => {
  const initialData = useMemo(() => {
    return (event.budgetItems ?? []).map((item) => ({
      categoryID: item.categoryID,
      categoryName:
        item.allCategory?.categoryName ?? `קטגוריה ${item.categoryID}`,
      plannedAmount: item.plannedAmount,
      currentAmount: item.plannedAmount,
      min: 0,
      max: item.plannedAmount * 2 || 10000,
      minLoading: true,
      locked: item.isLocked ?? false,
      ignored: item.isIgnore ?? false,
      selected: false,
    }));
  }, [event.eventID, event.budgetItems]);

  const [budgets, setBudgets] = useState<CategoryBudget[]>(
    initialBudgets && initialBudgets.length > 0 ? initialBudgets : initialData,
  );

  const [confirmIgnoreId, setConfirmIgnoreId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (initialBudgets && initialBudgets.length > 0) {
      setBudgets(initialBudgets); // ← שחזור מהשמור
    } else {
      setBudgets(initialData);
    }
  }, [event.eventID]);
 
useEffect(() => {
  const items = event.budgetItems ?? [];
  if (items.length === 0) return;

  if (initialBudgets && initialBudgets.length > 0) {
    setBudgets(initialBudgets);

    // טען טווחים רק לקטגוריות ללא ספק נעול
    const itemsToLoad = items.filter(
      (item) =>
        !initialBudgets.find((b) => b.categoryID === item.categoryID)
          ?.vendorLocked,
    );
    if (itemsToLoad.length === 0) return;

    const fetchData = async () => {
      for (const item of itemsToLoad) {
        const categoryID = item.categoryID;
        try {
          const { min, max } = await fetchCategoryPriceRange(
            categoryID,
            item.plannedAmount * 2,
          );
          setBudgets((prev) =>
            prev.map((b) =>
              b.categoryID === categoryID
                ? {
                    ...b,
                    min: categoryID === 3 ? min * event.guestCount : min,
                    max: categoryID === 3 ? max * event.guestCount : max,
                    currentAmount:
                      categoryID === 3
                        ? Math.min(
                            Math.max(b.currentAmount, min * event.guestCount),
                            max * event.guestCount,
                          )
                        : Math.min(Math.max(b.currentAmount, min), max),
                    minLoading: false,
                  }
                : b,
            ),
          );
        } catch (e) {
          console.error("Error loading category", categoryID, e);
          setBudgets((prev) =>
            prev.map((b) =>
              b.categoryID === categoryID ? { ...b, minLoading: false } : b,
            ),
          );
        }
      }
    };
    fetchData();
  } else {
    setBudgets(initialData);
  }
}, [event.eventID]);
  // ─── חישובים לתצוגה ───────────────────────────────────────────────
  const activeItems = budgets.filter((b) => !b.ignored);
  const totalAllocated = activeItems.reduce((s, b) => s + b.currentAmount, 0);
  const remaining = event.totalBudget - totalAllocated;
  const totalPct =
    event.totalBudget > 0
      ? Math.round((totalAllocated / event.totalBudget) * 100)
      : 0;

  // ─── שינוי ידני בסליידר ───────────────────────────────────────────
  const setAmount = (id: number, newVal: number) => {
    setBudgets((prev) =>
      redistributeBudget(prev, id, newVal, event.totalBudget),
    );
  };

  // ─── נעילה ───────────────────────────────────────────────────────
  const toggleLock = (id: number) =>
    setBudgets((p) =>
      p.map((b) => (b.categoryID === id ? { ...b, locked: !b.locked } : b)),
    );

  // ─── ביטול + שחזור קטגוריה ───────────────────────────────────────
  const ignoreCategory = (id: number) => {
    setBudgets((prev) => {
      const target = prev.find((b) => b.categoryID === id);
      if (!target) return prev;

      const currentAllocated = prev
        .filter((b) => !b.ignored)
        .reduce((s, b) => s + b.currentAmount, 0);
      const currentRemaining = event.totalBudget - currentAllocated;
      const totalToDistribute =
        target.currentAmount + Math.max(0, currentRemaining);

      const recipients = prev.filter(
        (b) => b.categoryID !== id && !b.ignored && !b.locked,
      );
      if (recipients.length === 0) {
        return prev.map((b) =>
          b.categoryID === id ? { ...b, ignored: true, locked: false } : b,
        );
      }

      const amounts = new Map(
        recipients.map((b) => [b.categoryID, b.currentAmount]),
      );
      let leftover = totalToDistribute;

      for (let round = 0; round < recipients.length && leftover > 1; round++) {
        const available = recipients.filter(
          (b) => (amounts.get(b.categoryID) ?? 0) < b.max,
        );
        if (available.length === 0) break;

        const totalBase = available.reduce(
          (s, b) => s + (amounts.get(b.categoryID) ?? 0),
          0,
        );
        let stillLeft = leftover;

        for (const b of available) {
          const base = amounts.get(b.categoryID) ?? 0;
          const share =
            totalBase > 0
              ? (base / totalBase) * leftover
              : leftover / available.length;
          const added = Math.min(share, b.max - base);
          amounts.set(b.categoryID, base + added);
          stillLeft -= added;
        }
        leftover = stillLeft;
      }

      return prev.map((b) => {
        if (b.categoryID === id) return { ...b, ignored: true, locked: false };
        if (!b.ignored && !b.locked && amounts.has(b.categoryID)) {
          return {
            ...b,
            currentAmount: Math.round(amounts.get(b.categoryID)!),
          };
        }
        return b;
      });
    });
  };

  const restoreCategory = (id: number) => {
    setBudgets((prev) =>
      prev.map((b) =>
        b.categoryID === id
          ? { ...b, ignored: false, currentAmount: b.plannedAmount }
          : b,
      ),
    );
  };

  const fillPct = (b: CategoryBudget) => {
    const range = b.max - b.min;
    if (range <= 0) return 0;
    const clamped = Math.min(Math.max(b.currentAmount, b.min), b.max);
    return ((clamped - b.min) / range) * 100;
  };
  // ─── שמירה ───────────────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const payload = await buildBudgetPayload(budgets, event);
      await saveAllBudgetItems(payload);

      const savedBudgets = budgets.map((b) => ({
        ...b,
        plannedAmount: b.currentAmount,
      }));

      setBudgets(savedBudgets);
      onEventUpdate?.(savedBudgets);
      onProceedToVendors(savedBudgets.filter((b) => !b.ignored));
    } catch (err) {
      console.error("שגיאה בשמירה מרוכזת:", err);
      setSaveError("שגיאה בשמירת הנתונים, נסה שוב");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="detail-page" dir="rtl">
        <div className="detail-bg-pattern" />
        <header className="detail-header">
          <div className="detail-header-left">
            <div className="header-logo-icon">
              <span className="header-logo-inner">✦</span>
            </div>
            <div>
              <div className="header-title">Élite</div>
              <div className="header-subtitle">תכנון אירוע</div>
            </div>
          </div>
          <button className="btn-back" onClick={onBack}>
            ← חזרה
          </button>
        </header>

        <main className="detail-content">
          <div className="event-hero">
            <div className="event-hero-top">
              <div>
                <div className="event-type-badge">סיכום תקציב</div>
                <div className="event-hero-name">{event.eventName}</div>
              </div>
              <div className="event-hero-stats">
                <div className="stat-item">
                  <div className="stat-value">₪{fmt(event.totalBudget)}</div>
                  <div className="stat-label">תקציב יעד</div>
                </div>
              </div>
            </div>
          </div>

          <div className="budget-total-bar">
            <div>
              <div className="budget-total-label">ניצול תקציב</div>
              <div className="budget-total-value">{totalPct}%</div>
            </div>
            <div
              className={`budget-remaining ${remaining >= 0 ? "ok" : "over"}`}
            >
              {remaining >= 0
                ? `נותר לחלוקה: ₪${fmt(remaining)}`
                : `חריגה של: ₪${fmt(Math.abs(remaining))}`}
            </div>
          </div>

          <div className="categories-grid">
            {budgets.map((b, i) => (
              <div
                key={`ev-${event.eventID}-cat-${b.categoryID}-${i}`}
                className={`category-card ${b.locked ? "locked" : ""} ${b.ignored ? "ignored" : ""} ${b.selected ? "selected" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="card-header">
                  <div className="category-name">{b.categoryName}</div>
                  <div className="card-actions">
                    <button
                      className={`action-btn ${b.locked ? "active-lock" : ""}`}
                      onClick={() =>
                        !b.vendorLocked && toggleLock(b.categoryID)
                      }
                      title={
                        b.vendorLocked
                          ? "נעול על ידי ספק"
                          : b.locked
                            ? "בטל נעילה"
                            : "נעל קטגוריה זו"
                      }
                      disabled={b.ignored || !!b.vendorLocked}
                    >
                      {b.locked ? "🔒" : "🔓"}
                    </button>
                    <button
                      className={`action-btn ${b.ignored ? "active-ignore" : ""}`}
                      onClick={() =>
                        b.ignored
                          ? restoreCategory(b.categoryID)
                          : setConfirmIgnoreId(b.categoryID)
                      }
                      title={
                        b.ignored ? "החזר קטגוריה" : "בטל קטגוריה וחלק לאחרים"
                      }
                    >
                      {b.ignored ? "↩" : "✖"}
                    </button>
                  </div>
                </div>

                <div className="planned-amount">
                  מתוכנן מקורי: ₪{fmt(b.plannedAmount)}
                </div>
                {b.ignored ? (
                  <div
                    className="range-loading"
                    style={{ color: "#999", fontSize: "0.85rem" }}
                  >
                    קטגוריה זו הוסרה — הסכום חולק לאחרים
                  </div>
                ) : b.vendorLocked ? (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "10px 14px",
                      background: "rgba(201,168,76,0.08)",
                      borderRadius: "8px",
                      border: "1px solid rgba(201,168,76,0.25)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#c9a84c", fontSize: "0.9rem" }}>
                      ✓ {b.selectedVendorName}
                    </span>
                    <span style={{ color: "#c9a84c", fontWeight: 700 }}>
                      ₪{fmt(b.currentAmount)}
                    </span>
                  </div>
                ) : b.minLoading ? (
                  <div className="range-loading">מעדכן טווחים...</div>
                ) : (
                  <>
                    <div className="slider-area">
                      <div className="range-label min">₪{fmt(b.min)}</div>
                      <div className="slider-wrap" dir="rtl">
                        {" "}
                        {/* שינוי: dir="rtl" */}
                        <input
                          type="range"
                          className="budget-slider"
                          style={{ "--fill": `${fillPct(b)}%` } as any}
                          min={b.min}
                          max={b.max}
                          value={b.currentAmount} // חזרה לערך המקורי
                          disabled={b.locked || b.ignored}
                          onChange={
                            (e) =>
                              setAmount(b.categoryID, Number(e.target.value)) // חזרה למקורי
                          }
                        />
                      </div>
                      <div className="range-label max">₪{fmt(b.max)}</div>
                    </div>
                    <div className="card-amount-row">
                      <div className="card-amount-val">
                        ₪{fmt(b.currentAmount)}
                        {b.locked && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              marginRight: "6px",
                              color: "#888",
                            }}
                          >
                            🔒 נעול
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="detail-actions">
            <button className="btn-secondary" onClick={onBack}>
              ביטול
            </button>
            {saveError && (
              <div
                style={{
                  color: "#e53e3e",
                  fontSize: "0.85rem",
                  alignSelf: "center",
                }}
              >
                {saveError}
              </div>
            )}
            <button
              className="btn-primary"
              disabled={isSaving}
              onClick={handleSave}
            >
              {isSaving ? "שומר..." : "המשך לבחירת ספקים ←"}
            </button>
          </div>
        </main>
      </div>

      {confirmIgnoreId !== null &&
        (() => {
          const cat = budgets.find((b) => b.categoryID === confirmIgnoreId);
          return (
            <div style={overlayStyle} onClick={() => setConfirmIgnoreId(null)}>
              <div
                style={dialogStyle}
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
              >
                <div style={dialogIconStyle}>⚠️</div>
                <div style={dialogTitleStyle}>ביטול קטגוריה</div>
                <div style={dialogBodyStyle}>
                  האם אתה בטוח שברצונך לבטל את הקטגוריה
                  <strong
                    style={{
                      display: "block",
                      margin: "6px 0",
                      fontSize: "1.05rem",
                    }}
                  >
                    "{cat?.categoryName}"
                  </strong>
                  הסכום של <strong>₪{fmt(cat?.currentAmount ?? 0)}</strong>{" "}
                  יחולק בין שאר הקטגוריות.
                </div>
                <div style={dialogActionsStyle}>
                  <button
                    style={btnCancelStyle}
                    onClick={() => setConfirmIgnoreId(null)}
                  >
                    לא, חזור
                  </button>
                  <button
                    style={btnConfirmStyle}
                    onClick={() => {
                      ignoreCategory(confirmIgnoreId);
                      setConfirmIgnoreId(null);
                    }}
                  >
                    כן, בטל קטגוריה
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </>
  );
};

// ─── סגנונות הדיאלוג ─────────────────────────────────────────────────
const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  animation: "fadeIn 0.15s ease",
};

const dialogStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  padding: "32px 28px 24px",
  maxWidth: "360px",
  width: "90%",
  boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
  textAlign: "center",
  animation: "slideUp 0.2s ease",
};

const dialogIconStyle: React.CSSProperties = {
  fontSize: "2.2rem",
  marginBottom: "12px",
};

const dialogTitleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#1a1a2e",
  marginBottom: "12px",
};

const dialogBodyStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "#555",
  lineHeight: 1.6,
  marginBottom: "24px",
};

const dialogActionsStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
};

const btnCancelStyle: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: "8px",
  border: "1.5px solid #ddd",
  background: "#f5f5f5",
  color: "#444",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "0.9rem",
};

const btnConfirmStyle: React.CSSProperties = {
  padding: "10px 22px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(135deg, #e53e3e, #c53030)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "0.9rem",
  boxShadow: "0 4px 14px rgba(229,62,62,0.35)",
};

export default EventDetailPage;
