import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { fetchOrders, updateOrderStatus, deleteOrder } from "../utils/fakeOrderApi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(fetchOrders());
  }, []);

  const handleStatusChange = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    updateOrderStatus(id, status);
  };

  const handleDelete = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    deleteOrder(id);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">🛎️ Admin Orders</h2>
      {orders.length === 0 ? <p className="text-center">No orders yet.</p> : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.items.map(item => <div key={item.id}>{item.name} x {item.qty}</div>)}</td>
                <td>₹{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <Button size="sm" variant="success" className="me-1 mb-1" disabled={order.status==="Completed"} onClick={() => handleStatusChange(order.id,"Completed")}>✅ Complete</Button>
                  <Button size="sm" variant="warning" className="me-1 mb-1" disabled={order.status==="Pending"} onClick={() => handleStatusChange(order.id,"Pending")}>⏳ Pending</Button>
                  <Button size="sm" variant="danger" className="mb-1" onClick={() => handleDelete(order.id)}>🗑️ Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminOrders;
