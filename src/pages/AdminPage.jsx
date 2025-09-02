import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashBoard from "../components/AdminDashBoard";
import AdminMenu from "../components/AdminMenu";
import AdminOrders from "../components/AdminOrders";

function AdminPage() {
  const navigate = useNavigate();

  // ✅ Protect page: redirect to login if not logged in
  useEffect(() => {
    const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isAdminLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn"); // clear session
    navigate("/admin-login"); // redirect to login
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{color :"gray"}}>Welcome, Admin!</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p style={{color:"GrayText"}}>You can manage orders and menu items here.</p>

      {/* Admin Components */}
      <AdminDashBoard />
      <AdminMenu />
      <AdminOrders />
    </div>
  );
}

export default AdminPage;
