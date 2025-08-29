import React from 'react'

function Contact() {
  return (
    <div>
      <div
        className="contact-hero"
        style={{
          backgroundImage: "url('src/assets/contact.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            height: "100%",
            width: "100%",
          }}
        >
          <h1 className="text-white fw-bold text-center">
            Contact <span style={{ color: "orange" }}>Us</span>
          </h1>
        </div>
      </div>

    
      <div className="contact-section py-5">
        <div className="container">
          <div className="row g-4">

         
            <div className="col-md-5">
              <div className="p-4 h-100 bg-dark text-light rounded-3 shadow-lg">
                <h3 className="mb-4">Get in Touch</h3>
                <p className="mb-2">
                  <strong>Email:</strong> support@parche.com
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p className="mb-4">
                  <strong>Address:</strong>Kasaragod, Kerala, India
                </p>
                <p>
                  We’re here to help! Reach out for orders, feedback 💬
                </p>
              </div>
            </div>

          
            <div className="col-md-7">
              <div className="card p-4 shadow-lg border-0 rounded-3">
                <h4 className="mb-4">Send Us a Message</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Write your message..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100"
                    style={{
                      backgroundColor: "orange",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Google Maps Section */}
      <div className="map-section">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/place/parche+kasaragod/data=!4m2!3m1!1s0x3ba4831ecf08b64f:0x695b1b8f8874d459?sa=X&ved=1t:242&ictx=111"
          width="100%"
          height="400"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;

