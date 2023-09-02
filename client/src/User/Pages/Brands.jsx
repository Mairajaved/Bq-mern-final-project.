import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
export default function Brands() {
  const [brands, setbrands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/get-all-brands")
      .then((json) => setbrands(json.data.brands))
      .catch((err) => alert(err.message));
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="text-center my-5 p-5">
        <h1> Brands </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem, nobis ipsam! Vel, reiciendis earum! Dolorum fugiat
          harum nobis minus, impedit rem iste quis dolor aliquid officia,
          assumenda incidunt at aliquam.
        </p>
      </div>
      <div className="mt-5 pt-5">
        <Slider {...settings}>
          {brands?.map((val, key) => (
            <div
              key={key}
              className=" d-flex justify-content-center align-items-center border mx-5"
            >
              <Link to={`brands/${val.BrandName}`}>
                {" "}
                <img
                  className="img-fluid"
                  style={{ height: "40vh", objectFit: "contain" }}
                  src={val.BrandImage}
                  alt=""
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
