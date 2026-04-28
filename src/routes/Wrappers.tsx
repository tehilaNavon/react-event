import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  setSelectedEvent,
  setSavedBudgets,
  setSelectedVendors,
  setBudgets,
  vendorSelected,
  logout,
} from "../store/appSlice";
import EventsPage from "../pages/EventsPage";
import EventDetailPage from "../pages/BudgetItemsPage";
import VendorsPage from "../pages/VendorsPage";
import TasksPage from "../pages/TasksPage";
import type { BudgetItem, CategoryBudget } from "../types/budgetItem";
import { getEventById } from "../services/eventService";
import { logoutUser } from "../services/authService";
import type { EventDtoo } from "../types/event";
import type { SelectedVendor } from "../types/app";

// ─────────────────────────────────────────────────────────────────────────────
// buildStateFromEvent
// בונה את ה-State הדרוש מתוך אירוע שחזר מהשרת
// ─────────────────────────────────────────────────────────────────────────────
export const buildStateFromEvent = (event: EventDtoo) => {
  const savedSelected: Record<number, SelectedVendor> = {};
  event.vendors?.forEach((v) => {
    savedSelected[v.categoryID] = { id: v.vendorID, name: v.businessName };
  });

  const initial: CategoryBudget[] = (event.budgetItems ?? []).map((item) => {
    const savedVendor = savedSelected[item.categoryID];
    const vendorData = event.vendors?.find(
      (v) => v.categoryID === item.categoryID,
    );
    const vendorPrice = vendorData
      ? item.categoryID === 3
        ? vendorData.basePrice * event.guestCount
        : vendorData.basePrice
      : item.plannedAmount;
    return {
      categoryID: item.categoryID,
      categoryName:
        item.allCategory?.categoryName ?? `קטגוריה ${item.categoryID}`,
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
// Custom hook — טוען אירוע מהשרת אם ה-State ריק (רענון דף)
// ─────────────────────────────────────────────────────────────────────────────
const useLoadEvent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { eventId } = useParams<{ eventId: string }>();
  const selectedEvent = useSelector(
    (state: RootState) => state.app.selectedEvent,
  );
  const isCorrectEvent = selectedEvent?.eventID === Number(eventId);
  const [loading, setLoading] = useState(!isCorrectEvent);

  useEffect(() => {
    if (isCorrectEvent) return;
    if (!eventId) {
      navigate("/events");
      return;
    }

    getEventById(Number(eventId))
      .then((event) => {
        const { savedSelected, initial } = buildStateFromEvent(event);
        dispatch(setSelectedEvent(event));
        dispatch(setSelectedVendors(savedSelected));
        dispatch(setSavedBudgets(initial));
      })
      .catch(() => navigate("/events"))
      .finally(() => setLoading(false));
  }, [eventId]);

  // return { loading, selectedEvent };
  return { loading, selectedEvent: isCorrectEvent ? selectedEvent : null };
};

// ─────────────────────────────────────────────────────────────────────────────
// Wrappers
// מתרגמים בין עולם הראוטר לבין ה-props שהדפים מצפים לקבל
// ─────────────────────────────────────────────────────────────────────────────

export const EventsPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
  };

  return (
    <EventsPage
      onLogout={handleLogout}
      onSelectEvent={(event) => {
        const { savedSelected, initial } = buildStateFromEvent(event);
        dispatch(setSelectedEvent(event));
        dispatch(setSelectedVendors(savedSelected));
        dispatch(setSavedBudgets(initial));
        navigate(`/events/${event.eventID}`);
      }}
    />
  );
};

export const EventDetailPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, selectedEvent } = useLoadEvent();
  const savedBudgets = useSelector(
    (state: RootState) => state.app.savedBudgets,
  );

  if (loading) return null;
  if (!selectedEvent) return <Navigate to="/events" replace />;

  return (
    <EventDetailPage
      event={selectedEvent}
      initialBudgets={savedBudgets}
      onBack={() => navigate("/events")}
      onProceedToVendors={(b) => {
        const formattedBudgets: BudgetItem[] = b.map((item) => {
          // מוצאים את הפריט המקורי כדי לשמור על ה-ID שלו
          const originalItem = selectedEvent.budgetItems?.find(
            (oi) => oi.categoryID === item.categoryID,
          );

          return {
            // שדות שקיימים ב-CategoryBudget וצריך למפות:
            categoryID: item.categoryID,
            plannedAmount: item.plannedAmount,
            actualAmount: item.currentAmount, // מיפוי שם שונה
            isLocked: item.locked, // מיפוי שם שונה
            isIgnore: item.ignored, // מיפוי שם שונה

            // שדות שחסרים ב-CategoryBudget וחייבים להגיע מה-Event או מהמקור:
            budgetItemID: originalItem?.budgetItemID ?? 0,
            eventID: selectedEvent.eventID,
            vendorID: originalItem?.vendorID ?? 0,

            // אופציונלי: שמירה על אובייקט הקטגוריה אם הוא קיים
            allCategory: originalItem?.allCategory,
          };
        });
        dispatch(setBudgets(formattedBudgets));
        navigate(`/events/${selectedEvent.eventID}/vendors`);
      }}
      // onProceedToVendors={(b) => {
      //   dispatch(setBudgets(b));
      //   navigate(`/events/${selectedEvent.eventID}/vendors`);
      // }}
      onEventUpdate={(updatedBudgets) => {
        dispatch(setSavedBudgets(updatedBudgets));
        dispatch(
          setSelectedEvent({
            ...selectedEvent,
            budgetItems: selectedEvent.budgetItems?.map((item) => {
              const updated = updatedBudgets.find(
                (b) => b.categoryID === item.categoryID,
              );
              return updated
                ? { ...item, plannedAmount: updated.currentAmount }
                : item;
            }),
          }),
        );
      }}
    />
  );
};

export const VendorsPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, selectedEvent } = useLoadEvent();
  const budgets = useSelector((state: RootState) => state.app.budgets);
  const selectedVendors = useSelector(
    (state: RootState) => state.app.selectedVendors,
  );

  if (loading) return null;
  if (!selectedEvent) return <Navigate to="/events" replace />;

  const activeBudgets =
    budgets.length > 0
      ? budgets
      : (selectedEvent.budgetItems ?? []).filter((b) => !b.isIgnore);

  return (
    <VendorsPage
      event={selectedEvent}
      budgets={activeBudgets}
      initialSelected={selectedVendors}
      onSaveSelected={(v) => dispatch(setSelectedVendors(v))}
      onBack={() => navigate(`/events/${selectedEvent.eventID}`)}
      onVendorSelected={(categoryID, price, vendorName) =>
        dispatch(
          vendorSelected({
            categoryID,
            price,
            vendorName,
            totalBudget: selectedEvent.totalBudget,
          }),
        )
      }
      onProceedToTasks={(v) => {
        dispatch(setSelectedVendors(v));
        navigate(`/events/${selectedEvent.eventID}/tasks`);
      }}
    />
  );
};

export const TasksPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, selectedEvent } = useLoadEvent();
  const selectedVendors = useSelector(
    (state: RootState) => state.app.selectedVendors,
  );

  if (loading) return null;
  if (!selectedEvent) return <Navigate to="/events" replace />;

  return (
    <TasksPage
      event={selectedEvent}
      selectedVendors={selectedVendors}
      onBack={() => navigate(`/events/${selectedEvent.eventID}/vendors`)}
      onFinish={() => {
        dispatch(setSelectedEvent(null));
        navigate("/events");
      }}
    />
  );
};
