import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Menu from "./pages/Menu";

import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Myorders from "./pages/MyOrders";
import Checkout from "./pages/CheckOut";
import AdminDashboard from "./pages/AdminDashBoard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
       
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
         <Route path="/cart" element={<Cart />} />
         <Route path="/login" element={<Login />} />

         
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

      <Footer />
     
    </>
  );
}

export default App;
