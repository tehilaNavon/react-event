// // src/pages/VendorsPage.tsx
// import { useState } from "react";
// import {
//   GOLD,
//   GOLD_LIGHT,
//   GOLD_DARK,
//   BLACK,
//   CARD,
//   WHITE,
//   GRAY,
// } from "../styles/theme";
// import { type category } from "../types/category";
// import { type EventDtoo } from "../types/event";

// const pageStyles = `
// html, body, #root {
//   width: 100% !important;
//   max-width: 100% !important;
//   margin: 0 !important;
//   padding: 0 !important;
//   overflow-x: hidden;
// }
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
//   .vendors-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden;}
//   .vendors-bg{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0;}
//   .vendors-header{position:relative;z-index:2;padding:32px 48px 28px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);}
//   .vendors-header-left{display:flex;align-items:center;gap:20px;}
//   .header-logo-icon{width:40px;height:40px;border:1px solid ${GOLD};display:flex;align-items:center;justify-content:center;transform:rotate(45deg);flex-shrink:0;}
//   .header-logo-inner{transform:rotate(-45deg);color:${GOLD};font-size:16px;}
//   .header-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:${WHITE};letter-spacing:4px;text-transform:uppercase;}
//   .header-subtitle{font-size:10px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-top:2px;}
//   .btn-back{padding:12px 24px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
//   .btn-back:hover{border-color:${GOLD};color:${GOLD};}
//   .vendors-content{position:relative;z-index:1;padding:48px;max-width:1200px;margin:0 auto;}
//   .section-title{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:${GOLD};letter-spacing:6px;text-transform:uppercase;margin-bottom:32px;display:flex;align-items:center;gap:16px;}
//   .section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent);}
//   .category-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px;}
//   .tab{padding:10px 20px;background:transparent;border:1px solid rgba(201,168,76,0.2);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;display:flex;flex-direction:column;align-items:center;}
//   .tab.active{background:linear-gradient(135deg,${GOLD_DARK},${GOLD});color:${BLACK};border-color:transparent;font-weight:600;}
//   .tab:hover:not(.active){border-color:${GOLD};color:${GOLD};}
//   .tab-budget{font-size:9px;color:inherit;opacity:0.7;margin-top:2px;}
//   .vendors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;}
//   .vendor-card{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:32px;position:relative;transition:all 0.3s;cursor:pointer;animation:fadeUp 0.4s ease forwards;opacity:0;}
//   .vendor-card:hover{border-color:rgba(201,168,76,0.35);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.5);}
//   .vendor-card.selected{border-color:${GOLD};background:rgba(201,168,76,0.05);}
//   .vendor-card.selected::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${GOLD},transparent);}
//   .vendor-card.over-budget{opacity:0.45;cursor:not-allowed;}
//   @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
//   .vendor-selected-badge{position:absolute;top:16px;left:16px;background:${GOLD};color:${BLACK};font-size:9px;letter-spacing:2px;padding:3px 10px;font-weight:600;}
//   .vendor-over-badge{position:absolute;top:16px;left:16px;background:rgba(224,112,112,0.15);color:#e07070;font-size:9px;letter-spacing:2px;padding:3px 10px;border:1px solid rgba(224,112,112,0.3);}
//   .vendor-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:${WHITE};letter-spacing:1px;margin-bottom:8px;margin-top:8px;}
//   .vendor-price{font-family:'Cormorant Garamond',serif;font-size:24px;color:${GOLD};font-weight:300;margin-bottom:4px;}
//   .vendor-price-label{font-size:9px;color:${GRAY};letter-spacing:2px;margin-bottom:12px;}
//   .vendor-desc{font-size:11px;color:${GRAY};letter-spacing:0.5px;line-height:1.6;margin-bottom:16px;}
//   .vendor-stars{display:flex;gap:4px;}
//   .vendor-star{color:${GOLD};font-size:14px;}
//   .vendor-star.empty{color:rgba(201,168,76,0.2);}
//   .selected-summary{background:${CARD};border:1px solid rgba(201,168,76,0.2);padding:28px;margin-top:48px;position:relative;}
//   .selected-summary::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${GOLD},transparent);}
//   .summary-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;color:${WHITE};letter-spacing:3px;margin-bottom:20px;}
//   .summary-list{display:flex;flex-wrap:wrap;gap:12px;}
//   .summary-chip{background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);padding:8px 16px;font-size:11px;color:${GOLD};letter-spacing:1px;}
//   .vendors-actions{display:flex;gap:16px;margin-top:32px;justify-content:flex-end;flex-wrap:wrap;}
//   .btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;}
//   .btn-primary:hover{opacity:0.9;transform:translateY(-1px);}
//   .btn-primary:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
//   .btn-secondary{padding:14px 32px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
//   .btn-secondary:hover{border-color:${GOLD};color:${GOLD};}
//   @media(max-width:768px){.vendors-header{padding:20px;flex-wrap:wrap;gap:16px;}.vendors-content{padding:28px 16px;}.vendors-grid{grid-template-columns:1fr;}.vendors-actions{flex-direction:column;}}
// `;

// const CATEGORIES_MAP: Record<string, { name: string; icon: string }> = {
//   venue: { name: "אולם", icon: "🏛️" },
//   catering: { name: "קייטרינג", icon: "🍽️" },
//   photography: { name: "צלם", icon: "📸" },
//   music: { name: "מוזיקה", icon: "🎵" },
//   flowers: { name: "פרחים", icon: "💐" },
//   other: { name: "שונות", icon: "✨" },
// };

// const MOCK_VENDORS: Record<
//   string,
//   { id: number; name: string; price: number; desc: string; stars: number }[]
// > = {
//   venue: [
//     {
//       id: 1,
//       name: "אולם הקריסטל",
//       price: 18000,
//       desc: "אולם יוקרתי ל-200 אורחים עם גינה פרטית ותאורה מרהיבה",
//       stars: 5,
//     },
//     {
//       id: 2,
//       name: "גן עדן",
//       price: 12000,
//       desc: "גן אירועים פתוח עם נוף עוצר נשימה",
//       stars: 4,
//     },
//     {
//       id: 3,
//       name: "ארמון המלכים",
//       price: 25000,
//       desc: "אולם מפואר עם עיצוב ייחודי ותאורה מיוחדת",
//       stars: 5,
//     },
//   ],
//   catering: [
//     {
//       id: 4,
//       name: "שף גורמה",
//       price: 8000,
//       desc: "קייטרינג כשר עם תפריט מגוון ומשובח",
//       stars: 5,
//     },
//     {
//       id: 5,
//       name: "טעמים",
//       price: 5500,
//       desc: "קייטרינג ביתי עם מגוון מנות מסורתיות",
//       stars: 4,
//     },
//     {
//       id: 6,
//       name: "פינת הטעם",
//       price: 4000,
//       desc: "מנות מסורתיות ומיוחדות במחיר נגיש",
//       stars: 3,
//     },
//   ],
//   photography: [
//     {
//       id: 7,
//       name: "לנס מאגיק",
//       price: 4500,
//       desc: "צילום ווידאו מקצועי + אלבום דיגיטלי",
//       stars: 5,
//     },
//     {
//       id: 8,
//       name: "אור וצל",
//       price: 3200,
//       desc: "צלם מנוסה עם סגנון אמנותי ייחודי",
//       stars: 4,
//     },
//     {
//       id: 9,
//       name: "רגע של נצח",
//       price: 2800,
//       desc: "צילום איכותי ומקצועי במחיר נגיש",
//       stars: 4,
//     },
//   ],
//   music: [
//     {
//       id: 10,
//       name: "DJ אלפא",
//       price: 3500,
//       desc: "DJ מקצועי עם ציוד סאונד מתקדם",
//       stars: 5,
//     },
//     {
//       id: 11,
//       name: "להקת הנגינה",
//       price: 5000,
//       desc: "להקה חיה עם 5 נגנים מוכשרים",
//       stars: 5,
//     },
//     {
//       id: 12,
//       name: "סאונד פרו",
//       price: 2500,
//       desc: "DJ עם כל הסגנונות המוזיקליים",
//       stars: 3,
//     },
//   ],
//   flowers: [
//     {
//       id: 13,
//       name: "גן הפרחים",
//       price: 3000,
//       desc: "עיצוב פרחוני מלא ומרהיב לאירוע",
//       stars: 5,
//     },
//     {
//       id: 14,
//       name: "פרח ועלה",
//       price: 2000,
//       desc: "סידורי פרחים עדינים ומיוחדים",
//       stars: 4,
//     },
//     {
//       id: 15,
//       name: "טבע ויופי",
//       price: 1500,
//       desc: "פרחים טריים ומיובאים במחיר נגיש",
//       stars: 4,
//     },
//   ],
//   other: [
//     {
//       id: 16,
//       name: "הפקות VIP",
//       price: 2000,
//       desc: "קישוטים ואביזרים נוספים לאירוע",
//       stars: 4,
//     },
//     {
//       id: 17,
//       name: "מתנות לאורחים",
//       price: 1500,
//       desc: "מארזי מתנה אישיים ומיוחדים",
//       stars: 4,
//     },
//   ],
// };

// interface SelectedVendor {
//   id: number;
//   name: string;
// }

// interface Props {
//   event: EventDtoo;
//   budgets: category[];
//   onBack: () => void;
//   onProceedToTasks: (selected: Record<string, SelectedVendor>) => void;
// }

// const VendorsPage = ({ event, budgets, onBack, onProceedToTasks }: Props) => {
//   const [activeTab, setActiveTab] = useState("venue");
//   const [selected, setSelected] = useState<Record<string, SelectedVendor>>({});

//   // const getCategoryBudget = (key: string) => {
//   //   const b = budgets.find((x) => x.categoryID === key);
//   //   return b ? Math.round((event.totalBudget * b.pct) / 100) : 0;
//   // };
//   const getCategoryBudget = (id: number) => {
//   const b = budgets.find((x) => x.categoryID === id);
//   return b ? Math.round((event.totalBudget * b.pct) / 100) : 0;
// };

//   const toggleVendor = (
//     catKey: string,
//     vendor: { id: number; name: string },
//   ) => {
//     setSelected((prev) =>
//       prev[catKey]?.id === vendor.id
//         ? { ...prev, [catKey]: { id: 0, name: "" } }
//         : { ...prev, [catKey]: vendor },
//     );
//   };

//   const selectedCount = Object.values(selected).filter((v) => v?.id > 0).length;

//   return (
//     <>
//       <style>{pageStyles}</style>
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
//             {Object.entries(CATEGORIES_MAP).map(([key, cat]) => (
//               <button
//                 key={key}
//                 className={`tab ${activeTab === key ? "active" : ""}`}
//                 onClick={() => setActiveTab(key)}
//               >
//                 {cat.icon} {cat.name}
//                 <div className="tab-budget">
//                   ₪{getCategoryBudget(cat.n).toLocaleString()}
//                 </div>
//               </button>
//             ))}
//           </div>

//           <div className="vendors-grid">
//             {(MOCK_VENDORS[activeTab] ?? []).map((v, i) => {
//               const budget = getCategoryBudget(activeTab);
//               const isOver = v.price > budget;
//               const isSelected = selected[activeTab]?.id === v.id;
//               return (
//                 <div
//                   key={v.id}
//                   className={`vendor-card ${isSelected ? "selected" : ""} ${isOver ? "over-budget" : ""}`}
//                   style={{ animationDelay: `${i * 0.08}s` }}
//                   onClick={() =>
//                     !isOver &&
//                     toggleVendor(activeTab, { id: v.id, name: v.name })
//                   }
//                 >
//                   {isSelected && (
//                     <div className="vendor-selected-badge">✓ נבחר</div>
//                   )}
//                   {isOver && !isSelected && (
//                     <div className="vendor-over-badge">מעל תקציב</div>
//                   )}
//                   <div className="vendor-name">{v.name}</div>
//                   <div className="vendor-price">
//                     ₪{v.price.toLocaleString()}
//                   </div>
//                   <div className="vendor-price-label">מחיר לאירוע</div>
//                   <div className="vendor-desc">{v.desc}</div>
//                   <div className="vendor-stars">
//                     {[1, 2, 3, 4, 5].map((s) => (
//                       <span
//                         key={s}
//                         className={`vendor-star ${s <= v.stars ? "" : "empty"}`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {selectedCount > 0 && (
//             <div className="selected-summary">
//               <div className="summary-title">
//                 ספקים שנבחרו ({selectedCount})
//               </div>
//               <div className="summary-list">
//                 {Object.entries(CATEGORIES_MAP).map(([key, cat]) => {
//                   const v = selected[key];
//                   return v?.id > 0 ? (
//                     <div key={key} className="summary-chip">
//                       {cat.icon} {cat.name}: {v.name}
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             </div>
//           )}

//           <div className="vendors-actions">
//             <button className="btn-secondary" onClick={onBack}>
//               ← חזרה
//             </button>
//             <button
//               className="btn-primary"
//               disabled={selectedCount === 0}
//               onClick={() => onProceedToTasks(selected)}
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
