import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "./logo.png";


function Navbar({ isAuthenticated, isAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={Logo} alt="Realty Bot Logo" className="logo" />
          <span className="ms-2 logo-text">Realty Bot</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                <i className="fas fa-home"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recommendations">
                Recommendations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/properties">
                Properties
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                <i className="fas fa-user-circle"></i> Profile
              </NavLink>
            </li>
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                  style={{color:"#fb771a"}}
                >
                  Logout
                </button>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
