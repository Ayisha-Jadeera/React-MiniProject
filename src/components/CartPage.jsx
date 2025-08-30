import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { addOrder } from "../utils/fakeOrderApi";

function CartPage({ cart, setCart }) {
  const [customerName, setCustomerName] = useState("");
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    if (!customerName) return alert("Enter your name");
    addOrder({ customerName, items: cart, total });
    alert("Order placed successfully!");
    setCart([]);
    setCustomerName("");
  };

  const handleQtyChange = (id, qty) => {
    const newCart = cart.map(item => item.id === id ? { ...item, qty } : item);
    setCart(newCart);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? <p className="text-center">Cart is empty.</p> : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value))}
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Total: ₹{total}</h4>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
            />
          </Form.Group>
          <Button onClick={handlePlaceOrder} variant="success">✅ Place Order</Button>
        </>
      )}
    </Container>
  );
}

export default CartPage;
