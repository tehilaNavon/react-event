// // import { useState } from "react";
// // import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";
// // import { type EventDtoo } from "../types/event";

// // const pageStyles = `
// // html, body, #root {
// //   width: 100% !important; max-width: 100% !important;
// //   margin: 0 !important; padding: 0 !important; overflow-x: hidden;
// // }
// //   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
// //   .detail-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden;}
// //   .detail-bg-pattern{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0;}
// //   .detail-header{position:relative;z-index:2;padding:32px 48px 28px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);}
// //   .detail-header-left{display:flex;align-items:center;gap:20px;}
// //   .header-logo-icon{width:40px;height:40px;border:1px solid ${GOLD};display:flex;align-items:center;justify-content:center;transform:rotate(45deg);flex-shrink:0;}
// //   .header-logo-inner{transform:rotate(-45deg);color:${GOLD};font-size:16px;}
// //   .header-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:${WHITE};letter-spacing:4px;text-transform:uppercase;}
// //   .header-subtitle{font-size:10px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-top:2px;}
// //   .btn-back{padding:12px 24px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
// //   .btn-back:hover{border-color:${GOLD};color:${GOLD};}
// //   .detail-content{position:relative;z-index:1;padding:48px;max-width:1200px;margin:0 auto;}
// //   .section-title{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:${GOLD};letter-spacing:6px;text-transform:uppercase;margin-bottom:32px;display:flex;align-items:center;gap:16px;}
// //   .section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent);}
// //   .event-hero{background:${CARD};border:1px solid rgba(201,168,76,0.2);padding:40px;margin-bottom:48px;position:relative;animation:fadeUp 0.5s ease forwards;}
// //   .event-hero::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,${GOLD},${GOLD_LIGHT},${GOLD},transparent);}
// //   .event-hero-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;gap:24px;flex-wrap:wrap;}
// //   .event-type-badge{display:inline-block;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};border:1px solid rgba(201,168,76,0.3);padding:4px 12px;margin-bottom:12px;}
// //   .event-hero-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:${WHITE};letter-spacing:2px;line-height:1.2;}
// //   .event-hero-stats{display:flex;gap:40px;flex-wrap:wrap;}
// //   .stat-item{text-align:center;}
// //   .stat-value{font-family:'Cormorant Garamond',serif;font-size:28px;color:${GOLD};font-weight:300;}
// //   .stat-label{font-size:9px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;margin-top:4px;}
// //   .budget-total-bar{background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.1);padding:20px 28px;margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
// //   .budget-total-label{font-size:10px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;}
// //   .budget-total-value{font-family:'Cormorant Garamond',serif;font-size:24px;color:${GOLD};font-weight:300;}
// //   .budget-remaining{font-size:11px;letter-spacing:1px;}
// //   .budget-remaining.ok{color:#6fcf7f;}
// //   .budget-remaining.over{color:#e07070;}
// //   .categories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}
// //   .category-card{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:28px;transition:border-color 0.3s;animation:fadeUp 0.4s ease forwards;opacity:0;}
// //   .category-card:hover{border-color:rgba(201,168,76,0.3);}
// //   @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
// //   .category-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:${WHITE};letter-spacing:1px;margin-bottom:4px;}
// //   .planned-amount{font-size:10px;letter-spacing:1px;color:rgba(201,168,76,0.5);margin-bottom:16px;}
// //   .slider-row{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
// //   .budget-slider{flex:1;-webkit-appearance:none;appearance:none;height:2px;background:rgba(201,168,76,0.15);outline:none;cursor:pointer;}
// //   .budget-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${GOLD};cursor:pointer;border:2px solid ${BLACK};box-shadow:0 0 8px rgba(201,168,76,0.4);}
// //   .slider-pct{font-family:'Cormorant Garamond',serif;font-size:20px;color:${GOLD};font-weight:300;min-width:44px;text-align:right;}
// //   .category-amount{font-size:11px;color:${GRAY};letter-spacing:1px;}
// //   .category-amount span{color:${GOLD_LIGHT};}
// //   .detail-actions{display:flex;gap:16px;margin-top:48px;justify-content:flex-end;flex-wrap:wrap;}
// //   .btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;}
// //   .btn-primary:hover{opacity:0.9;transform:translateY(-1px);}
// //   .btn-secondary{padding:14px 32px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
// //   .btn-secondary:hover{border-color:${GOLD};color:${GOLD};}
// //   @media(max-width:768px){.detail-header{padding:20px;flex-wrap:wrap;gap:16px;}.detail-content{padding:28px 16px;}.event-hero{padding:24px;}.categories-grid{grid-template-columns:1fr;}.detail-actions{flex-direction:column;}}
// // `;

// // export interface CategoryBudget {
// //   categoryID: number;
// //   categoryName: string;
// //   plannedAmount: number;
// //   pct: number;
// // }

// // interface Props {
// //   event: EventDtoo;
// //   onBack: () => void;
// //   onProceedToVendors: (budgets: CategoryBudget[]) => void;
// // }

// // const EventDetailPage = ({ event, onBack, onProceedToVendors }: Props) => {

// //   // ✅ בנה רשימה ישירות מ-event.budgetItems — לא מ-getCategories!
// //   const [budgets, setBudgets] = useState<CategoryBudget[]>(() =>
// //     (event.budgetItems ?? []).map((item) => ({
// //       categoryID: item.CategoryID,
// //       categoryName: item.allCategory?.categoryName ?? `קטגוריה ${item.CategoryID}`,
// //       plannedAmount: item.PlannedAmount,
// //       // חשב אחוז לפי plannedAmount מתוך התקציב הכולל
// //       pct: event.totalBudget > 0
// //         ? Math.round((item.PlannedAmount / event.totalBudget) * 100)
// //         : 0,
// //     }))
// //   );

// //   const totalPct = budgets.reduce((s, b) => s + b.pct, 0);
// //   const remaining = event.totalBudget - (event.totalBudget * totalPct) / 100.0;

// //   const setPct = (id: number, pct: number) =>
// //     setBudgets((p) => p.map((b) => (b.categoryID === id ? { ...b, pct } : b)));

// //   const getAmount = (pct: number) =>
// //     Math.round((event.totalBudget * pct) / 100).toLocaleString("he-IL");

// //   return (
// //     <>
// //       <style>{pageStyles}</style>
// //       <div className="detail-page" dir="rtl">
// //         <div className="detail-bg-pattern" />
// //         <header className="detail-header">
// //           <div className="detail-header-left">
// //             <div className="header-logo-icon"><span className="header-logo-inner">✦</span></div>
// //             <div>
// //               <div className="header-title">Élite</div>
// //               <div className="header-subtitle">תכנון אירוע</div>
// //             </div>
// //           </div>
// //           <button className="btn-back" onClick={onBack}>← חזרה לאירועים</button>
// //         </header>

// //         <main className="detail-content">
// //           <div className="event-hero">
// //             <div className="event-hero-top">
// //               <div>
// //                 <div className="event-type-badge">אירוע</div>
// //                 <div className="event-hero-name">{event.eventName}</div>
// //               </div>
// //               <div className="event-hero-stats">
// //                 <div className="stat-item">
// //                   <div className="stat-value">₪{event.totalBudget.toLocaleString()}</div>
// //                   <div className="stat-label">תקציב כולל</div>
// //                 </div>
// //                 <div className="stat-item">
// //                   <div className="stat-value">{event.guestCount}</div>
// //                   <div className="stat-label">אורחים</div>
// //                 </div>
// //                 <div className="stat-item">
// //                   <div className="stat-value">
// //                     {new Date(event.eventDate).toLocaleDateString("he-IL", { day: "2-digit", month: "short" })}
// //                   </div>
// //                   <div className="stat-label">תאריך</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="section-title">חלוקת תקציב</div>

// //           <div className="budget-total-bar">
// //             <div>
// //               <div className="budget-total-label">סה"כ מוקצה</div>
// //               <div className="budget-total-value">{totalPct}%</div>
// //             </div>
// //             <div className={`budget-remaining ${remaining >= 0 ? "ok" : "over"}`}>
// //               {remaining >= 0
// //                 ? `נותר: ₪${remaining.toLocaleString("he-IL")}`
// //                 : `חריגה: ₪${Math.abs(remaining).toLocaleString("he-IL")}`}
// //             </div>
// //           </div>

// //           {budgets.length === 0 ? (
// //             <p style={{ color: GRAY, fontSize: 12, letterSpacing: 2 }}>אין פריטי תקציב לאירוע זה</p>
// //           ) : (
// //             <div className="categories-grid">
// //               {budgets.map((b, i) => (
// //                 <div
// //                   className="category-card"
// //                   key={b.categoryID}
// //                   style={{ animationDelay: `${i * 0.07}s` }}
// //                 >
// //                   <div className="category-name">{b.categoryName}</div>
// //                   <div className="planned-amount">מתוכנן: ₪{b.plannedAmount.toLocaleString("he-IL")}</div>
// //                   <div className="slider-row">
// //                     <input
// //                       type="range"
// //                       className="budget-slider"
// //                       min={0} max={100} step={1}
// //                       value={b.pct}
// //                       onChange={(e) => setPct(b.categoryID, Number(e.target.value))}
// //                     />
// //                     <div className="slider-pct">{b.pct}%</div>
// //                   </div>
// //                   <div className="category-amount">
// //                     סכום: <span>₪{getAmount(b.pct)}</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           <div className="detail-actions">
// //             <button className="btn-secondary" onClick={onBack}>ביטול</button>
// //             <button className="btn-primary" onClick={() => onProceedToVendors(budgets)}>
// //               המשך לבחירת ספקים ←
// //             </button>
// //           </div>
// //         </main>
// //       </div>
// //     </>
// //   );
// // };

// // export default EventDetailPage;
// // src/pages/EventDetailPage.tsx
// // src/pages/EventDetailPage.tsx
// // import { useState, useEffect } from "react";
// // import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";
// // import { type EventDtoo } from "../types/event";
// // import { authFetch } from "../services/authService";

const pageStyles = `
html, body, #root {
  width: 100% !important; max-width: 100% !important;
  margin: 0 !important; padding: 0 !important; overflow-x: hidden;
}
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
.detail-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden;}
.detail-bg-pattern{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0;}
.detail-header{position:sticky;top:0;z-index:100;padding:24px 48px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.97);backdrop-filter:blur(16px);}
.detail-header-left{display:flex;align-items:center;gap:20px;}
.header-logo-icon{width:40px;height:40px;border:1px solid ${GOLD};display:flex;align-items:center;justify-content:center;transform:rotate(45deg);flex-shrink:0;}
.header-logo-inner{transform:rotate(-45deg);color:${GOLD};font-size:16px;}
.header-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:${WHITE};letter-spacing:4px;text-transform:uppercase;}
.header-subtitle{font-size:10px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-top:2px;}
.btn-back{padding:12px 24px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
.btn-back:hover{border-color:${GOLD};color:${GOLD};}
.detail-content{position:relative;z-index:1;padding:48px;max-width:1200px;margin:0 auto;}
.section-title{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:${GOLD};letter-spacing:6px;text-transform:uppercase;margin-bottom:32px;display:flex;align-items:center;gap:16px;}
.section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent);}
.event-hero{background:${CARD};border:1px solid rgba(201,168,76,0.2);padding:40px;margin-bottom:48px;position:relative;animation:fadeUp 0.5s ease forwards;}
.event-hero::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,${GOLD},${GOLD_LIGHT},${GOLD},transparent);}
.event-hero-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;gap:24px;flex-wrap:wrap;}
.event-type-badge{display:inline-block;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};border:1px solid rgba(201,168,76,0.3);padding:4px 12px;margin-bottom:12px;}
.event-hero-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:${WHITE};letter-spacing:2px;line-height:1.2;}
.event-hero-stats{display:flex;gap:40px;flex-wrap:wrap;}
.stat-item{text-align:center;}
.stat-value{font-family:'Cormorant Garamond',serif;font-size:28px;color:${GOLD};font-weight:300;}
.stat-label{font-size:9px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;margin-top:4px;}
.budget-total-bar{background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.1);padding:20px 28px;margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.budget-total-label{font-size:10px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;}
.budget-total-value{font-family:'Cormorant Garamond',serif;font-size:24px;color:${GOLD};font-weight:300;}
.budget-remaining{font-size:11px;letter-spacing:1px;}
.budget-remaining.ok{color:#6fcf7f;}
.budget-remaining.over{color:#e07070;}
.categories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
.category-card{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:24px 28px;transition:border-color 0.3s;animation:fadeUp 0.4s ease forwards;opacity:0;position:relative;}
.category-card:hover{border-color:rgba(201,168,76,0.3);}
.category-card.locked{border-color:rgba(201,168,76,0.35);background:rgba(201,168,76,0.03);}
.category-card.ignored{opacity:0.35 !important;pointer-events:none;border-color:rgba(255,255,255,0.05);}
.category-card.selected{border-color:${GOLD};}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
.category-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:${WHITE};letter-spacing:1px;}
.card-actions{display:flex;gap:6px;align-items:center;}
.action-btn{width:30px;height:30px;background:transparent;border:1px solid rgba(201,168,76,0.15);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;font-size:13px;color:${GRAY};flex-shrink:0;position:relative;}
.action-btn:hover{border-color:rgba(201,168,76,0.5);color:${GOLD};}
.action-btn.active-lock{border-color:${GOLD};background:rgba(201,168,76,0.1);color:${GOLD};}
.action-btn.active-ignore{border-color:rgba(224,112,112,0.4);color:#e07070;}
.action-btn.active-check{border-color:#6fcf7f;background:rgba(111,207,127,0.1);color:#6fcf7f;}
.action-btn[data-tip]:hover::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${BLACK};background:${GOLD};padding:3px 8px;white-space:nowrap;pointer-events:none;z-index:10;}
.planned-amount{font-size:10px;letter-spacing:1px;color:rgba(201,168,76,0.45);margin-bottom:18px;}
.slider-area{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
.range-label{font-size:10px;letter-spacing:1px;color:${GRAY};white-space:nowrap;min-width:56px;}
.range-label.min{text-align:right;}
.range-label.max{text-align:left;}
.slider-wrap{flex:1;}
.budget-slider{width:100%;-webkit-appearance:none;appearance:none;height:2px;outline:none;cursor:pointer;background:linear-gradient(90deg,${GOLD} var(--fill,0%),rgba(201,168,76,0.15) var(--fill,0%));}
.budget-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:${GOLD};cursor:pointer;border:2px solid ${BLACK};box-shadow:0 0 8px rgba(201,168,76,0.5);transition:transform 0.15s;}
.budget-slider::-webkit-slider-thumb:hover{transform:scale(1.15);}
.budget-slider:disabled{opacity:0.4;cursor:not-allowed;}
.card-amount-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;}
.card-amount-val{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;color:${GOLD};}
.card-amount-pct{font-size:10px;letter-spacing:2px;color:${GRAY};}
.status-badge{font-size:8px;letter-spacing:2px;text-transform:uppercase;padding:2px 8px;margin-top:10px;display:inline-block;}
.status-badge.locked{color:${GOLD};border:1px solid rgba(201,168,76,0.3);}
.status-badge.ignored{color:#e07070;border:1px solid rgba(224,112,112,0.3);}
.status-badge.selected{color:#6fcf7f;border:1px solid rgba(111,207,127,0.3);}
.range-loading{font-size:9px;letter-spacing:2px;color:rgba(201,168,76,0.3);text-transform:uppercase;margin:12px 0;}
.detail-actions{display:flex;gap:16px;margin-top:48px;justify-content:flex-end;flex-wrap:wrap;}
.btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;}
.btn-primary:hover{opacity:0.9;transform:translateY(-1px);}
.btn-secondary{padding:14px 32px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
.btn-secondary:hover{border-color:${GOLD};color:${GOLD};}
@media(max-width:768px){.detail-header{padding:20px;flex-wrap:wrap;gap:16px;}.detail-content{padding:28px 16px;}.event-hero{padding:24px;}.categories-grid{grid-template-columns:1fr;}.detail-actions{flex-direction:column;}}
`;

// // export interface CategoryBudget {
// //   categoryID: number;
// //   categoryName: string;
// //   plannedAmount: number;
// //   currentAmount: number;
// //   min: number;
// //   max: number;
// //   minLoading: boolean;
// //   locked: boolean;
// //   ignored: boolean;
// //   selected: boolean;
// // }

// // interface Props {
// //   event: EventDtoo;
// //   onBack: () => void;
// //   onProceedToVendors: (budgets: CategoryBudget[]) => void;
// // }

// // const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

// // const EventDetailPage = ({ event, onBack, onProceedToVendors }: Props) => {

// //   // ✅ תיקון 1: שמור את הנתונים הראשוניים ב-ref נפרד
// //   // כדי ש-useEffect לא יתבלבל עם ה-state המתעדכן
// //   const initialBudgets: CategoryBudget[] = (event.budgetItems ?? []).map((item) => ({
// //     categoryID: item.CategoryID,           // ✅ אות קטנה!
// //     categoryName: item.allCategory?.categoryName ?? `קטגוריה ${item.CategoryID}`,
// //     plannedAmount: item.PlannedAmount,     // ✅ אות קטנה!
// //     currentAmount: item.PlannedAmount,
// //     min: 0,
// //     max: item.PlannedAmount * 2,
// //     minLoading: true,
// //     locked: false,
// //     ignored: false,
// //     selected: false,
// //   }));

// //   const [budgets, setBudgets] = useState<CategoryBudget[]>(initialBudgets);

// //   // ✅ תיקון 2: useEffect רץ על initialBudgets ולא על budgets מה-state
// //   // כך כל קטגוריה מתעדכנת לבד לפי categoryID שלה
// //   useEffect(() => {
// //     initialBudgets.forEach((item) => {
// //       const categoryID = item.categoryID;

// //       Promise.all([
// //         authFetch(`/api/Vendor/minPrice/${categoryID}`).then((r) => r.json()),  // ✅ הוספנו /api/
// //         authFetch(`/api/Vendor/maxPrice/${categoryID}`).then((r) => r.json()),
// //       ])
// //         .then(([minVal, maxVal]) => {
// //           const min = Number(minVal) || 0;
// //           const max = Number(maxVal) || item.plannedAmount * 2;

// //           setBudgets((prev) =>
// //             prev.map((b) =>
// //               // ✅ תיקון 3: מעדכנים רק את הקטגוריה הספציפית לפי ID
// //               b.categoryID === categoryID
// //                 ? {
// //                     ...b,
// //                     min,
// //                     max,
// //                     currentAmount: Math.min(Math.max(b.plannedAmount, min), max),
// //                     minLoading: false,
// //                   }
// //                 : b
// //             )
// //           );
// //         })
// //         .catch(() => {
// //           // במקרה של שגיאה — רק הסר את ה-loading של הקטגוריה הזו
// //           setBudgets((prev) =>
// //             prev.map((b) =>
// //               b.categoryID === categoryID ? { ...b, minLoading: false } : b
// //             )
// //           );
// //         });
// //     });
// //   }, []); // ✅ [] — רץ פעם אחת בלבד

// //   const activeItems = budgets.filter((b) => !b.ignored);
// //   const totalAllocated = activeItems.reduce((s, b) => s + b.currentAmount, 0);
// //   const remaining = event.totalBudget - totalAllocated;
// //   const totalPct = event.totalBudget > 0 ? Math.round((totalAllocated / event.totalBudget) * 100) : 0;

// //   const setAmount = (id: number, val: number) =>
// //     setBudgets((p) => p.map((b) => b.categoryID === id && !b.locked ? { ...b, currentAmount: val } : b));

// //   const toggleLock   = (id: number) => setBudgets((p) => p.map((b) => b.categoryID === id ? { ...b, locked: !b.locked } : b));
// //   const toggleIgnore = (id: number) => setBudgets((p) => p.map((b) => b.categoryID === id ? { ...b, ignored: !b.ignored, locked: false } : b));
// //   const toggleSelect = (id: number) => setBudgets((p) => p.map((b) => b.categoryID === id ? { ...b, selected: !b.selected } : b));

// //   const fillPct = (b: CategoryBudget) => {
// //     const range = b.max - b.min;
// //     if (range <= 0) return 0;
// //     return Math.min(100, Math.max(0, ((b.currentAmount - b.min) / range) * 100));
// //   };

// //   return (
// //     <>
// //       <style>{pageStyles}</style>
// //       <div className="detail-page" dir="rtl">
// //         <div className="detail-bg-pattern" />

// //         <header className="detail-header">
// //           <div className="detail-header-left">
// //             <div className="header-logo-icon"><span className="header-logo-inner">✦</span></div>
// //             <div>
// //               <div className="header-title">Élite</div>
// //               <div className="header-subtitle">תכנון אירוע</div>
// //             </div>
// //           </div>
// //           <button className="btn-back" onClick={onBack}>← חזרה לאירועים</button>
// //         </header>

// //         <main className="detail-content">
// //           <div className="event-hero">
// //             <div className="event-hero-top">
// //               <div>
// //                 <div className="event-type-badge">אירוע</div>
// //                 <div className="event-hero-name">{event.eventName}</div>
// //               </div>
// //               <div className="event-hero-stats">
// //                 <div className="stat-item">
// //                   <div className="stat-value">₪{event.totalBudget.toLocaleString()}</div>
// //                   <div className="stat-label">תקציב כולל</div>
// //                 </div>
// //                 <div className="stat-item">
// //                   <div className="stat-value">{event.guestCount}</div>
// //                   <div className="stat-label">אורחים</div>
// //                 </div>
// //                 <div className="stat-item">
// //                   <div className="stat-value">
// //                     {new Date(event.eventDate).toLocaleDateString("he-IL", { day: "2-digit", month: "short" })}
// //                   </div>
// //                   <div className="stat-label">תאריך</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="section-title">חלוקת תקציב</div>

// //           <div className="budget-total-bar">
// //             <div>
// //               <div className="budget-total-label">סה"כ מוקצה</div>
// //               <div className="budget-total-value">{totalPct}%</div>
// //             </div>
// //             <div className={`budget-remaining ${remaining >= 0 ? "ok" : "over"}`}>
// //               {remaining >= 0
// //                 ? `נותר: ₪${fmt(remaining)}`
// //                 : `חריגה: ₪${fmt(Math.abs(remaining))}`}
// //             </div>
// //           </div>

// //           {budgets.length === 0 ? (
// //             <p style={{ color: GRAY, fontSize: 12, letterSpacing: 2 }}>אין פריטי תקציב לאירוע זה</p>
// //           ) : (
// //             <div className="categories-grid">
// //               {budgets.map((b, i) => (
// //                 <div
// //                   key={b.categoryID}
// //                   className={`category-card${b.locked ? " locked" : ""}${b.ignored ? " ignored" : ""}${b.selected ? " selected" : ""}`}
// //                   style={{ animationDelay: `${i * 0.07}s` }}
// //                 >
// //                   <div className="card-header">
// //                     <div className="category-name">{b.categoryName}</div>
// //                     <div className="card-actions">
// //                       <button
// //                         className={`action-btn${b.selected ? " active-check" : ""}`}
// //                         onClick={() => toggleSelect(b.categoryID)}
// //                         data-tip={b.selected ? "בטל בחירה" : "סמן כנבחר"}
// //                       >✓</button>
// //                       <button
// //                         className={`action-btn${b.locked ? " active-lock" : ""}`}
// //                         onClick={() => toggleLock(b.categoryID)}
// //                         data-tip={b.locked ? "שחרר נעילה" : "נעל ערך"}
// //                       >{b.locked ? "🔒" : "🔓"}</button>
// //                       <button
// //                         className={`action-btn${b.ignored ? " active-ignore" : ""}`}
// //                         onClick={() => toggleIgnore(b.categoryID)}
// //                         data-tip={b.ignored ? "שחזר" : "התעלם מקטגוריה"}
// //                       >✕</button>
// //                     </div>
// //                   </div>

// //                   {b.locked   && <div className="status-badge locked">נעול</div>}
// //                   {b.ignored  && <div className="status-badge ignored">מוסר</div>}
// //                   {b.selected && <div className="status-badge selected">נבחר ✓</div>}

// //                   <div className="planned-amount" style={{ marginTop: 8 }}>
// //                     מתוכנן: ₪{fmt(b.plannedAmount)}
// //                   </div>

// //                   {b.minLoading ? (
// //                     <div className="range-loading">טוען טווח...</div>
// //                   ) : (
// //                     <>
// //                       <div className="slider-area">
// //                         <div className="range-label min">₪{fmt(b.min)}</div>
// //                         <div className="slider-wrap">
// //                           <input
// //                             type="range"
// //                             className="budget-slider"
// //                             style={{ "--fill": `${fillPct(b)}%` } as React.CSSProperties}
// //                             min={b.min}
// //                             max={b.max}
// //                             step={Math.max(100, Math.round((b.max - b.min) / 200) * 100)}
// //                             value={b.currentAmount}
// //                             disabled={b.locked || b.ignored}
// //                             onChange={(e) => setAmount(b.categoryID, Number(e.target.value))}
// //                           />
// //                         </div>
// //                         <div className="range-label max">₪{fmt(b.max)}</div>
// //                       </div>

// //                       <div className="card-amount-row">
// //                         <div className="card-amount-val">₪{fmt(b.currentAmount)}</div>
// //                         <div className="card-amount-pct">
// //                           {event.totalBudget > 0
// //                             ? `${((b.currentAmount / event.totalBudget) * 100).toFixed(1)}% מהתקציב`
// //                             : ""}
// //                         </div>
// //                       </div>
// //                     </>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           <div className="detail-actions">
// //             <button className="btn-secondary" onClick={onBack}>ביטול</button>
// //             <button
// //               className="btn-primary"
// //               onClick={() => onProceedToVendors(budgets.filter((b) => !b.ignored))}
// //             >
// //               המשך לבחירת ספקים ←
// //             </button>
// //           </div>
// //         </main>
// //       </div>
// //     </>
// //   );
// // };

// // export default EventDetailPage;



// // src/pages/EventDetailPage.tsx
// import { useState, useEffect, useRef, useMemo } from "react";
// import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";
// import { type EventDtoo } from "../types/event";
// import { authFetch } from "../services/authService";

// const pageStyles = `
// .card-amount-val {
//   font-family: 'Cormorant Garamond', serif;
//   font-size: 20px;
//   font-weight: 300;
//   color: ${GOLD};
//   transition: all 0.2s ease-out; /* כאן קורה הקסם */
//   transform: translateY(0);
// }

// .card-amount-val.updating {
//   color: ${WHITE};
//   transform: translateY(-2px);
// }
// html, body, #root {
//   width: 100% !important; max-width: 100% !important;
//   margin: 0 !important; padding: 0 !important; overflow-x: hidden;
// }
// @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
// .detail-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden;}
// .detail-bg-pattern{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0;}
// .detail-header{position:sticky;top:0;z-index:100;padding:24px 48px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.97);backdrop-filter:blur(16px);}
// .detail-header-left{display:flex;align-items:center;gap:20px;}
// .header-logo-icon{width:40px;height:40px;border:1px solid ${GOLD};display:flex;align-items:center;justify-content:center;transform:rotate(45deg);flex-shrink:0;}
// .header-logo-inner{transform:rotate(-45deg);color:${GOLD};font-size:16px;}
// .header-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:${WHITE};letter-spacing:4px;text-transform:uppercase;}
// .header-subtitle{font-size:10px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-top:2px;}
// .btn-back{padding:12px 24px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
// .btn-back:hover{border-color:${GOLD};color:${GOLD};}
// .detail-content{position:relative;z-index:1;padding:48px;max-width:1200px;margin:0 auto;}
// .section-title{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:${GOLD};letter-spacing:6px;text-transform:uppercase;margin-bottom:32px;display:flex;align-items:center;gap:16px;}
// .section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent);}
// .event-hero{background:${CARD};border:1px solid rgba(201,168,76,0.2);padding:40px;margin-bottom:48px;position:relative;animation:fadeUp 0.5s ease forwards;}
// .event-hero::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,${GOLD},${GOLD_LIGHT},${GOLD},transparent);}
// .event-hero-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;gap:24px;flex-wrap:wrap;}
// .event-type-badge{display:inline-block;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};border:1px solid rgba(201,168,76,0.3);padding:4px 12px;margin-bottom:12px;}
// .event-hero-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:${WHITE};letter-spacing:2px;line-height:1.2;}
// .event-hero-stats{display:flex;gap:40px;flex-wrap:wrap;}
// .stat-item{text-align:center;}
// .stat-value{font-family:'Cormorant Garamond',serif;font-size:28px;color:${GOLD};font-weight:300;}
// .stat-label{font-size:9px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;margin-top:4px;}
// .budget-total-bar{background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.1);padding:20px 28px;margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
// .budget-total-label{font-size:10px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;}
// .budget-total-value{font-family:'Cormorant Garamond',serif;font-size:24px;color:${GOLD};font-weight:300;}
// .budget-remaining{font-size:11px;letter-spacing:1px;}
// .budget-remaining.ok{color:#6fcf7f;}
// .budget-remaining.over{color:#e07070;}
// .categories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
// .category-card{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:24px 28px;transition:border-color 0.3s;animation:fadeUp 0.4s ease forwards;opacity:0;position:relative;}
// .category-card:hover{border-color:rgba(201,168,76,0.3);}
// .category-card.locked{border-color:rgba(201,168,76,0.35);background:rgba(201,168,76,0.03);}
// .category-card.ignored{opacity:0.35 !important;pointer-events:none;border-color:rgba(255,255,255,0.05);}
// .category-card.selected{border-color:${GOLD};}
// @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
// .card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;}
// .category-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:${WHITE};letter-spacing:1px;}
// .card-actions{display:flex;gap:6px;align-items:center;}
// .action-btn{width:30px;height:30px;background:transparent;border:1px solid rgba(201,168,76,0.15);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;font-size:13px;color:${GRAY};flex-shrink:0;position:relative;}
// .action-btn:hover{border-color:rgba(201,168,76,0.5);color:${GOLD};}
// .action-btn.active-lock{border-color:${GOLD};background:rgba(201,168,76,0.1);color:${GOLD};}
// .action-btn.active-ignore{border-color:rgba(224,112,112,0.4);color:#e07070;}
// .action-btn.active-check{border-color:#6fcf7f;background:rgba(111,207,127,0.1);color:#6fcf7f;}
// .action-btn[data-tip]:hover::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);font-family:'Montserrat',sans-serif;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:${BLACK};background:${GOLD};padding:3px 8px;white-space:nowrap;pointer-events:none;z-index:10;}
// .planned-amount{font-size:10px;letter-spacing:1px;color:rgba(201,168,76,0.45);margin-bottom:18px;margin-top:8px;}
// .slider-area{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
// .range-label{font-size:10px;letter-spacing:1px;color:${GRAY};white-space:nowrap;min-width:56px;}
// .range-label.min{text-align:right;}
// .range-label.max{text-align:left;}
// .slider-wrap{flex:1;}
// .budget-slider{width:100%;-webkit-appearance:none;appearance:none;height:2px;outline:none;cursor:pointer;background:linear-gradient(90deg,${GOLD} var(--fill,0%),rgba(201,168,76,0.15) var(--fill,0%));}
// .budget-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:${GOLD};cursor:pointer;border:2px solid ${BLACK};box-shadow:0 0 8px rgba(201,168,76,0.5);transition:transform 0.15s;}
// .budget-slider::-webkit-slider-thumb:hover{transform:scale(1.15);}
// .budget-slider:disabled{opacity:0.4;cursor:not-allowed;}
// .card-amount-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;}
// .card-amount-val{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;color:${GOLD};}
// .card-amount-pct{font-size:10px;letter-spacing:2px;color:${GRAY};}
// .status-badge{font-size:8px;letter-spacing:2px;text-transform:uppercase;padding:2px 8px;margin-top:6px;display:inline-block;}
// .status-badge.locked{color:${GOLD};border:1px solid rgba(201,168,76,0.3);}
// .status-badge.ignored{color:#e07070;border:1px solid rgba(224,112,112,0.3);}
// .status-badge.selected{color:#6fcf7f;border:1px solid rgba(111,207,127,0.3);}
// .range-loading{font-size:9px;letter-spacing:2px;color:rgba(201,168,76,0.3);text-transform:uppercase;margin:12px 0;}
// .detail-actions{display:flex;gap:16px;margin-top:48px;justify-content:flex-end;flex-wrap:wrap;}
// .btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;}
// .btn-primary:hover{opacity:0.9;transform:translateY(-1px);}
// .btn-secondary{padding:14px 32px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
// .btn-secondary:hover{border-color:${GOLD};color:${GOLD};}
// @media(max-width:768px){.detail-header{padding:20px;flex-wrap:wrap;gap:16px;}.detail-content{padding:28px 16px;}.event-hero{padding:24px;}.categories-grid{grid-template-columns:1fr;}.detail-actions{flex-direction:column;}}
// `;

// export interface CategoryBudget {
//   categoryID: number;
//   categoryName: string;
//   plannedAmount: number;
//   currentAmount: number;
//   min: number;
//   max: number;
//   minLoading: boolean;
//   locked: boolean;
//   ignored: boolean;
//   selected: boolean;
// }

// interface Props {
//   event: EventDtoo;
//   onBack: () => void;
//   onProceedToVendors: (budgets: CategoryBudget[]) => void;
// }

// const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

// const EventDetailPage = ({ event, onBack, onProceedToVendors }: Props) => {

// console.log("Full Event Object:", event);
// console.log("Budget Items:", event.budgetItems);
// // הוספת <CategoryBudget[]> ל-useState מגדירה לו בדיוק למה לצפות
// const [budgets, setBudgets] = useState<CategoryBudget[]>(() => 
//   (event.budgetItems ?? []).map((item): CategoryBudget => ({
//     // תשתמש בשמות כפי שהם מופיעים ב-Console (הם באותיות קטנות!)
//     categoryID: item.categoryID, 
//     categoryName: item.allCategory?.categoryName ?? `קטגוריה ${item.categoryID}`,
//     plannedAmount: item.plannedAmount,
//     currentAmount: item.plannedAmount,
//     min: 0,
//     max: item.plannedAmount * 2,
//     minLoading: true,
//     locked: item.isLocked ?? false,   // ב-Console הופיע isLocked
//     ignored: item.isIgnore ?? false, // ב-Console הופיע isIgnore
//     selected: false,
//   }))
// );
// console.log("Initial budgets from DB:", budgets); // ✅ לוג לבדיקה שהנתונים מגיעים נכון מה-DB

// const initialData = useMemo(() => event.budgetItems, [event.budgetItems]);
//   // ✅ useRef — מחושב פעם אחת בלבד, לא גורם לרנדר, לא משתנה
//   // ✅ ערכי IsLocked ו-IsIgnore נלקחים מה-DB
//   // console.log(event.budgetItems); // ✅ לוג לבדיקה שהנתונים מגיעים נכון מה-DB
//   // const initialBudgets = useRef<CategoryBudget[]>(
//   //   (event.budgetItems ?? []).map((item) => ({
      
//   //     CategoryID: item.CategoryID,
//   //     CategoryName: item.allCategory?.CategoryName ?? `קטגוריה ${item.CategoryID}`,
//   //     PlannedAmount: item.PlannedAmount,
//   //     CurrentAmount: item.PlannedAmount,
//   //     Min: 0,
//   //     Max: item.PlannedAmount * 2,
//   //     MinLoading: true,
//   //     Locked: item.IsLocked ?? false,   // ✅ מה-DB
//   //     Ignored: item.IsIgnore ?? false,  // ✅ מה-DB
//   //     Selected: false,
//   //   }))
//   // );

//   // const [budgets, setBudgets] = useState<CategoryBudget[]>(initialBudgets.current);
// // console.log("initialBudgets.current:", initialBudgets.current);
//   // ✅ טעינת מין/מקס — רץ פעם אחת, כל קטגוריה מתעדכנת לבד

// // useEffect(() => {
// //   (initialData ?? []).forEach((item) => {
// //     // השתמש ב-categoryID עם c קטנה!
// //     const categoryID = item.CategoryID; 
    
// //     // רגע, לפי הלוגים שלך - אם זה בתוך ה-map של ה-useRef
// //     // השדות כבר הופו ל-CategoryID. 
// //     // הבעיה היא כנראה בשימוש ב-item בתוך ה-forEach.
    
// //     // בוא נשנה את ה-forEach כך שישתמש בערך שכבר קיים בתוך ה-initialBudgets:
// //     console.log(`טוען טווח עבור קטגוריה: ${item.CategoryID}`);

// //     if (item.CategoryID === undefined) {
// //       console.error("CategoryID is undefined!", item);
// //       return;
// //     }

// //     Promise.all([
// //       authFetch(`/Vendor/minPrice/${item.CategoryID}`).then((r) => r.json()),
// //       authFetch(`/Vendor/maxPrice/${item.CategoryID}`).then((r) => r.json()),
// //     ])
// //     .then(([minVal, maxVal]) => {
// //       // ... המשך הקוד שלך


// // //   useEffect(() => {
// // //     initialBudgets.current.forEach((item) => {
// // //       console.log(`טוען טווח עבור קטגוריה ${item}...`); // ✅ לוג לבדיקת הטעינה
// // //       const categoryID = item.CategoryID;
// // // console.log(`טוען טווח עבור קטגוריה ${categoryID}...`); // ✅ לוג לבדיקת הטעינה
// // //       Promise.all([
// // //         authFetch(`/Vendor/minPrice/${categoryID}`).then((r) => r.json()),
// // //         authFetch(`/Vendor/maxPrice/${categoryID}`).then((r) => r.json()),
// // //       ])
// //         // .then(([minVal, maxVal]) => {
// //           const min = Number(minVal) || 0;
// //           const max = Number(maxVal) || item.PlannedAmount * 2;
// //           console.log(max);
// //           console.log(min);
// //           // ✅ מעדכן רק את הקטגוריה הספציפית — שאר הקטגוריות לא נגעות
// //           setBudgets((prev) =>
// //             prev.map((b) =>
// //               b.categoryID === categoryID
// //                 ? {
// //                     ...b,
// //                     min: min,
// //                     max: max,
// //                     currentAmount: Math.min(Math.max(b.plannedAmount, min), max),
// //                     minLoading: false,
// //                   }
// //                 : b
// //             )
// //           );
// //         })
// //         .catch(() => {
// //           setBudgets((prev) =>
// //             prev.map((b) =>
// //               b.categoryID === categoryID ? { ...b, minLoading: false } : b
// //             )
// //           );
// //         });
// //     });
// //   }, []); // רץ פעם אחת בלבד


// useEffect(() => {
//   const loadRanges = async () => {
//     // 1. קח את הנתונים מה-event
//     const rawItems = event.budgetItems ?? [];
    
//     // 2. צור את כל הקריאות במקביל
//     const promises = rawItems.map(async (item) => {
//       try {
//         const [minRes, maxRes] = await Promise.all([
//           authFetch(`/Vendor/minPrice/${item.categoryID}`).then(r => r.json()),
//           authFetch(`/Vendor/maxPrice/${item.categoryID}`).then(r => r.json())
//         ]);
        
//         return {
//           categoryID: item.CategoryID,
//           min: Number(minRes) || 0,
//           max: Number(maxRes) || (item.PlannedAmount * 2),
//         };
//       } catch {
//         return { categoryID: item.CategoryID, min: 0, max: item.PlannedAmount * 2 };
//       }
//     });

//     // 3. חכה שכולם יסיימו
//     const results = await Promise.all(promises);

//     // 4. עדכן את ה-State פעם אחת עם כל הטווחים
//     setBudgets(prev => prev.map(b => {
//       const found = results.find(r => r.categoryID === b.categoryID);
//       return found ? { 
//         ...b, 
//         min: found.min, 
//         max: found.max, 
//         minLoading: false,
//         currentAmount: Math.min(Math.max(b.plannedAmount, found.min), found.max)
//       } : { ...b, minLoading: false };
//     }));
//   };

//   loadRanges();
// }, [event.budgetItems]); // רץ מחדש אם הנתונים משתנים

//   const activeItems = budgets.filter((b) => !b.ignored);
//   const totalAllocated = activeItems.reduce((s, b) => s + b.currentAmount, 0);
//   const remaining = event.totalBudget - totalAllocated;
//   const totalPct = event.totalBudget > 0 ? Math.round((totalAllocated / event.totalBudget) * 100) : 0;

//   // ✅ כל פונקציה מעדכנת רק לפי categoryID — לא משפיעה על שאר הקטגוריות
//   // const setAmount = (id: number, val: number) =>
//   //   setBudgets((prev) => prev.map((b) =>
//   //     b.categoryID === id && !b.locked ? { ...b, currentAmount: val } : b
//   //   ));

//   const toggleLock = (id: number) =>
//     setBudgets((prev) => prev.map((b) =>
//       b.categoryID === id ? { ...b, locked: !b.locked } : b  // ✅ רק ה-ID הספציפי
//     ));

//   const toggleIgnore = (id: number) =>
//     setBudgets((prev) => prev.map((b) =>
//       b.categoryID === id ? { ...b, ignored: !b.ignored, locked: false } : b
//     ));

//   const toggleSelect = (id: number) =>
//     setBudgets((prev) => prev.map((b) =>
//       b.categoryID === id ? { ...b, selected: !b.selected } : b
//     ));

//   // const fillPct = (b: CategoryBudget) => {
//   //   const range = b.max - b.min;
//   //   if (range <= 0) return 0;
//   //   return Math.min(100, Math.max(0, ((b.currentAmount - b.min) / range) * 100));
//   // };
//  const [activeID, setActiveID] = useState<number | null>(null);

// const setAmount = (id: number, val: number) => {
//   setActiveID(id); // מפעיל את האנימציה
//   setBudgets((p) => p.map((b) => {
//     if (b.categoryID === id && !b.locked) {
//       const safeVal = Math.min(Math.max(val, b.min), b.max);
//       return { ...b, currentAmount: safeVal };
//     }
//     return b;
//   }));
  
//   // מכבה את האנימציה אחרי זמן קצר
//   setTimeout(() => setActiveID(null), 300);
// };
// const fillPct = (b: CategoryBudget) => {
//   const range = b.max - b.min;
//   if (range <= 0) return 0;
//   // חישוב המיקום היחסי של ה-currentAmount בתוך הטווח [min, max]
//   const pct = ((b.currentAmount - b.min) / range) * 100;
//   return Math.min(100, Math.max(0, pct));
// };
//   return (
//     <>
//       <style>{pageStyles}</style>
//       <div className="detail-page" dir="rtl">
//         <div className="detail-bg-pattern" />

//         <header className="detail-header">
//           <div className="detail-header-left">
//             <div className="header-logo-icon"><span className="header-logo-inner">✦</span></div>
//             <div>
//               <div className="header-title">Élite</div>
//               <div className="header-subtitle">תכנון אירוע</div>
//             </div>
//           </div>
//           <button className="btn-back" onClick={onBack}>← חזרה לאירועים</button>
//         </header>

//         <main className="detail-content">
//           <div className="event-hero">
//             <div className="event-hero-top">
//               <div>
//                 <div className="event-type-badge">אירוע</div>
//                 <div className="event-hero-name">{event.eventName}</div>
//               </div>
//               <div className="event-hero-stats">
//                 <div className="stat-item">
//                   <div className="stat-value">₪{event.totalBudget.toLocaleString()}</div>
//                   <div className="stat-label">תקציב כולל</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-value">{event.guestCount}</div>
//                   <div className="stat-label">אורחים</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-value">
//                     {new Date(event.eventDate).toLocaleDateString("he-IL", { day: "2-digit", month: "short" })}
//                   </div>
//                   <div className="stat-label">תאריך</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="section-title">חלוקת תקציב</div>

//           <div className="budget-total-bar">
//             <div>
//               <div className="budget-total-label">סה"כ מוקצה</div>
//               <div className="budget-total-value">{totalPct}%</div>
//             </div>
//             <div className={`budget-remaining ${remaining >= 0 ? "ok" : "over"}`}>
//               {remaining >= 0
//                 ? `נותר: ₪${fmt(remaining)}`
//                 : `חריגה: ₪${fmt(Math.abs(remaining))}`}
//             </div>
//           </div>

//           {budgets.length === 0 ? (
//             <p style={{ color: GRAY, fontSize: 12, letterSpacing: 2 }}>אין פריטי תקציב לאירוע זה</p>
//           ) : (
//             <div className="categories-grid">
//               {budgets.map((b, i) => (
//                 <div
//                   key={b.categoryID}
//                   className={`category-card${b.locked ? " locked" : ""}${b.ignored ? " ignored" : ""}${b.selected ? " selected" : ""}`}
//                   style={{ animationDelay: `${i * 0.07}s` }}
//                 >
//                   <div className="card-header">
//                     <div className="category-name">{b.categoryName}</div>
//                     <div className="card-actions">

//                       {/* ✓ סמן כנבחר */}
//                       <button
//                         className={`action-btn${b.selected ? " active-check" : ""}`}
//                         onClick={() => toggleSelect(b.categoryID)}
//                         data-tip={b.selected ? "בטל בחירה" : "סמן כנבחר"}
//                       >✓</button>

//                       {/* 🔒 נעל — רק הקטגוריה הזו */}
//                       <button
//                         className={`action-btn${b.locked ? " active-lock" : ""}`}
//                         onClick={() => toggleLock(b.categoryID)}
//                         data-tip={b.locked ? "שחרר נעילה" : "נעל ערך"}
//                       >{b.locked ? "🔒" : "🔓"}</button>

//                       {/* ✕ התעלם */}
//                       <button
//                         className={`action-btn${b.ignored ? " active-ignore" : ""}`}
//                         onClick={() => toggleIgnore(b.categoryID)}
//                         data-tip={b.ignored ? "שחזר" : "התעלם מקטגוריה"}
//                       >✕</button>

//                     </div>
//                   </div>

//                   {b.locked   && <div className="status-badge locked">נעול</div>}
//                   {b.ignored  && <div className="status-badge ignored">מוסר</div>}
//                   {b.selected && <div className="status-badge selected">נבחר ✓</div>}

//                   <div className="planned-amount">
//                     מתוכנן: ₪{fmt(b.plannedAmount)}
//                   </div>

//                   {b.minLoading ? (
//                     <div className="range-loading">טוען טווח...</div>
//                   ) : (
//                     <>
//                      <div className="slider-area">
//   <div className="range-label min">₪{fmt(b.min)}</div>
//   <div className="slider-wrap">
//     <input
//       type="range"
//       className="budget-slider"
//       // מעדכן את ה-CSS של הפס הממולא
//       style={{ "--fill": `${fillPct(b)}%` } as React.CSSProperties}
//       min={b.min}
//       max={b.max}
//       // ה-step קובע את הדיוק - מומלץ שיהיה בערך 1/100 מהטווח
//       step={Math.max(1, Math.round((b.max - b.min) / 100))}
//       value={b.currentAmount}
//       disabled={b.locked || b.ignored}
//       onChange={(e) => setAmount(b.categoryID, Number(e.target.value))}
//     />
//   </div>
//   <div className="range-label max">₪{fmt(b.max)}</div>
// </div>

//                       <div className="card-amount-row">
// <div className={`card-amount-val ${activeID === b.categoryID ? "updating" : ""}`}>
//         ₪{fmt(b.currentAmount)}
//       </div>                        <div className="card-amount-pct">
//                           {event.totalBudget > 0
//                             ? `${((b.currentAmount / event.totalBudget) * 100).toFixed(1)}% מהתקציב`
//                             : ""}
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="detail-actions">
//             <button className="btn-secondary" onClick={onBack}>ביטול</button>
//             <button
//               className="btn-primary"
//               onClick={() => onProceedToVendors(budgets.filter((b) => !b.ignored))}
//             >
//               המשך לבחירת ספקים ←
//             </button>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default EventDetailPage;





import { useState, useEffect, useMemo } from "react";
import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";
import { type EventDtoo } from "../types/event";
import { authFetch } from "../services/authService";

// ... (pageStyles נשאר ללא שינוי, לכן קיצרתי)

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
}

const fmt = (n: number) => Math.round(n).toLocaleString("he-IL");

const EventDetailPage = ({ event, onBack, onProceedToVendors }: Props) => {
  
// 1. כאן שמים את הבדיקה (ה-Guard)
  // זה מבטיח שאם ה-event עדיין לא הגיע מהשרת, הקומפוננטה לא תעשה כלום
  // if (!event || !event.budgetItems) {
  //   return <div>טוען נתונים...</div>;
  // }

  // 2. מכאן והלאה הקוד רץ בבטחה
  const initialData =  useMemo(() => {
    return (event.budgetItems ?? []).map((item) => ({
      // ... המיפוי שלך ...
         categoryID: item.categoryID,
      categoryName: item.allCategory?.categoryName ?? `קטגוריה ${item.categoryID}`,
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

  // 2. עדכון ה-State כשה-event משתנה (חשוב!)
  useEffect(() => {
    setBudgets(initialData);
  }, [initialData]);

  // 3. טעינת טווחי מחירים מה-API לכל קטגוריה
  // useEffect(() => {
  //   console.log("טוען טווחי מחירים עבור כל הקטגוריות...",initialData); // לוג כללי
  //   initialData.forEach((item) => {
  //     const categoryID = item.categoryID;
  //     if (!categoryID) return;
  //     console.log(`טוען טווח עבור קטגוריה ${categoryID}...`); // לוג לבדיקת הטעינה
  //     Promise.all([
  //       authFetch(`/Vendor/minPrice/${categoryID}`).then((r) => r.json()),
  //       authFetch(`/Vendor/maxPrice/${categoryID}`).then((r) => r.json()),
  //     ])
  //       .then(([minVal, maxVal]) => {
  //         setBudgets((prev) =>
  //           prev.map((b) =>
  //             b.categoryID === categoryID
  //               ? {
  //                   ...b,
  //                   min: Number(minVal) || 0,
  //                   max: Number(maxVal) || b.plannedAmount * 2,
  //                   minLoading: false,
  //                   // מוודא שהסכום הנוכחי לא חורג מהטווח החדש שחזר מה-API
  //                   currentAmount: Math.max(Number(minVal) || 0, b.currentAmount)
  //                 }
  //               : b
  //           )
  //         );
  //       })
  //       .catch(() => {
  //         setBudgets((prev) =>
  //           prev.map((b) => (b.categoryID === categoryID ? { ...b, minLoading: false } : b))
  //         );
  //       });
  //   });
  // }, [initialData]);


useEffect(() => {
  // אנחנו משתמשים ב-event.budgetItems שמגיע כ-Prop,
  // הוא תמיד יהיה מעודכן ברגע שהקומפוננטה עולה.
  const items = event.budgetItems ?? [];
  console.log("טוען טווחי מחירים עבור כל הקטגוריות...", items); // לוג כללי
  if (items.length === 0) return;
  // 👇 הוסף את זה
  console.log("item לדוגמה:", JSON.stringify(items[0]));
  console.log("מפתחות של item:", Object.keys(items[0] ?? {}));
  const fetchData = async () => {
    // נריץ לולאה על ה-items ולא על ה-budgets מה-State
    for (const item of items) {
      const categoryID = item.categoryID;
      console.log(`טוען טווח עבור קטגוריה ${categoryID}...`); // לוג לבדיקת הטעינה

      try {
        const [minRes, maxRes] = await Promise.all([
          authFetch(`/Vendor/minPrice/${categoryID}`).then(r => r.json()),
          authFetch(`/Vendor/maxPrice/${categoryID}`).then(r => r.json())
        ]);

        const min = Number(minRes) || 0;
        const max = Number(maxRes) || (item.plannedAmount * 2);

        setBudgets(prev => prev.map(b => 
          b.categoryID === categoryID 
            ? { ...b, min, max, currentAmount: Math.min(Math.max(b.plannedAmount, min), max), minLoading: false } 
            : b
        ));
      } catch (e) {
        console.error("Error loading category", categoryID, e);
        setBudgets(prev => prev.map(b => 
          b.categoryID === categoryID ? { ...b, minLoading: false } : b
        ));
      }
    }
  };

  fetchData();
}, [event]); // תלוי ב-event, כך שאם האירוע משתנה, הטעינה תרוץ מחדש

 
  // חישובים לתצוגה
  const activeItems = budgets.filter((b) => !b.ignored);
  const totalAllocated = activeItems.reduce((s, b) => s + b.currentAmount, 0);
  const remaining = event.totalBudget - totalAllocated;
  const totalPct = event.totalBudget > 0 ? Math.round((totalAllocated / event.totalBudget) * 100) : 0;

  const setAmount = (id: number, val: number) =>
    setBudgets((p) => p.map((b) => (b.categoryID === id && !b.locked ? { ...b, currentAmount: val } : b)));

  const toggleLock = (id: number) => setBudgets((p) => p.map((b) => b.categoryID === id ? { ...b, locked: !b.locked } : b));
  const toggleIgnore = (id: number) => setBudgets((p) => p.map((b) => b.categoryID === id ? { ...b, ignored: !b.ignored, locked: false } : b));
  const toggleSelect = (id: number) => setBudgets((p) => p.map((b) => b.categoryID === id ? { ...b, selected: !b.selected } : b));

  const fillPct = (b: CategoryBudget) => {
    const range = b.max - b.min;
    return range <= 0 ? 0 : Math.min(100, Math.max(0, ((b.currentAmount - b.min) / range) * 100));
  };

  return (
    <>
      <style>{pageStyles}</style>
      <div className="detail-page" dir="rtl">
        <div className="detail-bg-pattern" />
        <header className="detail-header">
           {/* ... תוכן ה-Header נשאר זהה ... */}
           <div className="detail-header-left">
             <div className="header-logo-icon"><span className="header-logo-inner">✦</span></div>
             <div>
               <div className="header-title">Élite</div>
               <div className="header-subtitle">תכנון אירוע</div>
             </div>
           </div>
           <button className="btn-back" onClick={onBack}>← חזרה</button>
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
            <div className={`budget-remaining ${remaining >= 0 ? "ok" : "over"}`}>
              {remaining >= 0 ? `נותר לחלוקה: ₪${fmt(remaining)}` : `חריגה של: ₪${fmt(Math.abs(remaining))}`}
            </div>
          </div>

          <div className="categories-grid">
            {budgets.map((b, i) => (
              <div 
                key={`${event.eventID}-${b.categoryID ?? i}`}
                className={`category-card ${b.locked ? 'locked' : ''} ${b.ignored ? 'ignored' : ''} ${b.selected ? 'selected' : ''}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="card-header">
                  <div className="category-name">{b.categoryName}</div>
                  <div className="card-actions">
                    <button className={`action-btn ${b.selected ? 'active-check' : ''}`} onClick={() => toggleSelect(b.categoryID)}>✓</button>
                    <button className={`action-btn ${b.locked ? 'active-lock' : ''}`} onClick={() => toggleLock(b.categoryID)}>{b.locked ? "🔒" : "🔓"}</button>
                    <button className={`action-btn ${b.ignored ? 'active-ignore' : ''}`} onClick={() => toggleIgnore(b.categoryID)}>✕</button>
                  </div>
                </div>

                <div className="planned-amount">מתוכנן מקורי: ₪{fmt(b.plannedAmount)}</div>

                {b.minLoading ? (
                  <div className="range-loading">מעדכן טווחים...</div>
                ) : (
                  <>
                    <div className="slider-area">
                      <div className="range-label min">₪{fmt(b.min)}</div>
                      <div className="slider-wrap">
                        <input
                          type="range"
                          className="budget-slider"
                          style={{ "--fill": `${fillPct(b)}%` } as any}
                          min={b.min}
                          max={b.max}
                          value={b.currentAmount}
                          disabled={b.locked || b.ignored}
                          onChange={(e) => setAmount(b.categoryID, Number(e.target.value))}
                        />
                      </div>
                      <div className="range-label max">₪{fmt(b.max)}</div>
                    </div>
                    <div className="card-amount-row">
                      <div className="card-amount-val">₪{fmt(b.currentAmount)}</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="detail-actions">
            <button className="btn-secondary" onClick={onBack}>ביטול</button>
            <button 
                className="btn-primary" 
                onClick={() => onProceedToVendors(budgets.filter(b => !b.ignored))}
            >
              המשך לבחירת ספקים ←
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default EventDetailPage;
