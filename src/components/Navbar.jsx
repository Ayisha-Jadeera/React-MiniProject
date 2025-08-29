import { Link } from "react-router-dom";
import logo from "/images/logo.png";
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top shadow">
   
      <Link to="/Home" className="navbar-brand d-flex align-items-center">
        <img
          src={logo}
          alt="Logo" className="logo"
          style={{ height: "80px", objectFit: "cover" }}
        />
      </Link>

     
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

   
      <div className="collapse navbar-collapse" id="navbarNav" >
        <div className="ms-auto navbar-nav" >
          <Link  className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/menu">Menu</Link>
         
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
           <Link className="nav-link" to="/cart">Cart</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/signup">Signup</Link>

        </div>
      </div>
        
    </nav>
  );
}

export default Navbar;
