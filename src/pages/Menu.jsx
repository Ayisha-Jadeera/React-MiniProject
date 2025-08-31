import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";
import { fetchMenuItems } from "../utils/fakeOrderApi";

function Menu({ cart, setCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Category states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Fetch from localStorage instead of static JSON
  useEffect(() => {
    try {
      const items = fetchMenuItems();
      setMenuItems(items);
      setLoading(false);
    } catch (err) {
      setError("Failed to load menu items");
      setLoading(false);
    }
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

  // Filtering logic
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Unique categories
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  if (loading) return <p className="text-center mt-4">Loading menu...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <div>
      {/* Banner */}
      <div
        className="text-white text-center d-flex flex-column align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/images/menubg.jpg')",
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

      {/* Search + Category Filter */}
      <Container className="my-4">
        <Row className="mb-3">
          <Col md={6} sm={12} className="mb-2">
            <Form.Control
              type="text"
              placeholder="🔍 Search for a dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6} sm={12}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Menu Items */}
      <Container fluid className="my-5">
        <Row>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
            ))
          ) : (
            <p className="text-center text-muted">No items found!</p>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Menu;


