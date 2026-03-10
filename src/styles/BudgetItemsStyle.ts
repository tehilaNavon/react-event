import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";


export const pageStyles = `
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
// .budget-slider{width:100%;-webkit-appearance:none;appearance:none;height:2px;outline:none;cursor:pointer;background:linear-gradient(90deg,${GOLD} var(--fill,0%),rgba(201,168,76,0.15) var(--fill,0%));}
.budget-slider{width:100%;-webkit-appearance:none;appearance:none;height:2px;outline:none;cursor:pointer;background:linear-gradient(90deg,rgba(201,168,76,0.15) calc(100% - var(--fill,0%)),${GOLD} calc(100% - var(--fill,0%)));}
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
