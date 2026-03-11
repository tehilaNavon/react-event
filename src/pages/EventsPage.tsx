// src/pages/EventsPage.tsx
import  { useEffect, useState } from "react";
import { getEvents, createEvent, deleteEvent, getEventTypes,getEventById  } from "../services/eventService";
import { type EventDtoo, type EventCreateDto, type EventTypeDtoo } from "../types/event";
import { getToken } from "../services/authService";
import { pageStyles } from "../styles/EventStyle";

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