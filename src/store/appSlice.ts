import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type EventDtoo } from "../types/event";
import type { BudgetItem, CategoryBudget } from "../types/budgetItem";
import type { SelectedVendor } from "../types/app";
import { redistributeBudget } from "../utils/budgetUtils";
import { isAuthenticated } from "../services/authService";

interface AppState {
  loggedIn: boolean;
  selectedEvent: EventDtoo | null;
  budgets: BudgetItem[];
  savedBudgets: CategoryBudget[];
  selectedVendors: Record<number, SelectedVendor>;
}

const initialState: AppState = {
  loggedIn: isAuthenticated(),
  selectedEvent: null,
  budgets: [],
  savedBudgets: [],
  selectedVendors: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
    setSelectedEvent(state, action: PayloadAction<EventDtoo | null>) {
      state.selectedEvent = action.payload;
    },
    setBudgets(state, action: PayloadAction<BudgetItem[]>) {
      state.budgets = action.payload;
    },
    setSavedBudgets(state, action: PayloadAction<CategoryBudget[]>) {
      state.savedBudgets = action.payload;
    },
    setSelectedVendors(state, action: PayloadAction<Record<number, SelectedVendor>>) {
      state.selectedVendors = action.payload;
    },
    vendorSelected(
      state,
      action: PayloadAction<{ categoryID: number; price: number; vendorName?: string; totalBudget: number }>
    ) {
      const { categoryID, price, vendorName, totalBudget } = action.payload;
      if (price === 0) {
        state.savedBudgets = state.savedBudgets.map((b) =>
          b.categoryID === categoryID
            ? { ...b, locked: false, vendorLocked: false, selectedVendorName: undefined }
            : b,
        );
      } else {
        const withNewAmount = state.savedBudgets.map((b) =>
          b.categoryID === categoryID
            ? { ...b, currentAmount: price, locked: false, vendorLocked: false }
            : b,
        );
        const redistributed = redistributeBudget(withNewAmount, categoryID, price, totalBudget);
        state.savedBudgets = redistributed.map((b) =>
          b.categoryID === categoryID
            ? { ...b, locked: true, vendorLocked: true, selectedVendorName: vendorName }
            : b,
        );
      }
    },
    logout(state) {
      state.loggedIn = false;
      state.selectedEvent = null;
      state.budgets = [];
      state.savedBudgets = [];
      state.selectedVendors = {};
    },
  },
});

export const {
  setLoggedIn,
  setSelectedEvent,
  setBudgets,
  setSavedBudgets,
  setSelectedVendors,
  vendorSelected,
  logout,
} = appSlice.actions;

export default appSlice.reducer;
