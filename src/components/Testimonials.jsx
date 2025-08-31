// src/components/Testimonials.jsx
import React, { useState, useEffect } from "react";
import { Container, Carousel, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Star rating component
const StarRating = ({ rating, setRating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#ffc107" : "#e4e5e9",
            fontSize: "1.5rem",
            marginRight: "5px",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  // Load existing reviews from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("testimonials")) || [];
    setReviews(saved);
  }, []);

  // Submit review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message || rating === 0) {
      alert("Please fill all fields and select a rating!");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      message,
      rating,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("testimonials", JSON.stringify(updatedReviews));

    // Reset form
    setName("");
    setMessage("");
    setRating(0);

    // Redirect to menu page
    navigate("/menu");
  };

  // Helper to chunk reviews for carousel slides
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const reviewChunks = chunkArray(reviews, 3); // 3 reviews per slide

  return (
    <Container className="my-5" id="testimonials">
      <h2 className="text-center mb-4">Customer Reviews</h2>

      {reviews.length > 0 && (
        <Carousel indicators={false} interval={5000}>
          {reviewChunks.map((chunk, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {chunk.map((r) => (
                  <Col md={4} key={r.id}>
                    <div className="p-3 m-2 border rounded shadow text-center" style={{ color: "#f9e9e9ff" }} >
                      <h5>{r.name}</h5>
                      <div>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            style={{ color: s <= r.rating ? "#ffc107" : "#e4e5e9" }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="fst-italic">"{r.message}"</p>
                      <small className="text-muted">{r.date}</small>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <h4 className="mt-5 mb-3">Leave a Review</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Rating</Form.Label>
          <StarRating rating={rating} setRating={setRating} />
        </Form.Group>

        <Button type="submit" className="mt-2">
          Submit Review
        </Button>
      </Form>
    </Container>
  );
};

export default Testimonials;






