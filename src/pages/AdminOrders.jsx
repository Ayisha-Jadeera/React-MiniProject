import React, { useEffect, useState } from "react";
import { Container, Table, Button, Toast, ToastContainer } from "react-bootstrap";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const statuses = ["Pending", "Processing", "Shipped", "Delivered"];

  // Function to fetch orders
  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const users = JSON.parse(localStorage.getItem("userDetails")) || [];
    const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];

    const detailedOrders = savedOrders.map(order => {
      const customer = users.find(u => u.phone === order.phone);
      const itemsWithReviews = order.items.map(item => {
        const menuItem = menuItems.find(m => m.id === item.id);
        return {
          ...item,
          reviews: menuItem?.reviews || []
        };
      });
      return {
        ...order,
        customerName: customer?.name || "Unknown",
        items: itemsWithReviews
      };
    });

    setOrders(detailedOrders);
  };

  useEffect(() => {
    loadOrders();

    const handleStorageChange = (e) => {
      if (e.key === "orders" || e.key === "menuItems" || e.key === "userDetails") {
        loadOrders();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Cycle order through statuses
  const handleStatusChange = (id) => {
    const updated = orders.map(o => {
      if (o.id === id) {
        const currentIndex = statuses.indexOf(o.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];

        // 🚀 If moving to "Shipped", add driver starting location
        if (nextStatus === "Shipped") {
          o.driverLocation = [12.9716, 77.5946]; // Example starting point (Bangalore)
        }

        showToast(`Order ${id} marked as ${nextStatus}`);
        return { ...o, status: nextStatus };
      }
      return o;
    });

    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated)); // 🔄 Sync with customer
  };

  const handleDelete = (id) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    showToast(`Order ${id} deleted`);
  };

  // Show toast helper
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">🛎️ Admin Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.items.map(item => (
                    <div key={item.id}>
                      {item.name} x {item.qty}
                    </div>
                  ))}
                </td>
                <td>₹{order.total}</td>
                <td><strong>{order.status}</strong></td>
                <td>
                  {order.items.map(item => (
                    <div key={item.id} className="mb-2">
                      <strong>{item.name}:</strong>{" "}
                      {item.reviews.length === 0 ? (
                        <span className="text-muted">No reviews</span>
                      ) : (
                        item.reviews.map((r, idx) => (
                          <div key={idx}>
                            {[...Array(5)].map((star, i) => (
                              <span
                                key={i}
                                style={{ color: i < r.rating ? "gold" : "lightgray" }}
                              >
                                ★
                              </span>
                            ))}{" "}
                            - {r.comment}
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    className="me-1 mb-1"
                    onClick={() => handleStatusChange(order.id)}
                  >
                    🔄 Next Status
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="mb-1"
                    onClick={() => handleDelete(order.id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="dark" show={toast.show} onClose={() => setToast({ show: false, message: "" })}>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default AdminOrders;