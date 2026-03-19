// import React, { useState } from "react";
// import { type EventDtoo } from "./types/event";
// import type { BudgetItem, CategoryBudget } from "./types/budgetItem";
// import { redistributeBudget } from "./utils/budgetUtils";
// import { isAuthenticated, logoutUser } from "./services/authService";
// import AppRoutes from "./routes/AppRoutes";
// import type { AppState, SelectedVendor } from "./types/app";



// export const AppContext = React.createContext<AppState | null>(null);

// export const useAppContext = () => {
//   const ctx = React.useContext(AppContext);
//   if (!ctx) throw new Error("useAppContext must be used within AppProvider");
//   return ctx;
// };

// const App: React.FC = () => {
//   // בדיוק כמו המקור — useState עם isAuthenticated() כערך התחלתי
//   const [loggedIn, setLoggedIn] = useState<boolean>(isAuthenticated());
//   const [selectedEvent, setSelectedEvent] = useState<EventDtoo | null>(null);
//   const [budgets, setBudgets] = useState<BudgetItem[]>([]);
//   const [savedBudgets, setSavedBudgets] = useState<CategoryBudget[]>([]);
//   const [selectedVendors, setSelectedVendors] = useState<Record<number, SelectedVendor>>({});

//   const handleVendorSelected = (categoryID: number, price: number, vendorName?: string) => {
//     if (price === 0) {
//       setSavedBudgets((prev) =>
//         prev.map((b) =>
//           b.categoryID === categoryID
//             ? { ...b, locked: false, vendorLocked: false, selectedVendorName: undefined }
//             : b,
//         ),
//       );
//     } else {
//       setSavedBudgets((prev) => {
//         const withNewAmount = prev.map((b) =>
//           b.categoryID === categoryID
//             ? { ...b, currentAmount: price, locked: false, vendorLocked: false }
//             : b,
//         );
//         const redistributed = redistributeBudget(
//           withNewAmount,
//           categoryID,
//           price,
//           selectedEvent!.totalBudget,
//         );
//         return redistributed.map((b) =>
//           b.categoryID === categoryID
//             ? { ...b, locked: true, vendorLocked: true, selectedVendorName: vendorName }
//             : b,
//         );
//       });
//     }
//   };

//   const handleLogout = () => {
//     logoutUser(); // מוחק את הטוקן מה-localStorage
//     setLoggedIn(false); // מעדכן את ה-State — הגארדים יגיבו
//     setSelectedEvent(null);
//     setSavedBudgets([]);
//     setSelectedVendors({});
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         loggedIn,
//         setLoggedIn,
//         selectedEvent,
//         setSelectedEvent,
//         budgets,
//         setBudgets,
//         savedBudgets,
//         setSavedBudgets,
//         selectedVendors,
//         setSelectedVendors,
//         handleVendorSelected,
//         handleLogout,
//       }}
//     >
//       <AppRoutes />
//     </AppContext.Provider>
//   );
// };

// export default App;




import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

export default App;
