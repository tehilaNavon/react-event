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
