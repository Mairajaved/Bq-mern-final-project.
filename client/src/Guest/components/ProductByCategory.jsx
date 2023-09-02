import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProductByCategory({ CategoryName }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          CategoryName === "all"
            ? "http://localhost:1234/api/get-all-products"
            : `http://localhost:1234/api/get-product-by-category/${CategoryName}`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Axios error:", error);
      }
    };

    fetchData();
  }, [CategoryName]);

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="col mb-4" key={product._id}>
            <Link
              to={`/products/${product.productName}`}
              className="text-decoration-none"
            >
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  alt={product.productName}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))
      ) : (
        <div>No products available in this category.</div>
      )}
    </div>
  );
}
