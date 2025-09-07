import React, { useState, useEffect } from "react";

function LiveMap() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  if (!location.lat) return <p>Fetching live location...</p>;

  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_KEY}&center=${location.lat},${location.lng}&zoom=16`;

  return (
    <iframe
      title="Live Map"
      width="100%"
      height="400"
      loading="lazy"
      allowFullScreen
      src={mapSrc}
      style={{ border: 0 }}
    ></iframe>
  );
}

export default LiveMap;
