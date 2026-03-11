import { authFetch } from "./authService";
import { type CategoryBudget } from "../pages/BudgetItemsPage"; // adjust path as needed
import { type EventDtoo } from "../types/event";
import type { BudgetItemPayload } from "../types/budgetItem";
import { getCategories } from "./categoryService";

export const fetchCategoryPriceRange = async (
  categoryID: number,
  fallbackMax: number,
): Promise<{ min: number; max: number }> => {
  const [minRes, maxRes] = await Promise.all([
    authFetch(`/Vendor/minPrice/${categoryID}`).then((r) => r.json()),
    authFetch(`/Vendor/maxPrice/${categoryID}`).then((r) => r.json()),
  ]);

  return {
    min: Number(minRes) || 0,
    max: Number(maxRes) || fallbackMax,
  };
};


export const buildBudgetPayload =async (
  budgets: CategoryBudget[],
  event: EventDtoo,
): Promise<BudgetItemPayload[]> => {
  const allCategories = await getCategories();
  
const enrichedBudgets = budgets.map((item) => ({
  ...item,
  allCategory: allCategories.find(c => c.categoryID === item.categoryID),
}));
  console.log(allCategories)
  return budgets.map((b) => {
    const originalItem = event.budgetItems?.find(
      (item) => item.categoryID === b.categoryID,
    );

    return {
      budgetItemID: originalItem?.budgetItemID || 0,
      eventID: event.eventID,
      categoryID: b.categoryID,
      plannedAmount: b.currentAmount,
      actualAmount: originalItem?.actualAmount ?? 0,
      isIgnore: b.ignored,
      isLocked: b.locked,
    
      vendorID: originalItem?.vendorID || null,
    };
  });
};

export const saveAllBudgetItems = async (
  payload: BudgetItemPayload[],
): Promise<void> => {
  const response = await authFetch(`/BudgetItem/UpdateMultiple`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Failed to save all items");
};
