// src/pages/TrackOrder.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { toast } from "react-toastify";

function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [driverLocation, setDriverLocation] = useState([12.9716, 77.5946]); // starting point
  const [customerLocation, setCustomerLocation] = useState(null);

  // Icons
  const driverIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    iconSize: [30, 30],
  });
  const customerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [30, 30],
  });

  // Load order
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = savedOrders.find(o => o?.id?.toString() === orderId);
    setOrder(foundOrder || null);
  }, [orderId]);

  // Customer location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCustomerLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // Listen for status change → show toast
  useEffect(() => {
    if (!order) return;

    if (order.status === "Shipped") {
      toast.info("🚴 Your order is on the way!");
    }
    if (order.status === "Delivered") {
      toast.success("✅ Your order has been delivered!");
    }
  }, [order?.status]);

  // Driver moves toward customer when status = "Shipped"
  useEffect(() => {
    if (!customerLocation || !order || order.status !== "Shipped") return;

    const interval = setInterval(() => {
      setDriverLocation(([dLat, dLng]) => {
        const [cLat, cLng] = customerLocation;
        const step = 0.001;

        const diffLat = cLat - dLat;
        const diffLng = cLng - dLng;

        if (Math.abs(diffLat) < step && Math.abs(diffLng) < step) {
          // Close enough → Delivered
          const updatedOrder = { ...order, status: "Delivered" };
          setOrder(updatedOrder);

          const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
          const updatedOrders = allOrders.map(o =>
            o.id === updatedOrder.id ? updatedOrder : o
          );
          localStorage.setItem("orders", JSON.stringify(updatedOrders));

          clearInterval(interval);
          return customerLocation;
        }

        return [
          dLat + step * Math.sign(diffLat),
          dLng + step * Math.sign(diffLng),
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [customerLocation, order]);

  if (!order) {
    return <h3 className="text-center mt-5">Order not found!</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>Track Order #{order.id}</h2>
      <p>Status: <strong>{order.status}</strong></p>

      <ProgressBar
        now={order.status === "Pending" ? 25 :
             order.status === "Processing" ? 50 :
             order.status === "Shipped" ? 75 : 100}
        label={order.status}
        animated={order.status !== "Delivered"}
      />

      {order.status === "Shipped" && customerLocation && (
        <div style={{ marginTop: "20px" }}>
          <h5>Live Delivery Location:</h5>
          <MapContainer
            center={customerLocation}
            zoom={14}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Driver */}
            <Marker position={driverLocation} icon={driverIcon}>
              <Popup>Delivery Person</Popup>
            </Marker>

            {/* Customer */}
            <Marker position={customerLocation} icon={customerIcon}>
              <Popup>You</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      <Link to="/myorders">
        <Button variant="secondary" className="mt-3">
          Back to My Orders
        </Button>
      </Link>
    </div>
  );
}

export default TrackOrder;





