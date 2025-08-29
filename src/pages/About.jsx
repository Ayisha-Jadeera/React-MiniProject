function About() {
  return (
    <div>
      {/* About Section */}
      <div
        className="about-section"
        style={{
          backgroundImage: "url('/aboutimg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          position: "relative",
        }}
      >
        {/* Overlay */}
        <div
          className="overlay"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", height: "100%" }}
        >
          <div className="container text-light py-5">
            <h2 className="text-center mb-4">
              About <span className="highlight" style = {{color:"yellow"}}>Parche</span>
            </h2>

            <p className="text-center mb-5">
              Welcome to{" "}
              <b style={{ color: "orange" }}>Parche Food Ordering App</b> – your
              one-stop destination for delicious meals delivered fast and fresh!
              Whether you're craving spicy momos, cheesy pizzas, or FriedRice,
              we’ve got you covered.
            </p>

            <div className="row">
              <div className="col-md-6 mb-4">
                <h4>Why Choose Us?</h4>
                <ul>
                  <li>✅ Freshly prepared meals from top kitchens</li>
                  <li>✅ Fast delivery at your doorstep</li>
                  <li>✅ Affordable prices with exciting offers</li>
                  <li>
                    ✅ Wide range: Pizza, Momos, FriedRice, Desserts & more
                  </li>
                </ul>
              </div>

              <div className="col-md-6">
                <h4>Our Mission</h4>
                <p>
                  To bring happiness to every foodie by delivering hot, fresh,
                  and tasty meals with love 💖.
                </p>
                <p>
                  From our food truck to your dining table – we aim to create
                  unforgettable flavors of tomorrow. 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="facilities-section py-5 bg-dark">
        <div className="container">
          <h2 className="text-center mb-4" style={{color:"green"}}>
            Our <span className="highlight">Facilities</span>
          </h2>

          <div className="row g-4">
            {/* Service Options */}
            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Service Options</h5>
                <ul className="list-unstyled">
                  <li>✔️ Outdoor seating</li>
                  <li>✔️ Kerbside pickup</li>
                  <li>✔️ No-contact delivery</li>
                  <li>✔️ Delivery</li>
                  <li>✔️ Drive-through</li>
                  <li>✔️ Takeaway</li>
                  <li>✔️ Dine-in</li>
                </ul>
              </div>
            </div>

            {/* Highlights */}
            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Highlights</h5>
                <ul className="list-unstyled">
                  <li>✔️ Great dessert</li>
                  <li>✔️ Great tea selection</li>
                </ul>
                <h5 className="mt-3">Popular For</h5>
                <ul className="list-unstyled">
                  <li>✔️ Dinner</li>
                  <li>✔️ Solo dining</li>
                </ul>
              </div>
            </div>

            {/* Offerings */}
            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Offerings</h5>
                <ul className="list-unstyled">
                  <li>✔️ All you can eat</li>
                  <li>✔️ Coffee</li>
                  <li>✔️ Halal food</li>
                  <li>✔️ Happy-hour drinks & food</li>
                  <li>✔️ Late-night food</li>
                  <li>✔️ Quick bite</li>
                  <li>✔️ Small plates</li>
                  <li>✔️ Variety of dishes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="row g-4 mt-3">
            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Dining Options</h5>
                <ul className="list-unstyled">
                  <li>✔️ Brunch</li>
                  <li>✔️ Dinner</li>
                  <li>✔️ Dessert</li>
                  <li>✔️ Seating & Table Service</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Amenities & Atmosphere</h5>
                <ul className="list-unstyled">
                  <li>✔️ Restroom</li>
                  <li>✔️ Casual</li>
                  <li>✔️ Cozy</li>
                  <li>✔️ Trendy</li>
                  <li>✔️ Upmarket</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Crowd & Planning</h5>
                <ul className="list-unstyled">
                  <li>✔️ Family friendly</li>
                  <li>✔️ Groups & Tourists</li>
                  <li>✔️ University students</li>
                  <li>✔️ Usually a wait</li>
                  <li>✔️ Accepts reservations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Third Row */}
          <div className="row g-4 mt-3">
            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Payments</h5>
                <ul className="list-unstyled">
                  <li>✔️ Credit cards</li>
                  <li>✔️ Debit cards</li>
                  <li>✔️ NFC mobile payments</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Children</h5>
                <ul className="list-unstyled">
                  <li>✔️ Good for kids</li>
                  <li>✔️ Kids birthday friendly</li>
                </ul>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-3 bg-white shadow rounded h-100">
                <h5>Parking</h5>
                <ul className="list-unstyled">
                  <li>✔️ Free parking lot</li>
                  <li>✔️ Free street parking</li>
                  <li>✔️ Plenty of parking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Team Section */}
      <div className="team-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Meet Our <span className="highlight">Team</span></h2>
          <div className="row text-center">
            {/* Team Member 1 */}
            <div className="col-md-4 mb-4">
              <img
                src="src/assets/team2.jpg"
                alt="Team Member"
                className="rounded-circle mb-3"
                width="150"
                height="150"
              />
              <h5>Javi</h5>
              <p className="text-muted">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="col-md-4 mb-4">
              <img
                src="src/assets/team3.jpeg"
                alt="Team Member"
                className="rounded-circle mb-3"
                width="150"
                height="150"
              />
              <h5>Ayisha</h5>
              <p className="text-muted">Head of Operations</p>
            </div>

            {/* Team Member 3 */}
            <div className="col-md-4 mb-4">
              <img
                src="src/assets/team1.jpg"
                alt="Team Member"
                className="rounded-circle mb-3"
                width="150"
                height="150"
              />
              <h5>Niyaz</h5>
              <p className="text-muted">Lead Chef</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
