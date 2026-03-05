import React, { useState } from "react";
import { GOLD } from "../styles/theme";
import { useAuth } from "../hooks/useAuth";

interface LoginPageProps {
  onSuccess: (email: string) => void;
  onGoRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onGoRegister }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return;
    const ok = await login(email, password);
    if (ok) onSuccess(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <div className="form-group">
        <label>Email Address</label>
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
        <label>Password</label>
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
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className="divider">or</div>

      <div className="footer-text">
        New to Élite?{" "}
        <span style={{ color: GOLD, cursor: "pointer" }} onClick={onGoRegister}>
          Create an account
        </span>
      </div>
    </>
  );
};

export default LoginPage;
