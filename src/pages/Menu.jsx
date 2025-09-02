import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

//  Star Rating Component (optional if you want customers to rate directly in menu)
function StarRating({ itemId, rating, onRate }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="mb-2">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              style={{ display: "none" }}
              value={starValue}
              onClick={() => onRate(itemId, starValue)}
            />
            <FaStar
              size={20}
              style={{ cursor: "pointer", marginRight: 4 }}
              color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}

function Menu({ cart, setCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Ratings (if customers rate directly in menu)
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    // Load menu items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("menuItems")) || [];
    setMenuItems(savedItems);
    setLoading(false);

    // Load ratings
    const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(storedRatings);
  }, []);

  // Persist ratings to localStorage
  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

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

  const handleRate = (itemId, value) => {
    setRatings((prev) => ({ ...prev, [itemId]: value }));
  };

  // Search + Filter
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  if (loading) return <p className="text-center mt-4">Loading menu...</p>;

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
                    <h5 className="text-success">₹{item.price}</h5>

                    {/* ⭐ Average Rating (from reviews in localStorage) */}
                    {item.reviews && item.reviews.length > 0 && (
                      <div>
                        ⭐{" "}
                        {(
                          item.reviews.reduce((sum, r) => sum + r.rating, 0) /
                          item.reviews.length
                        ).toFixed(1)}{" "}
                        ({item.reviews.length} reviews)
                      </div>
                    )}

                    {/* 📝 Show last 2 reviews */}
                    <div className="mt-2">
                      {item.reviews?.slice(-2).map((r, i) => (
                        <p key={i} className="small text-muted">
                          ⭐ {r.rating} – {r.comment}
                        </p>
                      ))}
                    </div>

                    {/* (Optional) Direct Rating */}
                    <StarRating
                      itemId={item.id}
                      rating={ratings[item.id] || 0}
                      onRate={handleRate}
                    />

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



