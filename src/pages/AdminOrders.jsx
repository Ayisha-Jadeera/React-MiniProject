// src/pages/AdminOrders.jsx
{/*import React, { useEffect, useState } from "react";
import { Container, Table, Button, Toast, ToastContainer } from "react-bootstrap";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  // ✅ Load orders
  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  };

  useEffect(() => {
    loadOrders();
    const handleStorageChange = (e) => {
      if (e.key === "orders") loadOrders();
    };
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(loadOrders, 3000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // ✅ Save orders
  const saveOrders = (updatedOrders) => {
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders([...updatedOrders]);
  };

  // ✅ Only move to next status
  const handleNextStatus = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const currentIndex = STATUSES.indexOf(order.status);
        const nextStatus =
          currentIndex < STATUSES.length - 1
            ? STATUSES[currentIndex + 1]
            : order.status; // Don't go past Delivered
        return { ...order, status: nextStatus };
      }
      return order;
    });
    saveOrders(updatedOrders);
    showToast(`Order ${orderId} moved to next status`);
  };

  // ✅ Delete only one order
  const handleDelete = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    saveOrders(updatedOrders);
    showToast(`Order ${orderId} deleted`);
  };

  // ✅ Move driver (only for shipped orders)
  const moveDriver = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId && order.status === "Shipped") {
        const [lat, lng] = order.driverLocation || [12.9716, 77.5946]; // default
        return { ...order, driverLocation: [lat + 0.001, lng + 0.001] };
      }
      return order;
    });
    saveOrders(updatedOrders);
    showToast(`Driver moved for order ${orderId}`);
  };

  // ✅ Toast helper
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Admin Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">No orders yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const currentIndex = STATUSES.indexOf(order.status);
              const nextStatus =
                currentIndex < STATUSES.length - 1
                  ? STATUSES[currentIndex + 1]
                  : null;

              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName || "Unknown"}</td>
                  <td>
                    {order.items.map((i) => (
                      <div key={i.id}>
                        {i.name} × {i.qty}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.total}</td>
                  <td>{order.status}</td>
                  <td>
                    //Show only NEXT status button 
                    {nextStatus && (
                      <Button
                        size="sm"
                        variant="info"
                        className="me-1 mb-1"
                        onClick={() => handleNextStatus(order.id)}
                      >
                        Next → {nextStatus}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="primary"
                      className="me-1 mb-1"
                      onClick={() => moveDriver(order.id)}
                      disabled={order.status !== "Shipped"}
                    >
                      🚚 Move Driver
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="mb-1"
                      onClick={() => handleDelete(order.id)}
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      // Toast 
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="dark"
          show={toast.show}
          onClose={() => setToast({ show: false, message: "" })}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}*/}


// src/pages/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  // ✅ Load all orders
  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  };

  useEffect(() => {
    loadOrders();

    const handleStorageChange = (e) => {
      if (e.key === "orders") loadOrders();
    };
    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(loadOrders, 3000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // ✅ Save all orders
  const saveOrders = (updatedOrders) => {
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  // ✅ Move order to next status
  const handleNextStatus = (orderId) => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = savedOrders.map((order) => {
      if (order.id === orderId) {
        const currentIndex = STATUSES.indexOf(order.status);
        const nextStatus =
          currentIndex < STATUSES.length - 1
            ? STATUSES[currentIndex + 1]
            : order.status;
        return { ...order, status: nextStatus };
      }
      return order;
    });
    saveOrders(updatedOrders);
    showToast(`Order ${orderId} moved to next status`);
  };

  // ✅ Delete only one order
  const handleDelete = (orderId) => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = savedOrders.filter((order) => order.id !== orderId);
    saveOrders(updatedOrders);
    showToast(`Order ${orderId} deleted`);
  };

  // ✅ Move driver (only for shipped orders)
  const moveDriver = (orderId) => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = savedOrders.map((order) => {
      if (order.id === orderId && order.status === "Shipped") {
        const [lat, lng] = order.driverLocation || [12.9716, 77.5946]; // default location
        return { ...order, driverLocation: [lat + 0.001, lng + 0.001] };
      }
      return order;
    });
    saveOrders(updatedOrders);
    showToast(`Driver moved for order ${orderId}`);
  };

  // ✅ Toast helper
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Admin Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...orders].reverse().map((order) => {
              const currentIndex = STATUSES.indexOf(order.status);
              const nextStatus =
                currentIndex < STATUSES.length - 1
                  ? STATUSES[currentIndex + 1]
                  : null;

              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName || "Unknown"}</td>
                  <td>
                    {order.items.map((i) => (
                      <div key={i.id}>
                        {i.name} × {i.qty}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.total}</td>
                  <td>{order.status}</td>
                  <td>
                    {nextStatus && (
                      <Button
                        size="sm"
                        variant="info"
                        className="me-1 mb-1"
                        onClick={() => handleNextStatus(order.id)}
                      >
                        Next → {nextStatus}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-1 mb-1"
                      onClick={() => moveDriver(order.id)}
                      disabled={order.status !== "Shipped"}
                    >
                      🚚 Move Driver
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="mb-1"
                      onClick={() => handleDelete(order.id)}
                    >
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* ✅ Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="dark"
          show={toast.show}
          onClose={() => setToast({ show: false, message: "" })}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}



