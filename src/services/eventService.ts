// src/services/eventService.ts
import { authFetch } from "./authService";
import {
  type EventDtoo,
  type EventCreateDto,
  type EventTypeDtoo,
} from "../types/event";

export const getEventTypes = async (): Promise<EventTypeDtoo[]> => {
  const res = await authFetch("/EventType");
  if (!res.ok) throw new Error("Failed to fetch event types");
  return res.json();
};
// export const getEvents = async (): Promise<EventDtoo[]> => {
//   const res = await authFetch("/Event");
//   if (!res.ok) throw new Error("Failed to fetch events");
//   return res.json();
// };
export const getEvents = async (): Promise<EventDtoo[]> => {
  const userID = JSON.parse(localStorage.getItem("user") || "{}").userID;
  const res = await authFetch(`/Event?id=${userID}`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

export const getEventById = async (id: number): Promise<EventDtoo> => {
  const res = await authFetch(`/Event/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

export const createEvent = async (
  event: EventCreateDto,
): Promise<EventDtoo> => {
  event.userID = JSON.parse(localStorage.getItem("user") || "{}").userID;
  event.eventTypeID = Number(event.eventTypeID); // ממיר לmumber לפני שליחה לשרת
  console.log("userID שנשלח:", event.userID); // הוסף את זה
  console.log("user בlocalStorage:", localStorage.getItem("user")); // וזה
  const res = await authFetch("/Event", {
    method: "POST",
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
};

export const deleteEvent = async (id: number): Promise<void> => {
  const res = await authFetch(`/Event/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete event");
};


export const updateEvent = async (
  id: number,
  event: EventDtoo,
): Promise<EventDtoo> => {
  const userID = JSON.parse(localStorage.getItem("user") || "{}").userID;

  const payload: EventDtoo = {
    eventID: id,
    eventName: event.eventName,
    eventDate: event.eventDate,
    userID: userID,
    eventTypeID: event.eventTypeID,
    totalBudget: event.totalBudget,
    guestCount: event.guestCount,
    // budgetItems: event.budgetItems ?? [],
    // vendors: event.vendors ?? [],
  };
  console.log("payload",payload)
  const res = await authFetch(`/Event/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update event");
  }
  return res.json();
};