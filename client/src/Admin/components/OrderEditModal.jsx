import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { HiOutlinePencilAlt } from "react-icons/hi";

// Define OrderEditModal component
export default function OrderEditModal({ recallData, Status, Msg, ID }) {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(Status);
  const [StatusMessage, setStatusMessage] = useState(Msg);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateOrder = (e) => {
    e.preventDefault();
    const payload = {
      status,
      StatusMessage,
      _id: ID,
    };

    axios
      .put("http://localhost:1234/api/update-order", payload)
      .then((json) => {
        recallData(json.data.orders);
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <HiOutlinePencilAlt />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateOrder}>
            <div className="row">
              <div className="col">
                <FloatingLabel
                  controlId="status"
                  label="Status"
                  className="mb-3 text-secondary"
                >
                  <Form.Control
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </FloatingLabel>
              </div>
              <div className="col">
                <FloatingLabel
                  controlId="StatusMessage"
                  label="Status Message"
                  className="mb-3 text-secondary"
                >
                  <Form.Control
                    type="text"
                    placeholder="Status Message"
                    value={StatusMessage}
                    onChange={(e) => setStatusMessage(e.target.value)}
                  />
                </FloatingLabel>
              </div>
            </div>
            <button type="submit" className="btn btn-theme text-white">
              Update
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
