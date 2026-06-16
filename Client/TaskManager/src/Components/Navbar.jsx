import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import TaskForm from "./TaskForm";
import "../App.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/login");
  };

  const openTaskModal = () => {
    setOpen(false);
    setShowModal(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow nav-elements">
        <div className="container">
          <h2 className="navbar-brand fw-bold" style={{ color: "#fffefd" }}>
            TaskManager
          </h2>

          <span
            className="navEdit"
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          >
            <RxHamburgerMenu size={30} style={{ color: "#fffefd" }} />
          </span>

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
              <button
                className="nav-link"
                style={{
                  color: "#fffefd",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  width: "100%",
                  padding: "8px",
                }}
                onClick={openTaskModal}
              >
                Add Task
              </button>
              <button
                style={{
                  color: "#ff6b6b",
                  fontWeight: "600",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
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

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
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
                <button
                  className="nav-link"
                  style={{
                    color: "#fffefd",
                    background: "none",
                    border: "none",
                  }}
                  onClick={openTaskModal}
                >
                  Add Task
                </button>
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

      {showModal && <TaskForm onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
