
import { useState, useEffect, useCallback } from "react";
import { type EventDtoo } from "../types/event";
import { type Task, type SelectedVendor, type Priority } from "../types/tasks";
import { fetchTasks, toggleTaskAPI, addCustomTaskAPI } from "../services/tasksService";
import { tasksPageStyles } from "../styles/TasksStyle";

// ─── Category config ──────────────────────────────────────────────────────────
const CAT_ICONS: Record<number, string> = {
  1: "📸", 2: "🏛️", 3: "🍽️", 4: "🎼", 5: "💐",
  6: "👰", 7: "💡", 8: "🎬", 9: "🎤", 10: "🍹",
  11: "🎆", 12: "🎧", 13: "🍬", 14: "🚌", 15: "🏨",
  16: "🎂", 17: "🌟",
};

const CAT_NAMES: Record<number, string> = {
  1: "צלם", 2: "אולם", 3: "קייטרינג", 4: "תזמורת", 5: "פרחים",
  6: "כסא כלה", 7: "תאורה", 8: "וידאו קליפ", 9: "בר משמחים", 10: "בר משקאות",
  11: "זיקוקים ואפקטים", 12: "DJ", 13: "בר מחתוקים", 14: "הסעות",
  15: "לינה לאורחים", 16: "עוגת אירוע", 17: "שרות",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  high: "דחוף",
  medium: "בינוני",
  low: "נמוך",
};


// ─── Priority helpers ─────────────────────────────────────────────────────────
function getPriority(dueDate?: string | null): Priority {
  if (!dueDate) return "low";
  const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86_400_000);
  if (days <= 5) return "high";
  if (days <= 14) return "medium";
  return "low";
}

function formatDue(dueDate?: string | null): string | null {
  if (!dueDate) return null;
  const days = Math.ceil((new Date(dueDate).getTime() - Date.now()) / 86_400_000);
  if (days < 0) return "באיחור!";
  if (days === 0) return "היום";
  if (days === 1) return "מחר";
  return `עוד ${days} ימים`;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  event: EventDtoo;
  selectedVendors: Record<string, SelectedVendor>;
  onBack: () => void;
  onFinish: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
const TasksPage = ({ event, onBack, onFinish }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);     // שגיאת הוספה בלבד
 
  // Add-task form state
  const [newDesc, setNewDesc] = useState("");
  const [newCatID, setNewCatID] = useState<number>(1);
  const [newDue, setNewDue] = useState("");
  const [adding, setAdding] = useState(false);

  // ── Load tasks from server ──
  useEffect(() => {
    setLoading(true);
    fetchTasks(event.eventID)
      .then(setTasks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [event.eventID]);

  // ── Toggle — optimistic update + server sync ──
  const toggle = useCallback(async (task: Task) => {
    const next = !task.isCompleted;
    setTasks((p) =>
      p.map((t) => (t.taskID === task.taskID ? { ...t, isCompleted: next } : t))
    );
    try {
      await toggleTaskAPI(task.taskID, next);
    } catch {
      // Rollback on failure
      setTasks((p) =>
        p.map((t) =>
          t.taskID === task.taskID ? { ...t, isCompleted: task.isCompleted } : t
        )
      );
    }
  }, []);
const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

const sortedTasks = [...tasks].sort((a, b) => {
  const pa = PRIORITY_ORDER[getPriority(a.dueDate)];
  const pb = PRIORITY_ORDER[getPriority(b.dueDate)];
  return pa - pb;
});
  // ── Add custom task ──
  const handleAdd = async () => {
    if (!newDesc.trim()) return;
    setAdding(true);
    setAddError(null); // נקה שגיאה קודמת
    try {
      const created = await addCustomTaskAPI({
        eventID: event.eventID,
        categoryID: newCatID,
        vendorID: null,
        vendorName: undefined,
        description: newDesc.trim(),
        isCompleted: false,
        dueDate: newDue || null,
        isCustom: true,
      });
      setTasks((p) => [...p, created]);
      setNewDesc("");
      setNewDue("");
    } catch (e: any) {
      setAddError(e.message);
    } finally {
      setAdding(false);
    }
  };

  const doneCount = tasks.filter((t) => t.isCompleted).length;
  const pct = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0;
  const allDone = doneCount === tasks.length && tasks.length > 0;

  return (
    <>
      <style>{tasksPageStyles}</style>
      <div className="tasks-page" dir="rtl">
        <div className="tasks-bg" />

        {/* Header */}
        <header className="tasks-header">
          <div className="tasks-header-left">
            <div className="header-logo-icon">
              <span className="header-logo-inner">✦</span>
            </div>
            <div>
              <div className="header-title">Élite</div>
              <div className="header-subtitle">משימות לאירוע</div>
            </div>
          </div>
          <button className="btn-back" onClick={onBack}>← חזרה לספקים</button>
        </header>

        <main className="tasks-content">
          <div className="section-title">
            {event.eventName} — משימות ({doneCount}/{tasks.length})
          </div>

          {loading && <div className="loading-spinner">טוען משימות...</div>}
          {error && <div className="error-msg">{error}</div>}

          {!loading && !error && (
            <>
              {/* Progress bar */}
              <div className="progress-bar-wrap">
                <div className="progress-label">התקדמות</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="progress-pct">{pct}%</div>
              </div>

              {allDone ? (
                <div className="tasks-done-screen">
                  <div className="done-icon">✓</div>
                  <div className="done-title">כל המשימות הושלמו!</div>
                  <div className="done-sub">האירוע מוכן — בהצלחה ✦</div>
                  <button className="btn-primary" onClick={onFinish}>
                    חזרה לאירועים ✦
                  </button>
                </div>
              ) : (
                <div className="tasks-list">
                  {sortedTasks.map((task, i) => {
                  {/* {tasks.map((task, i) => { */}
                    const priority = getPriority(task.dueDate);
                    const dueLabel = formatDue(task.dueDate);
                    const overdue =
                      task.dueDate &&
                      new Date(task.dueDate) < new Date() &&
                      !task.isCompleted;

                    return (
                      <div
                        key={task.taskID}
                        className={`task-item${task.isCompleted ? " done" : ""}${overdue ? " overdue" : ""}`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                        onClick={() => toggle(task)}
                      >
                        <div className="task-checkbox">
                          {task.isCompleted && (
                            <span className="task-check-icon">✓</span>
                          )}
                        </div>
                        <div className="task-cat-icon">
                          {task.categoryID ? (CAT_ICONS[task.categoryID] ?? "✦") : "✦"}
                        </div>
                        <div className="task-body">
                          <div className="task-title">{task.description}</div>
                          {task.vendorName && (
                            <div className="task-vendor">{task.vendorName}</div>
                          )}
                          {dueLabel && (
                            <div
                              className="task-due"
                              style={{ color: priority === "high" ? "#e07070" : undefined }}
                            >
                              {dueLabel}
                            </div>
                          )}
                        </div>
                        <div className={`task-priority ${priority}`}>
                          {PRIORITY_LABELS[priority]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add custom task */}
              <div className="add-task-section">
                <div className="section-title">הוספת משימה אישית</div>
                <div className="add-task-row">
                  <input
                    className="add-task-input"
                    placeholder="תיאור המשימה..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  />
                  <select
                    className="add-task-select"
                    value={newCatID}
                    onChange={(e) => setNewCatID(Number(e.target.value))}
                  >
                    {Object.entries(CAT_NAMES).map(([id, name]) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    className="add-task-input"
                    style={{ minWidth: "unset", width: "160px" }}
                    min={new Date().toISOString().split("T")[0]}
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                  />
                  <button
                    className="btn-add"
                    onClick={handleAdd}
                    disabled={adding || !newDesc.trim()}
                  >
                    {adding ? "שומר..." : "+ הוסף משימה"}
                  </button>
                </div>
                  {/* שגיאת הוספה — מוצגת מתחת לשורת הקלט בלבד */}
                {addError && (
                  <div className="error-msg" style={{ marginTop: "12px" }}>
                    {addError}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default TasksPage;