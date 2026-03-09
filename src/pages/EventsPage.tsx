// src/pages/EventsPage.tsx
import  { useEffect, useState } from "react";
import { getEvents, createEvent, deleteEvent, getEventTypes,getEventById  } from "../services/eventService";
import { type EventDtoo, type EventCreateDto, type EventTypeDtoo } from "../types/event";
import { getToken } from "../services/authService";
import { GOLD, GOLD_LIGHT, GOLD_DARK, BLACK, CARD, WHITE, GRAY } from "../styles/theme";

// ── decode userID from token ──────────────────────────────
const getUserIdFromToken = (): number => {
  try {
    const token = getToken();
    if (!token) return 0;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId ?? payload.UserID ?? payload.sub ?? 0;
  } catch {
    return 0;
  }
};

// ── Styles ────────────────────────────────────────────────
const pageStyles = `
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

// ── Component ─────────────────────────────────────────────
interface EventsPageProps {
  onLogout: () => void;
  onSelectEvent: (event: EventDtoo) => void;
}

const EventsPage = ({ onLogout, onSelectEvent }: EventsPageProps) => {
  const [events, setEvents] = useState<EventDtoo[]>([]);
  const [eventTypes, setEventTypes] = useState<EventTypeDtoo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  const [form, setForm] = useState<EventCreateDto>({
    eventName: "",
    eventDate: "",
    userID: getUserIdFromToken(),
    eventTypeID: 0,
    totalBudget: 0,
    guestCount: 0,
  });

  // ── Fetch on mount ──
  useEffect(() => {
    fetchEvents();
    fetchEventTypes();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const data = await getEventTypes();
      setEventTypes(data);
      // set default selection to first type
      if (data.length > 0) {
        setForm((prev) => ({ ...prev, eventTypeID: Number(data[0].eventTypeID) }));
      }
    } catch (err) {
      console.error("Failed to load event types", err);
    }
  };

  // ── Create event ──
  const handleSubmit = async () => {
    if (!form.eventName || !form.eventDate) {
      setModalError("נא למלא שם ותאריך לאירוע.");
      return;
    }
    setSubmitting(true);
    setModalError("");
    try {
      const newEvent = await createEvent(form);
      setEvents((prev) => [...prev, newEvent]);
      setShowModal(false);
      resetForm();
    } catch (err) {
      setModalError("שגיאה ביצירת האירוע. נסי שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete event ──
  const handleDelete = async (id: number) => {
    if (!window.confirm("האם למחוק את האירוע?")) return;
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.eventID !== id));
    } catch {
      alert("שגיאה במחיקת האירוע.");
    }
  };

  const resetForm = () => {
    setForm({
      eventName: "",
      eventDate: "",
      userID: getUserIdFromToken(),
      eventTypeID: eventTypes.length > 0 ? eventTypes[0].eventTypeID : 0,
      totalBudget: 0,
      guestCount: 0,
    });
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("he-IL", { day: "2-digit", month: "long", year: "numeric" });
  };

  const getTypeName = (typeId: string) =>
    eventTypes.find((t) => String(t.eventTypeID) === String(typeId))?.eventTypeName ?? "אירוע";

  return (
    <>
      <style>{pageStyles}</style>
      <div className="events-page" dir="rtl">
        <div className="events-bg-pattern" />

        {/* Header */}
        <header className="events-header">
          <div className="events-header-left">
            <div className="header-logo-icon">
              <span className="header-logo-inner">✦</span>
            </div>
            <div>
              <div className="header-title">Élite</div>
              <div className="header-subtitle">ניהול אירועים</div>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-add" onClick={() => setShowModal(true)}>
              + אירוע חדש
            </button>
            <button className="btn-logout" onClick={onLogout}>
              יציאה
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="events-content">
          {loading ? (
            <div className="events-loading">
              <div className="loading-spinner" />
              <div className="loading-text">טוען אירועים</div>
            </div>
          ) : (
            <>
              <div className="events-section-title">
                האירועים שלך ({events.length})
              </div>
              <div className="events-grid">
                {events.length === 0 ? (
                  <div className="events-empty">
                    <div className="events-empty-icon">✦</div>
                    <div className="events-empty-title">אין אירועים עדיין</div>
                    <div className="events-empty-sub">לחצי על + אירוע חדש כדי להתחיל</div>
                  </div>
                ) : (
                  events.map((event, i) => (
                    <div
                      className="event-card"
                      key={event.eventID}
                      style={{ animationDelay: `${i * 0.08}s` }}
                      onClick={async () => {
                      const full = await getEventById(event.eventID);
                      onSelectEvent(full);
                    }}
                    >
                      <div className="card-type-badge">
                        {getTypeName(event.eventTypeID)}
                      </div>
                      <div className="card-name">{event.eventName}</div>
                      <div className="card-details">
                        <div className="card-detail">
                          <span className="card-detail-icon">📅</span>
                          {formatDate(event.eventDate)}
                        </div>
                        <div className="card-detail">
                          <span className="card-detail-icon">👥</span>
                          {event.guestCount} אורחים
                        </div>
                      </div>
                      <div className="card-footer">
                        <div>
                          <div className="card-budget">
                            ₪{event.totalBudget.toLocaleString()}
                          </div>
                          <div className="card-budget-label">תקציב כולל</div>
                        </div>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(event.eventID)}
                          title="מחק אירוע"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </main>

        {/* Add Event Modal */}
        {showModal && (
          <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <div className="modal">
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              <div className="modal-title">אירוע חדש</div>
              <div className="modal-subtitle">מלאי את פרטי האירוע</div>

              <div className="form-group-modal">
                <label>שם האירוע</label>
                <input
                  type="text"
                  placeholder="חתונת דנה ואלון"
                  value={form.eventName}
                  onChange={(e) => setForm({ ...form, eventName: e.target.value })}
                />
              </div>

              <div className="form-group-modal">
                <label>תאריך</label>
                <input
                  type="date"
                  value={form.eventDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                />
              </div>

              <div className="form-group-modal">
                <label>סוג אירוע</label>
                <select
                  value={form.eventTypeID}
                  onChange={(e) => setForm({ ...form, eventTypeID: Number(e.target.value) })}
                >
                  {eventTypes.map((type) => (
                    <option key={type.eventTypeID} value={type.eventTypeID}>
                      {type.eventTypeName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-grid">
                <div className="form-group-modal">
                  <label>תקציב (₪)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={form.totalBudget || ""}
                    min="10000"
                    onChange={(e) => setForm({ ...form, totalBudget: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group-modal">
                  <label>מספר אורחים</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={form.guestCount || ""}
                    min="100"
                    onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })}
                  />
                </div>
              </div>

              {modalError && <div className="modal-error">{modalError}</div>}

              <div className="modal-actions">
                <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "שומר..." : "צור אירוע"}
                </button>
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsPage;