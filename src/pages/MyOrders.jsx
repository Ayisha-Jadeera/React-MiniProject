import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/images/food-cart.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <h2 className="fw-bold text-center mb-4 text-danger">📦 My Orders</h2>

        {orders.length === 0 ? (
          <p className="fs-5 text-center text-muted">You have no orders yet.</p>
        ) : (
          <div className="row g-4">
            {orders.map((order, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-lg h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-success">Order #{index + 1}</h5>
                    <p className="text-muted small mb-1">Date: {order.date}</p>
                    <p className="text-muted small mb-3">Payment: {order.customer.payment}</p>

                    <ul className="list-group mb-3">
                      {order.items.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                          {item.name} × {item.qty} <span>₹{item.price * item.qty}</span>
                        </li>
                      ))}
                    </ul>

                    <h6 className="fw-bold text-dark mb-3">Total: ₹{order.total}</h6>
                    <Button variant="primary" onClick={() => setSelectedOrder(order)} className="mt-auto">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        <Modal show={!!selectedOrder} onHide={() => setSelectedOrder(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <h6 className="fw-bold">Customer Info</h6>
                <p>
                  <strong>Name:</strong> {selectedOrder.customer.name} <br />
                  <strong>Phone:</strong> {selectedOrder.customer.phone} <br />
                  <strong>Address:</strong> {selectedOrder.customer.address}
                </p>

                <h6 className="fw-bold">Items</h6>
                <ul className="list-group mb-3">
                  {selectedOrder.items.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                      {item.name} × {item.qty} <span>₹{item.price * item.qty}</span>
                    </li>
                  ))}
                </ul>

                <p>
                  <strong>Payment Method:</strong> {selectedOrder.customer.payment} <br />
                  <strong>Total:</strong> ₹{selectedOrder.total} <br />
                  <strong>Date:</strong> {selectedOrder.date}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedOrder(null)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default MyOrders;

