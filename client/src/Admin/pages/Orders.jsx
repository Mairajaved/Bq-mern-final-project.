import { useEffect, useState } from "react";
import axios from "axios";
import OrderDetails from "../components/OrderDetails";
import OrderEditModal from "../components/OrderEditModal";

export default function Orders() {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    axios
      .get("/api/get-all-orders")
      .then((json) => setorders(json.data.orders))
      .catch((err) => console.log(err));
  }, []);

  const ViewOrder = (_id) => {
    console.log(_id);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-primary p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">Orders</span>
      </div>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Contact</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((val, key) => (
              <tr key={key}>
                <th scope="row">{val._id}</th>
                <td>{val.customerName}</td>
                <td>{val.customerContact}</td>
                <td>{val.status}</td>
                <td>
                  <OrderEditModal
                    recallData={setorders}
                    Status={val.Status}
                    StatusMessage={val.StatusMessage}
                    ID={val._id}
                  />
                  <OrderDetails id={val._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
