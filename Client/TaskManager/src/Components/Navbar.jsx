import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "../App.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow nav-elements">
      <div className="container">
        <h2 className="navbar-brand fw-bold" style={{ color: "#fffefd" }}>
          TaskManager
        </h2>

        {/* Mobile Hamburger Icon — only icon toggles */}
        <span
          className="navEdit"
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          <RxHamburgerMenu size={30} style={{ color: "#fffefd" }} />
        </span>

        {/* Mobile Menu — hamburger-க்கு வெளியே */}
        {open && (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: "60px",
              right: "16px",
              background: "linear-gradient(135deg, #0a83df, #72a6c6)",
              borderRadius: "12px",
              padding: "8px",
              zIndex: 1000,
              minWidth: "150px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            className="d-lg-none"
          >
            <Link
              className="nav-link"
              to="/dashboard"
              style={{ color: "#fffefd" }}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              className="nav-link"
              to="/taskForm"
              style={{ color: "#fffefd" }}
              onClick={() => setOpen(false)}
            >
              Add Task
            </Link>
            <button
              style={{
                color: "#ff6b6b",
                fontWeight: "600",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "5px 8px",
                display: "block",
                width: "100%",
                textAlign: "left",
              }}
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}

        {/* Desktop Nav */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
                style={{ color: "#fffefd" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/taskForm"
                style={{ color: "#fffefd" }}
              >
                Add Task
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger btn-sm ms-3" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
