// src/pages/MyOrders.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function MyOrders({ theme }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  // Load last 2 orders
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.slice(-2));
  }, []);

  const saveOrders = (newOrders) => {
    const lastTwo = newOrders.slice(-2);
    localStorage.setItem("orders", JSON.stringify(lastTwo));
    setOrders(lastTwo);
  };

  const markDelivered = (orderId) => {
    const updated = orders.map(order =>
      order.id === orderId ? { ...order, status: "Delivered" } : order
    );
    saveOrders(updated);
  };

  const submitReview = () => {
    if (!selectedOrder) return;
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id
        ? { ...order, review: { rating, comment } }
        : order
    );
    saveOrders(updatedOrders);

    const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
    selectedOrder.items.forEach(item => {
      const index = menuItems.findIndex(i => i.id === item.id);
      if (index !== -1) {
        if (!menuItems[index].reviews) menuItems[index].reviews = [];
        menuItems[index].reviews.push({ rating, comment });
      }
    });
    localStorage.setItem("menuItems", JSON.stringify(menuItems));

    setRating(0);
    setHover(0);
    setComment("");
    setSelectedOrder(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto"}}>
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-muted">No recent orders.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            className={`p-3 mb-3 rounded shadow-sm ${
              theme === "dark"
                ? "bg-dark text-light border border-light"
                : "bg-white text-dark border border-secondary"
            }`}
          >
            <h5>Order #{order.id}</h5>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.total}</p>

            <div className="mb-2">
              <Link to={`/track-order/${order.id}`}>
                <Button size="sm" variant="info" className="me-2">
                  Track Order
                </Button>
              </Link>

              {order.status === "Delivered" && !order.review && (
                <Button size="sm" variant="secondary" onClick={() => setSelectedOrder(order)}>
                  Add Review
                </Button>
              )}
            </div>

            {order.review && (
              <div style={{ marginTop: "10px" }}>
                <strong>Your Review:</strong>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={i < order.review.rating ? "gold" : "lightgray"}
                    />
                  ))}
                </div>
                <p>{order.review.comment}</p>
              </div>
            )}

            {order.status !== "Delivered" && (
              <Button size="sm" variant="success" onClick={() => markDelivered(order.id)}>
                Mark Delivered
              </Button>
            )}
          </div>
        ))
      )}

      {/* Review Modal */}
      <Modal show={!!selectedOrder} onHide={() => setSelectedOrder(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <strong>Rate this order:</strong>
            <div>
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    size={24}
                    color={ratingValue <= (hover || rating) ? "gold" : "lightgray"}
                    onClick={() => setRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </div>
          </div>

          <Form.Group>
            <Form.Label>Write a comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitReview} disabled={rating === 0}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyOrders;








