import React from "react";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        padding: "30px 20px",
        textAlign: "center",
        background: "#282222ff",
        color: "#edf3f3ff",
      }}
    >
      {/* Address Section */}
      <div style={{ marginBottom: "15px" }}>
        <p style={{ margin: "5px 0" }}>
          <FaMapMarkerAlt style={{ marginRight: "8px" }} />
          123 Main Street,Kasaragod, Kerala, India
        </p>
        <a
          href="https://www.google.com/maps/place/Parche,+Kasaragod,+Kerala,+India"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#edf3f3ff", textDecoration: "underline" }}
        >
          View on Google Maps
        </a>
      </div>

      {/* Social Media Icons */}
      <div style={{ marginBottom: "15px", fontSize: "1.5rem" }}>
        <a
          href="https://www.instagram.com/its_parche?igsh=a2NjaHB2YzViMGU5"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#edf3f3ff" }}
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/share/1F229qbbFx/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#edf3f3ff" }}
        >
          <FaFacebookF />
        </a>
        <a
          href="https://wa.me/919745444656?text=Hello%20I%20would%20like%20to%20order%20food"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#edf3f3ff" }}
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Footer Text */}
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Parche-App. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
