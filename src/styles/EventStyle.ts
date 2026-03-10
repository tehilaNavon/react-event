import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";

export const pageStyles = `
  html, body, #root {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden;
  }

  .events-page {
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    background: ${BLACK};
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .events-bg-pattern {
    position: fixed; inset: 0;
    background-image:
      repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px),
      repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(201,168,76,0.03) 40px, rgba(201,168,76,0.03) 41px);
    pointer-events: none; z-index: 0;
  }

  /* ── Header ── */
  .events-header {
    position: relative; z-index: 2;
    padding: 32px 48px 28px;
    border-bottom: 1px solid rgba(201,168,76,0.15);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(10,10,10,0.95);
    backdrop-filter: blur(12px);
  }

  .events-header-left { display: flex; align-items: center; gap: 20px; }

  .header-logo-icon {
    width: 40px; height: 40px;
    border: 1px solid ${GOLD};
    display: flex; align-items: center; justify-content: center;
    transform: rotate(45deg); flex-shrink: 0;
  }

  .header-logo-inner { transform: rotate(-45deg); color: ${GOLD}; font-size: 16px; }

  .header-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 300;
    color: ${WHITE}; letter-spacing: 4px; text-transform: uppercase;
  }

  .header-subtitle {
    font-size: 10px; letter-spacing: 4px;
    color: ${GOLD}; text-transform: uppercase; margin-top: 2px;
  }

  .header-actions { display: flex; align-items: center; gap: 16px; }

  .btn-add {
    padding: 12px 28px;
    background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
    border: none; color: ${BLACK};
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;
    cursor: pointer; transition: opacity 0.3s, transform 0.2s;
    position: relative; overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  .btn-add:hover { opacity: 0.9; transform: translateY(-1px); }

  .btn-logout {
    padding: 12px 20px;
    background: transparent;
    border: 1px solid rgba(201,168,76,0.3); color: ${GRAY};
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: all 0.3s;
  }

  .btn-logout:hover { border-color: ${GOLD}; color: ${GOLD}; }

  /* ── Content ── */
  .events-content {
    position: relative; z-index: 1;
    padding: 48px;
    max-width: 1400px; margin: 0 auto;
  }

  .events-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px; font-weight: 400;
    color: ${GOLD}; letter-spacing: 6px; text-transform: uppercase;
    margin-bottom: 32px;
    display: flex; align-items: center; gap: 16px;
  }

  .events-section-title::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent);
  }

  /* ── Cards Grid ── */
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .event-card {
    background: ${CARD};
    border: 1px solid rgba(201,168,76,0.15);
    padding: 32px;
    position: relative;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
    animation: cardIn 0.5s ease forwards;
    opacity: 0;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .event-card:hover {
    border-color: rgba(201,168,76,0.4);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }

  .event-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
    opacity: 0; transition: opacity 0.3s;
  }

  .event-card:hover::before { opacity: 1; }

  .card-type-badge {
    display: inline-block;
    font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
    color: ${GOLD}; border: 1px solid rgba(201,168,76,0.3);
    padding: 4px 12px; margin-bottom: 16px;
  }

  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 300;
    color: ${WHITE}; letter-spacing: 1px;
    margin-bottom: 20px; line-height: 1.3;
  }

  .card-details { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }

  .card-detail {
    display: flex; align-items: center; gap: 10px;
    font-size: 11px; color: ${GRAY}; letter-spacing: 1px;
  }

  .card-detail-icon { color: ${GOLD}; font-size: 13px; width: 16px; text-align: center; }

  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 20px;
    border-top: 1px solid rgba(201,168,76,0.1);
  }

  .card-budget {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; color: ${GOLD}; font-weight: 300;
  }

  .card-budget-label { font-size: 9px; color: ${GRAY}; letter-spacing: 2px; margin-top: 2px; }

  .btn-delete {
    background: none; border: none;
    color: rgba(255,255,255,0.2); font-size: 14px;
    cursor: pointer; padding: 8px;
    transition: color 0.3s;
  }

  .btn-delete:hover { color: #e07070; }

  /* ── Empty state ── */
  .events-empty {
    text-align: center; padding: 80px 20px;
    grid-column: 1 / -1;
  }

  .events-empty-icon { font-size: 40px; color: rgba(201,168,76,0.2); margin-bottom: 20px; }

  .events-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px; font-weight: 300;
    color: rgba(245,240,232,0.3); letter-spacing: 3px; margin-bottom: 8px;
  }

  .events-empty-sub { font-size: 11px; color: ${GRAY}; letter-spacing: 2px; }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(0,0,0,0.85);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    animation: overlayIn 0.2s ease;
    backdrop-filter: blur(4px);
  }

  @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: ${CARD};
    border: 1px solid rgba(201,168,76,0.25);
    width: 100%;
    max-width: 560px;
    padding: 48px 40px;
    position: relative;
    animation: modalIn 0.3s ease;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .modal::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent);
  }

  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 300;
    color: ${WHITE}; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px;
  }

  .modal-subtitle {
    font-size: 10px; letter-spacing: 3px;
    color: ${GOLD}; text-transform: uppercase; margin-bottom: 36px;
  }

  .modal-close {
    position: absolute; top: 20px; right: 20px;
    background: none; border: none;
    color: ${GRAY}; font-size: 18px; cursor: pointer;
    transition: color 0.3s; line-height: 1; padding: 4px 8px;
  }

  .modal-close:hover { color: ${WHITE}; }

  .modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    align-items: start;
    width: 100%;
    overflow: hidden;
  }
  .modal-grid .form-group-modal {
    margin-bottom: 0;
    min-width: 0;
    overflow: hidden;
  }

  @media (max-width: 560px) {
    .modal-grid { grid-template-columns: 1fr; }
  }
  .form-group-modal { margin-bottom: 20px; }

  .form-group-modal label {
    display: block; font-size: 10px; letter-spacing: 3px;
    text-transform: uppercase; color: ${GOLD};
    margin-bottom: 8px; font-weight: 500;
  }

  .form-group-modal input,
  .form-group-modal select {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 12px 16px;
    color: ${WHITE};
    font-family: 'Montserrat', sans-serif;
    font-size: 14px; font-weight: 300;
    outline: none;
    transition: border-color 0.3s;
    -webkit-appearance: none;
    border-radius: 0;
    box-sizing: border-box;
    min-width: 0;
  }

  .form-group-modal select option { background: #1a1a1a; color: ${WHITE}; }
  .form-group-modal input:focus,
  .form-group-modal select:focus { border-color: ${GOLD}; }
  .form-group-modal input::placeholder { color: rgba(245,240,232,0.2); }

  .modal-actions { display: flex; gap: 12px; margin-top: 32px; }

  .btn-submit {
    flex: 1; padding: 14px;
    background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
    border: none; color: ${BLACK};
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;
    cursor: pointer; transition: opacity 0.3s;
  }

  .btn-submit:hover { opacity: 0.9; }
  .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-cancel {
    padding: 14px 24px;
    background: transparent;
    border: 1px solid rgba(201,168,76,0.2); color: ${GRAY};
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: all 0.3s;
  }

  .btn-cancel:hover { border-color: ${GOLD}; color: ${WHITE}; }

  .modal-error { font-size: 11px; color: #e07070; margin-top: 12px; letter-spacing: 1px; }

  /* ── Loading ── */
  .events-loading {
    display: flex; align-items: center; justify-content: center;
    min-height: 60vh; flex-direction: column; gap: 20px;
  }

  .loading-spinner {
    width: 40px; height: 40px;
    border: 2px solid rgba(201,168,76,0.1);
    border-top-color: ${GOLD};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text { font-size: 11px; letter-spacing: 4px; color: ${GRAY}; text-transform: uppercase; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .events-header { padding: 20px; flex-wrap: wrap; gap: 16px; }
    .events-content { padding: 28px 16px; }
    .events-grid { grid-template-columns: 1fr; }
    .modal { padding: 36px 24px; }
    .modal-grid { grid-template-columns: 1fr; }
  }
`;