// // src/pages/EventDetailPage.tsx
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
// import { type EventDtoo } from "../types/event";
// import type { category } from "../types/category";

// const pageStyles = `
// html, body, #root {
//   width: 100% !important;
//   max-width: 100% !important;
//   margin: 0 !important;
//   padding: 0 !important;
//   overflow-x: hidden;
// }
//   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
//   .detail-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden;}
//   .detail-bg-pattern{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0;}
//   .detail-header{position:relative;z-index:2;padding:32px 48px 28px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);}
//   .detail-header-left{display:flex;align-items:center;gap:20px;}
//   .header-logo-icon{width:40px;height:40px;border:1px solid ${GOLD};display:flex;align-items:center;justify-content:center;transform:rotate(45deg);flex-shrink:0;}
//   .header-logo-inner{transform:rotate(-45deg);color:${GOLD};font-size:16px;}
//   .header-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:${WHITE};letter-spacing:4px;text-transform:uppercase;}
//   .header-subtitle{font-size:10px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-top:2px;}
//   .btn-back{padding:12px 24px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
//   .btn-back:hover{border-color:${GOLD};color:${GOLD};}
//   .detail-content{position:relative;z-index:1;padding:48px;max-width:1200px;margin:0 auto;}
//   .section-title{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:${GOLD};letter-spacing:6px;text-transform:uppercase;margin-bottom:32px;display:flex;align-items:center;gap:16px;}
//   .section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent);}
//   .event-hero{background:${CARD};border:1px solid rgba(201,168,76,0.2);padding:40px;margin-bottom:48px;position:relative;animation:fadeUp 0.5s ease forwards;}
//   .event-hero::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,${GOLD},${GOLD_LIGHT},${GOLD},transparent);}
//   .event-hero-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;gap:24px;flex-wrap:wrap;}
//   .event-type-badge{display:inline-block;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};border:1px solid rgba(201,168,76,0.3);padding:4px 12px;margin-bottom:12px;}
//   .event-hero-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:${WHITE};letter-spacing:2px;line-height:1.2;}
//   .event-hero-stats{display:flex;gap:40px;flex-wrap:wrap;}
//   .stat-item{text-align:center;}
//   .stat-value{font-family:'Cormorant Garamond',serif;font-size:28px;color:${GOLD};font-weight:300;}
//   .stat-label{font-size:9px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;margin-top:4px;}
//   .budget-total-bar{background:rgba(255,255,255,0.03);border:1px solid rgba(201,168,76,0.1);padding:20px 28px;margin-bottom:32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
//   .budget-total-label{font-size:10px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;}
//   .budget-total-value{font-family:'Cormorant Garamond',serif;font-size:24px;color:${GOLD};font-weight:300;}
//   .budget-remaining{font-size:11px;letter-spacing:1px;}
//   .budget-remaining.ok{color:#6fcf7f;}
//   .budget-remaining.over{color:#e07070;}
//   .categories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}
//   .category-card{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:28px;transition:border-color 0.3s;animation:fadeUp 0.4s ease forwards;opacity:0;}
//   .category-card:hover{border-color:rgba(201,168,76,0.3);}
//   @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
//   .category-icon{font-size:24px;margin-bottom:12px;}
//   .category-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:${WHITE};letter-spacing:1px;margin-bottom:16px;}
//   .slider-row{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
//   .budget-slider{flex:1;-webkit-appearance:none;appearance:none;height:2px;background:rgba(201,168,76,0.15);outline:none;cursor:pointer;}
//   .budget-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${GOLD};cursor:pointer;border:2px solid ${BLACK};box-shadow:0 0 8px rgba(201,168,76,0.4);}
//   .slider-pct{font-family:'Cormorant Garamond',serif;font-size:20px;color:${GOLD};font-weight:300;min-width:44px;text-align:right;}
//   .category-amount{font-size:11px;color:${GRAY};letter-spacing:1px;}
//   .category-amount span{color:${GOLD_LIGHT};}
//   .stars-row{display:flex;gap:6px;margin-top:12px;}
//   .star{font-size:18px;cursor:pointer;color:rgba(201,168,76,0.2);transition:color 0.2s;}
//   .star.active{color:${GOLD};}
//   .star:hover{color:${GOLD_LIGHT};}
//   .detail-actions{display:flex;gap:16px;margin-top:48px;justify-content:flex-end;flex-wrap:wrap;}
//   .btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;}
//   .btn-primary:hover{opacity:0.9;transform:translateY(-1px);}
//   .btn-secondary{padding:14px 32px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
//   .btn-secondary:hover{border-color:${GOLD};color:${GOLD};}
//   @media(max-width:768px){.detail-header{padding:20px;flex-wrap:wrap;gap:16px;}.detail-content{padding:28px 16px;}.event-hero{padding:24px;}.event-hero-top{flex-direction:column;}.categories-grid{grid-template-columns:1fr;}.detail-actions{flex-direction:column;}}
// `;

// const CATEGORIES = [
//   { key: "venue", name: "אולם", icon: "🏛️", defaultPct: 35 },
//   { key: "catering", name: "קייטרינג", icon: "🍽️", defaultPct: 25 },
//   { key: "photography", name: "צלם", icon: "📸", defaultPct: 12 },
//   { key: "music", name: "מוזיקה", icon: "🎵", defaultPct: 10 },
//   { key: "flowers", name: "פרחים", icon: "💐", defaultPct: 8 },
//   { key: "other", name: "שונות", icon: "✨", defaultPct: 10 },
// ];

// // export interface CategoryBudget {
// //   key: string;
// //   pct: number;
// //   stars: number;
// // }

// interface Props {
//   event: EventDtoo;
//   onBack: () => void;
//   onProceedToVendors: (budgets: category[]) => void;
// }

// const EventDetailPage = ({ event, onBack, onProceedToVendors }: Props) => {
//   const [categories, setCategories] = useState<category[]>([]);
//   const [budgets, setBudgets] = useState<category[]>(
//     // CATEGORIES.map((c) => ({ ...c, pct: c.defaultPct, stars: 3 })),
  
//   );

//   const totalPct = budgets.reduce((s, b) => s + b.pct, 0);
//   const remaining = event.totalBudget - (event.totalBudget * totalPct) / 100;

//   // const setPct = (key: string, pct: number) =>
//   //   setBudgets((p) => p.map((b) => (b.key === key ? { ...b, pct } : b)));
//   // const setStars = (key: string, stars: number) =>
//   //   setBudgets((p) => p.map((b) => (b.key === key ? { ...b, stars } : b)));
//   const setPct = (id: number, pct: number) =>
//   setBudgets((p) => p.map((b) => (b.categoryID === id ? { ...b, pct } : b)));

// const setStars = (id: number, stars: number) =>
//   setBudgets((p) => p.map((b) => (b.categoryID === id ? { ...b, stars } : b)));
//   const getAmount = (pct: number) =>
//     Math.round((event.totalBudget * pct) / 100).toLocaleString("he-IL");

//   return (
//     <>
//       <style>{pageStyles}</style>
//       <div className="detail-page" dir="rtl">
//         <div className="detail-bg-pattern" />
//         <header className="detail-header">
//           <div className="detail-header-left">
//             <div className="header-logo-icon">
//               <span className="header-logo-inner">✦</span>
//             </div>
//             <div>
//               <div className="header-title">Élite</div>
//               <div className="header-subtitle">תכנון אירוע</div>
//             </div>
//           </div>
//           <button className="btn-back" onClick={onBack}>
//             ← חזרה לאירועים
//           </button>
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
//                   <div className="stat-value">
//                     ₪{event.totalBudget.toLocaleString()}
//                   </div>
//                   <div className="stat-label">תקציב כולל</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-value">{event.guestCount}</div>
//                   <div className="stat-label">אורחים</div>
//                 </div>
//                 <div className="stat-item">
//                   <div className="stat-value">
//                     {new Date(event.eventDate).toLocaleDateString("he-IL", {
//                       day: "2-digit",
//                       month: "short",
//                     })}
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
//             <div
//               className={`budget-remaining ${remaining >= 0 ? "ok" : "over"}`}
//             >
//               {remaining >= 0
//                 ? `נותר: ₪${remaining.toLocaleString("he-IL")}`
//                 : `חריגה: ₪${Math.abs(remaining).toLocaleString("he-IL")}`}
//             </div>
//           </div>

//           <div className="categories-grid">
//             {CATEGORIES.map((cat, i) => {
//               const b = budgets.find((x) => x.key === cat.key)!;
//               return (
//                 <div
//                   className="category-card"
//                   key={cat.key}
//                   style={{ animationDelay: `${i * 0.07}s` }}
//                 >
//                   <div className="category-icon">{cat.icon}</div>
//                   <div className="category-name">{cat.name}</div>
//                   <div className="slider-row">
//                     <input
//                       type="range"
//                       className="budget-slider"
//                       min={0}
//                       max={60}
//                       step={1}
//                       value={b.pct}
//                       onChange={(e) => setPct(cat.key, Number(e.target.value))}
//                     />
//                     <div className="slider-pct">{b.pct}%</div>
//                   </div>
//                   <div className="category-amount">
//                     סכום: <span>₪{getAmount(b.pct)}</span>
//                   </div>
//                   <div className="stars-row">
//                     {[1, 2, 3, 4, 5].map((s) => (
//                       <span
//                         key={s}
//                         className={`star ${s <= b.stars ? "active" : ""}`}
//                         onClick={() => setStars(cat.key, s)}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="detail-actions">
//             <button className="btn-secondary" onClick={onBack}>
//               ביטול
//             </button>
//             <button
//               className="btn-primary"
//               onClick={() => onProceedToVendors(budgets)}
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
// src/pages/EventDetailPage.tsx
import { useState, useEffect } from "react";
import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";
import { type EventDtoo } from "../types/event";
import { type category } from "../types/category";
import { getCategories } from "../services/categoryService";

const pageStyles = `
html, body, #root {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
  .detail-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden;}
  .detail-bg-pattern{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0;}
  .detail-header{position:relative;z-index:2;padding:32px 48px 28px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);}
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
  .categories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}
  .category-card{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:28px;transition:border-color 0.3s;animation:fadeUp 0.4s ease forwards;opacity:0;}
  .category-card:hover{border-color:rgba(201,168,76,0.3);}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .category-name{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:${WHITE};letter-spacing:1px;margin-bottom:16px;}
  .slider-row{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
  .budget-slider{flex:1;-webkit-appearance:none;appearance:none;height:2px;background:rgba(201,168,76,0.15);outline:none;cursor:pointer;}
  .budget-slider::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:${GOLD};cursor:pointer;border:2px solid ${BLACK};box-shadow:0 0 8px rgba(201,168,76,0.4);}
  .slider-pct{font-family:'Cormorant Garamond',serif;font-size:20px;color:${GOLD};font-weight:300;min-width:44px;text-align:right;}
  .category-amount{font-size:11px;color:${GRAY};letter-spacing:1px;}
  .category-amount span{color:${GOLD_LIGHT};}
  .stars-row{display:flex;gap:6px;margin-top:12px;}
  .star{font-size:18px;cursor:pointer;color:rgba(201,168,76,0.2);transition:color 0.2s;}
  .star.active{color:${GOLD};}
  .star:hover{color:${GOLD_LIGHT};}
  .detail-actions{display:flex;gap:16px;margin-top:48px;justify-content:flex-end;flex-wrap:wrap;}
  .btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;}
  .btn-primary:hover{opacity:0.9;transform:translateY(-1px);}
  .btn-secondary{padding:14px 32px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
  .btn-secondary:hover{border-color:${GOLD};color:${GOLD};}
  .loading-spinner{width:32px;height:32px;border:2px solid rgba(201,168,76,0.1);border-top-color:${GOLD};border-radius:50%;animation:spin 0.8s linear infinite;margin:60px auto;}
  @keyframes spin{to{transform:rotate(360deg)}}
  @media(max-width:768px){.detail-header{padding:20px;flex-wrap:wrap;gap:16px;}.detail-content{padding:28px 16px;}.event-hero{padding:24px;}.event-hero-top{flex-direction:column;}.categories-grid{grid-template-columns:1fr;}.detail-actions{flex-direction:column;}}
`;

export interface CategoryBudget {
  categoryID: number;
  categoryName: string;
  pct: number;
  stars: number;
}

interface Props {
  event: EventDtoo;
  onBack: () => void;
  onProceedToVendors: (budgets: CategoryBudget[]) => void;
}

const EventDetailPage = ({ event, onBack, onProceedToVendors }: Props) => {
  // ── שלב 2: state + שליפה מהשרת ──────────────────────────
  const [budgets, setBudgets] = useState<CategoryBudget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((data: category[]) => {
      setBudgets(
        data.map((c) => ({
          categoryID: c.categoryID,
          categoryName: c.categoryName,
          pct: 10,
          stars: 3,
        }))
      );
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ── חישובים ──────────────────────────────────────────────
  const totalPct = budgets.reduce((s, b) => s + b.pct, 0);
  const remaining = event.totalBudget - (event.totalBudget * totalPct) / 100;

  // ── שלב 4: עדכון לפי categoryID ──────────────────────────
  const setPct = (id: number, pct: number) =>
    setBudgets((p) => p.map((b) => (b.categoryID === id ? { ...b, pct } : b)));

  const setStars = (id: number, stars: number) =>
    setBudgets((p) => p.map((b) => (b.categoryID === id ? { ...b, stars } : b)));

  const getAmount = (pct: number) =>
    Math.round((event.totalBudget * pct) / 100).toLocaleString("he-IL");

  return (
    <>
      <style>{pageStyles}</style>
      <div className="detail-page" dir="rtl">
        <div className="detail-bg-pattern" />
        <header className="detail-header">
          <div className="detail-header-left">
            <div className="header-logo-icon"><span className="header-logo-inner">✦</span></div>
            <div>
              <div className="header-title">Élite</div>
              <div className="header-subtitle">תכנון אירוע</div>
            </div>
          </div>
          <button className="btn-back" onClick={onBack}>← חזרה לאירועים</button>
        </header>

        <main className="detail-content">
          <div className="event-hero">
            <div className="event-hero-top">
              <div>
                <div className="event-type-badge">אירוע</div>
                <div className="event-hero-name">{event.eventName}</div>
              </div>
              <div className="event-hero-stats">
                <div className="stat-item">
                  <div className="stat-value">₪{event.totalBudget.toLocaleString()}</div>
                  <div className="stat-label">תקציב כולל</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{event.guestCount}</div>
                  <div className="stat-label">אורחים</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">
                    {new Date(event.eventDate).toLocaleDateString("he-IL", { day:"2-digit", month:"short" })}
                  </div>
                  <div className="stat-label">תאריך</div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-title">חלוקת תקציב</div>

          <div className="budget-total-bar">
            <div>
              <div className="budget-total-label">סה"כ מוקצה</div>
              <div className="budget-total-value">{totalPct}%</div>
            </div>
            <div className={`budget-remaining ${remaining >= 0 ? "ok" : "over"}`}>
              {remaining >= 0
                ? `נותר: ₪${remaining.toLocaleString("he-IL")}`
                : `חריגה: ₪${Math.abs(remaining).toLocaleString("he-IL")}`}
            </div>
          </div>

          {/* ── שלב 3: render מהשרת ── */}
          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <div className="categories-grid">
              {budgets.map((b, i) => (
                <div
                  className="category-card"
                  key={b.categoryID}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="category-name">{b.categoryName}</div>
                  <div className="slider-row">
                    <input
                      type="range"
                      className="budget-slider"
                      min={0} max={60} step={1}
                      value={b.pct}
                      onChange={(e) => setPct(b.categoryID, Number(e.target.value))}
                    />
                    <div className="slider-pct">{b.pct}%</div>
                  </div>
                  <div className="category-amount">
                    סכום: <span>₪{getAmount(b.pct)}</span>
                  </div>
                  <div className="stars-row">
                    {[1,2,3,4,5].map((s) => (
                      <span
                        key={s}
                        className={`star ${s <= b.stars ? "active" : ""}`}
                        onClick={() => setStars(b.categoryID, s)}
                      >★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="detail-actions">
            <button className="btn-secondary" onClick={onBack}>ביטול</button>
            <button className="btn-primary" onClick={() => onProceedToVendors(budgets)}>
              המשך לבחירת ספקים ←
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default EventDetailPage;