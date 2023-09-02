import  { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, Card } from "react-bootstrap";
import ProductByCategory from "../Components/ProductByCategory";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [tabkey, setTabKey] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/all-categories")
      .then((response) => setCategory(response.data.categories))
      .catch((error) => alert(error.message));
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center">
        <h2
          style={{
            marginBottom: "10px",
            fontFamily: "Pacifico",
            fontSize: "2rem",
          }}
        >
          Category
        </h2>
      </div>
      <div className="row my-5">
        <Tabs
          id="controlled-tab-example"
          activeKey={tabkey}
          onSelect={(key) => setTabKey(key)}
          className="mb-3"
        >
          <Tab eventKey="all" title="All">
            <ProductByCategory CategoryName="all" />
          </Tab>

          {category.map((categoryItem, index) => (
            <Tab
              key={index}
              eventKey={categoryItem.CategoryName}
              title={categoryItem.CategoryName.toUpperCase()}
            >
              <div className="row">
                {categoryItem.CategoryImages?.map((image, imageIndex) => (
                  <div key={imageIndex} className="col-md-4 mb-4">
                    <Card>
                      <Card.Img variant="top" src={image.CategoryImage} />
                      <Card.Body>
                        <Card.Title>{image.CategoryName}</Card.Title>
                        <Card.Text>{image._id}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
              <ProductByCategory CategoryName={categoryItem.CategoryName} />
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
