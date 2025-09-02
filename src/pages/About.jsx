function About() {
  return (
    <div>
      {/* About Section */}
      <div
        className="about-section position-relative"
        style={{
          backgroundImage: "url('images/aboutimg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
        }}
      >
        <div className="overlay w-100 h-100" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="container text-light py-5 d-flex flex-column justify-content-center h-100">
            <h2 className="text-center mb-4">
              About <span style={{ color: "yellow" }}>Parche</span>
            </h2>
            <p className="text-center mb-5 fs-6 fs-md-5">
              Welcome to <b style={{ color: "orange" }}>Parche Food Ordering App</b> – your
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
                  <li>✅ Wide range: Pizza, Momos, FriedRice, Desserts & more</li>
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
      <div className="facilities-section py-5 section-theme">
        <div className="container">
          <h2 className="text-center mb-4" style={{ color: "green" }}>
            Our <span className="highlight">Facilities</span>
          </h2>

          <div className="row g-4">
            {[
              { title: "Service Options", items: ["Outdoor seating", "Kerbside pickup", "No-contact delivery", "Delivery", "Drive-through", "Takeaway", "Dine-in"] },
              { title: "Highlights", items: ["Great dessert", "Great tea selection"], extraTitle: "Popular For", extraItems: ["Dinner", "Solo dining"] },
              { title: "Offerings", items: ["All you can eat", "Coffee", "Halal food", "Happy-hour drinks & food", "Late-night food", "Quick bite", "Small plates", "Variety of dishes"] },
              { title: "Dining Options", items: ["Brunch", "Dinner", "Dessert", "Seating & Table Service"] },
              { title: "Amenities & Atmosphere", items: ["Restroom", "Casual", "Cozy", "Trendy", "Upmarket"] },
              { title: "Crowd & Planning", items: ["Family friendly", "Groups & Tourists", "University students", "Usually a wait", "Accepts reservations"] },
              { title: "Payments", items: ["Credit cards", "Debit cards", "NFC mobile payments"] },
              { title: "Children", items: ["Good for kids", "Kids birthday friendly"] },
              { title: "Parking", items: ["Free parking lot", "Free street parking", "Plenty of parking"] },
            ].map((card, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="p-3 shadow rounded h-100 card-theme">
                  <h5>{card.title}</h5>
                  <ul className="list-unstyled">
                    {card.items.map((item, i) => (
                      <li key={i}>✔️ {item}</li>
                    ))}
                  </ul>
                  {card.extraTitle && (
                    <>
                      <h5 className="mt-3">{card.extraTitle}</h5>
                      <ul className="list-unstyled">
                        {card.extraItems.map((item, i) => (
                          <li key={i}>✔️ {item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section py-5 section-theme">
        <div className="container">
          <h2 className="text-center mb-4">
            Meet Our <span className="highlight">Team</span>
          </h2>
          <div className="row text-center">
            {[
              { name: "Javi", role: "Founder & CEO", img: "images/team2.jpg" },
              { name: "Yaseen", role: "Head of Operations", img: "images/yaseen.jpg" },
              { name: "Niyaz", role: "Lead Chef", img: "images/team1.jpg" },
            ].map((member, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-4 mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mb-3 img-fluid"
                  width="150"
                  height="150"
                />
                <h5>{member.name}</h5>
                <p className="text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

