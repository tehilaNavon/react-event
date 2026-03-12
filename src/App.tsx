// import React, { useState } from "react";
// import { globalStyles, GOLD } from "./styles/theme";
// import Logo from "./components/Logo";
// import SuccessScreen from "./components/SuccessScreen";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import EventsPage from "./pages/EventsPage";
// import { isAuthenticated, logoutUser } from "./services/authService";

// type Tab = "login" | "register";

// interface SuccessState {
//   mode: Tab;
//   email: string;
// }

// const App: React.FC = () => {
//   const [tab, setTab] = useState<Tab>("login");
//   const [success, setSuccess] = useState<SuccessState | null>(null);
//   const [loggedIn, setLoggedIn] = useState<boolean>(isAuthenticated());

//   const handleSuccess = (email: string) => {
//     setSuccess({ mode: tab, email });
//   };

//   const handleReturn = () => {
//     setSuccess(null);
//     setLoggedIn(true); // ← אחרי מסך ההצלחה עוברים לאירועים
//   };

//   const handleLogout = () => {
//     logoutUser();
//     setLoggedIn(false);
//     setSuccess(null);
//   };

//   // ── אם מחובר — הצג דף אירועים ──
//   if (loggedIn) {
//     return <EventsPage onLogout={handleLogout} />;
//   }

//   return (
//     <>
//       <style>{globalStyles}</style>
//       <div className="app">
//         <div className="bg-pattern" />
//         <div className="bg-glow" />

//         <div className="card">
//           {success ? (
//             <SuccessScreen
//               mode={success.mode}
//               email={success.email}
//               onReturn={handleReturn}
//             />
//           ) : (
//             <>
//               <Logo />

//               {/* Tabs */}
//               <div
//                 style={{
//                   display: "flex",
//                   marginBottom: 36,
//                   borderBottom: "1px solid rgba(201,168,76,0.2)",
//                 }}
//               >
//                 {(["login", "register"] as Tab[]).map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => setTab(t)}
//                     style={{
//                       flex: 1,
//                       padding: "12px 8px 14px",
//                       background: "none",
//                       border: "none",
//                       borderBottom: tab === t
//                         ? `2px solid ${GOLD}`
//                         : "2px solid transparent",
//                       marginBottom: -1,
//                       fontFamily: "'Montserrat', sans-serif",
//                       fontSize: 11,
//                       letterSpacing: 3,
//                       textTransform: "uppercase" as const,
//                       cursor: "pointer",
//                       color: tab === t ? GOLD : "#888",
//                       transition: "color 0.3s, border-color 0.3s",
//                       WebkitTapHighlightColor: "transparent",
//                     }}
//                   >
//                     {t === "login" ? "Sign In" : "Register"}
//                   </button>
//                 ))}
//               </div>

//               {tab === "login" ? (
//                 <LoginPage
//                   onSuccess={handleSuccess}
//                   onGoRegister={() => setTab("register")}
//                 />
//               ) : (
//                 <RegisterPage
//                   onSuccess={handleSuccess}
//                   onGoLogin={() => setTab("login")}
//                 />
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;
import React, { useState } from "react";
import { globalStyles, GOLD } from "./styles/theme";
import Logo from "./components/Logo";
import SuccessScreen from "./components/SuccessScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/BudgetItemsPage";
import type { category } from "./types/category";
import VendorsPage from "./pages/VendorsPage";
import TasksPage from "./pages/TasksPage";
import { isAuthenticated, logoutUser } from "./services/authService";
import { type EventDtoo } from "./types/event";
import type { BudgetItem } from "./types/budgetItem";
// הוסף את הטיפוס
import type { CategoryBudget } from "./pages/BudgetItemsPage";
import { redistributeBudget } from "./utils/budgetUtils";

type Tab = "login" | "register";
type Page = "events" | "detail" | "vendors" | "tasks";

interface SuccessState {
  mode: Tab;
  email: string;
}

interface SelectedVendor {
  id: number;
  name: string;
}

const App: React.FC = () => {
  // ── Auth state (זהה למקור) ──
  const [tab, setTab] = useState<Tab>("login");
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(isAuthenticated());
  const [savedBudgets, setSavedBudgets] = useState<CategoryBudget[]>([]);

  // ── Navigation state (חדש) ──
  const [page, setPage] = useState<Page>("events");
  const [selectedEvent, setSelectedEvent] = useState<EventDtoo | null>(null);
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<
    Record<number, SelectedVendor>
  >({});

  // ── Auth handlers (זהים למקור) ──
  const handleSuccess = (email: string) => {
    setSuccess({ mode: tab, email });
  };

  const handleReturn = () => {
    setSuccess(null);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    setSuccess(null);
    setPage("events");
    setSelectedEvent(null);
  };

  // const handleVendorSelected = (
  //   categoryID: number,
  //   price: number,
  //   vendorName?: string,
  // ) => {
  //   if (price === 0) {
  //     // ביטול ספק — שחרר נעילה ומחק שם
  //     setSavedBudgets((prev) =>
  //       prev.map((b) =>
  //         b.categoryID === categoryID
  //           ? {
  //               ...b,
  //               locked: false,
  //               vendorLocked: false,
  //               selectedVendorName: undefined,
  //             }
  //           : b,
  //       ),
  //     );
  //   } else {
  //     // בחירת ספק — נעל, שמור שם, וחלק יחסית לאחרים
  //     setSavedBudgets((prev) =>
  //       redistributeBudget(
  //         prev.map((b) =>
  //           b.categoryID === categoryID
  //             ? {
  //                 ...b,
  //                 locked: true,
  //                 vendorLocked: true,
  //                 selectedVendorName: vendorName,
  //               }
  //             : b,
  //         ),
  //         categoryID,
  //         price,
  //         selectedEvent!.totalBudget,
  //       ),
  //     );
  //   }
  // };
  const handleVendorSelected = (categoryID: number, price: number, vendorName?: string) => {
  if (price === 0) {
    setSavedBudgets((prev) =>
      prev.map((b) =>
        b.categoryID === categoryID
          ? { ...b, locked: false, vendorLocked: false, selectedVendorName: undefined }
          : b
      )
    );
  } else {
    setSavedBudgets((prev) => {
      // שלב 1 — עדכן את הסכום של הקטגוריה הנבחרת ללא נעילה עדיין
      const withNewAmount = prev.map((b) =>
        b.categoryID === categoryID
          ? { ...b, currentAmount: price,  locked: false, vendorLocked: false }
          : b
      );

      // שלב 2 — חלק את ההפרש לאחרים
      const redistributed = redistributeBudget(
        withNewAmount,
        categoryID,
        price,
        selectedEvent!.totalBudget,
      );

      // שלב 3 — עכשיו נעל
      return redistributed.map((b) =>
        b.categoryID === categoryID
          ? { ...b, locked: true, vendorLocked: true, selectedVendorName: vendorName }
          : b
      );
    });
  }
};
  // const handleVendorSelected = (categoryID: number, price: number) => {
  //   setSavedBudgets((prev) =>
  //     redistributeBudget(prev, categoryID, price, selectedEvent!.totalBudget)
  //   );
  // };
  // ── לא מחובר — זהה למקור לחלוטין ──
  if (!loggedIn) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="app">
          <div className="bg-pattern" />
          <div className="bg-glow" />
          <div className="card">
            {success ? (
              <SuccessScreen
                mode={success.mode}
                email={success.email}
                onReturn={handleReturn}
              />
            ) : (
              <>
                <Logo />
                <div
                  style={{
                    display: "flex",
                    marginBottom: 36,
                    borderBottom: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {(["login", "register"] as Tab[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      style={{
                        flex: 1,
                        padding: "12px 8px 14px",
                        background: "none",
                        border: "none",
                        borderBottom:
                          tab === t
                            ? `2px solid ${GOLD}`
                            : "2px solid transparent",
                        marginBottom: -1,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 11,
                        letterSpacing: 3,
                        textTransform: "uppercase" as const,
                        cursor: "pointer",
                        color: tab === t ? GOLD : "#888",
                        transition: "color 0.3s, border-color 0.3s",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {t === "login" ? "Sign In" : "Register"}
                    </button>
                  ))}
                </div>
                {tab === "login" ? (
                  <LoginPage
                    onSuccess={handleSuccess}
                    onGoRegister={() => setTab("register")}
                  />
                ) : (
                  <RegisterPage
                    onSuccess={handleSuccess}
                    onGoLogin={() => setTab("login")}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  // // ── מחובר — ניווט בין דפים ──
  // if (page === "detail" && selectedEvent) {
  //   return (
  //     <EventDetailPage
  //       event={selectedEvent}
  //       onBack={() => setPage("events")}
  //       onProceedToVendors={(b) => { setBudgets(b); setPage("vendors"); }}
  //     />
  //   );
  // }
  // אחרי:
  // if (page === "detail" && selectedEvent) {
  //   return (
  //     <EventDetailPage
  //       event={selectedEvent}
  //       onBack={() => setPage("events")}

  //       onProceedToVendors={(b) => {
  //         setBudgets(b);
  //         setPage("vendors");
  //       }}
  //       onEventUpdate={(updatedBudgets) => {
  //         setSelectedEvent((prev) => {
  //           if (!prev) return prev;
  //           return {
  //             ...prev,
  //             budgetItems: prev.budgetItems?.map((item) => {
  //               const updated = updatedBudgets.find(
  //                 (b) => b.categoryID === item.categoryID,
  //               );
  //               return updated
  //                 ? { ...item, plannedAmount: updated.currentAmount }
  //                 : item;
  //             }),
  //           };
  //         });
  //       }}
  //     />
  //   );
  // }
  // שנה את ה-EventDetailPage render:
  if (page === "detail" && selectedEvent) {
    return (
      <EventDetailPage
        event={selectedEvent}
        initialBudgets={savedBudgets} // ← חדש
        onBack={() => setPage("events")}
        onProceedToVendors={(b) => {
          setBudgets(b);
          setPage("vendors");
        }}
        onEventUpdate={(updatedBudgets) => {
          setSavedBudgets(updatedBudgets); // ← חדש
          setSelectedEvent((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              budgetItems: prev.budgetItems?.map((item) => {
                const updated = updatedBudgets.find(
                  (b) => b.categoryID === item.categoryID,
                );
                return updated
                  ? { ...item, plannedAmount: updated.currentAmount }
                  : item;
              }),
            };
          });
        }}
      />
    );
  }
  if (page === "vendors" && selectedEvent) {
    return (
      <VendorsPage
        event={selectedEvent}
        budgets={budgets}
        initialSelected={selectedVendors} // ← הוסף
        onSaveSelected={(v) => setSelectedVendors(v)} // ← הוסף
        onBack={() => setPage("detail")}
        onVendorSelected={handleVendorSelected}
        onProceedToTasks={(v) => {
          setSelectedVendors(v);
          setPage("tasks");
        }}
      />
    );
  }

  if (page === "tasks" && selectedEvent) {
    return (
      <TasksPage
        event={selectedEvent}
        selectedVendors={selectedVendors}
        onBack={() => setPage("vendors")}
        onFinish={() => {
          setPage("events");
          setSelectedEvent(null);
        }}
      />
    );
  }

  // return (
  //   <EventsPage
  //     onLogout={handleLogout}
  //     onSelectEvent={(event) => {
  //       setSelectedEvent(event);
  //         setSelectedVendors({});  // ← איפוס בחירות

  //       setPage("detail");
  //     }}
  //   />
  // );
  return (
    <EventsPage
      onLogout={handleLogout}
      onSelectEvent={(event) => {
        setSelectedEvent(event);
        setSelectedVendors({});
        setSavedBudgets([]); // ← כאן
        setPage("detail");
      }}
    />
  );
};

export default App;
