import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (loggedUser.role === "admin") navigate("/admin/products");
      else navigate("/products");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>Login</h2>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
