import { useState, useEffect, useMemo } from "react";
import React from "react";
import { type EventDtoo } from "../types/event";
import { authFetch } from "../services/authService";
import { pageStyles } from "../styles/BudgetItemsStyle";

export interface CategoryBudget {
  categoryID: number;
  categoryName: string;
  plannedAmount: number;
  currentAmount: number;
  min: number;
  max: number;
  minLoading: boolean;
  locked: boolean;
  ignored: boolean;
  selected: boolean;
}

interface Props {
  event: EventDtoo;
  onBack: () => void;
  onProceedToVendors: (budgets: CategoryBudget[]) => void;
  onEventUpdate?: (updatedBudgets: CategoryBudget[]) => void;
}

const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

const EventDetailPage = ({
  event,
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
      locked: false,
      ignored: false,
      selected: false,
    }));
  }, [event.eventID, event.budgetItems]);

  const [budgets, setBudgets] = useState<CategoryBudget[]>(initialData);
  const [confirmIgnoreId, setConfirmIgnoreId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  useEffect(() => {
    setBudgets(initialData);
  }, [event.eventID]);

  useEffect(() => {
    const items = event.budgetItems ?? [];
    if (items.length === 0) return;

    const fetchData = async () => {
      for (const item of items) {
        const categoryID = item.categoryID;
        try {
          const [minRes, maxRes] = await Promise.all([
            authFetch(`/Vendor/minPrice/${categoryID}`).then((r) => r.json()),
            authFetch(`/Vendor/maxPrice/${categoryID}`).then((r) => r.json()),
          ]);

          const min = Number(minRes) || 0;
          const max = Number(maxRes) || item.plannedAmount * 2;

          setBudgets((prev) =>
            prev.map((b) =>
              b.categoryID === categoryID
                ? {
                    ...b,
                    min,
                    max,
                    currentAmount: Math.min(
                      Math.max(b.currentAmount, min),
                      max,
                    ),
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
  // const setAmount = (id: number, val: number) =>
  //   setBudgets((p) => p.map((b) => (b.categoryID === id && !b.locked ? { ...b, currentAmount: val } : b)));

  //---------------------------------------------------------------------------------------
  // const setAmount = (id: number, newVal: number) => {
  //   setBudgets((prev) => {
  //     const target = prev.find((b) => b.categoryID === id);
  //     if (!target || target.locked) return prev;

  //     const diff = newVal - target.currentAmount; // ← ההפרש
  //     if (diff === 0) return prev;

  //     const others = prev.filter(
  //       (b) => b.categoryID !== id && !b.ignored && !b.locked,
  //     );
  //     const totalOthers = others.reduce((s, b) => s + b.currentAmount, 0);

  //     return prev.map((b) => {
  //       if (b.categoryID === id) return { ...b, currentAmount: newVal };

  //       if (!b.ignored && !b.locked && totalOthers > 0) {
  //         const share = (b.currentAmount / totalOthers) * diff; // ← יחסי
  //         const updated = Math.round(b.currentAmount - share);
  //         return {
  //           ...b,
  //           currentAmount: Math.min(Math.max(updated, b.min), b.max),
  //         };
  //       }

  //       return b;
  //     });
  //   });
  // };
  //-----------------------------------------------------------------------------------
  // const setAmount = (id: number, newVal: number) => {
  //   setBudgets((prev) => {
  //     const target = prev.find((b) => b.categoryID === id);
  //     if (!target || target.locked) return prev;

  //     // 1. הגבלת הערך החדש של הסליידר שהזזנו לטווח המותר שלו
  //     const sanitizedNewVal = Math.min(
  //       Math.max(newVal, target.min),
  //       target.max,
  //     );
  //     const diff = sanitizedNewVal - target.currentAmount;
  //     if (diff === 0) return prev;

  //     let updatedBudgets = [...prev];

  //     // עדכון הקטגוריה שהשתנתה
  //     updatedBudgets = updatedBudgets.map((b) =>
  //       b.categoryID === id ? { ...b, currentAmount: sanitizedNewVal } : b,
  //     );

  //     // 2. הגדרת מי יכול לקבל/לתת תקציב (לא נעול, לא התעלמנו ממנו, ולא הסליידר הנוכחי)
  //     let recipients = updatedBudgets.filter(
  //       (b) => b.categoryID !== id && !b.ignored && !b.locked,
  //     );

  //     if (recipients.length === 0) return updatedBudgets;

  //     // 3. חלוקת ההפרש (diff) בצורה איטרטיבית
  //     let amountToDistribute = diff;

  //     // אנחנו מנסים לחלק את ההפרש עד שהוא נגמר או שכולם הגיעו לקצה (Limit)
  //     while (Math.abs(amountToDistribute) > 1) {
  //       const canAdjust = recipients.filter(
  //         (b) =>
  //           amountToDistribute > 0
  //             ? b.currentAmount > b.min // אם הוספנו לסליידר הראשי, אחרים צריכים לרדת
  //             : b.currentAmount < b.max, // אם הורדנו, אחרים צריכים לעלות
  //       );

  //       if (canAdjust.length === 0) break;

  //       const totalWeight =
  //         canAdjust.reduce((sum, b) => sum + b.currentAmount, 0) ||
  //         canAdjust.length;
  //       let distributedInRound = 0;

  //       const nextState = updatedBudgets.map((b) => {
  //         const isRecip = canAdjust.find((r) => r.categoryID === b.categoryID);
  //         if (!isRecip) return b;

  //         // חישוב החלק היחסי של הקטגוריה בהפחתה/הוספה
  //         const share = (b.currentAmount / totalWeight) * amountToDistribute;
  //         const targetAmount = b.currentAmount - share;

  //         // הגבלה לטווח המותר
  //         const finalAmount = Math.min(Math.max(targetAmount, b.min), b.max);
  //         const actualChange = b.currentAmount - finalAmount;

  //         distributedInRound += actualChange;
  //         return { ...b, currentAmount: Math.round(finalAmount) };
  //       });

  //       updatedBudgets = nextState;
  //       amountToDistribute -= distributedInRound;

  //       // עדכון רשימת המקבלים לסבב הבא
  //       recipients = updatedBudgets.filter(
  //         (b) => b.categoryID !== id && !b.ignored && !b.locked,
  //       );
  //     }

  //     return updatedBudgets;
  //   });
  // };
  //---------------
  // const setAmount = (id: number, newVal: number) => {
  //   setBudgets((prev) => {
  //     const target = prev.find((b) => b.categoryID === id);
  //     if (!target || target.locked || target.ignored) return prev;

  //     const sanitizedNewVal = Math.min(
  //       Math.max(newVal, target.min),
  //       target.max,
  //     );
  //     if (sanitizedNewVal === target.currentAmount) return prev;

  //     // כמה צריך להיות לכל השאר ביחד כדי לשמור על 100%
  //     const lockedTotal = prev
  //       .filter((b) => b.categoryID !== id && (b.locked || b.ignored))
  //       .reduce((s, b) => s + (b.ignored ? 0 : b.currentAmount), 0);

  //     const targetTotalForRecipients =
  //       event.totalBudget - sanitizedNewVal - lockedTotal;

  //     const recipients = prev.filter(
  //       (b) => b.categoryID !== id && !b.ignored && !b.locked,
  //     );

  //     if (recipients.length === 0) return prev;

  //     // אם הסכום הנדרש שלילי — לא ניתן להוסיף עוד
  //     if (
  //       targetTotalForRecipients < recipients.reduce((s, b) => s + b.min, 0)
  //     ) {
  //       return prev; // לא ניתן להזיז
  //     }

  //     // חלוקה יחסית של הסכום הנדרש בין הנמענים
  //     const currentTotal = recipients.reduce((s, b) => s + b.currentAmount, 0);

  //     let amounts = new Map<number, number>();

  //     if (currentTotal === 0) {
  //       // חלוקה שווה אם כולם באפס
  //       const each = targetTotalForRecipients / recipients.length;
  //       recipients.forEach((b) =>
  //         amounts.set(b.categoryID, Math.min(Math.max(each, b.min), b.max)),
  //       );
  //     } else {
  //       // חלוקה יחסית לפי גודל נוכחי
  //       recipients.forEach((b) => {
  //         const ratio = b.currentAmount / currentTotal;
  //         const newAmount = targetTotalForRecipients * ratio;
  //         amounts.set(
  //           b.categoryID,
  //           Math.min(Math.max(newAmount, b.min), b.max),
  //         );
  //       });
  //     }

  //     // תיקון שאריות עגול (floating point) — לשמור על סכום מדויק
  //     const actualSum = [...amounts.values()].reduce((s, v) => s + v, 0);
  //     const roundingError = targetTotalForRecipients - actualSum;
  //     if (Math.abs(roundingError) > 0 && recipients.length > 0) {
  //       const firstId = recipients[0].categoryID;
  //       amounts.set(firstId, (amounts.get(firstId) ?? 0) + roundingError);
  //     }

  //     return prev.map((b) => {
  //       if (b.categoryID === id)
  //         return { ...b, currentAmount: sanitizedNewVal };
  //       if (amounts.has(b.categoryID)) {
  //         return {
  //           ...b,
  //           currentAmount: Math.round(amounts.get(b.categoryID)!),
  //         };
  //       }
  //       return b;
  //     });
  //   });
  // };
  //-------
const setAmount = (id: number, newVal: number) => {
  setBudgets((prev) => {
    const target = prev.find((b) => b.categoryID === id);
    if (!target || target.locked || target.ignored) return prev;

    // 1. הגבלה קשיחה — הסליידר לעולם לא יצא מהטווח שלו
    const sanitizedNewVal = Math.min(Math.max(newVal, target.min), target.max);
    if (sanitizedNewVal === target.currentAmount) return prev;

    const lockedTotal = prev
      .filter((b) => b.categoryID !== id && (b.locked || b.ignored))
      .reduce((s, b) => s + (b.ignored ? 0 : b.currentAmount), 0);

    const neededFromRecipients = event.totalBudget - sanitizedNewVal - lockedTotal;

    const allRecipients = prev.filter(
      (b) => b.categoryID !== id && !b.ignored && !b.locked
    );

    if (allRecipients.length === 0) return prev;

    // 2. בדיקה שהסכום הנדרש בכלל אפשרי
    const minPossible = allRecipients.reduce((s, b) => s + b.min, 0);
    const maxPossible = allRecipients.reduce((s, b) => s + b.max, 0);
    
    if (neededFromRecipients < minPossible || neededFromRecipients > maxPossible) {
      return prev; // בלתי אפשרי — לא מזיזים כלום
    }

    // 3. חלוקה איטרטיבית לפי headroom
    let amounts = new Map<number, number>(
      allRecipients.map((b) => [b.categoryID, b.currentAmount])
    );

    let remaining = neededFromRecipients;

    for (let round = 0; round < allRecipients.length + 1; round++) {
      const currentSum = [...amounts.values()].reduce((s, v) => s + v, 0);
      const diff = remaining - currentSum;
      
      if (Math.abs(diff) < 1) break;

      const goingUp = diff > 0;

      const canAdjust = allRecipients.filter((b) => {
        const cur = amounts.get(b.categoryID)!;
        return goingUp ? cur < b.max : cur > b.min;
      });

      if (canAdjust.length === 0) break;

      const totalHeadroom = canAdjust.reduce((s, b) => {
        const cur = amounts.get(b.categoryID)!;
        return s + (goingUp ? b.max - cur : cur - b.min);
      }, 0);

      for (const b of canAdjust) {
        const cur = amounts.get(b.categoryID)!;
        const headroom = goingUp ? b.max - cur : cur - b.min;
        const share = totalHeadroom > 0
          ? (headroom / totalHeadroom) * diff
          : diff / canAdjust.length;

        // הגבלה קשיחה — לעולם לא יצא מהטווח
        const newAmount = Math.min(Math.max(cur + share, b.min), b.max);
        amounts.set(b.categoryID, newAmount);
      }
    }

    // 4. עיגול סופי — גם כאן עם הגבלה קשיחה
    const finalSum = [...amounts.values()].reduce((s, v) => s + v, 0);
    const roundingError = neededFromRecipients - finalSum;

    if (Math.abs(roundingError) >= 1) {
      const adjustable = allRecipients.find((b) => {
        const cur = amounts.get(b.categoryID)!;
        return roundingError > 0
          ? cur < b.max   // צריך להוסיף — יש מקום למעלה
          : cur > b.min;  // צריך להוריד — יש מקום למטה
      });
      if (adjustable) {
        const cur = amounts.get(adjustable.categoryID)!;
        // הגבלה קשיחה גם כאן!
        amounts.set(
          adjustable.categoryID,
          Math.min(Math.max(cur + roundingError, adjustable.min), adjustable.max)
        );
      }
    }

    return prev.map((b) => {
      if (b.categoryID === id) return { ...b, currentAmount: sanitizedNewVal };
      if (amounts.has(b.categoryID)) {
        return { ...b, currentAmount: Math.round(amounts.get(b.categoryID)!) };
      }
      return b;
    });
  });
};
  // ─── נעילה: הקטגוריה לא תושפע משינויים עתידיים ───────────────────
  const toggleLock = (id: number) =>
    setBudgets((p) =>
      p.map((b) => (b.categoryID === id ? { ...b, locked: !b.locked } : b)),
    );

  // ─── ביטול + שחזור קטגוריה ───────────────────────────────────────
  const ignoreCategory = (id: number) => {
    setBudgets((prev) => {
      const target = prev.find((b) => b.categoryID === id);
      if (!target) return prev;

      // סכום לחלוקה = סכום הקטגוריה המבוטלת + כל מה שנותר מהתקציב הכולל
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

      // חלוקה יחסית עם סבבים — מה שלא נקלט (בגלל max) עובר הלאה לשאר
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

  // const fillPct = (b: CategoryBudget) => {
  //   const range = b.max - b.min;
  //   return range <= 0
  //     ? 0
  //     : Math.min(100, Math.max(0, ((b.currentAmount - b.min) / range) * 100));
  // };
//   const fillPct = (b: CategoryBudget) => {
//   const range = b.max - b.min;
//   if (range <= 0) return 0;
//   const clamped = Math.min(Math.max(b.currentAmount, b.min), b.max);
//   return Math.min(100, Math.max(0, ((clamped - b.min) / range) * 100));
//    // זהב מימין, שחור משמאל
// };
// const fillPct = (b: CategoryBudget) => {
//   const range = b.max - b.min;
//   if (range <= 0) return 0;
  
//   const clamped = Math.min(Math.max(b.currentAmount, b.min), b.max);
  
//   // חישוב המרחק מהמינימום (שנמצא בשמאל) באחוזים
//   return ((clamped - b.min) / range) * 100;
// };
const fillPct = (b: CategoryBudget) => {
  const range = b.max - b.min;
  if (range <= 0) return 0;
  const clamped = Math.min(Math.max(b.currentAmount, b.min), b.max);
  const pct = Math.min(100, Math.max(0, ((clamped - b.min) / range) * 100));
  return 100 - pct; // הפוך כי max בימין
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
                // key={`budget-${b.categoryID}-${i}`}
                key={`ev-${event.eventID}-cat-${b.categoryID}-${i}`}
                className={`category-card ${b.locked ? "locked" : ""} ${b.ignored ? "ignored" : ""} ${b.selected ? "selected" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="card-header">
                  <div className="category-name">{b.categoryName}</div>
                  <div className="card-actions">
                    {/* 🔒 נעילה – הקטגוריה לא תושפע מחלוקות עתידיות */}
                    <button
                      className={`action-btn ${b.locked ? "active-lock" : ""}`}
                      onClick={() => toggleLock(b.categoryID)}
                      title={b.locked ? "בטל נעילה" : "נעל קטגוריה זו"}
                      disabled={b.ignored}
                    >
                      {b.locked ? "🔒" : "🔓"}
                    </button>

                    {/* ✖ התעלמות / ↩ שחזור */}
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
                ) : b.minLoading ? (
                  <div className="range-loading">מעדכן טווחים...</div>
                ) : (
                  <>
                    <div className="slider-area">
                      <div className="range-label min">₪{fmt(b.min)}</div>
                      <div className="slider-wrap" dir="ltr">
                        <input
                          type="range"
                          className="budget-slider"
                          style={{ "--fill": `${fillPct(b)}%` } as any}
                          min={b.min}
                          max={b.max}
                          value={b.currentAmount}
                          disabled={b.locked || b.ignored}
                          onChange={(e) =>
                            setAmount(b.categoryID, Number(e.target.value))
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
              onClick={async () => {
                setIsSaving(true);
                setSaveError(null);
                try {
                  // 1. הכנת המערך לשליחה - רק עבור פריטים שהשתנו (אופטימיזציה)
                  const payload = budgets.map((b) => {
                    const originalItem = event.budgetItems?.find(
                      (item) => item.categoryID === b.categoryID,
                    );

                    return {
                      budgetItemID: originalItem?.budgetItemID || 0,
                      eventID: event.eventID,
                      categoryID: b.categoryID,
                      plannedAmount: b.currentAmount,
                      actualAmount: originalItem?.actualAmount ?? 0,
                      isIgnore: b.ignored,
                      isLocked: b.locked,
                      vendorID: originalItem?.vendorID || null,
                    };
                  });

                  // 2. שליחה אחת מרוכזת לשרת
                  const response = await authFetch(
                    `/BudgetItem/UpdateMultiple`,
                    {
                      method: "POST", // או PUT, תלוי ב-API שלך
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    },
                  );

                  if (!response.ok) throw new Error("Failed to save all items");

                  // 3. עדכון ה-State המקומי ומעבר דף
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
              }}
            >
              {isSaving ? "שומר..." : "המשך לבחירת ספקים ←"}
            </button>
          </div>
        </main>
      </div>
      {/* ─── דיאלוג אישור ביטול קטגוריה ─────────────────────────────── */}
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
