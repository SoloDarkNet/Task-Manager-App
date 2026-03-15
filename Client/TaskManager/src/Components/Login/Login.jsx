import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../Services/app";
import "./index.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center login-container">
      <h2>Login</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="d-flex flex-column">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex flex-column">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <Link
            to="/register"
            style={{ color: "#000", textDecoration: "none" }}
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
