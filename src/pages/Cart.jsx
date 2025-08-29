import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeItem, total, clearCart } =
    useContext(CartContext);

  const calculatedTotal =
    total !== undefined
      ? total
      : cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ✅ Checkout function
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Example order object (you can send this to a backend API later)
    const orderData = {
      items: cart,
      total: calculatedTotal,
      date: new Date().toLocaleString(),
    };

    console.log("✅ Order Placed:", orderData);

    alert(`✅ Order placed successfully!\nTotal: ₹${calculatedTotal}`);
    clearCart(); // Empty cart after checkout
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage: "url('images/food-cart.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px",
      }}
    >
      <div
        className="shadow-lg p-4"
        style={{
          width: "400px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h2 className="fw-bold text-center mb-4" style={{ color: "#f44336" }}>
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p
            className="fs-4 fw-semibold text-center"
            style={{ color: "#373636ff" }}
          >
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

            {/* ✅ Show correct total */}
            <div className="d-flex justify-content-between mt-3">
              <h4 className="text-dark">Total: ₹{calculatedTotal}</h4>
              <button className="btn btn-success" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

