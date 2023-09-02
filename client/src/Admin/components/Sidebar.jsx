import React, { useContext } from "react";
import { FiHome } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../../Context/context";
import Cookies from "js-cookie";

const Sidebar = () => {
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

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <div className="bg-dark p-3 d-flex text-white justify-content-between align-items-center">
        <span>Admin Name</span>
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <ul className="bg-dark nav flex-column pt-3">
        {NavItems.map((item, index) => (
          <li
            key={index}
            className={`nav-item m-2  ${
              location.pathname === item.url ? "bg-white rounded" : ""
            }`}
          >
            <Link
              className="nav-link d-flex align-items-center gap-2"
              to={item.url}
            >
              <span>{item.icon}</span>
              <span>{item.tab}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
