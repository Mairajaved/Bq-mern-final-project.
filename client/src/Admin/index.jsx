import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Brands from "./pages/Brands";
import Orders from "./pages/Orders";
import { Navigate, Route, Routes } from "react-router-dom";

export default function Admin() {
  return (
    <div className="row m-0 p-0">
      <div className="col-md-3 " style={{ height: "100vh" }}>
        <Sidebar />
      </div>
      <div className="col-md-9">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </div>
    </div>
  );
}
