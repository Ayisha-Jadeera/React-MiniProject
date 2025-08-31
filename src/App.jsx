import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import MyOrders from "./pages/MyOrders";


function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Router>
      <div data-bs-theme={theme} className="min-vh-100 d-flex flex-column">
        {/* Navbar */}
        <Navbar cart={cart} theme={theme} toggleTheme={toggleTheme} />

        {/* Main Content */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} theme={theme} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/myorders" element={<MyOrders theme={theme} />} />
            <Route path="*" element={<AdminLogin />} />
            <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
