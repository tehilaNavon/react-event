// src/services/vendorService.ts
import { type VendorDtoo } from "../types/vendor";
import { authFetch } from "./authService";

// שליפת כל הספקים
export const getVendors = async (): Promise<VendorDtoo[]> => {
  const res = await authFetch("/Vendor");
  if (!res.ok) throw new Error("Failed to fetch vendors");
  return res.json();
};

// שליפת ספקים לפי קטגוריה
export const getVendorsByCategory = async (categoryID: number): Promise<VendorDtoo[]> => {
  const res = await authFetch(`/Vendor?id=${categoryID}`);
  if (!res.ok) throw new Error("Failed to fetch vendors");
  return res.json();
};
export const saveSelectedVendors = async (eventId: number, vendorIds: number[]) => {
  console.log("Saving selected vendors for event", eventId, ":", vendorIds);
  await authFetch(`/vendor/event/${eventId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vendorIds),
  });
};

// src/services/vendorService.ts  (הוסיפי את אלה)

// export async function saveSelectedVendors(
//   eventID: number,
//   vendorIds: number[]
// ): Promise<void> {
//   await fetch(`/events/${eventID}/vendors`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ vendorIds }),
//   });
// }

// // קריאה לפרוצדורה — מוסיף משימות לספק בודד
// export async function insertTasksForVendor(
//   eventID: number,
//   vendorID: number,
//   categoryID: number
// ): Promise<void> {
//   await authFetch(`/tasks/generate`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ eventID, vendorID, categoryID }),
//   });
// }

export async function insertTasksForVendor(
  eventID: number,
  vendorID: number,
): Promise<void> {
  await authFetch(`/Tasks/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId: eventID, vendorId: vendorID }), // ← תואם ל-DTO
  });
}

export async function getBusyVendors(
  categoryId: number,
  eventDate: string,
  currentEventId: number
): Promise<number[]> {
  const res = await authFetch(
    `/Vendor/busy?categoryId=${categoryId}&eventDate=${eventDate}&currentEventId=${currentEventId}`
  );
  if (!res.ok) throw new Error("שגיאה בטעינת ספקים תפוסים");
  return res.json();
}