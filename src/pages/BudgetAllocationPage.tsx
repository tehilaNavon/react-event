// // src/pages/BudgetAllocationPage.tsx
// import { useState, useEffect, useCallback } from "react";
// import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";
// import { type EventDtoo } from "../types/event";
// import { type category } from "../types/category";
// import { getCategories } from "../services/categoryService";

// // ── Helper: fetch min/max price per category from vendors ──
// // Replace these with your actual service calls, e.g. getVendorPriceRange(categoryID)
// // Expected return: { min: number; max: number }
// const getCategoryPriceRange = async (
//   _categoryID: number
// ): Promise<{ min: number; max: number }> => {
//   // TODO: replace with real API call
//   // e.g. return await getVendorPriceRange(categoryID);
//   return { min: 5000, max: 80000 };
// };

// // ── Types ─────────────────────────────────────────────────
// export interface CategoryAllocation {
//   categoryID: number;
//   categoryName: string;
//   amount: number;        // absolute ₪ value
//   min: number;
//   max: number;
//   locked: boolean;
//   removed: boolean;
// }

// interface Props {
//   event: EventDtoo;
//   onBack: () => void;
//   onProceed: (allocations: CategoryAllocation[]) => void;
// }

// // ── Styles ────────────────────────────────────────────────
// const pageStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

//   html, body, #root {
//     width: 100% !important;
//     max-width: 100% !important;
//     margin: 0 !important;
//     padding: 0 !important;
//     overflow-x: hidden;
//   }

//   .budget-page {
//     width: 100%;
//     min-height: 100vh;
//     background: ${BLACK};
//     font-family: 'Montserrat', sans-serif;
//     position: relative;
//     overflow-x: hidden;
//   }

//   /* ── Background ── */
//   .budget-bg {
//     position: fixed; inset: 0; pointer-events: none; z-index: 0;
//     background-image:
//       repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px),
//       repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px);
//   }

//   /* ── Header ── */
//   .budget-header {
//     position: relative; z-index: 2;
//     padding: 32px 48px 28px;
//     border-bottom: 1px solid rgba(201,168,76,0.15);
//     display: flex; align-items: center; justify-content: space-between;
//     background: rgba(10,10,10,0.95);
//     backdrop-filter: blur(12px);
//   }

//   .budget-header-left { display: flex; align-items: center; gap: 20px; }

//   .header-logo-icon {
//     width: 40px; height: 40px;
//     border: 1px solid ${GOLD};
//     display: flex; align-items: center; justify-content: center;
//     transform: rotate(45deg); flex-shrink: 0;
//   }

//   .header-logo-inner { transform: rotate(-45deg); color: ${GOLD}; font-size: 16px; }

//   .header-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 26px; font-weight: 300;
//     color: ${WHITE}; letter-spacing: 4px; text-transform: uppercase;
//   }

//   .header-subtitle {
//     font-size: 10px; letter-spacing: 4px;
//     color: ${GOLD}; text-transform: uppercase; margin-top: 2px;
//   }

//   .btn-back {
//     padding: 12px 24px;
//     background: transparent;
//     border: 1px solid rgba(201,168,76,0.3); color: ${GRAY};
//     font-family: 'Montserrat', sans-serif;
//     font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
//     cursor: pointer; transition: all 0.3s;
//   }

//   .btn-back:hover { border-color: ${GOLD}; color: ${GOLD}; }

//   /* ── Content ── */
//   .budget-content {
//     position: relative; z-index: 1;
//     padding: 48px;
//     max-width: 1100px;
//     margin: 0 auto;
//   }

//   /* ── Event Summary Bar ── */
//   .event-summary {
//     background: ${CARD};
//     border: 1px solid rgba(201,168,76,0.2);
//     padding: 28px 36px;
//     margin-bottom: 40px;
//     position: relative;
//     animation: fadeUp 0.5s ease forwards;
//   }

//   .event-summary::before {
//     content: '';
//     position: absolute; top: 0; left: 0; right: 0; height: 3px;
//     background: linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent);
//   }

//   .event-summary-inner {
//     display: flex; align-items: center;
//     justify-content: space-between; flex-wrap: wrap; gap: 24px;
//   }

//   .event-summary-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 28px; font-weight: 300;
//     color: ${WHITE}; letter-spacing: 2px;
//   }

//   .event-summary-badge {
//     font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
//     color: ${GOLD}; border: 1px solid rgba(201,168,76,0.3);
//     padding: 4px 12px; margin-bottom: 8px; display: inline-block;
//   }

//   .summary-stats { display: flex; gap: 40px; flex-wrap: wrap; }

//   .summary-stat { text-align: center; }

//   .summary-stat-val {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 26px; color: ${GOLD}; font-weight: 300;
//   }

//   .summary-stat-lbl {
//     font-size: 9px; letter-spacing: 3px; color: ${GRAY};
//     text-transform: uppercase; margin-top: 4px;
//   }

//   /* ── Section Title ── */
//   .section-title {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 14px; font-weight: 400;
//     color: ${GOLD}; letter-spacing: 6px; text-transform: uppercase;
//     margin-bottom: 32px;
//     display: flex; align-items: center; gap: 16px;
//   }

//   .section-title::after {
//     content: ''; flex: 1; height: 1px;
//     background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent);
//   }

//   /* ── Budget Overview Bar ── */
//   .overview-bar {
//     background: rgba(255,255,255,0.02);
//     border: 1px solid rgba(201,168,76,0.1);
//     padding: 20px 28px;
//     margin-bottom: 32px;
//     display: flex; align-items: center;
//     justify-content: space-between; flex-wrap: wrap; gap: 16px;
//   }

//   .overview-bar-left { display: flex; gap: 40px; flex-wrap: wrap; }

//   .overview-item {}

//   .overview-lbl {
//     font-size: 9px; letter-spacing: 3px; color: ${GRAY};
//     text-transform: uppercase; margin-bottom: 4px;
//   }

//   .overview-val {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 22px; font-weight: 300;
//   }

//   .overview-val.gold { color: ${GOLD}; }
//   .overview-val.green { color: #6fcf7f; }
//   .overview-val.red { color: #e07070; }

//   /* ── Progress Bar ── */
//   .progress-track {
//     height: 2px;
//     background: rgba(201,168,76,0.1);
//     margin-bottom: 32px;
//     position: relative;
//     overflow: hidden;
//   }

//   .progress-fill {
//     height: 100%;
//     background: linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
//     transition: width 0.4s ease;
//     max-width: 100%;
//   }

//   /* ── Category Cards ── */
//   .categories-list {
//     display: flex; flex-direction: column; gap: 16px;
//   }

//   .cat-card {
//     background: ${CARD};
//     border: 1px solid rgba(201,168,76,0.12);
//     padding: 28px 32px;
//     position: relative;
//     transition: border-color 0.3s, box-shadow 0.3s;
//     animation: fadeUp 0.4s ease forwards;
//     opacity: 0;
//   }

//   .cat-card:hover { border-color: rgba(201,168,76,0.28); }

//   .cat-card.locked {
//     border-color: rgba(201,168,76,0.3);
//     background: rgba(201,168,76,0.04);
//   }

//   .cat-card.removed {
//     opacity: 0.35 !important;
//     pointer-events: none;
//     border-color: rgba(255,255,255,0.05);
//   }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(14px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .cat-card-header {
//     display: flex; align-items: center;
//     justify-content: space-between; margin-bottom: 20px;
//   }

//   .cat-name-group { display: flex; align-items: center; gap: 16px; }

//   .cat-name {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 20px; font-weight: 300;
//     color: ${WHITE}; letter-spacing: 1px;
//   }

//   .cat-locked-badge {
//     font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
//     color: ${GOLD}; border: 1px solid rgba(201,168,76,0.4);
//     padding: 2px 8px;
//   }

//   .cat-removed-badge {
//     font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
//     color: ${GRAY}; border: 1px solid rgba(255,255,255,0.1);
//     padding: 2px 8px;
//   }

//   .cat-actions { display: flex; gap: 8px; align-items: center; }

//   /* ── Icon Buttons ── */
//   .icon-btn {
//     width: 34px; height: 34px;
//     background: transparent;
//     border: 1px solid rgba(201,168,76,0.15);
//     cursor: pointer;
//     display: flex; align-items: center; justify-content: center;
//     transition: all 0.25s;
//     font-size: 14px;
//     color: ${GRAY};
//     position: relative;
//     flex-shrink: 0;
//   }

//   .icon-btn:hover {
//     border-color: rgba(201,168,76,0.5);
//     color: ${GOLD};
//   }

//   .icon-btn.lock-btn.is-locked {
//     border-color: ${GOLD};
//     background: rgba(201,168,76,0.1);
//     color: ${GOLD};
//   }

//   .icon-btn.remove-btn:hover {
//     border-color: rgba(224,112,112,0.5);
//     color: #e07070;
//   }

//   .icon-btn.remove-btn.is-removed {
//     border-color: rgba(224,112,112,0.3);
//     color: #e07070;
//   }

//   /* Tooltip */
//   .icon-btn[data-tip]:hover::after {
//     content: attr(data-tip);
//     position: absolute; bottom: calc(100% + 8px); left: 50%;
//     transform: translateX(-50%);
//     font-family: 'Montserrat', sans-serif;
//     font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
//     color: ${BLACK}; background: ${GOLD};
//     padding: 4px 10px; white-space: nowrap;
//     pointer-events: none; z-index: 10;
//   }

//   /* ── Slider Area ── */
//   .slider-area {
//     display: flex; align-items: center; gap: 16px;
//     margin-bottom: 12px;
//   }

//   .cat-range-min {
//     font-size: 10px; letter-spacing: 1px; color: ${GRAY};
//     white-space: nowrap; min-width: 52px; text-align: right;
//   }

//   .cat-range-max {
//     font-size: 10px; letter-spacing: 1px; color: ${GRAY};
//     white-space: nowrap; min-width: 52px; text-align: left;
//   }

//   .slider-wrap { flex: 1; position: relative; }

//   .budget-slider {
//     width: 100%;
//     -webkit-appearance: none; appearance: none;
//     height: 3px;
//     background: rgba(201,168,76,0.15);
//     outline: none; cursor: pointer;
//     border-radius: 0;
//   }

//   .budget-slider::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     width: 20px; height: 20px;
//     border-radius: 50%;
//     background: ${GOLD};
//     cursor: pointer;
//     border: 2px solid ${BLACK};
//     box-shadow: 0 0 10px rgba(201,168,76,0.5);
//     transition: transform 0.15s;
//   }

//   .budget-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
//   .budget-slider:disabled { opacity: 0.4; cursor: not-allowed; }
//   .budget-slider:disabled::-webkit-slider-thumb { cursor: not-allowed; }

//   /* filled track via gradient */
//   .budget-slider.filled {
//     background: linear-gradient(
//       90deg,
//       ${GOLD} var(--fill),
//       rgba(201,168,76,0.12) var(--fill)
//     );
//   }

//   /* ── Amount Display ── */
//   .cat-amounts {
//     display: flex; align-items: baseline;
//     justify-content: space-between; gap: 12px;
//     flex-wrap: wrap;
//   }

//   .cat-amount-main {
//     font-family: 'Cormorant Garamond', serif;
//     font-size: 26px; font-weight: 300; color: ${GOLD};
//   }

//   .cat-amount-pct {
//     font-size: 10px; letter-spacing: 2px; color: ${GRAY};
//   }

//   .cat-amount-range {
//     font-size: 10px; letter-spacing: 1px; color: rgba(201,168,76,0.4);
//     margin-right: auto;
//   }

//   /* ── Actions Footer ── */
//   .budget-actions {
//     display: flex; gap: 16px;
//     margin-top: 48px; justify-content: flex-end; flex-wrap: wrap;
//   }

//   .btn-primary {
//     padding: 14px 40px;
//     background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
//     border: none; color: ${BLACK};
//     font-family: 'Montserrat', sans-serif;
//     font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;
//     cursor: pointer; transition: opacity 0.3s, transform 0.2s;
//   }

//   .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

//   .btn-secondary {
//     padding: 14px 32px;
//     background: transparent;
//     border: 1px solid rgba(201,168,76,0.3); color: ${GRAY};
//     font-family: 'Montserrat', sans-serif;
//     font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
//     cursor: pointer; transition: all 0.3s;
//   }

//   .btn-secondary:hover { border-color: ${GOLD}; color: ${GOLD}; }

//   /* ── Loading ── */
//   .loading-spinner {
//     width: 32px; height: 32px;
//     border: 2px solid rgba(201,168,76,0.1);
//     border-top-color: ${GOLD};
//     border-radius: 50%;
//     animation: spin 0.8s linear infinite;
//     margin: 60px auto;
//   }

//   @keyframes spin { to { transform: rotate(360deg); } }

//   /* ── Responsive ── */
//   @media (max-width: 768px) {
//     .budget-header { padding: 20px; flex-wrap: wrap; gap: 16px; }
//     .budget-content { padding: 28px 16px; }
//     .cat-card { padding: 20px; }
//     .budget-actions { flex-direction: column; }
//     .event-summary { padding: 20px; }
//     .overview-bar-left { gap: 24px; }
//   }
// `;

// // ── Helpers ───────────────────────────────────────────────
// const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

// const LockIcon = ({ locked }: { locked: boolean }) =>
//   locked ? (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M12 1C9.24 1 7 3.24 7 6v2H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-2V6c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v2H9V6c0-1.66 1.34-3 3-3zm0 10a2 2 0 110 4 2 2 0 010-4z" />
//     </svg>
//   ) : (
//     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
//       <path d="M18 1C15.24 1 13 3.24 13 6v2H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-2V6c0-1.66 1.34-3 3-3s3 1.34 3 3v1h2V6c0-2.76-2.24-5-5-5zm-6 11a2 2 0 110 4 2 2 0 010-4z" />
//     </svg>
//   );

// const XIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
//   </svg>
// );

// // ── Component ─────────────────────────────────────────────
// const BudgetAllocationPage = ({ event, onBack, onProceed }: Props) => {
//   const [allocations, setAllocations] = useState<CategoryAllocation[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ── Load categories + price ranges ──
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const cats: category[] = await getCategories();
//         const withRanges = await Promise.all(
//           cats.map(async (c) => {
//             const { min, max } = await getCategoryPriceRange(c.categoryID);
//             return {
//               categoryID: c.categoryID,
//               categoryName: c.categoryName,
//               amount: min,   // default to minimum
//               min,
//               max,
//               locked: false,
//               removed: false,
//             } as CategoryAllocation;
//           })
//         );
//         setAllocations(withRanges);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   // ── Derived totals ──
//   const activeAllocations = allocations.filter((a) => !a.removed);
//   const totalAllocated = activeAllocations.reduce((s, a) => s + a.amount, 0);
//   const remaining = event.totalBudget - totalAllocated;
//   const progressPct = Math.min(100, (totalAllocated / event.totalBudget) * 100);

//   // ── Handlers ──
//   const setAmount = useCallback((id: number, value: number) => {
//     setAllocations((prev) =>
//       prev.map((a) => (a.categoryID === id && !a.locked ? { ...a, amount: value } : a))
//     );
//   }, []);

//   const toggleLock = useCallback((id: number) => {
//     setAllocations((prev) =>
//       prev.map((a) => (a.categoryID === id ? { ...a, locked: !a.locked } : a))
//     );
//   }, []);

//   const toggleRemove = useCallback((id: number) => {
//     setAllocations((prev) =>
//       prev.map((a) =>
//         a.categoryID === id
//           ? { ...a, removed: !a.removed, locked: false, amount: a.removed ? a.min : a.amount }
//           : a
//       )
//     );
//   }, []);

//   // ── Fill % for slider track ──
//   const fillPct = (a: CategoryAllocation) => {
//     const range = a.max - a.min;
//     if (range === 0) return 0;
//     return (((a.amount - a.min) / range) * 100).toFixed(1);
//   };

//   return (
//     <>
//       <style>{pageStyles}</style>
//       <div className="budget-page" dir="rtl">
//         <div className="budget-bg" />

//         {/* ── Header ── */}
//         <header className="budget-header">
//           <div className="budget-header-left">
//             <div className="header-logo-icon">
//               <span className="header-logo-inner">✦</span>
//             </div>
//             <div>
//               <div className="header-title">Élite</div>
//               <div className="header-subtitle">הקצאת תקציב</div>
//             </div>
//           </div>
//           <button className="btn-back" onClick={onBack}>← חזרה לאירוע</button>
//         </header>

//         <main className="budget-content">
//           {/* ── Event Summary ── */}
//           <div className="event-summary">
//             <div className="event-summary-inner">
//               <div>
//                 <div className="event-summary-badge">אירוע</div>
//                 <div className="event-summary-name">{event.eventName}</div>
//               </div>
//               <div className="summary-stats">
//                 <div className="summary-stat">
//                   <div className="summary-stat-val">₪{event.totalBudget.toLocaleString()}</div>
//                   <div className="summary-stat-lbl">תקציב כולל</div>
//                 </div>
//                 <div className="summary-stat">
//                   <div className="summary-stat-val">{event.guestCount}</div>
//                   <div className="summary-stat-lbl">אורחים</div>
//                 </div>
//                 <div className="summary-stat">
//                   <div className="summary-stat-val">
//                     {new Date(event.eventDate).toLocaleDateString("he-IL", {
//                       day: "2-digit",
//                       month: "short",
//                     })}
//                   </div>
//                   <div className="summary-stat-lbl">תאריך</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Overview Bar ── */}
//           <div className="overview-bar">
//             <div className="overview-bar-left">
//               <div className="overview-item">
//                 <div className="overview-lbl">מוקצה</div>
//                 <div className="overview-val gold">₪{fmt(totalAllocated)}</div>
//               </div>
//               <div className="overview-item">
//                 <div className="overview-lbl">{remaining >= 0 ? "נותר" : "חריגה"}</div>
//                 <div className={`overview-val ${remaining >= 0 ? "green" : "red"}`}>
//                   ₪{fmt(Math.abs(remaining))}
//                 </div>
//               </div>
//               <div className="overview-item">
//                 <div className="overview-lbl">אחוז ניצול</div>
//                 <div className={`overview-val ${progressPct > 100 ? "red" : "gold"}`}>
//                   {progressPct.toFixed(0)}%
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Progress Track ── */}
//           <div className="progress-track">
//             <div
//               className="progress-fill"
//               style={{ width: `${progressPct}%` }}
//             />
//           </div>

//           {/* ── Section Title ── */}
//           <div className="section-title">בחירת תקציב לפי קטגוריה</div>

//           {/* ── Category Cards ── */}
//           {loading ? (
//             <div className="loading-spinner" />
//           ) : (
//             <div className="categories-list">
//               {allocations.map((a, i) => (
//                 <div
//                   key={a.categoryID}
//                   className={`cat-card${a.locked ? " locked" : ""}${a.removed ? " removed" : ""}`}
//                   style={{ animationDelay: `${i * 0.06}s` }}
//                 >
//                   {/* ── Card Header ── */}
//                   <div className="cat-card-header">
//                     <div className="cat-name-group">
//                       <div className="cat-name">{a.categoryName}</div>
//                       {a.locked && <div className="cat-locked-badge">נעול</div>}
//                       {a.removed && <div className="cat-removed-badge">הוסר</div>}
//                     </div>

//                     <div className="cat-actions">
//                       {/* Lock button */}
//                       <button
//                         className={`icon-btn lock-btn${a.locked ? " is-locked" : ""}`}
//                         onClick={() => toggleLock(a.categoryID)}
//                         data-tip={a.locked ? "שחרר נעילה" : "נעל ערך"}
//                         title={a.locked ? "שחרר נעילה" : "נעל ערך"}
//                       >
//                         <LockIcon locked={a.locked} />
//                       </button>

//                       {/* Remove / Restore button */}
//                       <button
//                         className={`icon-btn remove-btn${a.removed ? " is-removed" : ""}`}
//                         onClick={() => toggleRemove(a.categoryID)}
//                         data-tip={a.removed ? "שחזר" : "הסר קטגוריה"}
//                         title={a.removed ? "שחזר" : "הסר קטגוריה"}
//                       >
//                         {a.removed ? (
//                           // Undo icon
//                           <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
//                           </svg>
//                         ) : (
//                           <XIcon />
//                         )}
//                       </button>
//                     </div>
//                   </div>

//                   {/* ── Slider ── */}
//                   <div className="slider-area">
//                     <div className="cat-range-min">₪{fmt(a.min)}</div>
//                     <div className="slider-wrap">
//                       <input
//                         type="range"
//                         className="budget-slider filled"
//                         style={{ "--fill": `${fillPct(a)}%` } as React.CSSProperties}
//                         min={a.min}
//                         max={a.max}
//                         step={Math.max(100, Math.round((a.max - a.min) / 200) * 100)}
//                         value={a.amount}
//                         disabled={a.locked || a.removed}
//                         onChange={(e) => setAmount(a.categoryID, Number(e.target.value))}
//                       />
//                     </div>
//                     <div className="cat-range-max">₪{fmt(a.max)}</div>
//                   </div>

//                   {/* ── Amounts ── */}
//                   <div className="cat-amounts">
//                     <div className="cat-amount-main">₪{fmt(a.amount)}</div>
//                     <div className="cat-amount-range">
//                       טווח: ₪{fmt(a.min)} — ₪{fmt(a.max)}
//                     </div>
//                     <div className="cat-amount-pct">
//                       {event.totalBudget > 0
//                         ? `${((a.amount / event.totalBudget) * 100).toFixed(1)}% מהתקציב`
//                         : ""}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ── Footer Actions ── */}
//           <div className="budget-actions">
//             <button className="btn-secondary" onClick={onBack}>ביטול</button>
//             <button
//               className="btn-primary"
//               onClick={() => onProceed(allocations.filter((a) => !a.removed))}
//             >
//               המשך לבחירת ספקים ←
//             </button>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default BudgetAllocationPage;
// src/pages/BudgetAllocationPage.tsx
