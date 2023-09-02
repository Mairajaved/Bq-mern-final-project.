import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:1234/api/get-all-products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  const deleteProduct = (_id) => {
    axios
      .delete("http://localhost:1234/api/delete-products", { data: { _id } })
      .then(() => fetchProducts())
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-theme p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">Products</span>
        <ProductModal recallData={fetchProducts} />
      </div>

      <div className="container">
        {products.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Brand</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={product.thumbnail}
                      className="img-fluid"
                      style={{ height: "5vh", objectFit: "contain" }}
                      alt=""
                    />
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      className="btn btn-dark"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center">No Products</h2>
        )}
      </div>
    </div>
  );
}
