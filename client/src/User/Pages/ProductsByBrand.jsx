import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function ProductsByBrand() {
  const { BrandName } = useParams();
  const [products, setProducts] = useState([]);
  const [Brand, setBrand] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:1234/api/get-product-by-brand/${BrandName}`)
      .then((json) => {
        setProducts(json.data.products);
        axios
          .get(`http://localhost:1234/api/brandbyname/${BrandName}`)
          .then((data) => setBrand(data.data.brand))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div>
        <img
          style={{ height: "40vh", objectFit: "cover", width: "100%" }}
          src={Brand.BrandCover}
          alt=""
        />
      </div>
      <div className="text-center my-5">
        <h1>{BrandName}</h1>
      </div>
      <div className="row">
        {products.length > 0
          ? products.map((val, key) => (
              <div className="col-md-4" key={key}>
                <Link
                  to={`/products/${val.productName}`}
                  className="text-decoration-none"
                >
                  <div
                    style={{ height: "50vh", objectFit: "contain" }}
                    className="card h-100"
                  >
                    <img
                      className="card-img-top"
                      src={val.thumbnail}
                      alt={val.productName}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{val.productName}</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </p>
                      <Button variant="primary">Go somewhere</Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : "No"}
      </div>
    </div>
  );
}
