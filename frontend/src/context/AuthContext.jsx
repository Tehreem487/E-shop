import { createContext, useContext, useState } from "react";
import { ENDPOINTS, setToken, getToken, removeToken } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setTokenState] = useState(() => getToken() || "");

  const login = async (email, password) => {
    const res = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    setUser(data.user);
    setTokenState(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setTokenState("");
    localStorage.removeItem("user");
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
