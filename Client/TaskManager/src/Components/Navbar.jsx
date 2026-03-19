import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import "../App.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onClickNavbar = () => {
    setOpen(!open);
    console.log(open);
  };
  return (
    <nav className="navbar navbar-expand-lg shadow nav-elements">
      <div className="container">
        <h2 className="navbar-brand fw-bold" style={{ color: "#fffefd" }}>
          TaskManager
        </h2>

        <button type="button" onClick={onClickNavbar} className="navEdit">
          <RxHamburgerMenu size={30} style={{ color: "#fffefd" }} />
          {open && (
            <div>
              <Link
                className="nav-link"
                to="/dashboard"
                style={{ color: "#fffefd" }}
              >
                Home
              </Link>
              <Link
                className="nav-link"
                to="/taskForm"
                style={{ color: "#fffefd" }}
              >
                Add Task
              </Link>
              <Link
                className="nav-link"
                to="/login"
                style={{ color: "#b23b3b", fontWeight: "500" }}
              >
                Logout
              </Link>
            </div>
          )}
        </button>

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
                <Link
                  className="nav-link"
                  to="/login"
                  style={{ color: "#fffefd" }}
                >
                  Logout
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
