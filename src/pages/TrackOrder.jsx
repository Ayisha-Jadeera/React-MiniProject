import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button } from "react-bootstrap";

function TrackOrder({ theme }) {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = (savedOrders || []).find((o) => o?.id?.toString() === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

  const getProgress = (status) => {
    switch (status) {
      case "Pending": return 25;
      case "Processing": return 50;
      case "Shipped": return 75;
      case "Delivered": return 100;
      default: return 0;
    }
  };

  if (!order) {
    return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <h3>Order not found!</h3>
        <Link to="/myorders">
          <Button variant="primary" className="mt-3">Go Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Track Order #{order.id}</h2>
      <p>Status: <strong>{order.status}</strong></p>
      <ProgressBar now={getProgress(order.status)} label={`${getProgress(order.status)}%`} />

      <div style={{ marginTop: "20px" }}>
        <h5>Items in this order:</h5>
        <ul>
          {order.items.map((item) => (
            <li key={item.id || Math.random()}>{item.name} x {item.qty}</li>
          ))}
        </ul>
      </div>

      {order.status !== "Delivered" && (
        <p className="text-muted mt-3">
          Your order is on the way! Progress updates as status changes.
        </p>
      )}

      <Link to="/myorders">
        <Button variant="secondary" className="mt-3">Back to My Orders</Button>
      </Link>
    </div>
  );
}

export default TrackOrder;

