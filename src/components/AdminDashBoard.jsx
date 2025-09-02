// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);

  // Keep only last 5
  const trimToFive = (arr) => arr.slice(-5);

  // Load messages from localStorage
  const loadMessages = () => {
    let storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    let storedUnread = JSON.parse(localStorage.getItem("unreadMessages")) || [];

    // Keep only last 5
    storedMessages = trimToFive(storedMessages);
    storedUnread = trimToFive(storedUnread);

    // ✅ Reverse order → latest first
    storedMessages = storedMessages.reverse();
    storedUnread = storedUnread.reverse();

    // Save trimmed back to localStorage
    localStorage.setItem("messages", JSON.stringify(storedMessages));
    localStorage.setItem("unreadMessages", JSON.stringify(storedUnread));

    setMessages(storedMessages);
    setUnreadMessages(storedUnread);
  };

  useEffect(() => {
    loadMessages();

    // 🔄 Auto-refresh every 2 seconds
    const interval = setInterval(() => {
      loadMessages();
    }, 2000);

    // 👂 Listen for changes from other tabs/windows
    window.addEventListener("storage", loadMessages);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadMessages);
    };
  }, []);

  // Mark as Read
  const markAsRead = (index) => {
    const updatedUnread = [...unreadMessages];
    updatedUnread.splice(index, 1);
    const trimmedUnread = trimToFive(updatedUnread);
    setUnreadMessages(trimmedUnread);
    localStorage.setItem("unreadMessages", JSON.stringify(trimmedUnread));
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* 📨 Sidebar - Latest Messages */}
        <div className="col-md-3">
          <h5>📩 Latest Messages</h5>
          {unreadMessages.length === 0 ? (
            <p className="text-muted">No new messages</p>
          ) : (
            unreadMessages.map((msg, index) => (
              <Card className="mb-2 shadow-sm" key={index}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>{msg.name}</Card.Title>
                  <Card.Subtitle
                    className="mb-1 text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {msg.email}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "0.9rem" }}>{msg.message}</Card.Text>
                  <small className="text-muted">{msg.time}</small>
                  <div className="mt-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => markAsRead(index)}
                    >
                      Mark Read
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* 📊 Main Dashboard Content */}
        <div className="col-md-9">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>📊 Admin Dashboard</h2>
            <Button variant="primary" onClick={loadMessages}>
              🔄 Refresh
            </Button>
          </div>

          {/* All Messages */}
          <div className="mt-3">
            <h4>📜 All Messages</h4>
            {messages.length === 0 ? (
              <p className="text-muted">No messages yet</p>
            ) : (
              messages.map((msg, index) => (
                <Card className="mb-3 shadow-sm" key={index}>
                  <Card.Body>
                    <Card.Title>{msg.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {msg.email}
                    </Card.Subtitle>
                    <Card.Text>{msg.message}</Card.Text>
                    <small className="text-muted">{msg.time}</small>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;





