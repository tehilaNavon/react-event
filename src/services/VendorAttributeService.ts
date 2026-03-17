import type { VendorAttributeDtoo } from "../types/VendorAttribute";
import { authFetch } from "./authService";




export const getBulkVendorAttributes = async (vendorIds: number[]) => {
  const res = await authFetch(`/VendorAttribute/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vendorIds),
  });
  if (!res.ok) return {};
  return res.json() as Promise<Record<number, VendorAttributeDtoo[]>>;
};