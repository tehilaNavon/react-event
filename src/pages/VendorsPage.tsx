// // src/pages/VendorsPage.tsx
// import { useState, useEffect } from "react";
// import { type category, type categoryDtoo } from "../types/category";
// import { type EventDtoo } from "../types/event";
// import { type VendorDtoo } from "../types/vendor";
// import { getVendorsByCategory } from "../services/vendorService";
// import { pageStyles } from "../styles/VendorStyle";
// import type { BudgetItem } from "../types/budgetItem";
// import { getCategories } from "../services/categoryService";
// import { saveSelectedVendors } from "../services/vendorService";
// import { getVendorAttributes } from "../services/VendorAttributeService";
// import type { VendorAttributeDtoo } from "../types/VendorAttribute"; // או מהקובץ שיצרת
// import vendorAttributestyle from "../styles/VendorAttributeStyle";

// interface SelectedVendor {
//   id: number;
//   name: string;
// }

// interface Props {
//   event: EventDtoo;
//   budgets: BudgetItem[];
//   initialSelected?: Record<number, SelectedVendor>; // ← הוסף
//   onBack: () => void;
//   onProceedToTasks: (selected: Record<number, SelectedVendor>) => void;
//   onSaveSelected?: (selected: Record<number, SelectedVendor>) => void;
//   onVendorSelected?: (
//     categoryID: number,
//     price: number,
//     vendorName?: string,
//   ) => void;
// }

// const VendorsPage = ({
//   event,
//   budgets,
//   initialSelected,
//   onBack,
//   onProceedToTasks,
//   onSaveSelected,
//   onVendorSelected,
// }: Props) => {
//   const [activeTab, setActiveTab] = useState<number>(
//     budgets.find((b) => !b.isIgnore)?.categoryID ?? 0,
//   );
//   const [loadingAttributes, setLoadingAttributes] = useState<
//     Record<number, boolean>
//   >({});
//   const [vendors, setVendors] = useState<VendorDtoo[]>([]);
//   const [loadingVendors, setLoadingVendors] = useState(false);
//   // const [selected, setSelected] = useState<Record<number, SelectedVendor>>({});
//   const [selected, setSelected] = useState<Record<number, SelectedVendor>>(
//     initialSelected ?? {},
//   ); // ← שנה
//   const [allCategories, setAllCategories] = useState<categoryDtoo[]>([]);
//   const [hoveredVendorId, setHoveredVendorId] = useState<number | null>(null);
//   const [attributesMap, setAttributesMap] = useState<
//     Record<number, VendorAttributeDtoo[]>
//   >({});

//   useEffect(() => {
//     getCategories().then(setAllCategories).catch(console.error);
//   }, []);

//   const getCategoryName = (categoryID: number) => {
//     return (
//       allCategories.find((c) => c.categoryID === categoryID)?.categoryName ??
//       `קטגוריה ${categoryID}`
//     );
//   };
//   // ── שליפת ספקים כשמשנים קטגוריה ──
//   // useEffect(() => {
//   //   if (!activeTab) return;
//   //   setLoadingVendors(true);
//   //   getVendorsByCategory(activeTab)
//   //     .then(setVendors)
//   //     .catch(console.error)
//   //     .finally(() => setLoadingVendors(false));
//   // }, [activeTab]);
//   // החלף את ה-useEffect של vendors:
//   useEffect(() => {
//     if (!activeTab) return;
//     setLoadingVendors(true);
//     getVendorsByCategory(activeTab)
//       .then((fetchedVendors) => {
//         setVendors(fetchedVendors);
//         // טעינת תכונות לכל הספקים של הקטגוריה
//         fetchedVendors.forEach((v) => {
//           if (attributesMap[v.vendorID] !== undefined) return; // כבר נטענו
//           getVendorAttributes(v.vendorID).then((attrs) => {
//             setAttributesMap((prev) => ({ ...prev, [v.vendorID]: attrs }));
//           });
//         });
//       })
//       .catch(console.error)
//       .finally(() => setLoadingVendors(false));
//   }, [activeTab]);
//   // ── תקציב לפי קטגוריה ──
//   const getCategoryBudget = (categoryID: number) => {
//     const b = budgets.find((x) => x.categoryID === categoryID);
//     if (b == null || b.isIgnore) return 0;
//     // return b ? Math.round((event.totalBudget * b.pct) / 100) : 0;
//     return b ? Number(b.plannedAmount) : 0;
//   };
//   // ── טעינת מאפייני ספק בהובר (לכל ספק בנפרד) ──
//   // const handleMouseEnter = async (vendorId: number) => {
//   //   setHoveredVendorId(vendorId);
//   //   if (attributesMap[vendorId]) return; // כבר נטענו
//   //   const attrs = await getVendorAttributes(vendorId);
//   //   setAttributesMap((prev) => ({ ...prev, [vendorId]: attrs }));
//   // };
//   const handleMouseEnter = async (vendorId: number) => {
//     setHoveredVendorId(vendorId);
//     if (attributesMap[vendorId] !== undefined) return; // כבר נטענו
//     setLoadingAttributes((prev) => ({ ...prev, [vendorId]: true }));
//     const attrs = await getVendorAttributes(vendorId);
//     setAttributesMap((prev) => ({ ...prev, [vendorId]: attrs }));
//     setLoadingAttributes((prev) => ({ ...prev, [vendorId]: false }));
//   };
//   const handleProceed = async () => {
//     const vendorIds = Object.values(selected)
//       .filter((v) => v?.id > 0)
//       .map((v) => v.id);

//     await saveSelectedVendors(event.eventID, vendorIds);
//     onProceedToTasks(selected);
//   };

//   // ── רק קטגוריות פעילות לטאבים ──
//   const activeCategories = budgets.filter((cat) => !cat.isIgnore);

//   const toggleVendor = (
//     catID: number,
//     vendor: { id: number; name: string },
//     price: number,
//   ) => {
//     const isDeselecting = selected[catID]?.id === vendor.id;

//     const finalPrice = catID === 3 ? price * event.guestCount : price; // ✅ כפול אורחים רק לקטגוריה 3

//     setSelected((prev) =>
//       isDeselecting
//         ? { ...prev, [catID]: { id: 0, name: "" } }
//         : { ...prev, [catID]: vendor },
//     );
//     onVendorSelected?.(
//       catID,
//       isDeselecting ? 0 : finalPrice,
//       isDeselecting ? undefined : vendor.name,
//     );
//   };

//   const selectedCount = Object.values(selected).filter((v) => v?.id > 0).length;

//   return (
//     <>
//       {/* <style>{pageStyles}</style> */}
//       <style>{pageStyles + vendorAttributestyle}</style>
//       <div className="vendors-page" dir="rtl">
//         <div className="vendors-bg" />
//         <header className="vendors-header">
//           <div className="vendors-header-left">
//             <div className="header-logo-icon">
//               <span className="header-logo-inner">✦</span>
//             </div>
//             <div>
//               <div className="header-title">Élite</div>
//               <div className="header-subtitle">בחירת ספקים</div>
//             </div>
//           </div>
//           <button className="btn-back" onClick={onBack}>
//             ← חזרה לתקציב
//           </button>
//         </header>

//         <main className="vendors-content">
//           <div className="section-title">בחר ספק לכל קטגוריה</div>
//           <div className="category-tabs">
//             {activeCategories.map((cat) => (
//               <button
//                 key={cat.categoryID}
//                 className={`tab ${activeTab === cat.categoryID ? "active" : ""}`}
//                 onClick={() => setActiveTab(cat.categoryID)}
//               >
//                 {cat.allCategory?.categoryName ??
//                   getCategoryName(cat.categoryID)}
//                 <div className="tab-budget">
//                   ₪{Number(getCategoryBudget(cat.categoryID)).toLocaleString()}
//                 </div>
//               </button>
//             ))}
//           </div>

//           {/* רשימת ספקים */}
//           {loadingVendors ? (
//             <div className="loading-spinner" />
//           ) : (
//             <div className="vendors-grid">
//               {vendors.length === 0 ? (
//                 <div className="vendor-empty">
//                   <div className="vendor-empty-icon">✦</div>
//                   <div className="vendor-empty-text">אין ספקים בקטגוריה זו</div>
//                 </div>
//               ) : (
//                 vendors.map((v, i) => {
//                   const budget = getCategoryBudget(activeTab);
//                   const isOver =
//                     v.categoryID == 3
//                       ? Number(v.basePrice * event.guestCount) > budget * 1.1
//                       : Number(v.basePrice) > budget * 1.1; // ← 10% מעל
//                   const isSelected = selected[activeTab]?.id === v.vendorID;
//                   // const budget = getCategoryBudget(activeTab);
//                   // const isOver = Number(v.basePrice) > budget;
//                   // const isSelected = selected[activeTab]?.id === v.vendorID;
//                   return (
//                     // <div
//                     //   key={v.vendorID}
//                     //   className={`vendor-card ${isSelected ? "selected" : ""} ${isOver ? "over-budget" : ""}`}
//                     //   style={{ animationDelay: `${i * 0.08}s` }}
//                     //   // ב-onClick של vendor-card
//                     //   onClick={() =>
//                     //     !isOver &&
//                     //     toggleVendor(
//                     //       activeTab,
//                     //       { id: v.vendorID, name: v.businessName },
//                     //       Number(v.basePrice),
//                     //     )
//                     //   }
//                     // >
//                     <div
//                       key={v.vendorID}
//                       className={`vendor-card ${isSelected ? "selected" : ""} ${isOver ? "over-budget" : ""}`}
//                       style={{
//                         animationDelay: `${i * 0.08}s`,
//                         position: "relative",
//                       }}
//                       onMouseEnter={() => setHoveredVendorId(v.vendorID)} // רק UI, אין קריאת שרת
//                       onMouseLeave={() => setHoveredVendorId(null)}
//                       onClick={() =>
//                         !isOver &&
//                         toggleVendor(
//                           activeTab,
//                           { id: v.vendorID, name: v.businessName },
//                           Number(v.basePrice),
//                         )
//                       }
//                     >
//                       {hoveredVendorId === v.vendorID && (
//                         <div className="vendor-tooltip">
//                           {!attributesMap[v.vendorID] ? (
//                             <div className="tooltip-loading">טוען...</div>
//                           ) : attributesMap[v.vendorID].length > 0 ? (
//                             attributesMap[v.vendorID].map((attr) => (
//                               <div
//                                 key={attr.vendorAttributeID}
//                                 className="tooltip-row"
//                               >
//                                 <span className="tooltip-key">
//                                   {attr.vendorAttributeName}
//                                 </span>
//                                 <span className="tooltip-val">
//                                   {attr.value}
//                                 </span>
//                               </div>
//                             ))
//                           ) : (
//                             <div className="tooltip-empty">
//                               אין פרטים נוספים
//                             </div>
//                           )}
//                         </div>
//                         // <div
//                         //   key={v.vendorID}
//                         //   className={`vendor-card ${isSelected ? "selected" : ""} ${isOver ? "over-budget" : ""}`}
//                         //   style={{
//                         //     animationDelay: `${i * 0.08}s`,
//                         //     position: "relative",
//                         //   }}
//                         //   onMouseEnter={() => handleMouseEnter(v.vendorID)}
//                         //   onMouseLeave={() => setHoveredVendorId(null)}
//                         //   onClick={() =>
//                         //     !isOver &&
//                         //     toggleVendor(
//                         //       activeTab,
//                         //       { id: v.vendorID, name: v.businessName },
//                         //       Number(v.basePrice),
//                         //     )
//                         //   }
//                         // >
//                         //   {/* Tooltip */}
//                         //   {/* {hoveredVendorId === v.vendorID && (
//                         //     <div className="vendor-tooltip">
//                         //       {attributesMap[v.vendorID]?.length > 0 ? (
//                         //         attributesMap[v.vendorID].map((attr) => (
//                         //           <div
//                         //             key={attr.vendorAttributeID}
//                         //             className="tooltip-row"
//                         //           >
//                         //             <span className="tooltip-key">
//                         //               {attr.vendorAttributeName}
//                         //             </span>
//                         //             <span className="tooltip-val">
//                         //               {attr.value}
//                         //             </span>
//                         //           </div>
//                         //         ))
//                         //       ) : (
//                         //         <div className="tooltip-empty">
//                         //           אין פרטים נוספים
//                         //         </div>
//                         //       )}
//                         //     </div>
//                         //   )} */}
//                         //   {hoveredVendorId === v.vendorID && (
//                         //     <div className="vendor-tooltip">
//                         //       {loadingAttributes[v.vendorID] ? (
//                         //         <div className="tooltip-loading">טוען...</div>
//                         //       ) : attributesMap[v.vendorID]?.length > 0 ? (
//                         //         attributesMap[v.vendorID].map((attr) => (
//                         //           <div
//                         //             key={attr.vendorAttributeID}
//                         //             className="tooltip-row"
//                         //           >
//                         //             <span className="tooltip-key">
//                         //               {attr.vendorAttributeName}
//                         //             </span>
//                         //             <span className="tooltip-val">
//                         //               {attr.value}
//                         //             </span>
//                         //           </div>
//                         //         ))
//                         //       ) : (
//                         //         <div className="tooltip-empty">
//                         //           אין פרטים נוספים
//                         //         </div>
//                         //       )}
//                         //     </div>
//                       )}
//                       {isSelected && (
//                         <div className="vendor-selected-badge">✓ נבחר</div>
//                       )}
//                       {isOver && !isSelected && (
//                         <div className="vendor-over-badge">מעל תקציב</div>
//                       )}
//                       <div className="vendor-name">{v.businessName}</div>
//                       <div className="vendor-price">
//                         ₪
//                         {Number(
//                           v.categoryID === 3 // אם קטגוריה 3 (למשל: אוכל לפי מנות)
//                             ? v.basePrice * event.guestCount // כפול מספר האורחים
//                             : v.basePrice, // אחרת: מחיר רגיל
//                         ).toLocaleString()}
//                       </div>
//                       <div className="vendor-price-label">מחיר בסיס</div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           )}

//           {/* סיכום נבחרים */}
//           {selectedCount > 0 && (
//             <div className="selected-summary">
//               <div className="summary-title">
//                 ספקים שנבחרו ({selectedCount})
//               </div>
//               <div className="summary-list">
//                 {budgets.map((cat) => {
//                   const v = selected[cat.categoryID];
//                   return v?.id > 0 ? (
//                     <div key={cat.categoryID} className="summary-chip">
//                       {cat.allCategory?.categoryName}: {v.name}
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             </div>
//           )}

//           <div className="vendors-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => {
//                 onSaveSelected?.(selected); // ← שמור לפני חזרה
//                 onBack();
//               }}
//             >
//               ← חזרה
//             </button>
//             <button
//               className="btn-primary"
//               disabled={selectedCount === 0}
//               onClick={handleProceed}
//             >
//               המשך למשימות ←
//             </button>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default VendorsPage;








// src/pages/VendorsPage.tsx
import { useState, useEffect } from "react";
import { type categoryDtoo } from "../types/category";
import { type EventDtoo } from "../types/event";
import { type VendorDtoo } from "../types/vendor";
import { getVendorsByCategory, saveSelectedVendors } from "../services/vendorService";
import { pageStyles } from "../styles/VendorStyle";
import type { BudgetItem } from "../types/budgetItem";
import { getCategories } from "../services/categoryService";
import { getBulkVendorAttributes } from "../services/VendorAttributeService";
import type { VendorAttributeDtoo } from "../types/VendorAttribute";
import vendorAttributestyle from "../styles/VendorAttributeStyle";

interface SelectedVendor {
  id: number;
  name: string;
}

interface Props {
  event: EventDtoo;
  budgets: BudgetItem[];
  initialSelected?: Record<number, SelectedVendor>;
  onBack: () => void;
  onProceedToTasks: (selected: Record<number, SelectedVendor>) => void;
  onSaveSelected?: (selected: Record<number, SelectedVendor>) => void;
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
  const [activeTab, setActiveTab] = useState<number>(
    budgets.find((b) => !b.isIgnore)?.categoryID ?? 0,
  );
  const [vendors, setVendors] = useState<VendorDtoo[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [selected, setSelected] = useState<Record<number, SelectedVendor>>(initialSelected ?? {});
  const [allCategories, setAllCategories] = useState<categoryDtoo[]>([]);
  const [hoveredVendorId, setHoveredVendorId] = useState<number | null>(null);
  const [attributesMap, setAttributesMap] = useState<Record<number, VendorAttributeDtoo[]>>({});

  useEffect(() => {
    getCategories().then(setAllCategories).catch(console.error);
  }, []);

  const getCategoryName = (categoryID: number) =>
    allCategories.find((c) => c.categoryID === categoryID)?.categoryName ?? `קטגוריה ${categoryID}`;

  // ── שליפת ספקים + תכונותיהם בלחיצה על טאב ──
  // useEffect(() => {
  //   if (!activeTab) return;
  //   setLoadingVendors(true);
  //   getVendorsByCategory(activeTab)
  //     .then((fetchedVendors) => {
  //       setVendors(fetchedVendors);
  //       fetchedVendors.forEach((v) => {
  //         if (attributesMap[v.vendorID] !== undefined) return; // כבר נטענו
  //         getVendorAttributes(v.vendorID).then((attrs) => {
  //           setAttributesMap((prev) => ({ ...prev, [v.vendorID]: attrs }));
  //         });
  //       });
  //     })
  //     .catch(console.error)
  //     .finally(() => setLoadingVendors(false));
  // }, [activeTab]);
useEffect(() => {
  if (!activeTab) return;
  setLoadingVendors(true);
  getVendorsByCategory(activeTab)
    .then(async (fetchedVendors) => {
      setVendors(fetchedVendors);
      const idsToFetch = fetchedVendors
        .map((v) => v.vendorID)
        .filter((id) => attributesMap[id] === undefined);
      if (idsToFetch.length === 0) return;
      const bulk = await getBulkVendorAttributes(idsToFetch);
      setAttributesMap((prev) => ({ ...prev, ...bulk }));
    })
    .catch(console.error)
    .finally(() => setLoadingVendors(false));
}, [activeTab]);

  const getCategoryBudget = (categoryID: number) => {
    const b = budgets.find((x) => x.categoryID === categoryID);
    if (b == null || b.isIgnore) return 0;
    return b ? Number(b.plannedAmount) : 0;
  };

  const handleProceed = async () => {
    const vendorIds = Object.values(selected).filter((v) => v?.id > 0).map((v) => v.id);
    await saveSelectedVendors(event.eventID, vendorIds);
    onProceedToTasks(selected);
  };

  const activeCategories = budgets.filter((cat) => !cat.isIgnore);

  const toggleVendor = (catID: number, vendor: { id: number; name: string }, price: number) => {
    const isDeselecting = selected[catID]?.id === vendor.id;
    const finalPrice = catID === 3 ? price * event.guestCount : price;
    setSelected((prev) =>
      isDeselecting
        ? { ...prev, [catID]: { id: 0, name: "" } }
        : { ...prev, [catID]: vendor },
    );
    onVendorSelected?.(catID, isDeselecting ? 0 : finalPrice, isDeselecting ? undefined : vendor.name);
  };

  const selectedCount = Object.values(selected).filter((v) => v?.id > 0).length;

  return (
    <>
      <style>{pageStyles + vendorAttributestyle}</style>
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
          <button className="btn-back" onClick={onBack}>← חזרה לתקציב</button>
        </header>

        <main className="vendors-content">
          <div className="section-title">בחר ספק לכל קטגוריה</div>
          <div className="category-tabs">
            {activeCategories.map((cat) => (
              <button
                key={cat.categoryID}
                className={`tab ${activeTab === cat.categoryID ? "active" : ""}`}
                onClick={() => setActiveTab(cat.categoryID)}
              >
                {cat.allCategory?.categoryName ?? getCategoryName(cat.categoryID)}
                <div className="tab-budget">
                  ₪{Number(getCategoryBudget(cat.categoryID)).toLocaleString()}
                </div>
              </button>
            ))}
          </div>

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
                  const isOver =
                    v.categoryID === 3
                      ? Number(v.basePrice * event.guestCount) > budget * 1.1
                      : Number(v.basePrice) > budget * 1.1;
                  const isSelected = selected[activeTab]?.id === v.vendorID;

                  return (
                    <div
                      key={v.vendorID}
                      className={`vendor-card ${isSelected ? "selected" : ""} ${isOver ? "over-budget" : ""}`}
                      style={{ animationDelay: `${i * 0.08}s`, position: "relative" }}
                      onMouseEnter={() => setHoveredVendorId(v.vendorID)}
                      onMouseLeave={() => setHoveredVendorId(null)}
                      onClick={() =>
                        !isOver &&
                        toggleVendor(activeTab, { id: v.vendorID, name: v.businessName }, Number(v.basePrice))
                      }
                    >
                      {/* Tooltip — מוצג בהובר, הנתונים כבר נטענו בלחיצה על הטאב */}
                      {hoveredVendorId === v.vendorID && (
                        <div className="vendor-tooltip">
                          {attributesMap[v.vendorID] === undefined ? (
                            <div className="tooltip-loading">טוען...</div>
                          ) : attributesMap[v.vendorID].length > 0 ? (
                            attributesMap[v.vendorID].map((attr) => (
                              <div key={attr.vendorAttributeID} className="tooltip-row">
                                <span className="tooltip-key">{attr.vendorAttributeName}</span>
                                <span className="tooltip-val">{attr.value}</span>
                              </div>
                            ))
                          ) : (
                            <div className="tooltip-empty">אין פרטים נוספים</div>
                          )}
                        </div>
                      )}

                      {isSelected && <div className="vendor-selected-badge">✓ נבחר</div>}
                      {isOver && !isSelected && <div className="vendor-over-badge">מעל תקציב</div>}
                      <div className="vendor-name">{v.businessName}</div>
                      <div className="vendor-price">
                        ₪{Number(v.categoryID === 3 ? v.basePrice * event.guestCount : v.basePrice).toLocaleString()}
                      </div>
                      <div className="vendor-price-label">מחיר בסיס</div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {selectedCount > 0 && (
            <div className="selected-summary">
              <div className="summary-title">ספקים שנבחרו ({selectedCount})</div>
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
            <button
              className="btn-secondary"
              onClick={() => {
                onSaveSelected?.(selected);
                onBack();
              }}
            >
              ← חזרה
            </button>
            <button className="btn-primary" disabled={selectedCount === 0} onClick={handleProceed}>
              המשך למשימות ←
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default VendorsPage;







