import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";

import Login from "./pages/Login";
import UserDetailsForm from "./pages/UserDetailsForm";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";

// 🔹 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [details, setDetails] = useState(() => {
    const storedDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
    if (user) {
      return storedDetails.find(u => u.phone === user.phone) || null;
    }
    return null;
  });

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Save updated details
  useEffect(() => {
    if (details) {
      const allDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
      const others = allDetails.filter(u => u.phone !== details.phone);
      localStorage.setItem("userDetails", JSON.stringify([...others, details]));
    }
  }, [details]);

  return (
    <Router>
      <div className={`${theme}-mode min-vh-100 d-flex flex-column`}>
        {/* Navbar */}
        <Navbar
          cart={cart}
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          setUser={setUser}
        />

        

        {/* Main Content */}
        <div className="flex-grow-1">
          <Routes>
            
            <Route path="/" element={<Home />} />

            {/* Protected Routes */}
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu cart={cart} setCart={setCart} />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} theme={theme} />}
            />
            <Route path="/admin-login" element={<AdminLogin theme={theme} />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <MyOrders theme={theme} />
                </ProtectedRoute>
              }
            />

            {/* Login + OTP Flow */}
            <Route
              path="/login"
              element={
                !user ? (
                  <Login onLoginSuccess={setUser} />
                ) : !details ? (
                  <UserDetailsForm user={user} onSubmit={setDetails} />
                ) : (
                  <Navigate to="/menu" />
                )
              }
            />

            {/* Signup/Details for new customer */}
            <Route
              path="/user-details"
              element={
                user && !details ? (
                  <UserDetailsForm user={user} onSubmit={setDetails} />
                ) : (
                  <Navigate to="/menu" />
                )
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={<h1 className="text-center mt-5">404 - Page Not Found</h1>}
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

