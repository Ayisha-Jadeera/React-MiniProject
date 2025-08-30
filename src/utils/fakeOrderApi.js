

export const fetchMenuItems = () => {
  const data = localStorage.getItem("menuItems");
  if (data) return JSON.parse(data);

  // Initial items
  const initial = 
  [
    {
    id: 1,
    name: "Cheese Pizza",
    description: "Delicious cheesy pizza with fresh toppings.",
    price: 299,
    category: "Pizza",
    image: "images/pizza.jpg",
  },
  {
    id: 2,
    name: "Spicy Momos",
    description: "Steamed dumplings served with spicy chutney.",
    price: 199,
    category: "Snacks",
    image: "images/spicy-chicken.jpg",
  },
  {
    id: 3,
    name: "Fried Rice",
    description: "Classic fried rice loaded with veggies and flavors.",
    price: 249,
    category: "Rice",
    image: "images/fried rice.jpg",
  },
  {
    id: 4,
    name: "Chocolate Cake",
    description: "Soft and rich chocolate cake for dessert lovers.",
    price: 180,
    category: "Dessert",
    image: "images/Chocolate-Cake.jpg",
  },
  {
    id: 5,
    name: "Cold Coffee",
    description: "Refreshing cold coffee with ice cream topping.",
    price: 120,
    category: "Drinks",
    image: "images/cold-coffee.jpg",
  },
  {
    id: 6,
    name: "Burger",
    description: "Juicy burger with crispy fries on the side.",
    price: 220,
    category: "Snacks",
    image: "images/burger.avif",
  },

  ];
  
  localStorage.setItem("menuItems", JSON.stringify(initial));
  return initial;
};

export const addMenuItem = (item) => {
  const items = fetchMenuItems();
  items.push({ ...item, id: Date.now() });
  localStorage.setItem("menuItems", JSON.stringify(items));
};

export const updateMenuItem = (item) => {
  let items = fetchMenuItems();
  items = items.map(i => (i.id === item.id ? item : i));
  localStorage.setItem("menuItems", JSON.stringify(items));
};

export const deleteMenuItem = (id) => {
  let items = fetchMenuItems();
  items = items.filter(i => i.id !== id);
  localStorage.setItem("menuItems", JSON.stringify(items));
};
// src/utils/fakeOrderApi.js

export const fetchOrders = () => {
  const data = localStorage.getItem("orders");
  if (data) return JSON.parse(data);
  const initial = [];
  localStorage.setItem("orders", JSON.stringify(initial));
  return initial;
};

export const addOrder = (order) => {
  const orders = fetchOrders();
  orders.push({ ...order, id: Date.now(), status: "Pending" });
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const updateOrderStatus = (id, status) => {
  let orders = fetchOrders();
  orders = orders.map(order => (order.id === id ? { ...order, status } : order));
  localStorage.setItem("orders", JSON.stringify(orders));
};

export const deleteOrder = (id) => {
  let orders = fetchOrders();
  orders = orders.filter(order => order.id !== id);
  localStorage.setItem("orders", JSON.stringify(orders));
};
