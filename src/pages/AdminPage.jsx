// src/pages/AdminPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashBoard from "../components/AdminDashBoard";
import AdminMenu from "../components/AdminMenu";
import AdminOrders from "./AdminOrders";

function AdminPage() {
  const navigate = useNavigate();

  // 🔹 Redirect to login if admin is not logged in
  useEffect(() => {
    const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isAdminLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // 🔹 Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn"); // clear session
    navigate("/admin-login");
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-secondary">Welcome, Admin</h1>
        <button className="btn btn-danger px-4" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <p className="text-muted mb-5">
        Manage your dashboard, menu items, and customer orders below.
      </p>

      {/* Admin Sections */}
      <section className="mb-5">
        <AdminDashBoard />
      </section>

      <section className="mb-5">
        <AdminMenu />
      </section>

      <section className="mb-5">
        <AdminOrders />
      </section>
    </div>
  );
}

export default AdminPage;


