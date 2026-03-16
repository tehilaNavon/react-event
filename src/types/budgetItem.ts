export interface BudgetItem {
  budgetItemID: number;   // ← camelCase
  eventID: number;
  categoryID: number;     // ← c קטנה!
  plannedAmount: number;  // ← p קטנה!
  actualAmount: number;
  isIgnore: boolean;      // ← i קטנה!
  isLocked: boolean;
  vendorID: number;
  allCategory?: {
    categoryID: number;
    categoryName: string;
  };
}


export interface BudgetItemPayload {
  budgetItemID: number;
  eventID: number;
  categoryID: number;
  plannedAmount: number;
  actualAmount: number;
  isIgnore: boolean;
  isLocked: boolean;
  vendorID: number | null;
}

export interface CategoryBudget {
  categoryID: number;
  categoryName: string;
  plannedAmount: number;
  currentAmount: number;
  min: number;
  max: number;
  minLoading: boolean;
  locked: boolean;
  ignored: boolean;
  selected: boolean;
  vendorLocked?: boolean; // ← חדש
  selectedVendorName?: string;
}

