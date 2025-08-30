import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

function Menu({ cart, setCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch JSON dynamically
  useEffect(() => {
    fetch("/food.json")   // local file in public/
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch menu");
        return res.json();
      })
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addToCart = (item) => {
    const exists = cart.find((cartItem) => cartItem.id === item.id);
    if (exists) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading menu...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <div>
      {/* Banner */}
      <div
        className="text-white text-center d-flex flex-column align-items-center justify-content-center"
        style={{
          backgroundImage: "url('images/menubg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
        }}
      >
        <h1
          className="fw-bold"
          style={{ color: "#d8b0b0ff", padding: "10px 20px", borderRadius: "8px" }}
        >
          Our Menu
        </h1>
        <p className="text-white fs-5 fst-italic mt-2">
          Choose from our delicious dishes!
        </p>
      </div>

      {/* Menu Items */}
      <Container fluid className="my-5">
        <Row>
          {menuItems.map((item) => (
            <Col key={item.id} md={4} sm={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <h5 className="text-success">₹{item.price}</h5>
                  <Button
                    variant="warning"
                    className="mt-2 w-100"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart 🛒
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Menu;
