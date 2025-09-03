// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);

  // Keep only last 5 messages
  const trimToFive = (arr) => arr.slice(-5);

  // Load messages from localStorage
  const loadMessages = () => {
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    const storedUnread = JSON.parse(localStorage.getItem("unreadMessages")) || [];

    // Trim to last 5 but do NOT reverse storage
    const lastMessages = trimToFive(storedMessages);
    const lastUnread = trimToFive(storedUnread);

    // Reverse for display only (latest first)
    setMessages([...lastMessages].reverse());
    setUnreadMessages([...lastUnread].reverse());
  };

  // Auto-refresh every 2 seconds and listen to storage changes
  useEffect(() => {
    loadMessages();

    const interval = setInterval(loadMessages, 2000);

    window.addEventListener("storage", loadMessages);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", loadMessages);
    };
  }, []);

  // Mark a single unread message as read
  const markAsRead = (index) => {
    const updatedUnread = [...unreadMessages];
    updatedUnread.splice(index, 1);

    // Reverse again for display
    setUnreadMessages([...updatedUnread]);
    localStorage.setItem("unreadMessages", JSON.stringify([...updatedUnread].reverse()));
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
                  <Card.Subtitle className="mb-1 text-muted" style={{ fontSize: "0.85rem" }}>
                    {msg.email}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "0.9rem" }}>{msg.message}</Card.Text>
                  <small className="text-muted">{msg.time}</small>
                  <div className="mt-2">
                    <Button variant="success" size="sm" onClick={() => markAsRead(index)}>
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>📊 Admin Dashboard</h2>
            <Button variant="primary" onClick={loadMessages}>
              🔄 Refresh
            </Button>
          </div>

          <div className="mt-3">
            <h4>📜 All Messages</h4>
            {messages.length === 0 ? (
              <p className="text-muted">No messages yet</p>
            ) : (
              messages.map((msg, index) => (
                <Card className="mb-3 shadow-sm" key={index}>
                  <Card.Body>
                    <Card.Title>{msg.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{msg.email}</Card.Subtitle>
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






