// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import AdminDashBoard from "./components/AdminDashBoard";
import Footer from "./components/Footer";
import AdminMenu from "./components/AdminMenu";
import AppCarousel from "./components/AppCarousel";
import CartPage from "./components/CartPage";
import StarRating from "./components/StarRating";
import Testimonials from "./components/Testimonials";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminOrders from "./pages/AdminOrders";
import TrackOrder from "./pages/TrackOrder";

import Login from "./pages/Login";
import LoginOtp from "./pages/LoginOtp";
import Signup from "./pages/Signup";
import UserDetailsForm from "./pages/UserDetailsForm";

import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";

// 🔹 Protected Route for normal users
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

// 🔹 Protected Route for admins (using sessionStorage)
const AdminProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn");
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" />;
};

function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Toggle theme
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className={`${theme}-mode min-vh-100 d-flex flex-column`}>
        <Navbar
          cart={cart}
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          setUser={setUser}
        />

        <div className="flex-grow-1">
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/carousel" element={<AppCarousel />} />
            <Route path="/testimonials" element={<Testimonials />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/login-otp" element={<LoginOtp />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected user routes */}
            <Route
              path="/user-details"
              element={
                <ProtectedRoute>
                  <UserDetailsForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu cart={cart} setCart={setCart} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart cart={cart} setCart={setCart} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart-page"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myorders"
              element={
                <ProtectedRoute>
                  <MyOrders theme={theme} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/star-rating"
              element={
                <ProtectedRoute>
                  <StarRating />
                </ProtectedRoute>
              }
            />

            {/* Order tracking */}
            <Route path="/track-order/:orderId" element={<TrackOrder />} />

            {/* Admin routes (protected) */}
            <Route path="/admin-login" element={<AdminLogin theme={theme} />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashBoard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-orders"
              element={
                <AdminProtectedRoute>
                  <AdminOrders />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin-menu"
              element={
                <AdminProtectedRoute>
                  <AdminMenu />
                </AdminProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={<h1 className="text-center mt-5">404 - Page Not Found</h1>}
            />
          </Routes>
        </div>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;

