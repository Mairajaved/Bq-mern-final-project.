import { useEffect, useState } from "react";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BrandsSlider from "../Components/BrandsSlider";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [tabkey, setTabKey] = useState("all");

  useEffect(() => {
    axios
      .get("/api/get-all-brands")
      .then((json) => setBrands(json.data.brands))
      .catch((err) => alert(err.message));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container my-5">
      <div className="text-center"></div>

      <div className="row my-5">
        <Tabs
          id="controlled-tab-example"
          activeKey={tabkey}
          onSelect={(k) => setTabKey(k)}
          className="mb-3"
        >
          <Tab eventKey="all" title="All">
            <BrandsSlider brands={brands} />
          </Tab>

          {brands &&
            brands.map((val, key) => (
              <Tab
                key={key}
                eventKey={val.BrandsName}
                title={val.BrandsName.toUpperCase()}
              >
                <BrandsSlider brands={[val]} />
              </Tab>
            ))}
        </Tabs>
      </div>
    </div>
  );
}
