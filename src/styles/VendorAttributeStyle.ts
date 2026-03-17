import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";

const vendorAttributestyle=`.vendor-tooltip{
    position:absolute;
    bottom:calc(100% + 10px);
    right:50%;
    transform:translateX(50%);
    background:rgba(10,10,10,0.97);
    border:1px solid rgba(201,168,76,0.25);
    padding:16px 20px;
    min-width:200px;
    z-index:100;
    pointer-events:none;
    animation:fadeUp 0.18s ease forwards;
    box-shadow:0 16px 40px rgba(0,0,0,0.6);
  }
  .vendor-tooltip::before{
    content:'';
    position:absolute;
    top:0;left:0;right:0;
    height:1px;
    background:linear-gradient(90deg,transparent,${GOLD},transparent);
  }
  .vendor-tooltip::after{
    content:'';
    position:absolute;
    top:100%;
    right:50%;
    transform:translateX(50%);
    border:6px solid transparent;
    border-top-color:rgba(201,168,76,0.25);
  }
  .tooltip-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:16px;
    padding:5px 0;
    border-bottom:1px solid rgba(201,168,76,0.08);
  }
  .tooltip-row:last-child{border-bottom:none;}
  .tooltip-key{
    font-size:9px;
    letter-spacing:2px;
    text-transform:uppercase;
    color:${GRAY};
    font-family:'Montserrat',sans-serif;
  }
  .tooltip-val{
    font-family:'Cormorant Garamond',serif;
    font-size:16px;
    font-weight:300;
    color:${GOLD};
    letter-spacing:1px;
  }
  .tooltip-loading{
    font-size:9px;
    letter-spacing:3px;
    text-transform:uppercase;
    color:${GRAY};
    text-align:center;
    padding:4px 0;
  }
  .tooltip-empty{
    font-family:'Cormorant Garamond',serif;
    font-size:15px;
    font-weight:300;
    color:rgba(245,240,232,0.3);
    letter-spacing:2px;
    text-align:center;
  }`;

export default vendorAttributestyle;