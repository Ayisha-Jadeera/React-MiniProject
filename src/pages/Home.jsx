import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Testimonials from "../components/Testimonials";

import "./Home.css";

function Home() {
  const navigate = useNavigate(); 

  return (
    <main>
      {/* ✅ Hero Section */}
      <section
        id="hero"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage: "url('images/steammomo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          position: "relative",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 1,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "700px",
            padding: "20px",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          <h1 style={{ fontSize: "60px", marginBottom: "20px", fontWeight: "bold" }}>
            Delicious Meals, <br /> Delivered Fast..!
          </h1>
          <p style={{ fontSize: "22px", marginBottom: "30px", lineHeight: "1.6" }}>
            Welcome to <b><span style={{ color: "yellow" }}>🍴 Parche</span></b> – your one-stop food ordering app.  
            From sizzling pizzas to juicy momos, we bring flavors from your favorite kitchens straight to your doorstep.
          </p>

          <button
            style={{
              padding: "14px 30px",
              fontSize: "18px",
              fontWeight: "600",
              background: "#db2114ff",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#4e0707ff")}
            onMouseOut={(e) => (e.target.style.background = "#db2114ff")}
            className="btn btn-success btn-lg"
            onClick={() => navigate("/menu")} 
          >
            🍔 Explore Menu
          </button>
        </div>
      </section>

      {/* ✅ Food Carousel */}
      <div id="foodCarousel" className="carousel slide mb-6" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#foodCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>

        <div className="carousel-inner rounded shadow">
          {/* Pizza */}
          <div className="carousel-item active">
            <img src="images/pizza.jpg" className="d-block w-100" alt="Pizza" style={{height:"570px", width:"100%", objectFit:"contain"}}/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Delicious Pizza</h5>
              <p>Try our special Margherita Pizza today.</p>
            </div>
          </div>

          {/* Burger */}
          <div className="carousel-item" style={{backgroundColor:"#000"}}>
            <img src="images/Burger.jpg" className="d-block w-100 bg-dark" alt="Burger" style={{height:"570px", width:"100%", objectFit:"contain"}}/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Juicy Burgers</h5>
              <p>Freshly made veggie burgers just for you.</p>
            </div>
          </div>

          {/* Pasta */}
          <div className="carousel-item">
            <img src="images/creamy-pastha.jpg" className="d-block w-100" alt="Pasta" style={{height:"570px", width:"100%", objectFit:"contain"}}/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Creamy Pasta</h5>
              <p>Indulge in our creamy Alfredo Pasta.</p>
            </div>
          </div>

          {/* Steamed Momos */}
          <div className="carousel-item">
            <img src="images/momoimg1.jpg" className="d-block w-100" alt="Steamed Momos" style={{height:"570px", width:"100%", objectFit:"contain"}}/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Steamed Momos</h5>
              <p>Hot & fresh momos served with spicy chutney.</p>
            </div>
          </div>

          {/* Fried Momos */}
          <div className="carousel-item">
            <img src="images/friedmomo.jpg" className="d-block w-100" alt="Fried Momos" style={{height:"570px", width:"100%", objectFit:"contain"}}/>
            <div className="carousel-caption d-none d-md-block">
              <h5>Crispy Fried Momos</h5>
              <p>Golden fried momos for a crunchy delight.</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#foodCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#foodCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ✅ Testimonials Section (below carousel) */}
      <Testimonials />
    </main>
  );
}

export default Home;
