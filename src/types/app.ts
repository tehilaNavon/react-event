import type { BudgetItem, CategoryBudget } from "./budgetItem";
import type { EventDtoo } from "./event";

export interface SelectedVendor {
  id: number;
  name: string;
}

export interface AppState {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEvent: EventDtoo | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventDtoo | null>>;
  budgets: BudgetItem[];
  setBudgets: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
  savedBudgets: CategoryBudget[];
  setSavedBudgets: React.Dispatch<React.SetStateAction<CategoryBudget[]>>;
  selectedVendors: Record<number, SelectedVendor>;
  setSelectedVendors: React.Dispatch<React.SetStateAction<Record<number, SelectedVendor>>>;
  handleVendorSelected: (categoryID: number, price: number, vendorName?: string) => void;
  handleLogout: () => void;
}