
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container, Form, Modal } from "react-bootstrap";
import { fetchMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "../utils/fakeOrderApi";

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    setMenuItems(fetchMenuItems());
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const item = {
      ...currentItem,
      image: currentItem.imageFile || (currentItem.imageName ? `images/${currentItem.imageName}` : "")
    };
    if (item.id) updateMenuItem(item);
    else addMenuItem(item);
    setMenuItems(fetchMenuItems());
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteMenuItem(id);
    setMenuItems(fetchMenuItems());
  };

  return (
    <Container className="my-4">
      <h2 className="text-center fw-bold mb-4">⚙️ Admin - Manage Menu</h2>

      <div className="text-end mb-3">
        <Button
          onClick={() => {
            setCurrentItem({ name: "", category: "Veg", price: "", imageName: "", imageFile: null });
            setShowModal(true);
          }}
        >
          ➕ Add New Item
        </Button>
      </div>

      <Row>
        {menuItems.map(item => (
          <Col key={item.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Category: {item.category} <br />
                  Price: ₹{item.price}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" size="sm" onClick={() => { setCurrentItem(item); setShowModal(true); }}>
                    ✏️ Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>
                    🗑️ Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem?.id ? "Edit Item" : "Add New Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentItem?.name || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={currentItem?.category || "Veg"}
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
              >
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Dessert">Dessert</option>
                <option value="Drinks">Drinks</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={currentItem?.price || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image Name (existing)</Form.Label>
              <Form.Control
                type="text"
                value={currentItem?.imageName || ""}
                onChange={(e) => setCurrentItem({ ...currentItem, imageName: e.target.value, imageFile: null })}
                placeholder="example: pizza.jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Or Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setCurrentItem({ ...currentItem, imageFile: URL.createObjectURL(file), imageName: "" });
                }}
              />
            </Form.Group>

            {(currentItem?.imageFile || currentItem?.imageName) && (
              <div className="mb-3 text-center">
                <img
                  src={currentItem.imageFile ? currentItem.imageFile : `images/${currentItem.imageName}`}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }}
                />
              </div>
            )}

            <Button type="submit" variant="success">
              💾 Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminMenu;
