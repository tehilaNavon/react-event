import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../App";
import EventsPage from "../pages/EventsPage";
import EventDetailPage from "../pages/BudgetItemsPage";
import VendorsPage from "../pages/VendorsPage";
import TasksPage from "../pages/TasksPage";
import type { CategoryBudget } from "../types/budgetItem";
import { getEventById } from "../services/eventService";
import type { EventDtoo } from "../types/event";

interface SelectedVendor {
  id: number;
  name: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// buildStateFromEvent
// מקבלת אירוע מהשרת ובונה את ה-State הדרוש לכל העמודים:
// savedSelected — מילון { categoryID → ספק נבחר }
// initial       — מערך CategoryBudget לכל קטגוריה
// ─────────────────────────────────────────────────────────────────────────────
export const buildStateFromEvent = (event: EventDtoo) => {
  const savedSelected: Record<number, SelectedVendor> = {};
  event.vendors?.forEach((v) => {
    savedSelected[v.categoryID] = { id: v.vendorID, name: v.businessName };
  });

  const initial: CategoryBudget[] = (event.budgetItems ?? []).map((item) => {
    const savedVendor = savedSelected[item.categoryID];
    const vendorData = event.vendors?.find((v) => v.categoryID === item.categoryID);
    const vendorPrice = vendorData
      ? item.categoryID === 3
        ? vendorData.basePrice * event.guestCount
        : vendorData.basePrice
      : item.plannedAmount;
    return {
      categoryID: item.categoryID,
      categoryName: item.allCategory?.categoryName ?? `קטגוריה ${item.categoryID}`,
      plannedAmount: item.plannedAmount,
      currentAmount: savedVendor ? vendorPrice : item.plannedAmount,
      minLoading: !savedVendor,
      min: 0,
      max: item.plannedAmount * 2 || 10000,
      locked: !!savedVendor,
      vendorLocked: !!savedVendor,
      selectedVendorName: savedVendor?.name,
      ignored: item.isIgnore ?? false,
      selected: false,
    };
  });

  return { savedSelected, initial };
};

// ─────────────────────────────────────────────────────────────────────────────
// useLoadEvent
// Custom hook משותף לכל ה-wrappers שצריכים לטעון אירוע מהשרת בעת רענון
// ─────────────────────────────────────────────────────────────────────────────
const useLoadEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { selectedEvent, setSelectedEvent, setSavedBudgets, setSelectedVendors } = useAppContext();
  const [loading, setLoading] = useState(!selectedEvent);

  useEffect(() => {
    if (selectedEvent) return;
    if (!eventId) { navigate("/events"); return; }

    getEventById(Number(eventId))
      .then((event) => {
        const { savedSelected, initial } = buildStateFromEvent(event);
        setSelectedEvent(event);
        setSelectedVendors(savedSelected);
        setSavedBudgets(initial);
      })
      .catch(() => navigate("/events"))
      .finally(() => setLoading(false));
  }, [eventId]);

  return { loading, selectedEvent };
};

// ─────────────────────────────────────────────────────────────────────────────
// Wrappers
// כל wrapper מתרגם בין עולם הראוטר (useNavigate, useParams)
// לבין ה-props שהדפים המקוריים מצפים לקבל
// ─────────────────────────────────────────────────────────────────────────────

export const EventsPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedEvent, setSavedBudgets, setSelectedVendors, handleLogout } = useAppContext();

  return (
    <EventsPage
      onLogout={handleLogout}
      onSelectEvent={(event) => {
        const { savedSelected, initial } = buildStateFromEvent(event);
        setSelectedEvent(event);
        setSelectedVendors(savedSelected);
        setSavedBudgets(initial);
        navigate(`/events/${event.eventID}`);
      }}
    />
  );
};

export const EventDetailPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { loading, selectedEvent } = useLoadEvent();
  const { savedBudgets, setSavedBudgets, setBudgets, setSelectedEvent } = useAppContext();

  if (loading) return null;
  if (!selectedEvent) return <Navigate to="/events" replace />;

  return (
    <EventDetailPage
      event={selectedEvent}
      initialBudgets={savedBudgets}
      onBack={() => navigate("/events")}
      onProceedToVendors={(b) => {
        setBudgets(b);
        navigate(`/events/${selectedEvent.eventID}/vendors`);
      }}
      onEventUpdate={(updatedBudgets) => {
        setSavedBudgets(updatedBudgets);
        setSelectedEvent((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            budgetItems: prev.budgetItems?.map((item) => {
              const updated = updatedBudgets.find((b) => b.categoryID === item.categoryID);
              return updated ? { ...item, plannedAmount: updated.currentAmount } : item;
            }),
          };
        });
      }}
    />
  );
};

export const VendorsPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { loading, selectedEvent } = useLoadEvent();
  const { budgets, selectedVendors, setSelectedVendors, handleVendorSelected } = useAppContext();

  if (loading) return null;
  if (!selectedEvent) return <Navigate to="/events" replace />;

  const activeBudgets = budgets.length > 0
    ? budgets
    : (selectedEvent.budgetItems ?? []).filter((b) => !b.isIgnore);

  return (
    <VendorsPage
      event={selectedEvent}
      budgets={activeBudgets}
      initialSelected={selectedVendors}
      onSaveSelected={(v) => setSelectedVendors(v)}
      onBack={() => navigate(`/events/${selectedEvent.eventID}`)}
      onVendorSelected={handleVendorSelected}
      onProceedToTasks={(v) => {
        setSelectedVendors(v);
        navigate(`/events/${selectedEvent.eventID}/tasks`);
      }}
    />
  );
};

export const TasksPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const { loading, selectedEvent } = useLoadEvent();
  const { selectedVendors, setSelectedEvent } = useAppContext();

  if (loading) return null;
  if (!selectedEvent) return <Navigate to="/events" replace />;

  return (
    <TasksPage
      event={selectedEvent}
      selectedVendors={selectedVendors}
      onBack={() => navigate(`/events/${selectedEvent.eventID}/vendors`)}
      onFinish={() => {
        setSelectedEvent(null);
        navigate("/events");
      }}
    />
  );
};
