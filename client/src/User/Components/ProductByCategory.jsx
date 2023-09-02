import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function ProductByCategory({ CategoryName }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (CategoryName === "all") {
          const response = await axios.get(
            "http://localhost:1234/api/get-all-products"
          );
          setProducts(response.data.products);
        } else {
          const response = await axios.get(
            `http://localhost:1234/api/get-product-by-category/${CategoryName}`
          );
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Axios error:", error);
      }
    };

    fetchData();
  }, [CategoryName]);

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.length > 0
          ? products.map((val, key) => (
              <div className="col mb-4" key={key}>
                <Link
                  to={`/products/${val._id}`}
                  className="text-decoration-none"
                >
                  <div className="card h-100">
                    <img
                      className="card-img-top"
                      src={val.thumbnail}
                      alt={val.productName}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{val.productName}</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card ontent.
                      </p>
                      <Button variant="primary">Go somewhere</Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : "No"}
      </div>
    </>
  );
}
