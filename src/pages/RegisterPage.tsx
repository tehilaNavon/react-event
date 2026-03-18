import React, { useEffect, useState } from "react";
import { GOLD } from "../styles/theme";
import { useAuth } from "../hooks/useAuth";
import { updateUserProfile } from "../services/authService";

interface RegisterPageProps {
  onSuccess: (name: string) => void;
  onGoLogin: () => void;
  editMode?: boolean; // ← חדש
  initialData?: {
    // ← חדש
    name: string;
    email: string;
    phone: string;
  };
  onCancel?: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onSuccess,
  onGoLogin,
  editMode = false,
  initialData,
  onCancel,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const { register, loading, error } = useAuth();
  useEffect(() => {
    if (editMode && initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
    }
  }, [editMode, initialData]);

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

  const handleUpdate = async () => {
    if (!name || !email || !phone) {
      setLocalError("אנא מלא את כל השדות.");
      return;
    }
    setLocalError("");
    try {
      const stored = localStorage.getItem("user");
      const u = stored ? JSON.parse(stored) : null;
      const userId = u?.userID ?? 0;
      await updateUserProfile(userId, name, email, phone);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...u,
          userName: name,
          userEmail: email,
          userPhone: phone,
        }),
      );
      onSuccess(name);
    } catch (err) {
      setLocalError("שגיאה בעדכון הפרטים.");
    }
  };
  const displayError = localError || error;

  return (
    <>
      <div className={editMode ? "profile-form-group" : "form-group"}>
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

      <div className={editMode ? "profile-form-group" : "form-group"}>
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

      <div className={editMode ? "profile-form-group" : "form-group"}>
        <label>מספר טלפון</label>
        <input
          type="tel"
          placeholder="050-0000000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
        />
      </div>
      {!editMode && (
        <>
          <div className={editMode ? "profile-form-group" : "form-group"}>
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

          <div className={editMode ? "profile-form-group" : "form-group"}>
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
        </>
      )}
      {displayError && <div className="error-msg">{displayError}</div>}

      <button
        className={editMode ? "profile-btn-submit" : "btn"}
        onClick={editMode ? handleUpdate : handleRegister}
        disabled={loading}
      >
        {loading
          ? editMode
            ? "מעדכן..."
            : "יוצר חשבון..."
          : editMode
            ? "שמור שינויים"
            : "יצירת חשבון"}
      </button>

      {editMode ? (
        <div
          className={editMode ? "profile-footer-text" : "footer-text"}
          style={{ marginTop: 24 }}
        >
          {" "}
          <span style={{ color: GOLD, cursor: "pointer" }} onClick={onCancel}>
            ביטול
          </span>
        </div>
      ) : (
        <div
          className={editMode ? "profile-footer-text" : "footer-text"}
          style={{ marginTop: 24 }}
        >
          {" "}
          כבר רשום?{" "}
          <span style={{ color: GOLD, cursor: "pointer" }} onClick={onGoLogin}>
            התחבר
          </span>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
