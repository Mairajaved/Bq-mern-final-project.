import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/context";
import Cookies from "js-cookie";
import { BsSuitHeartFill } from "react-icons/bs";
export default function UserNav() {
  const { state, dispatch } = useContext(GlobalContext);

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <span>
          <BsSuitHeartFill style={{ color: "red", fontSize: "3.2rem" }} />
          <span className="mx-1 text-light ">Online Shop</span>{" "}
          <BsSuitHeartFill style={{ color: "red" }} />
        </span>

        <Navbar.Toggle className="bg-light" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Link to="/brands" className="nav-link text-light">
              Brands
            </Link>
            <Link to="/products" className="nav-link text-light">
              Products
            </Link>
            <Link to="/category" className="nav-link text-light">
              Category
            </Link>
          </Nav>

          <div className="d-flex gap-3">
            <Link className="btn btn-light" to="/cart">
              Cart
            </Link>
            <button
              className="btn btn-light"
              onClick={() => {
                Cookies.remove("token");
                dispatch({ type: "USER_LOGOUT" });
              }}
            >
              Sign Out
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
