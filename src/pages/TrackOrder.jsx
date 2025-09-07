import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressBar, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);

  const driverIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    iconSize: [30, 30],
  });
  const customerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [30, 30],
  });

  // Load order data from Firebase
  useEffect(() => {
    const orderRef = ref(db, `orders/${orderId}`);
    const unsubscribe = onValue(orderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOrder(data);
        if (data.driverLocation) {
          setDriverLocation([data.driverLocation.lat, data.driverLocation.lng]);
        }
      }
    });

    return () => unsubscribe();
  }, [orderId]);

  // Get customer location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCustomerLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // Toast notifications
  useEffect(() => {
    if (!order) return;
    if (order.status === "Shipped") toast.info("🚴 Your order is on the way!");
    if (order.status === "Delivered") toast.success("✅ Your order has been delivered!");
  }, [order?.status]);

  if (!order) return <h3 className="text-center mt-5">Order not found!</h3>;

  return (
    <div className="container mt-4">
      <h2>Track Order #{orderId}</h2>
      <p>Status: <strong>{order.status}</strong></p>

      <ProgressBar
        now={order.status === "Pending" ? 25 :
             order.status === "Processing" ? 50 :
             order.status === "Shipped" ? 75 : 100}
        label={order.status}
        animated={order.status !== "Delivered"}
      />

      {driverLocation && customerLocation && (
        <div style={{ marginTop: "20px" }}>
          <h5>Live Delivery Location:</h5>
          <MapContainer center={customerLocation} zoom={14} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={driverLocation} icon={driverIcon}>
              <Popup>Delivery Person</Popup>
            </Marker>

            <Marker position={customerLocation} icon={customerIcon}>
              <Popup>You</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      <Link to="/myorders">
        <Button variant="secondary" className="mt-3">Back to My Orders</Button>
      </Link>
    </div>
  );
}

export default TrackOrder;






