import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function LiveMap() {
  const [location, setLocation] = useState({ lat: 12.4984, lng: 74.9896 }); // Default: Kasaragod
  const [error, setError] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Location error:", err.message);
          setError("📍 Location access denied, showing default location (Kasaragod).");
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <GoogleMap
        center={location}
        zoom={16}
        mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "8px" }}
      >
        {/* Marker at user location or default Kasaragod */}
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
}

export default LiveMap;
