// src/components/Testimonials.jsx
import React, { useState, useEffect } from "react";
import { Container, Carousel, Row, Col, Form, Button } from "react-bootstrap";
import "./Testimonials.css";


// ⭐ Reusable Star Rating Component
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
            fontSize: "1.6rem",
            marginRight: "5px",
            transition: "color 0.2s ease",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  // ✅ Load reviews once on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("testimonials")) || [];
    setReviews(saved);
  }, []);

  // ✅ Submit review
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim() || rating === 0) {
      alert("⚠️ Please fill all fields and select a rating!");
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
    localStorage.setItem("testimonials", JSON.stringify(updatedReviews));
    setReviews(updatedReviews);

    // reset form
    setName("");
    setMessage("");
    setRating(0);
  };

  // ✅ Split reviews into groups of 3 for carousel
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const reviewChunks = chunkArray(reviews, 3);

  return (
    <Container className="my-5" id="testimonials">
      <h2 className="text-center mb-4">⭐ Customer Reviews</h2>

      {/* ✅ Show reviews if available */}
      {reviews.length > 0 ? (
        <Carousel indicators={false} interval={6000}>
          {reviewChunks.map((chunk, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {chunk.map((r) => (
                  <Col md={4} key={r.id}>
                    {/* ✅ Use custom review-card class */}
                    <div className="review-card p-3 m-2 border rounded shadow-sm text-center">
                      <h5 className="mb-1">{r.name}</h5>
                      <div className="mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            style={{
                              color: s <= r.rating ? "#ffc107" : "#e4e5e9",
                              fontSize: "1.2rem",
                            }}
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
      ) : (
        <p className="text-center text-muted">No reviews yet. Be the first!</p>
      )}

      {/* ✅ Review form */}
      <h4 className="mt-5 mb-3">Leave a Review</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
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
            placeholder="Write your feedback..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Rating</Form.Label>
          <StarRating rating={rating} setRating={setRating} />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Submit Review
        </Button>
      </Form>
    </Container>
  );
};

export default Testimonials;










