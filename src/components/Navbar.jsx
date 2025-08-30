import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "/images/logo.png";
import "./Navbar.css";

function Navbar({ cart, theme, toggleTheme }) {
  // Total quantity in cart
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-3 sticky-top shadow">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
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
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/menu">Menu</Link>
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/contact">Contact</Link>

            {/* Cart link with badge */}
            <Link className="nav-link position-relative" to="/cart">
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

            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/myorders">MyOrders</Link>

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

