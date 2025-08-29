
import React, { useContext } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { CartContext } from "../context/CartContext";


const menuItems = [
  {
    id: 1,
    name: "Cheese Pizza",
    description: "Delicious cheesy pizza with fresh toppings.",
    price: 299,
    image: "images/pizza.jpg",
  },
  {
    id: 2,
    name: "Spicy Momos",
    description: "Steamed dumplings served with spicy chutney.",
    price: 199,
    image: "images/spicy-chicken.jpg",
  },
  {
    id: 3,
    name: "Fried Rice",
    description: "Classic fried rice loaded with veggies and flavors.",
    price: 249,
    image: "images/fried rice.jpg",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    description: "Soft and rich chocolate cake for dessert lovers.",
    price: 180,
    image: "images/Chocolate-Cake.jpg",
  },
  {
    id: 5,
    name: "Cold Coffee",
    description: "Refreshing cold coffee with ice cream topping.",
    price: 120,
    image: "public/images/cold-coffee.jpg",
  },
  {
    id: 6,
    name: "Burger",
    description: "Juicy burger with crispy fries on the side.",
    price: 220,
    image: "images/burger.avif",
  },
  ];

  {/*
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
  },*/}
   


function Menu() {

  const { addToCart } = useContext(CartContext);

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
        <h1 className="fw-bold" style={{ color:" #d8b0b0ff",padding: "10px 20px", borderRadius: "8px" }}>
          Our Menu
        </h1>
        <p className="text-white fs-5 fst-italic mt-2">
  Choose from our delicious dishes!
</p>

      </div>

     
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
                  <Button
  variant="warning"
  className="mt-2 w-100"
  onClick={() => addToCart(item)}   // ✅ add this
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
