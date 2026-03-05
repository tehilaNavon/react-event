import type { category } from "../types/category";
import { authFetch } from "./authService";



export const getCategories = async (): Promise<category[]> => {
  const res = await authFetch("/Category");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

