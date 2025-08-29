import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";


const menuItems = [
  {
    id: 1,
    name: "Cheese Pizza",
    description: "Delicious cheesy pizza with fresh toppings.",
    price: 299,
    image: "https://via.placeholder.com/400x250.png?text=Pizza",
  },
  {
    id: 2,
    name: "Spicy Momos",
    description: "Steamed dumplings served with spicy chutney.",
    price: 199,
    image: "https://via.placeholder.com/400x250.png?text=Momos",
  },
  {
    id: 3,
    name: "Fried Rice",
    description: "Classic fried rice loaded with veggies and flavors.",
    price: 249,
    image: "https://via.placeholder.com/400x250.png?text=Fried+Rice",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    description: "Soft and rich chocolate cake for dessert lovers.",
    price: 180,
    image: "https://via.placeholder.com/400x250.png?text=Cake",
  },
  {
    id: 5,
    name: "Cold Coffee",
    description: "Refreshing cold coffee with ice cream topping.",
    price: 120,
    image: "https://via.placeholder.com/400x250.png?text=Coffee",
  },
  {
    id: 6,
    name: "Burger",
    description: "Juicy burger with crispy fries on the side.",
    price: 220,
    image: "https://via.placeholder.com/400x250.png?text=Burger",
  },
  {
    id: 7,
    name: "",
    description: "",
    price: 399,
    image:"",
  },
  {
    id: 8,
    name: "",
    description: "",
    price: 399,
    image:"",
  },
  {
    id: 9,
    name: "",
    description: "",
    price: 399,
    image:"",
  },
  {
    id: 10,
    name: "",
    description: "",
    price: 399,
    image:"",
  },
  {
    id: 11,
    name: "",
    description: "",
    price: 399,
    image:"",
  },
  {
    id: 12,
    name: "",
    description: "",
    price: 399,
    image:"",
  },
  {
    id: 13,
    name: "",
    description: "",
    price: 399,
    image:"",
  },
  {
    id: 14,
    name: "",
    description: "",
    price: 100,
    image:"",
  },
  {
    id: 15,
    name: "",
    description: "",
    price:100 ,
    image:"",
  },
   
];

function Menu() {
  return (
    <div>
     
      <div
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('images/menubg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
        }}
      >
        <h1 className="fw-bold" style={{  backgroundColor: "rgba(0,0,0,0.5)", padding: "10px 20px", borderRadius: "8px" }}>
          Our Menu
        </h1>
      </div>

      {/* Menu Grid */}
      <Container fluid className="my-5"  style={{
          backgroundImage: "url('images/menubg.jpg')",
          backgroundSize: "cover",}} >
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
                  <Button variant="warning" className="mt-2 w-100">
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
