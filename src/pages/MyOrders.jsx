import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

function MyOrders({ theme }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  // Load only last 2 orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders.slice(-2));
  }, []);

  // Save last 2 orders back to localStorage
  const saveOrders = (newOrders) => {
    const lastTwo = newOrders.slice(-2);
    localStorage.setItem("orders", JSON.stringify(lastTwo));
    setOrders(lastTwo);
  };

  // Mark an order as delivered
  const markDelivered = (orderId) => {
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Delivered" } : order
    );
    saveOrders(updated);
  };

  // Submit review for a delivered order
  const submitReview = () => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? {
            ...order,
            review: { rating, comment },
          }
        : order
    );

    saveOrders(updatedOrders);

    // Save review to related menu item
    const menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];
    selectedOrder.items.forEach((orderedItem) => {
      const itemIndex = menuItems.findIndex((i) => i.id === orderedItem.id);
      if (itemIndex !== -1) {
        if (!menuItems[itemIndex].reviews) menuItems[itemIndex].reviews = [];
        menuItems[itemIndex].reviews.push({ rating, comment });
      }
    });
    localStorage.setItem("menuItems", JSON.stringify(menuItems));

    // Reset form
    setRating(0);
    setHover(0);
    setComment("");
    setSelectedOrder(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto",}}>
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-muted">No recent orders.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className={`p-3 mb-3 rounded shadow-sm ${
              theme === "dark"
                ? "bg-dark text-light border border-light"
                : "bg-white text-dark border border-secondary"
            }`}
          >
            <h5>Order #{order.id}</h5>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.total}</p>

            {order.status === "Delivered" && !order.review && (
              <Button
                size="sm"
                variant="info"
                onClick={() => setSelectedOrder(order)}
              >
                Add Review
              </Button>
            )}

            {order.review && (
              <div style={{ marginTop: "10px" }}>
                <strong>Your Review:</strong>
                <div>
                  {[...Array(5)].map((star, i) => (
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
              <Button
                size="sm"
                variant="success"
                onClick={() => markDelivered(order.id)}
              >
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
              {[...Array(5)].map((star, i) => {
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





