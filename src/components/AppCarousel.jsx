import React from "react";
import Carousel from "react-bootstrap/Carousel";  // ✅ correct import
import "bootstrap/dist/css/bootstrap.min.css";

function AppCarousel() {   // ✅ renamed component
  return (
    <Carousel>
      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <div className="p-2">
            <img
              className="d-block"
              src="src/assets/hotmomo.jpg"
              alt="First slide"
            />
          </div>
          <div className="p-2">
            <img
              className="d-block"
              src="src/assets/mixmomo.jpg"
              alt="Second slide"
            />
          </div>
          <div className="p-2">
            <img
              className="d-block"
              src="https://via.placeholder.com/150"
              alt="Third slide"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="d-flex justify-content-center">
          <div className="p-2">
            <img
              className="d-block"
              src="https://via.placeholder.com/150"
              alt="Fourth slide"
            />
          </div>
          <div className="p-2">
            <img
              className="d-block"
              src="https://via.placeholder.com/150"
              alt="Fifth slide"
            />
          </div>
          <div className="p-2">
            <img
              className="d-block"
              src="https://via.placeholder.com/150"
              alt="Sixth slide"
            />
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default AppCarousel;   // ✅ export with new name

