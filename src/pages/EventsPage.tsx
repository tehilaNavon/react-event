// src/pages/EventsPage.tsx
import { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent, // ← הוסיפי
  getEventTypes,
  getEventById,
} from "../services/eventService";
import {
  type EventDtoo,
  type EventCreateDto,
  type EventTypeDtoo,
} from "../types/event";
import { getToken } from "../services/authService";
import { pageStyles } from "../styles/EventStyle";
import RegisterPage from "./RegisterPage";

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
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [form, setForm] = useState<EventCreateDto>({
    eventName: "",
    eventDate: "",
    userID: getUserIdFromToken(),
    eventTypeID: 0,
    totalBudget: 0,
    guestCount: 0,
  });
  // ── Edit modal state ──  ← חדש
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [submittingEdit, setSubmittingEdit] = useState(false);
  const [editModalError, setEditModalError] = useState("");
  const [showBudgetWarning, setShowBudgetWarning] = useState(false);
  const [showDateWarning, setShowDateWarning] = useState(false);
  const [editForm, setEditForm] = useState<EventDtoo>({
    eventID: 0,
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
        setForm((prev) => ({
          ...prev,
          eventTypeID: Number(data[0].eventTypeID),
        }));
      }
    } catch (err) {
      console.error("Failed to load event types", err);
    }
  };

  // ── Create event ──
  const handleSubmit = async () => {
    // בדיקות תקינות – זהות לשרת
    if (!form.eventName || form.eventName.trim() === "") {
      setModalError("שם אירוע חובה");
      return;
    }
    if (!form.eventDate || new Date(form.eventDate) <= new Date()) {
      setModalError("תאריך חייב להיות בעתיד");
      return;
    }
    if (form.totalBudget < 10000) {
      setModalError("תקציב חייב להיות לפחות 10,000 ₪");
      return;
    }
    if (form.guestCount < 30) {
      setModalError("מספר אורחים חייב להיות לפחות 30");
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
  // ── Submit update ──  ← חדש
  const handleUpdate = async () => {
    if (!editForm.eventName?.trim()) {
      setEditModalError("שם אירוע חובה");
      return;
    }
    if (!editForm.eventDate || new Date(editForm.eventDate) <= new Date()) {
      setEditModalError("תאריך חייב להיות בעתיד");
      return;
    }
    if (editForm.totalBudget < 10000) {
      setEditModalError("תקציב חייב להיות לפחות 10,000 ₪");
      return;
    }
    if (editForm.guestCount < 30) {
      setEditModalError("מספר אורחים חייב להיות לפחות 30");
      return;
    }
    if (!editingEventId) return;
    setSubmittingEdit(true);
    setEditModalError("");
    try {
      const dataToSend = {
        ...editForm,
        eventID: editingEventId,
        eventTypeID: Number(editForm.eventTypeID),
      };
      const updated = await updateEvent(editingEventId!, dataToSend);
      setEvents((prev) =>
        prev.map((e) => (e.eventID === editingEventId ? updated : e)),
      );
      closeEditModal();
      // fetchEvents(); // ריענון מלא כדי להביא את כל הנתונים המעודכנים
    } catch (err: any) {
      setEditModalError(err.message || "שגיאה בעדכון האירוע.");
    } finally {
      setSubmittingEdit(false);
    }
  };
  const getUserData = () => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return { name: "", email: "", phone: "" };
      const u = JSON.parse(stored);
      return {
        name: u.userName ?? "",
        email: u.userEmail ?? "",
        phone: u.userPhone ?? "",
      };
    } catch {
      return { name: "", email: "", phone: "" };
    }
  };
  const openEditModal = (e: React.MouseEvent, event: EventDtoo) => {
    e.stopPropagation(); // חשוב! מונע פתיחה של דף האירוע
    setEditingEventId(event.eventID);

    // טעינת הנתונים לתוך ה-form של העריכה
    setEditForm({
      ...event,
      eventDate: event.eventDate.split("T")[0], // פורמט תקין ל-input date
    });

    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setShowBudgetWarning(false);
    setShowDateWarning(false);
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
    return d.toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getTypeName = (typeId: number) =>
    eventTypes.find((t) => t.eventTypeID === typeId)?.eventTypeName ?? "אירוע";

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
            <button
              className="btn-profile"
              onClick={() => setShowProfileModal(true)}
            >
              👤 פרטים אישיים
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
                    <div className="events-empty-sub">
                      לחצי על + אירוע חדש כדי להתחיל
                    </div>
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
                      <div
                        className="card-footer"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <div className="card-budget">
                            ₪{event.totalBudget.toLocaleString()}
                          </div>
                          <div className="card-budget-label">תקציב כולל</div>
                        </div>

                        {/* כאן ההפרדה הקריטית */}
                        <div
                          style={{ display: "flex", gap: "15px" }}
                          onClick={(e) => e.stopPropagation()} // הגנה כפולה - מונע מהקליק "לברוח" לכרטיסייה
                        >
                          <button
                            type="button"
                            className="btn-edit"
                            style={{
                              cursor: "pointer",
                              background: "none",
                              border: "none",
                              fontSize: "1.2rem",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation(); // מונע פתיחה של דף האירוע
                              openEditModal(e, event);
                            }}
                            title="ערוך אירוע"
                          >
                            ✏️
                          </button>

                          <button
                            type="button"
                            className="btn-delete"
                            style={{
                              cursor: "pointer",
                              background: "none",
                              border: "none",
                              fontSize: "1.2rem",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation(); // מונע פתיחה של דף האירוע
                              handleDelete(event.eventID);
                            }}
                            title="מחק אירוע"
                          >
                            🗑
                          </button>
                        </div>
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
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
              <div className="modal-title">אירוע חדש</div>
              <div className="modal-subtitle">מלאי את פרטי האירוע</div>

              <div className="form-group-modal">
                <label>שם האירוע</label>
                <input
                  type="text"
                  placeholder="חתונת דנה ואלון"
                  value={form.eventName}
                  onChange={(e) =>
                    setForm({ ...form, eventName: e.target.value })
                  }
                />
              </div>

              <div className="form-group-modal">
                <label>תאריך</label>
                <input
                  type="date"
                  value={form.eventDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setForm({ ...form, eventDate: e.target.value })
                  }
                />
              </div>

              <div className="form-group-modal">
                <label>סוג אירוע</label>
                <select
                  value={form.eventTypeID}
                  onChange={(e) =>
                    setForm({ ...form, eventTypeID: Number(e.target.value) })
                  }
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
                    onChange={(e) =>
                      setForm({ ...form, totalBudget: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="form-group-modal">
                  <label>מספר אורחים</label>
                  <input
                    type="number"
                    placeholder="150"
                    value={form.guestCount || ""}
                    min="100"
                    onChange={(e) =>
                      setForm({ ...form, guestCount: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              {modalError && <div className="modal-error">{modalError}</div>}

              <div className="modal-actions">
                <button
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "שומר..." : "צור אירוע"}
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Edit Event Modal */}
        {showEditModal && (
          <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && closeEditModal()}
          >
            <div className="modal">
              <button className="modal-close" onClick={() => closeEditModal()}>
                ✕
              </button>
              <div className="modal-title">עדכון אירוע</div>
              <div className="modal-subtitle">
                ערוך את פרטי האירוע "{editForm.eventName}"
              </div>

              <div className="form-group-modal">
                <label>שם האירוע</label>
                <input
                  type="text"
                  value={editForm.eventName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, eventName: e.target.value })
                  }
                />
              </div>

              <div className="form-group-modal">
                <label>תאריך</label>
                <input
                  type="date"
                  value={editForm.eventDate}
                  // onChange={(e) =>
                  //   setEditForm({ ...editForm, eventDate: e.target.value })
                  // }
                  onChange={(e) => {
                    const newDate = e.target.value;
                    if (newDate !== editForm.eventDate)
                      setShowDateWarning(true);
                    else setShowDateWarning(false);
                    setEditForm({ ...editForm, eventDate: newDate });
                  }}
                />
                {showDateWarning && (
                  <div className="modal-warning">
                    ⚠️ שינוי תאריך יגרום למחיקת כל הספקים שנבחרו
                  </div>
                )}
              </div>

              <div className="form-group-modal">
                <label>סוג אירוע</label>
                {/* <select
                  value={editForm.eventTypeID}
                  onChange={(e) =>
                    setEditForm({ ...editForm, eventTypeID: e.target.value })
                  }
                >
                  {eventTypes.map((type) => (
                    <option key={type.eventTypeID} value={type.eventTypeID}>
                      {type.eventTypeName}
                    </option>
                  ))}
                </select> */}
                <select
                  value={editForm.eventTypeID}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      eventTypeID: Number(e.target.value),
                    })
                  }
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
                    value={editForm.totalBudget}
                    // onChange={(e) =>
                    //   setEditForm({
                    //     ...editForm,
                    //     totalBudget: Number(e.target.value),
                    //   })
                    // }
                    onChange={(e) => {
                      const newBudget = Number(e.target.value);
                      if (newBudget !== editForm.totalBudget)
                        setShowBudgetWarning(true);
                      else setShowBudgetWarning(false);
                      setEditForm({ ...editForm, totalBudget: newBudget });
                    }}
                  />
                  {showBudgetWarning && (
                    <div className="modal-warning">
                      ⚠️ שינוי תקציב יגרום למחיקת כל הספקים וחלוקת תקציב מחדש
                    </div>
                  )}
                </div>
                <div className="form-group-modal">
                  <label>מספר אורחים</label>
                  <input
                    type="number"
                    value={editForm.guestCount}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        guestCount: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {editModalError && (
                <div className="modal-error">{editModalError}</div>
              )}
              <button
                type="button" 
                className="btn-submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (showBudgetWarning || showDateWarning) {
                    const msg = showBudgetWarning
                      ? "שינוי תקציב ימחק את כל הספקים שנבחרו ויבצע חלוקת תקציב מחדש. להמשיך?"
                      : "שינוי תאריך ימחק את כל הספקים שנבחרו. להמשיך?";
                    if (!window.confirm(msg)) return;
                  }
                  handleUpdate();
                }}
                disabled={submittingEdit}
              >
                {submittingEdit ? "מעדכן..." : "שמור שינויים"}
              </button>
              <button className="btn-cancel" onClick={() => closeEditModal()}>
                ביטול
              </button>
            </div>
          </div>
        )}

        {showProfileModal && (
          <div
            className="modal-overlay"
            onClick={(e) =>
              e.target === e.currentTarget && setShowProfileModal(false)
            }
          >
            <div className="modal">
              <button
                className="modal-close"
                onClick={() => setShowProfileModal(false)}
              >
                ✕
              </button>
              <div className="modal-title">עדכון פרטים אישיים</div>
              <RegisterPage
                editMode={true}
                initialData={getUserData()}
                onSuccess={() => setShowProfileModal(false)}
                onGoLogin={() => {}}
                onCancel={() => setShowProfileModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsPage;
