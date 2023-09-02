import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { HiOutlinePencilAlt } from "react-icons/hi";

function BrandEditModal({ recallData, Name, ID }) {
  const [show, setShow] = useState(false);
  const [BrandName, setBrandName] = useState(Name || "");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const UpadteBrand = (e) => {
    e.preventDefault();
    const payload = {
      brandN: BrandName,
      _id: ID,
    };

    axios
      .put("/api/update-brand", payload)
      .then((json) => {
        recallData(json.data.brands);
        setShow(false); // Close the modal after successful update
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <HiOutlinePencilAlt />
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={UpadteBrand}>
            <div className="mb-3">
              <label htmlFor="BrandName" className="form-label">
                Brand Name
              </label>
              <input
                value={BrandName}
                onChange={(e) => setBrandName(e.target.value)}
                type="text"
                className="form-control"
                id="BrandName"
                aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BrandEditModal;
