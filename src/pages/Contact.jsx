import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state

  // ✅ Updated handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      name,
      email,
      message,
      time: new Date().toLocaleString(),
    };

    // Save to all messages
    const existingMessages = JSON.parse(localStorage.getItem("messages")) || [];
    existingMessages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(existingMessages));

    // Save also to unread (for Admin Dashboard notifications)
    const unread = JSON.parse(localStorage.getItem("unreadMessages")) || [];
    unread.push(newMessage);
    localStorage.setItem("unreadMessages", JSON.stringify(unread));

    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");

    // Show success modal
    setShowModal(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="contact-hero"
        style={{
          backgroundImage: "url('images/contact.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="text-white fw-bold text-center">
            Contact <span style={{ color: "orange" }}>Us</span>
          </h1>
        </div>
      </div>

      {/* Contact Info & Form */}
      <div className="contact-section py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contact Info */}
            <div className="col-md-5">
              <div className="p-4 h-100 bg-dark text-light rounded-3 shadow-lg">
                <h3 className="mb-4">Get in Touch</h3>
                <p className="mb-2">
                  <strong>Email:</strong> support@parche.com
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p className="mb-4">
                  <strong>Address:</strong> Kasaragod, Kerala, India
                </p>
                <p>We’re here to help! Reach out for orders or queries 💬</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-7">
              <div className="card p-4 shadow-lg border-0 rounded-3">
                <h4 className="mb-4">Send Us a Message</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Write your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: "orange",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="map-section"
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          margin: "2rem auto",
        }}
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.123456789!2d75.0023456!3d12.5001234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4831ecf08b64f%3A0x695b1b8f8874d459!2sParche%2C%20Kasaragod%2C%20Kerala%2C%20India!5e0!3m2!1sen!2sin!4v1693486234567!5m2!1sen!2sin"
          style={{
            border: 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Transparent overlay to open full map on click */}
        <a
          href="https://www.google.com/maps/place/Parche,+Kasaragod,+Kerala,+India"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
          }}
        ></a>
      </div>
      
      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Message Sent ✅</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for reaching out. Your message has been sent to the admin.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Contact;
