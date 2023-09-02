import { useEffect, useState } from "react";
import GuestCards from "../components/GuestCards";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ProductByCategory from "../Components/ProductByCategory";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [tabkey, settabKey] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/get-all-categories")
      .then((json) => setCategory(json.data.categories))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center">
        {/* <h2
          style={{
            marginBottom: "10px",
            fontFamily: "Pacifico",
            fontSize: "2rem",
          }}
        >
          Category
        </h2> */}
        {/* <div
          style={{ fontSize: "1.2rem", color: "#666", marginBottom: "20px" }}
        >
          <p>
            <span role="img" aria-label="Pastry">
              🧁
            </span>{" "}
            Pastries & Desserts
            <span style={{ margin: "0 10px" }}>•</span>
            <span role="img" aria-label="Coffee">
              ☕️
            </span>{" "}
            Exquisite Coffee Blends
            <span style={{ margin: "0 10px" }}>•</span>
            <span role="img" aria-label="Cake">
              🍰
            </span>{" "}
            Celebration Cakes
          </p>
          <p>
            Explore a World of Flavors at Rabi's Café! Indulge in our diverse
            array of categories, from delectable pastries to exquisite coffee
            blends, all crafted to satisfy your cravings.
          </p>
        </div> */}
      </div>
      <div className="row my-5">
        <Tabs
          id="controlled-tab-example"
          activeKey={tabkey}
          onSelect={(k) => settabKey(k)}
          className="mb-3"
        >
          <Tab eventKey="all" title="All">
            <ProductByCategory CategoryName="all" />
          </Tab>

          {category &&
            category.map((val, key) => (
              <Tab
                key={key}
                eventKey={val.CategoryName}
                title={val.CategoryName.toUpperCase()}
              >
                <ProductByCategory CategoryName={val.CategoryName} />
              </Tab>
            ))}
        </Tabs>
      </div>
    </div>
  );
}
