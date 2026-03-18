// import React, { useState } from "react";
// import { GOLD } from "../styles/theme";
// import { useAuth } from "../hooks/useAuth";

// interface LoginPageProps {
//   onSuccess: (email: string) => void;
//   onGoRegister: () => void;
// }

// const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onGoRegister }) => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const { login, loading, error } = useAuth();

//   const handleLogin = async () => {
//     if (!email || !password) return;
//     const ok = await login(email, password);
//     if (ok) onSuccess(email);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") handleLogin();
//   };

//   return (
//     <>
//       <div className="form-group">
//         <label>כתובת אימייל</label>
//         <input
//           type="email"
//           placeholder="your@email.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           onKeyDown={handleKeyDown}
//           autoComplete="email"
//         />
//       </div>

//       <div className="form-group">
//         <label>סיסמה</label>
//         <input
//           type="password"
//           placeholder="••••••••••"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           onKeyDown={handleKeyDown}
//           autoComplete="current-password"
//         />
//       </div>

//       {error && <div className="error-msg">{error}</div>}

//       <button className="btn" onClick={handleLogin} disabled={loading}>
//         {loading ? "מתחבר..." : "התחברות"}
//       </button>

//       <div className="divider">או</div>

//       <div className="footer-text">
//         חדש ב-Élite?{" "}
//         <span style={{ color: GOLD, cursor: "pointer" }} onClick={onGoRegister}>
//           יצירת חשבון
//         </span>
//       </div>
//     </>
//   );
// };

// export default LoginPage;



import React, { useState } from "react";
import { GOLD } from "../styles/theme";
import { useAuth } from "../hooks/useAuth";
import { resetPassword } from "../services/authService";

interface LoginPageProps {
  onSuccess: (email: string) => void;
  onGoRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onGoRegister }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return;
    const ok = await login(email, password);
    if (ok) onSuccess(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleForgot = async () => {
    if (!forgotEmail || !forgotPhone || !forgotPassword) {
      setForgotError("אנא מלא את כל השדות.");
      return;
    }
    if (forgotPassword.length < 6) {
      setForgotError("סיסמה חדשה חייבת להכיל לפחות 6 תווים.");
      return;
    }
    setForgotLoading(true);
    setForgotError("");
    try {
      await resetPassword(forgotEmail, forgotPhone, forgotPassword);
      setForgotSuccess(true);
    } catch (err: any) {
      setForgotError(err.message || "שגיאה באיפוס הסיסמה.");
    } finally {
      setForgotLoading(false);
    }
  };

  // ── מסך שכחתי סיסמה ──
  if (showForgot) {
    return (
      <>
        {forgotSuccess ? (
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <div className="success-title">הסיסמה עודכנה!</div>
            <div className="success-sub">כעת תוכל להתחבר עם הסיסמה החדשה</div>
            <button
              className="btn"
              style={{ marginTop: 32 }}
              onClick={() => {
                setShowForgot(false);
                setForgotSuccess(false);
                setForgotEmail("");
                setForgotPhone("");
                setForgotPassword("");
              }}
            >
              חזרה להתחברות
            </button>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>כתובת אימייל</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label>מספר טלפון</label>
              <input
                type="tel"
                placeholder="050-0000000"
                value={forgotPhone}
                onChange={(e) => setForgotPhone(e.target.value)}
                autoComplete="tel"
              />
            </div>
            <div className="form-group">
              <label>סיסמה חדשה</label>
              <input
                type="password"
                placeholder="••••••••••"
                value={forgotPassword}
                onChange={(e) => setForgotPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            {forgotError && <div className="error-msg">{forgotError}</div>}
            <button className="btn" onClick={handleForgot} disabled={forgotLoading}>
              {forgotLoading ? "מעדכן..." : "עדכון סיסמה"}
            </button>
            <div className="footer-text" style={{ marginTop: 24 }}>
              <span
                style={{ color: GOLD, cursor: "pointer" }}
                onClick={() => { setShowForgot(false); setForgotError(""); }}
              >
                ← חזרה להתחברות
              </span>
            </div>
          </>
        )}
      </>
    );
  }

  // ── מסך התחברות ──
  return (
    <>
      <div className="form-group">
        <label>כתובת אימייל</label>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="email"
        />
      </div>
      <div className="form-group">
        <label>סיסמה</label>
        <input
          type="password"
          placeholder="••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="current-password"
        />
      </div>
      {error && <div className="error-msg">{error}</div>}
      <button className="btn" onClick={handleLogin} disabled={loading}>
        {loading ? "מתחבר..." : "התחברות"}
      </button>
      <div className="forgot-link" onClick={() => setShowForgot(true)}>
        שכחת סיסמה?
      </div>
      <div className="divider">או</div>
      <div className="footer-text">
        חדש ב-Élite?{" "}
        <span style={{ color: GOLD, cursor: "pointer" }} onClick={onGoRegister}>
          יצירת חשבון
        </span>
      </div>
    </>
  );
};

export default LoginPage;