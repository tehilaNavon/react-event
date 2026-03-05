// src/pages/VendorsPage.tsx
import { useState, useEffect } from "react";
import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";
import { type category } from "../types/category";
import { type EventDtoo } from "../types/event";
import { type VendorDtoo } from "../types/vendor";
import { getVendorsByCategory } from "../services/vendorService";

const pageStyles = `
html, body, #root {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden;
}
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
  .vendors-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden;}
  .vendors-bg{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0;}
  .vendors-header{position:relative;z-index:2;padding:32px 48px 28px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);}
  .vendors-header-left{display:flex;align-items:center;gap:20px;}
  .header-logo-icon{width:40px;height:40px;border:1px solid ${GOLD};display:flex;align-items:center;justify-content:center;transform:rotate(45deg);flex-shrink:0;}
  .header-logo-inner{transform:rotate(-45deg);color:${GOLD};font-size:16px;}
  .header-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:${WHITE};letter-spacing:4px;text-transform:uppercase;}
  .header-subtitle{font-size:10px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-top:2px;}
  .btn-back{padding:12px 24px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
  .btn-back:hover{border-color:${GOLD};color:${GOLD};}
  .vendors-content{position:relative;z-index:1;padding:48px;max-width:1200px;margin:0 auto;}
  .section-title{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:${GOLD};letter-spacing:6px;text-transform:uppercase;margin-bottom:32px;display:flex;align-items:center;gap:16px;}
  .section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent);}
  .category-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px;}
  .tab{padding:10px 20px;background:transparent;border:1px solid rgba(201,168,76,0.2);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;display:flex;flex-direction:column;align-items:center;}
  .tab.active{background:linear-gradient(135deg,${GOLD_DARK},${GOLD});color:${BLACK};border-color:transparent;font-weight:600;}
  .tab:hover:not(.active){border-color:${GOLD};color:${GOLD};}
  .tab-budget{font-size:9px;color:inherit;opacity:0.7;margin-top:2px;}
  .vendors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;}
  .vendor-card{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:32px;position:relative;transition:all 0.3s;cursor:pointer;animation:fadeUp 0.4s ease forwards;opacity:0;}
  .vendor-card:hover{border-color:rgba(201,168,76,0.35);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,0.5);}
  .vendor-card.selected{border-color:${GOLD};background:rgba(201,168,76,0.05);}
  .vendor-card.selected::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${GOLD},transparent);}
  .vendor-card.over-budget{opacity:0.45;cursor:not-allowed;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .vendor-selected-badge{position:absolute;top:16px;left:16px;background:${GOLD};color:${BLACK};font-size:9px;letter-spacing:2px;padding:3px 10px;font-weight:600;}
  .vendor-over-badge{position:absolute;top:16px;left:16px;background:rgba(224,112,112,0.15);color:#e07070;font-size:9px;letter-spacing:2px;padding:3px 10px;border:1px solid rgba(224,112,112,0.3);}
  .vendor-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:${WHITE};letter-spacing:1px;margin-bottom:8px;margin-top:8px;}
  .vendor-price{font-family:'Cormorant Garamond',serif;font-size:24px;color:${GOLD};font-weight:300;margin-bottom:4px;}
  .vendor-price-label{font-size:9px;color:${GRAY};letter-spacing:2px;margin-bottom:12px;}
  .vendor-empty{text-align:center;padding:60px 20px;grid-column:1/-1;}
  .vendor-empty-icon{font-size:32px;color:rgba(201,168,76,0.2);margin-bottom:16px;}
  .vendor-empty-text{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;color:rgba(245,240,232,0.3);letter-spacing:3px;}
  .selected-summary{background:${CARD};border:1px solid rgba(201,168,76,0.2);padding:28px;margin-top:48px;position:relative;}
  .selected-summary::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${GOLD},transparent);}
  .summary-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;color:${WHITE};letter-spacing:3px;margin-bottom:20px;}
  .summary-list{display:flex;flex-wrap:wrap;gap:12px;}
  .summary-chip{background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);padding:8px 16px;font-size:11px;color:${GOLD};letter-spacing:1px;}
  .vendors-actions{display:flex;gap:16px;margin-top:32px;justify-content:flex-end;flex-wrap:wrap;}
  .btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;}
  .btn-primary:hover{opacity:0.9;transform:translateY(-1px);}
  .btn-primary:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
  .btn-secondary{padding:14px 32px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;}
  .btn-secondary:hover{border-color:${GOLD};color:${GOLD};}
  .loading-spinner{width:32px;height:32px;border:2px solid rgba(201,168,76,0.1);border-top-color:${GOLD};border-radius:50%;animation:spin 0.8s linear infinite;margin:60px auto;}
  @keyframes spin{to{transform:rotate(360deg)}}
  @media(max-width:768px){.vendors-header{padding:20px;flex-wrap:wrap;gap:16px;}.vendors-content{padding:28px 16px;}.vendors-grid{grid-template-columns:1fr;}.vendors-actions{flex-direction:column;}}
`;

interface SelectedVendor { id: number; name: string; }

interface Props {
  event: EventDtoo;
  budgets: category[];
  onBack: () => void;
  onProceedToTasks: (selected: Record<number, SelectedVendor>) => void;
}

const VendorsPage = ({ event, budgets, onBack, onProceedToTasks }: Props) => {
  const [activeTab, setActiveTab] = useState<number>(budgets[0]?.categoryID ?? 0);
  const [vendors, setVendors] = useState<VendorDtoo[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [selected, setSelected] = useState<Record<number, SelectedVendor>>({});

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
    return b ? Math.round((event.totalBudget * b.pct) / 100) : 0;
  };

  const toggleVendor = (catID: number, vendor: { id: number; name: string }) => {
    setSelected((prev) =>
      prev[catID]?.id === vendor.id
        ? { ...prev, [catID]: { id: 0, name: "" } }
        : { ...prev, [catID]: vendor }
    );
  };

  const selectedCount = Object.values(selected).filter((v) => v?.id > 0).length;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="vendors-page" dir="rtl">
        <div className="vendors-bg" />
        <header className="vendors-header">
          <div className="vendors-header-left">
            <div className="header-logo-icon"><span className="header-logo-inner">✦</span></div>
            <div>
              <div className="header-title">Élite</div>
              <div className="header-subtitle">בחירת ספקים</div>
            </div>
          </div>
          <button className="btn-back" onClick={onBack}>← חזרה לתקציב</button>
        </header>

        <main className="vendors-content">
          <div className="section-title">בחר ספק לכל קטגוריה</div>

          {/* טאבים — לפי קטגוריות שנשלפו */}
          <div className="category-tabs">
            {budgets.map((cat) => (
              <button
                key={cat.categoryID}
                className={`tab ${activeTab === cat.categoryID ? "active" : ""}`}
                onClick={() => setActiveTab(cat.categoryID)}
              >
                {cat.categoryName}
                <div className="tab-budget">
                  ₪{getCategoryBudget(cat.categoryID).toLocaleString()}
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
                  const isOver = Number(v.basePrice) > budget;
                  const isSelected = selected[activeTab]?.id === v.vendorID;
                  return (
                    <div
                      key={v.vendorID}
                      className={`vendor-card ${isSelected ? "selected" : ""} ${isOver ? "over-budget" : ""}`}
                      style={{ animationDelay: `${i * 0.08}s` }}
                      onClick={() => !isOver && toggleVendor(activeTab, { id: v.vendorID, name: v.businessName })}
                    >
                      {isSelected && <div className="vendor-selected-badge">✓ נבחר</div>}
                      {isOver && !isSelected && <div className="vendor-over-badge">מעל תקציב</div>}
                      <div className="vendor-name">{v.businessName}</div>
                      <div className="vendor-price">₪{Number(v.basePrice).toLocaleString()}</div>
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
              <div className="summary-title">ספקים שנבחרו ({selectedCount})</div>
              <div className="summary-list">
                {budgets.map((cat) => {
                  const v = selected[cat.categoryID];
                  return v?.id > 0 ? (
                    <div key={cat.categoryID} className="summary-chip">
                      {cat.categoryName}: {v.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="vendors-actions">
            <button className="btn-secondary" onClick={onBack}>← חזרה</button>
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
