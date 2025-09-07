// src/pages/TrackOrder.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button, Card } from "react-bootstrap";

export default function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const progressMap = {
    Pending: 25,
    Processing: 50,
    Shipped: 75,
    Delivered: 100,
  };

  const loadOrder = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = savedOrders.find((o) => String(o.id) === orderId); // ✅ only this order
    setOrder(found || null);
  };

  useEffect(() => {
    loadOrder();

    const handleStorageChange = (e) => {
      if (e.key === "orders") loadOrder();
    };
    window.addEventListener("storage", handleStorageChange);

    // Poll for updates every 2–3s
    const interval = setInterval(loadOrder, 3000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [orderId]);

  if (!order) return <h3 className="text-center mt-5">Loading order...</h3>;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm p-3">
        <h3>Order Status</h3>
        <p>
          Order ID: <strong>{order.id}</strong>
        </p>
        <p>
          Customer: <strong>{order.customerName || "Unknown"}</strong>
        </p>
        <p>
          Current Status: <strong>{order.status}</strong>
        </p>

        {/* Progress bar for status */}
        <ProgressBar
          now={progressMap[order.status] || 0}
          label={order.status}
          animated={order.status !== "Delivered"}
          striped
        />

        {/* Order items */}
        <div className="mt-3">
          <strong>Items:</strong>
          {order.items.map((i) => (
            <div key={i.id}>
              {i.name} × {i.qty}
            </div>
          ))}
        </div>

        <p className="mt-2">
          <strong>Total:</strong> ₹{order.total}
        </p>

        <Link to="/myorders">
          <Button variant="secondary" className="mt-3">
            Back to My Orders
          </Button>
        </Link>
      </Card>
    </div>
  );
}







