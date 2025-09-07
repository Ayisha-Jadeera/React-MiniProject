import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function OrderTracking() {
  const [customerLocation, setCustomerLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState({
    lat: 12.9716, // sample starting point (Bangalore)
    lng: 77.5946,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  // Get Customer Live Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          setCustomerLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Simulate Driver Moving
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 5000); // updates every 5s
    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={customerLocation || driverLocation}
      zoom={15}
    >
      {/* Customer Marker */}
      {customerLocation && (
        <Marker
          position={customerLocation}
          label="You"
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}

      {/* Driver Marker */}
      {driverLocation && (
        <Marker
          position={driverLocation}
          label="Driver"
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          }}
        />
      )}
    </GoogleMap>
  );
}

export default OrderTracking;
