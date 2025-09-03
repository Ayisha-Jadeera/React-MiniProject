// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "/images/logo.png";
import "./Navbar.css";

function Navbar({ cart, theme, toggleTheme, user, setUser }) {
  const navigate = useNavigate();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleNavClick = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      new window.bootstrap.Collapse(navbar).hide();
    }
  };

  // Normal user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/"); // redirect to Home
  };

  // Admin logout
  const handleAdminLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3 sticky-top shadow">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={handleNavClick}>
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ height: "90px", objectFit: "cover" }}
          />
        </Link>

        {/* Mobile Toggler */}
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

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto navbar-nav align-items-center">
            <Link className="nav-link" to="/" onClick={handleNavClick}>Home</Link>
            <Link className="nav-link" to="/menu" onClick={handleNavClick}>Menu</Link>
            <Link className="nav-link" to="/about" onClick={handleNavClick}>About</Link>
            <Link className="nav-link" to="/contact" onClick={handleNavClick}>Contact</Link>

            {/* Cart link */}
            <Link className="nav-link position-relative" to="/cart" onClick={handleNavClick}>
              🛒 Cart
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* MyOrders (only for logged-in users) */}
            {user && (
              <Link className="nav-link" to="/myorders" onClick={handleNavClick}>
                MyOrders
              </Link>
            )}

            {/* Admin Button (always visible) */}
            <Link
              className={`btn btn-sm ms-3 ${isAdminLoggedIn ? "btn-danger" : "btn-secondary"}`}
              to={isAdminLoggedIn ? "#" : "/admin-login"}
              onClick={isAdminLoggedIn ? handleAdminLogout : handleNavClick}
            >
              {isAdminLoggedIn ? " 🔒" : "⚙️"}
            </Link>

            {/* Normal Login/Logout */}
            {!user ? (
              <Link className="btn btn-sm btn-primary ms-3" to="/login" onClick={handleNavClick}>
                Login
              </Link>
            ) : (
              <button className="btn btn-sm btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            )}

            {/* Theme Toggle */}
            <button
              className="btn btn-outline-primary ms-3"
              onClick={toggleTheme}
            >
              {theme === "light" ? "🌙 Dark" : "☀ Light"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;




