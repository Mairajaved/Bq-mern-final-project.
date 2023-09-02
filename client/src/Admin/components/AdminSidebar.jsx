import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import { FiHome } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalContext } from "../../Context/context";

export default function AdminSidebar() {
  const { state, dispatch } = useContext(GlobalContext);

  const location = useLocation();

  const NavItems = [
    {
      tab: "Home",
      url: "/",
      icon: <FiHome />,
    },
    {
      tab: "Categories",
      url: "/category",
      icon: <BiCategoryAlt />,
    },
    {
      tab: "Products",
      url: "/products",
      icon: <BiCategoryAlt />,
    },
    {
      tab: "Orders",
      url: "/orders",
      icon: <BiCategoryAlt />,
    },
    {
      tab: "Brands",
      url: "/brands",
      icon: <BiCategoryAlt />,
    },
  ];

  return (
    <>
      <Navbar expand={false} className="bg-theme mb-3">
        {" "}
        <Container fluid>
          <Navbar.Toggle aria-controls="sidebarExpand" />

          <Navbar.Brand className="text-theme-dark fw-semibold">
            Admin Dashboard
          </Navbar.Brand>
          <button
            className="btn bg-theme active text-theme"
            onClick={() => {
              Cookies.remove("token");
              dispatch({ type: "USER_LOGOUT" });
            }}
          >
            Logout
          </button>

          <Navbar.Offcanvas
            id="Sidebar"
            aria-labelledby="sidebarlabel"
            placement="start"
            className="bg-theme"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="sidebarlabel"
                className="text-theme-dark ms-3"
              >
                Admin
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="nav flex-column pt-3">
                {NavItems.map((val, key) => (
                  <li
                    key={key}
                    className={`nav-item m-2   ${
                      location.pathname == val.url
                        ? "bg-theme active rounded"
                        : null
                    }`}
                  >
                    <Link
                      className={`nav-link d-flex align-items-center  gap-2 ${
                        location.pathname == val.url
                          ? "text-theme"
                          : "text-theme-dark"
                      }`}
                      to={val.url}
                    >
                      <span>{val.icon}</span>
                      <span>{val.tab}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
