import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, update } from "firebase/database";

function DeliveryApp({ orderId }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported!");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation([lat, lng]);

        // Update driver location in Firebase
        update(ref(db, `orders/${orderId}`), {
          driverLocation: { lat, lng },
          status: "Shipped",
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [orderId]);

  return (
    <div>
      <h3>Delivery App</h3>
      <p>Order #{orderId}</p>
      <p>
        Location: {location ? `${location[0]}, ${location[1]}` : "Fetching..."}
      </p>
    </div>
  );
}

export default DeliveryApp;
