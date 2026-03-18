// src/styles/tasksStyles.ts

import {
  GOLD,
  GOLD_LIGHT,
  GOLD_DARK,
  BLACK,
  CARD,
  WHITE,
  GRAY,
} from "./theme";

export const tasksPageStyles = `
  html,body,#root{width:100%!important;max-width:100%!important;margin:0!important;padding:0!important;overflow-x:hidden}
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
  .tasks-page{width:100%;min-height:100vh;background:${BLACK};font-family:'Montserrat',sans-serif;position:relative;overflow-x:hidden}
  .tasks-bg{position:fixed;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px),repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(201,168,76,0.03) 40px,rgba(201,168,76,0.03) 41px);pointer-events:none;z-index:0}
  .tasks-header{position:relative;z-index:2;padding:32px 48px 28px;border-bottom:1px solid rgba(201,168,76,0.15);display:flex;align-items:center;justify-content:space-between;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px)}
  .tasks-header-left{display:flex;align-items:center;gap:20px}
  .header-logo-icon{width:40px;height:40px;border:1px solid ${GOLD};display:flex;align-items:center;justify-content:center;transform:rotate(45deg);flex-shrink:0}
  .header-logo-inner{transform:rotate(-45deg);color:${GOLD};font-size:16px}
  .header-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:${WHITE};letter-spacing:4px;text-transform:uppercase}
  .header-subtitle{font-size:10px;letter-spacing:4px;color:${GOLD};text-transform:uppercase;margin-top:2px}
  .btn-back{padding:12px 24px;background:transparent;border:1px solid rgba(201,168,76,0.3);color:${GRAY};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s}
  .btn-back:hover{border-color:${GOLD};color:${GOLD}}
  .tasks-content{position:relative;z-index:1;padding:48px;max-width:1000px;margin:0 auto}
  .section-title{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;color:${GOLD};letter-spacing:6px;text-transform:uppercase;margin-bottom:32px;display:flex;align-items:center;gap:16px}
  .section-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.3),transparent)}
  .progress-bar-wrap{background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.1);padding:20px 28px;margin-bottom:40px;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
  .progress-label{font-size:10px;letter-spacing:3px;color:${GRAY};text-transform:uppercase;min-width:80px}
  .progress-track{flex:1;height:3px;background:rgba(201,168,76,0.1);min-width:120px}
  .progress-fill{height:100%;background:linear-gradient(90deg,${GOLD_DARK},${GOLD_LIGHT});transition:width 0.5s ease}
  .progress-pct{font-family:'Cormorant Garamond',serif;font-size:22px;color:${GOLD};font-weight:300;min-width:50px}
  .tasks-list{display:flex;flex-direction:column;gap:12px}
  .task-item{background:${CARD};border:1px solid rgba(201,168,76,0.12);padding:20px 24px;display:flex;align-items:center;gap:16px;transition:all 0.3s;animation:fadeUp 0.4s ease forwards;opacity:0;cursor:pointer}
  .task-item:hover{border-color:rgba(201,168,76,0.25)}
  .task-item.done{opacity:0.5}
  .task-item.overdue{border-color:rgba(224,112,112,0.3)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .task-checkbox{width:20px;height:20px;border:1px solid rgba(201,168,76,0.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s}
  .task-item.done .task-checkbox{background:${GOLD};border-color:${GOLD}}
  .task-check-icon{color:${BLACK};font-size:12px;font-weight:700}
  .task-cat-icon{font-size:18px;flex-shrink:0}
  .task-body{flex:1}
  .task-title{font-size:13px;color:${WHITE};letter-spacing:0.5px;transition:all 0.3s}
  .task-item.done .task-title{text-decoration:line-through;color:${GRAY}}
  .task-vendor{font-size:10px;color:${GOLD};letter-spacing:1px;margin-top:4px}
  .task-due{font-size:9px;color:${GRAY};letter-spacing:1px;margin-top:2px}
  .task-priority{font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:3px 10px;border:1px solid;flex-shrink:0}
  .task-priority.high{color:#e07070;border-color:rgba(224,112,112,0.3)}
  .task-priority.medium{color:${GOLD};border-color:rgba(201,168,76,0.3)}
  .task-priority.low{color:${GRAY};border-color:rgba(136,136,136,0.3)}
  .tasks-done-screen{text-align:center;padding:60px 20px;animation:fadeUp 0.5s ease forwards}
  .done-icon{width:72px;height:72px;border:2px solid ${GOLD};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;color:${GOLD};font-size:32px}
  .done-title{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:${WHITE};letter-spacing:3px;margin-bottom:12px}
  .done-sub{font-size:12px;color:${GRAY};letter-spacing:2px}
  .btn-primary{padding:14px 40px;background:linear-gradient(135deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT});border:none;color:${BLACK};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;cursor:pointer;transition:opacity 0.3s,transform 0.2s;margin-top:32px}
  .btn-primary:hover{opacity:0.9;transform:translateY(-1px)}
  .add-task-section{margin-top:40px;border-top:1px solid rgba(201,168,76,0.1);padding-top:32px}
  .add-task-row{display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end}
  .add-task-input{flex:1;min-width:200px;background:rgba(201,168,76,0.03);border:1px solid rgba(201,168,76,0.2);padding:12px 16px;color:${WHITE};font-family:'Montserrat',sans-serif;font-size:12px;outline:none;transition:border 0.3s}
  .add-task-input:focus{border-color:rgba(201,168,76,0.5)}
  .add-task-input::placeholder{color:${GRAY};font-size:11px}
  .add-task-select{background:rgba(201,168,76,0.03);border:1px solid rgba(201,168,76,0.2);padding:12px 16px;color:${WHITE};font-family:'Montserrat',sans-serif;font-size:11px;outline:none;cursor:pointer;min-width:140px}
  .add-task-select option{background:#1a1a1a}
  .btn-add{padding:12px 28px;background:transparent;border:1px solid rgba(201,168,76,0.4);color:${GOLD};font-family:'Montserrat',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;white-space:nowrap}
  .btn-add:hover{background:rgba(201,168,76,0.08);border-color:${GOLD}}
  .btn-add:disabled{opacity:0.4;cursor:not-allowed}
  .loading-spinner{display:flex;align-items:center;justify-content:center;padding:60px;color:${GOLD};font-size:12px;letter-spacing:3px}
  .error-msg{padding:20px;border:1px solid rgba(224,112,112,0.3);color:#e07070;font-size:11px;text-align:center;letter-spacing:1px}
  @media(max-width:768px){
    .tasks-header{padding:20px;flex-wrap:wrap;gap:16px}
    .tasks-content{padding:28px 16px}
    .task-item{padding:16px;flex-wrap:wrap}
    .add-task-row{flex-direction:column}
  }
`;
