// src/pages/VendorsPage.tsx
import { useState, useEffect } from "react";
import { type category, type categoryDtoo } from "../types/category";
import { type EventDtoo } from "../types/event";
import { type VendorDtoo } from "../types/vendor";
import { getVendorsByCategory } from "../services/vendorService";
import { pageStyles } from "../styles/VendorStyle";
import type { BudgetItem } from "../types/budgetItem";
import { getCategories } from "../services/categoryService";

interface SelectedVendor {
  id: number;
  name: string;
}

interface Props {
  event: EventDtoo;
  budgets: BudgetItem[];
  initialSelected?: Record<number, SelectedVendor>; // ← הוסף
  onBack: () => void;
  onProceedToTasks: (selected: Record<number, SelectedVendor>) => void;
  onSaveSelected?: (selected: Record<number, SelectedVendor>) => void;
  // onVendorSelected?: (categoryID: number, price: number) => void; // ← חדש
onVendorSelected?: (categoryID: number, price: number, vendorName?: string) => void;
}

const VendorsPage = ({
  event,
  budgets,
  initialSelected,
  onBack,
  onProceedToTasks,
  onSaveSelected,
  onVendorSelected,
}: Props) => {
  // const [activeTab, setActiveTab] = useState<number>(budgets[0]?.categoryID ?? 0);
  //   const [activeTab, setActiveTab] = useState<BudgetItem>(
  //   budgets.find((b) => !b.isIgnore) ? b: null
  // );
  const [activeTab, setActiveTab] = useState<number>(
    budgets.find((b) => !b.isIgnore)?.categoryID ?? 0,
  );

  const [vendors, setVendors] = useState<VendorDtoo[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  // const [selected, setSelected] = useState<Record<number, SelectedVendor>>({});
  const [selected, setSelected] = useState<Record<number, SelectedVendor>>(
    initialSelected ?? {},
  ); // ← שנה
  const [allCategories, setAllCategories] = useState<categoryDtoo[]>([]);

  useEffect(() => {
    getCategories().then(setAllCategories).catch(console.error);
  }, []);

  const getCategoryName = (categoryID: number) => {
    return (
      allCategories.find((c) => c.categoryID === categoryID)?.categoryName ??
      `קטגוריה ${categoryID}`
    );
  };
  // ── שליפת ספקים כשמשנים קטגוריה ──
  useEffect(() => {
    if (!activeTab) return;
    setLoadingVendors(true);
    getVendorsByCategory(activeTab)
      .then(setVendors)
      .catch(console.error)
      .finally(() => setLoadingVendors(false));
  }, [activeTab]);

  // ── תקציב לפי קטגוריה ──
  const getCategoryBudget = (categoryID: number) => {
    const b = budgets.find((x) => x.categoryID === categoryID);
    if (b == null || b.isIgnore) return 0;
    // return b ? Math.round((event.totalBudget * b.pct) / 100) : 0;
    return b ? Number(b.plannedAmount) : 0;
  };

  // src/pages/VendorsPage.tsx

  // ── רק קטגוריות פעילות לטאבים ──
  const activeCategories = budgets.filter((cat) => !cat.isIgnore);



  // const toggleVendor = (
  //   catID: number,
  //   vendor: { id: number; name: string },
  //   price: number,
  // ) => {
  //   // ← הוסף price
  //   setSelected((prev) =>
  //     prev[catID]?.id === vendor.id
  //       ? { ...prev, [catID]: { id: 0, name: "" } }
  //       : { ...prev, [catID]: vendor },
  //   );
  //   onVendorSelected?.(catID, price); // ← חדש
  // };

// ב-toggleVendor
const toggleVendor = (catID: number, vendor: { id: number; name: string }, price: number) => {
  const isDeselecting = selected[catID]?.id === vendor.id;
  setSelected((prev) =>
    isDeselecting
      ? { ...prev, [catID]: { id: 0, name: "" } }
      : { ...prev, [catID]: vendor },
  );
  onVendorSelected?.(catID, isDeselecting ? 0 : price, isDeselecting ? undefined : vendor.name);
};

  const selectedCount = Object.values(selected).filter((v) => v?.id > 0).length;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="vendors-page" dir="rtl">
        <div className="vendors-bg" />
        <header className="vendors-header">
          <div className="vendors-header-left">
            <div className="header-logo-icon">
              <span className="header-logo-inner">✦</span>
            </div>
            <div>
              <div className="header-title">Élite</div>
              <div className="header-subtitle">בחירת ספקים</div>
            </div>
          </div>
          <button className="btn-back" onClick={onBack}>
            ← חזרה לתקציב
          </button>
        </header>

        <main className="vendors-content">
          <div className="section-title">בחר ספק לכל קטגוריה</div>

          {/* טאבים — לפי קטגוריות שנשלפו */}
          {/* <div className="category-tabs">
            {budgets.map((cat) => (
              <button
                key={cat.categoryID}
                className={`tab ${activeTab === cat.categoryID ? "active" : ""}`}
                onClick={() => setActiveTab(cat.categoryID)}
              >
                {cat.allCategory?.categoryName}
                <div className="tab-budget">
                  ₪{getCategoryBudget(cat.categoryID).toLocaleString()}
                </div>
              </button>
            ))}
          </div> */}

          <div className="category-tabs">
            {activeCategories.map((cat) => (
              <button
                key={cat.categoryID}
                className={`tab ${activeTab === cat.categoryID ? "active" : ""}`}
                onClick={() => setActiveTab(cat.categoryID)}
              >
                {/* {cat.allCategory?.categoryName ?? `קטגוריה ${cat.categoryID}`} */}
                {cat.allCategory?.categoryName ??
                  getCategoryName(cat.categoryID)}
                <div className="tab-budget">
                  ₪{Number(getCategoryBudget(cat.categoryID)).toLocaleString()}
                </div>
              </button>
            ))}
          </div>

          {/* רשימת ספקים */}
          {loadingVendors ? (
            <div className="loading-spinner" />
          ) : (
            <div className="vendors-grid">
              {vendors.length === 0 ? (
                <div className="vendor-empty">
                  <div className="vendor-empty-icon">✦</div>
                  <div className="vendor-empty-text">אין ספקים בקטגוריה זו</div>
                </div>
              ) : (
                vendors.map((v, i) => {
                  const budget = getCategoryBudget(activeTab);
                  const isOver = Number(v.basePrice) > budget * 1.1; // ← 10% מעל
                  const isSelected = selected[activeTab]?.id === v.vendorID;
                  // const budget = getCategoryBudget(activeTab);
                  // const isOver = Number(v.basePrice) > budget;
                  // const isSelected = selected[activeTab]?.id === v.vendorID;
                  return (
                    <div
                      key={v.vendorID}
                      className={`vendor-card ${isSelected ? "selected" : ""} ${isOver ? "over-budget" : ""}`}
                      style={{ animationDelay: `${i * 0.08}s` }}
                      // onClick={() =>
                      //   !isOver &&
                      //   toggleVendor(activeTab, {
                      //     id: v.vendorID,
                      //     name: v.businessName,
                      //   })
                      // }
                      // onClick={
                      //   () =>
                      //     !isOver &&
                      //     toggleVendor(
                      //       activeTab,
                      //       { id: v.vendorID, name: v.businessName },
                      //       Number(v.basePrice),
                      //     ) // ← הוסף basePrice
                      // }

// ב-onClick של vendor-card
onClick={() =>
  !isOver && toggleVendor(activeTab, { id: v.vendorID, name: v.businessName }, Number(v.basePrice))
}

                    >
                      {isSelected && (
                        <div className="vendor-selected-badge">✓ נבחר</div>
                      )}
                      {isOver && !isSelected && (
                        <div className="vendor-over-badge">מעל תקציב</div>
                      )}
                      <div className="vendor-name">{v.businessName}</div>
                      <div className="vendor-price">
                        ₪{Number(v.basePrice).toLocaleString()}
                      </div>
                      <div className="vendor-price-label">מחיר בסיס</div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* סיכום נבחרים */}
          {selectedCount > 0 && (
            <div className="selected-summary">
              <div className="summary-title">
                ספקים שנבחרו ({selectedCount})
              </div>
              <div className="summary-list">
                {budgets.map((cat) => {
                  const v = selected[cat.categoryID];
                  return v?.id > 0 ? (
                    <div key={cat.categoryID} className="summary-chip">
                      {cat.allCategory?.categoryName}: {v.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="vendors-actions">
            {/* <button className="btn-secondary" onClick={onBack}>← חזרה</button> */}
            <button
              className="btn-secondary"
              onClick={() => {
                onSaveSelected?.(selected); // ← שמור לפני חזרה
                onBack();
              }}
            >
              ← חזרה
            </button>
            <button
              className="btn-primary"
              disabled={selectedCount === 0}
              onClick={() => onProceedToTasks(selected)}
            >
              המשך למשימות ←
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default VendorsPage;
