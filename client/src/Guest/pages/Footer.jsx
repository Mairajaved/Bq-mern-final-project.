const Footer = () => {
  return (
    <footer className="footer-section" style={{ backgroundColor: "#000" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>
                <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                Location: Nazimabad
              </p>
              <p>
                <i className="fa fa-phone" aria-hidden="true"></i> Call us:{" "}
                <a href="tel:+923182889***" className="text-white">
                  +923182889***
                </a>
              </p>
              <p>
                <i className="fa fa-envelope" aria-hidden="true"></i> Email:{" "}
                <a href="mailto:rabicafe@example.com" className="text-white">
                  onlineshop@example.com
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-details">
              <a
                href="/"
                className="footer-logo text-white"
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                online shop
              </a>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab,
                reiciendis. Necessitatibus aut quasi minus illum recusandae
                debitis pariatur perspiciatis maxime? Necessitatibus, rem
                deserunt ipsum quam dolorum eligendi error nostrum aperiam?
                Error porro impedit quidem ex accusantium non saepe! Odit autem
                hic eius porro nihil sed qui iusto sunt quaerat officia non, vel
                laborum veniam perferendis similique dignissimos excepturi
                labore commodi.
              </p>
              <div className="footer-social">
                <a href="#" className="text-white">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-opening-hours">
              <h4>Opening Hours</h4>
              <p>Monday - Sunday</p>
              <p>10:00 AM - 10:00 PM</p>
              <div className="footer-info">
                <p>&copy; {new Date().getFullYear()} online shop</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
