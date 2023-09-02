import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { BsSuitHeartFill } from "react-icons/bs";

export default function GuestNav() {
  return (
    <Navbar expand="lg" className="bg-transparent">
      <Container>
        <Link className="navbar-brand" to="/">
          <span>
            <BsSuitHeartFill style={{ color: "red", fontSize: "3.2rem" }} />
            <span className="mx-1 text-white ">Online Shop</span>{" "}
            <BsSuitHeartFill style={{ color: "red" }} />
          </span>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Link
              to="/login"
              className="nav-link text-white bg-transparent rounded ms-4"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="nav-link text-white bg-transparent rounded ms-4"
            >
              Signup
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
