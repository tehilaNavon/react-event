import React from "react";
import { GOLD } from "../styles/theme";

interface SuccessScreenProps {
  mode: "login" | "register";
  email: string;
  onReturn: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ mode, email, onReturn }) => (
  <div className="success-screen">
    <div className="success-icon">✦</div>
    <div className="success-title">
      {mode === "login" ? "Welcome Back" : "ברוך הבא ל-Élite"}
    </div>
    <div className="success-sub" style={{ color: GOLD, marginBottom: 12 }}>
      {email}
    </div>
    <div className="success-sub">Your event portal awaits</div>
    <button className="btn" style={{ marginTop: 32 }} onClick={onReturn}>
      כניסה לאירועים
    </button>
  </div>
);

export default SuccessScreen;
