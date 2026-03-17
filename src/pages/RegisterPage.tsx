import React, { useState } from "react";
import { GOLD } from "../styles/theme";
import { useAuth } from "../hooks/useAuth";

interface RegisterPageProps {
  onSuccess: (name: string) => void;
  onGoLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSuccess, onGoLogin }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const { register, loading, error } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password || !phone || !confirm) {
      setLocalError("אנא מלא את כל השדות.");
      return;
    }
    if (password !== confirm) {
      setLocalError("הסיסמאות אינן תואמות.");
      return;
    }
    setLocalError("");
    const ok = await register(name, email, phone, password);
    if (ok) onSuccess(name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRegister();
  };

  const displayError = localError || error;

  return (
    <>
      <div className="form-group">
        <label>שם מלא</label>
        <input
          type="text"
          placeholder="השם שלך"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="name"
        />
      </div>

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
        <label>מספר טלפון</label>
        <input
          type="tel"
          placeholder="050-0000000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
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
          autoComplete="new-password"
        />
      </div>

      <div className="form-group">
        <label>אימות סיסמה</label>
        <input
          type="password"
          placeholder="••••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="new-password"
        />
      </div>

      {displayError && <div className="error-msg">{displayError}</div>}

      <button className="btn" onClick={handleRegister} disabled={loading}>
        {loading ? "יוצר חשבון..." : "יצירת חשבון"}
      </button>

      <div className="footer-text" style={{ marginTop: 24 }}>
        כבר רשום?{" "}
        <span style={{ color: GOLD, cursor: "pointer" }} onClick={onGoLogin}>
          התחבר
        </span>
      </div>
    </>
  );
};

export default RegisterPage;
