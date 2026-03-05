export const GOLD = "#C9A84C";
export const GOLD_LIGHT = "#E8C96A";
export const GOLD_DARK = "#8B6914";
export const BLACK = "#0A0A0A";
export const CARD = "#161616";
export const WHITE = "#F5F0E8";
export const GRAY = "#888";

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    min-height: 100vh;
  }

  body {
    background: ${BLACK};
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ── Layout ─────────────────────────────────────── */
  .app {
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    background: ${BLACK};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    position: relative;
    overflow-x: hidden;
  }

  .bg-pattern {
    position: fixed;
    inset: 0;
    background-image:
      repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px),
      repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px);
    pointer-events: none;
    z-index: 0;
  }

  .bg-glow {
    position: fixed;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: min(600px, 100vw);
    height: min(600px, 100vw);
    background: radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Card ────────────────────────────────────────── */
  .card {
    background: ${CARD};
    border: 1px solid rgba(201,168,76,0.25);
    width: 100%;
    max-width: 460px;
    padding: 56px 48px;
    position: relative;
    z-index: 1;
    box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(201,168,76,0.1) inset;
    animation: fadeUp 0.6s ease forwards;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Logo ────────────────────────────────────────── */
  .logo { text-align: center; margin-bottom: 40px; }

  .logo-icon {
    width: 52px; height: 52px;
    margin: 0 auto 16px;
    border: 1px solid ${GOLD};
    display: flex; align-items: center; justify-content: center;
    transform: rotate(45deg);
  }

  .logo-icon-inner { transform: rotate(-45deg); color: ${GOLD}; font-size: 20px; }

  .logo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 300;
    color: ${WHITE}; letter-spacing: 4px; text-transform: uppercase;
  }

  .logo-sub {
    font-size: 10px; letter-spacing: 6px;
    color: ${GOLD}; text-transform: uppercase;
    margin-top: 6px; font-weight: 400;
  }

  /* ── Form elements ───────────────────────────────── */
  .form-group { margin-bottom: 24px; }

  label {
    display: block; font-size: 10px; letter-spacing: 3px;
    text-transform: uppercase; color: ${GOLD};
    margin-bottom: 10px; font-weight: 500;
  }

  input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 14px 18px;
    color: ${WHITE};
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s, background 0.3s;
    letter-spacing: 0.5px;
    -webkit-appearance: none;
    border-radius: 0;
  }

  input::placeholder { color: rgba(245,240,232,0.25); }

  input:focus {
    border-color: ${GOLD};
    background: rgba(201,168,76,0.04);
  }

  .btn {
    width: 100%; padding: 16px;
    background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
    border: none; color: ${BLACK};
    font-family: 'Montserrat', sans-serif;
    font-size: 11px; letter-spacing: 4px;
    text-transform: uppercase; font-weight: 600;
    cursor: pointer; margin-top: 8px;
    transition: opacity 0.3s, transform 0.2s;
    position: relative; overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .btn:hover  { opacity: 0.9; transform: translateY(-1px); }
  .btn:active { transform: translateY(0); opacity: 0.85; }

  .btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  .btn:hover::after { transform: translateX(100%); }

  .divider {
    display: flex; align-items: center; gap: 16px;
    margin: 28px 0;
    color: rgba(201,168,76,0.3);
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  }

  .divider::before, .divider::after {
    content: ''; flex: 1; height: 1px;
    background: rgba(201,168,76,0.2);
  }

  .footer-text {
    text-align: center; font-size: 11px;
    color: rgba(245,240,232,0.3);
    margin-top: 28px; letter-spacing: 1px;
  }

  .error-msg {
    font-size: 11px; color: #e07070;
    margin-top: 8px; letter-spacing: 1px;
  }

  /* ── Success ─────────────────────────────────────── */
  .success-screen {
    text-align: center; padding: 20px 0;
    animation: fadeUp 0.5s ease forwards;
  }

  .success-icon {
    width: 64px; height: 64px;
    border: 2px solid ${GOLD}; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px; color: ${GOLD}; font-size: 28px;
  }

  .success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 300;
    color: ${WHITE}; letter-spacing: 3px; margin-bottom: 12px;
  }

  .success-sub { font-size: 12px; color: ${GRAY}; letter-spacing: 2px; }

  /* ── Tablet / small screens (≤ 600px) ───────────── */
  @media (max-width: 600px) {
    .app {
      align-items: flex-start;
      padding: 32px 0 40px;
    }

    .card {
      padding: 40px 24px;
      border-left: none;
      border-right: none;
      max-width: 100%;
      box-shadow: none;
    }

    .logo { margin-bottom: 28px; }
    .logo-title { font-size: 22px; letter-spacing: 3px; }
    .logo-sub   { font-size: 9px; letter-spacing: 4px; }

    .form-group { margin-bottom: 20px; }
    input { padding: 13px 14px; }
    .btn  { padding: 15px; }
  }

  /* ── Small phone (≤ 380px) ───────────────────────── */
  @media (max-width: 380px) {
    .card { padding: 32px 16px; }
    .logo-title { font-size: 20px; }
    .logo-icon  { width: 44px; height: 44px; }
    .logo-sub   { letter-spacing: 3px; }
  }

  /* ── Large desktop (≥ 1200px) ───────────────────── */
  @media (min-width: 1200px) {
    .card { max-width: 500px; padding: 64px 56px; }
    .logo-title { font-size: 32px; }
  }
`;
