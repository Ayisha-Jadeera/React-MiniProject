import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  // Increase quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Calculate total
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Checkout form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate basic fields
    if (!formData.name || !formData.address || !formData.phone) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    // Validate card fields
    if (formData.payment === "Card") {
      if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
        alert("⚠️ Please enter complete card details!");
        return;
      }
    }

    // Validate UPI
    if (formData.payment === "UPI" && !formData.upiId) {
      alert("⚠️ Please enter your UPI ID!");
      return;
    }

    const orderData = {
      customer: formData,
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };

    console.log("✅ Order Placed:", orderData);
    alert(`✅ Order placed successfully via ${formData.payment}!`);

    // Reset cart and form
    clearCart();
    setShowForm(false);
    setFormData({
      name: "",
      address: "",
      phone: "",
      payment: "COD",
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
    });

    setTimeout(() => navigate("/"), 200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: "url('/images/food-cart.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow p-4"
  style={{
    position: "fixed",
    top: "300px", 
    left: "20px",  
    width: "400px", 
    zIndex: 1000,
        }}
      >
        <h2 className="fw-bold text-center mb-4" style={{ color: "#f44336" }}>
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="fs-4 fw-semibold text-center" style={{ color: "#373636" }}>
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <h5 className="mb-1 text-dark">{item.name}</h5>
                  <p className="mb-0 text-muted">
                    ₹{item.price} x {item.qty}
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => decreaseQty(item.id)}
                  >
                    ➖
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => increaseQty(item.id)}
                  >
                    ➕
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <h4 className="text-dark">Total: ₹{total}</h4>
              <button className="btn btn-success" onClick={() => setShowForm(true)}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3 className="text-center mb-3">Checkout</h3>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Payment Method */}
              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Credit/Debit Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              {/* Card Fields */}
              {formData.payment === "Card" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="XXXX-XXXX-XXXX-1234"
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="form-control me-2"
                      placeholder="MM/YY"
                      required
                    />
                    <input
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="CVV"
                      required
                    />
                  </div>
                </>
              )}

              {/* UPI Field */}
              {formData.payment === "UPI" && (
                <div className="mb-3">
                  <label className="form-label">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="yourname@upi"
                    required
                  />
                </div>
              )}

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                  Confirm Order
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
