import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "/images/logo.png";
import "./Navbar.css";

function Navbar({ cart, theme, toggleTheme }) {
  // Total quantity in cart
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // Collapse menu after clicking a link
  const handleNavClick = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      new window.bootstrap.Collapse(navbar).hide();
    }
  };

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

            {/* Cart link with badge */}
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

            <Link className="nav-link" to="/login" onClick={handleNavClick}>Login</Link>
            <Link className="nav-link" to="/myorders" onClick={handleNavClick}>MyOrders</Link>

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

