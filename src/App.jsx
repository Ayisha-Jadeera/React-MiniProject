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
import Signup from "./pages/Signup";
import UserDetailsForm from "./pages/UserDetailsForm";

import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import AdminDashBoard from "./components/AdminDashBoard";

// 🔹 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/user-details" element={
              <ProtectedRoute>
                <UserDetailsForm />
              </ProtectedRoute>
            } />

            <Route path="/menu" element={
              <ProtectedRoute>
                <Menu cart={cart} setCart={setCart} />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart cart={cart} setCart={setCart} />
              </ProtectedRoute>
            } />
            <Route path="/myorders" element={
              <ProtectedRoute>
                <MyOrders theme= {theme} />
              </ProtectedRoute>
            } />

            {/* Admin */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-dashboard" element={<AdminDashBoard />} />

            {/* 404 */}
            <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;






