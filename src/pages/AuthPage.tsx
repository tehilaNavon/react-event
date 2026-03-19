// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../App";
// import { globalStyles, GOLD } from "../styles/theme";
// import Logo from "../components/Logo";
// import SuccessScreen from "../components/SuccessScreen";
// import LoginPage from "./LoginPage";
// import RegisterPage from "./RegisterPage";

// type Tab = "login" | "register";

// interface SuccessState {
//   mode: Tab;
//   name: string;
// }

// interface AuthPageProps {
//   tab?: Tab; // איזה טאב להציג ראשון — login או register
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // AuthPage
// // מעטפת שמחברת בין LoginPage ל-RegisterPage.
// // הם כבר היו קיימים — AuthPage רק מוסיף את ה-UI של הטאבים
// // ואת הניווט ל-/events אחרי הצלחה.
// // ─────────────────────────────────────────────────────────────────────────────
// const AuthPage: React.FC<AuthPageProps> = ({ tab: initialTab = "login" }) => {
//   const navigate = useNavigate();
//   const { setLoggedIn } = useAppContext();
//   const [tab, setTab] = useState<Tab>(initialTab);
//   const [success, setSuccess] = useState<SuccessState | null>(null);

//   const handleReturn = () => {
//     setSuccess(null);
//     setLoggedIn(true);
//     navigate("/events");
//   };

//   const switchTab = (t: Tab) => {
//     setTab(t);
//     // מעדכן גם את ה-URL
//     navigate(t === "login" ? "/auth" : "/auth/register", { replace: true });
//   };

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
//               name={success.name}
//               onReturn={handleReturn}
//             />
//           ) : (
//             <>
//               <Logo />
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
//                     onClick={() => switchTab(t)}
//                     style={{
//                       flex: 1,
//                       padding: "12px 8px 14px",
//                       background: "none",
//                       border: "none",
//                       borderBottom: tab === t ? `2px solid ${GOLD}` : "2px solid transparent",
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
//                     {t === "login" ? "התחברות" : "הרשמה"}
//                   </button>
//                 ))}
//               </div>

//               {tab === "login" ? (
//                 <LoginPage
//                   onSuccess={(name) => setSuccess({ mode: "login", name })}
//                   onGoRegister={() => switchTab("register")}
//                 />
//               ) : (
//                 <RegisterPage
//                   onSuccess={(name) => setSuccess({ mode: "register", name })}
//                   onGoLogin={() => switchTab("login")}
//                 />
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AuthPage;










import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setLoggedIn } from "../store/appSlice";
import { globalStyles, GOLD } from "../styles/theme";
import Logo from "../components/Logo";
import SuccessScreen from "../components/SuccessScreen";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

type Tab = "login" | "register";

interface SuccessState {
  mode: Tab;
  name: string;
}

interface AuthPageProps {
  tab?: Tab;
}

const AuthPage: React.FC<AuthPageProps> = ({ tab: initialTab = "login" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [success, setSuccess] = useState<SuccessState | null>(null);

  const handleReturn = () => {
    setSuccess(null);
    dispatch(setLoggedIn(true));
    navigate("/events");
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    navigate(t === "login" ? "/auth" : "/auth/register", { replace: true });
  };

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
              name={success.name}
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
                    onClick={() => switchTab(t)}
                    style={{
                      flex: 1,
                      padding: "12px 8px 14px",
                      background: "none",
                      border: "none",
                      borderBottom: tab === t ? `2px solid ${GOLD}` : "2px solid transparent",
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
                    {t === "login" ? "התחברות" : "הרשמה"}
                  </button>
                ))}
              </div>
              {tab === "login" ? (
                <LoginPage
                  onSuccess={(email) => setSuccess({ mode: "login", name: email })}
                  onGoRegister={() => switchTab("register")}
                />
              ) : (
                <RegisterPage
                  onSuccess={(name) => setSuccess({ mode: "register", name })}
                  onGoLogin={() => switchTab("login")}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPage;