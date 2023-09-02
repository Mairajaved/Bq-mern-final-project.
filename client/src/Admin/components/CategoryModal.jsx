import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../utils/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "./Loader";
import axios from "axios";

function CategoryModal({ dummyData }) {
  const [show, setShow] = useState(false);
  const [categoryName, setcategoryName] = useState("");
  const [categoryImages, setcategoryImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setcategoryImages(imageFile);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImages) {
      console.error("Category name and image are required.");
      return;
    }

    setIsLoading(true);

    const storageRef = ref(storage, `images/category/${categoryImages.name}`);
    uploadBytes(storageRef, categoryImages).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          console.log(url);

          const payload = { categoryName: categoryName, categoryImages: url };
          // Example: Make an API call to save the category data along with the URL
          axios
            .post("http://localhost:1234/api/create-categories", payload)
            .then((json) => {
              setShow(false);
              dummyData(json.data.Category);
              setIsLoading(false);
              // Set loading back to false after the upload is done
            })
            .catch((error) => {
              alert(error.message);
              setIsLoading(false); // Handle the error by setting loading back to false
            });
        })
        .catch((error) => {
          alert(error.message);
          setIsLoading(false); // Handle the error by setting loading back to false
        });
    });
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Category Name
                </label>
                <input
                  value={categoryName}
                  onChange={(e) => setcategoryName(e.target.value)}
                  type="text"
                  className="form-control"
                  id="categoryName"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Category Image
                </label>
                <input
                  onChange={handleImageChange}
                  type="file"
                  accept="image/*"
                  className="form-control"
                  id="formFile"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryModal;
