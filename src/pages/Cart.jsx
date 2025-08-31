import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increaseQty = (id) =>
    setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));

  const decreaseQty = (id) =>
    setCart(cart
      .map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item)
      .filter(item => item.qty > 0)
    );

  const removeItem = (id) => setCart(cart.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone)
      return alert("⚠️ Please fill all required fields!");

    if (formData.payment === "Card" &&
        (!formData.cardNumber || !formData.expiry || !formData.cvv))
      return alert("⚠️ Please enter complete card details!");

    if (formData.payment === "UPI" && !formData.upiId)
      return alert("⚠️ Please enter your UPI ID!");

    const orderData = {
      customer: formData,
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };

    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    savedOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(savedOrders));

    alert(`✅ Order Confirmed via ${formData.payment}!`);
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

    setTimeout(() => navigate("/myorders"), 200);
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
        alignItems: "flex-start",
        padding: "20px",
      }}
    >
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px", marginTop: "100px" ,marginRight: "100px" }}>
        <h2 className="fw-bold text-center mb-4 text-danger">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="fs-5 fw-semibold text-center text-muted">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2 flex-wrap"
              >
                <div>
                  <h6 className="mb-1 text-dark">{item.name}</h6>
                  <p className="mb-0 text-muted small">₹{item.price} × {item.qty}</p>
                </div>
                <div className="mt-2 mt-md-0">
                  <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => decreaseQty(item.id)}>➖</button>
                  <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => increaseQty(item.id)}>➕</button>
                  <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.id)}>❌</button>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <h5 className="text-dark">Total: ₹{total}</h5>
              <button className="btn btn-success btn-sm" onClick={() => setShowForm(true)}>Checkout</button>
            </div>
          </>
        )}
      </div>

      {/* Checkout Form Modal */}
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
            padding: "15px",
          }}
        >
          <div className="w-100 bg-white p-4 rounded" style={{ maxWidth: "500px" }}>
            <h3 className="text-center mb-3">Checkout</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select name="payment" value={formData.payment} onChange={handleChange} className="form-select">
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Credit/Debit Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              {formData.payment === "Card" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="form-control" placeholder="XXXX-XXXX-XXXX-1234" required />
                  </div>
                  <div className="mb-3 d-flex flex-wrap gap-2">
                    <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} className="form-control flex-fill" placeholder="MM/YY" required />
                    <input type="password" name="cvv" value={formData.cvv} onChange={handleChange} className="form-control flex-fill" placeholder="CVV" required />
                  </div>
                </>
              )}

              {formData.payment === "UPI" && (
                <div className="mb-3">
                  <label className="form-label">UPI ID</label>
                  <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} className="form-control" placeholder="yourname@upi" required />
                </div>
              )}

              <div className="d-flex justify-content-between flex-wrap gap-2">
                <button type="submit" className="btn btn-primary flex-fill">Confirm Order</button>
                <button type="button" className="btn btn-secondary flex-fill" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
