import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Loader from "../components/Loader";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

function ProductModal() {
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // API VALUES
  const [brandVal, setBrandVal] = useState([]);
  const [CategoryVal, setCategoryVal] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1234/api/get-all-categories"
      );
      const data = response.data;

      setCategoryVal(data);
      setShow(true);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const uploadImagesToFirebase = async () => {
    const uploadPromises = images.map(async (val) => {
      const MultipleImageRef = ref(
        storage,
        `/images/products/${productName}/${val.name}`
      );
      try {
        const snapshot = await uploadBytes(MultipleImageRef, val);
        return await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    });

    return Promise.all(uploadPromises);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const imageUrls = await uploadImagesToFirebase();
      const storageRef = ref(
        storage,
        `/images/products/${productName}/${thumbnail.name}`
      );
      const thumbnailUrl = await getDownloadURL(storageRef);

      const payload = {
        productName,
        brand,
        category,
        price,
        images: imageUrls,
        thumbnail: thumbnailUrl,
        description,
      };

      console.log("Ready to hit the API", payload);

      const response = await axios.post(
        "http://localhost:1234/api/add-products",
        payload
      );
      setShow(false);
      console.log(response);

      setShow(false);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Category
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddProduct}>
            <div className="row">
              <div className="col">
                <FloatingLabel
                  controlId="productname"
                  label="Product Name"
                  className="mb-3 text-secondary"
                >
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </FloatingLabel>
              </div>
              <div className="col">
                <FloatingLabel
                  controlId="price"
                  label="Product Price ($)"
                  className="mb-3 text-secondary"
                >
                  <Form.Control
                    type="number"
                    placeholder="Product Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FloatingLabel>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="thumbnail" className="form-label">
                Product Thumbnail
              </label>
              <input
                className="form-control"
                onChange={(e) => setThumbnail(e.target.files[0])}
                type="file"
                id="thumbnail"
              />
            </div>

            <div className="mb-3">
              <p className="mb-0 fw-semibold">Choose Images</p>
              <small className="text-secondary">
                Double Click to Delete Images
              </small>
              <div className="mt-2 d-flex gap-2 align-items-center">
                {images.map((val, key) => (
                  <div
                    key={key}
                    className="bg-light border rounded col-md-1"
                    onDoubleClick={() =>
                      setImages(images.filter((img) => img !== val))
                    }
                  >
                    <img
                      style={{
                        height: "10vh",
                        cursor: "pointer",
                        objectFit: "contain",
                      }}
                      className="img-fluid"
                      src={URL.createObjectURL(val)}
                      alt=""
                    />
                  </div>
                ))}
                <label
                  htmlFor="formFile"
                  style={{ height: "10vh", cursor: "pointer" }}
                  className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded fs-3 fw-bold form-label"
                >
                  +
                </label>
              </div>

              <input
                className="form-control d-none"
                onChange={(e) => setImages([...images, e.target.files[0]])}
                type="file"
                id="formFile"
              />
            </div>

            <div className="row">
              <div className="col">
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingSelectBrand"
                    label="Select Brand"
                  >
                    <Form.Select
                      aria-label="Please Select a Brand"
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option>Please Select a Brand</option>
                      {brandVal.map((val, key) => (
                        <option key={key} value={val.BrandName}>
                          {val.BrandName}
                        </option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="selectCategory"
                    label="Select Category"
                  >
                    <Form.Select
                      aria-label="Please Select a Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Please Select a Category</option>
                      {/* {CategoryVal.map((val, key) => (
                        <option key={key} value={val.CategoryName}>
                          {val.CategoryName} */}
                      {/* </option>
                      ))} */}
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </div>
            </div>

            <FloatingLabel
              controlId="floatingTextarea2"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>

            {isLoading ? (
              <div className="d-flex justify-content-center mt-3">
                <Loader animation="border" variant="primary" />
              </div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductModal;
