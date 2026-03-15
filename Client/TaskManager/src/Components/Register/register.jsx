import { useState } from "react";
import api from "../../Services/app";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      const res = await api.post("/auth/register", form);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column mt-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column mt-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column mt-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="reg-btn">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
