import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Function to fetch orders + merge customer and reviews
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
    // Initial load
    loadOrders();

    // Listen to localStorage changes from other tabs/windows
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

  const handleStatusChange = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
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
                <td>{order.status}</td>
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
                    variant="success"
                    className="me-1 mb-1"
                    disabled={order.status === "Completed"}
                    onClick={() => handleStatusChange(order.id, "Completed")}
                  >
                    ✅ Complete
                  </Button>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-1 mb-1"
                    disabled={order.status === "Pending"}
                    onClick={() => handleStatusChange(order.id, "Pending")}
                  >
                    ⏳ Pending
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
    </Container>
  );
}

export default AdminOrders;

