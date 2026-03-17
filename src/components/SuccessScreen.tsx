import React from "react";
import { GOLD } from "../styles/theme";

interface SuccessScreenProps {
  mode: "login" | "register";
  name: string;
  onReturn: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ mode, name, onReturn }) => (
  <div className="success-screen">
    <div className="success-icon">✦</div>
    <div className="success-title" dir="rtl">
      {mode === "login" ? "ברוך הבא" : "ברוך הבא ל-Élite"}
    </div>
    <div className="success-sub" style={{ color: GOLD, marginBottom: 12 }}>
      {name}
    </div>
    <div className="success-sub">פורטל האירועים שלך מחכה</div>
    <button className="btn" style={{ marginTop: 32 }} onClick={onReturn}>
      כניסה לאירועים
    </button>
  </div>
);

export default SuccessScreen;
