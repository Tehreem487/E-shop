import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../config";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = formData;

    // frontend validation
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // 🔴 backend error handling
      if (!res.ok) {
        console.log("Signup error response:", data);
        setError(data.message || "Signup failed");
        return;
      }

      console.log("Signup success:", data);

      alert("Signup successful!");
      navigate("/login");

    } catch (err) {
      console.error("Network error:", err);
      setError("Server not responding. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {/* error message */}
        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default Signup;