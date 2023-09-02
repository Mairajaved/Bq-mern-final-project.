import { useEffect, useState } from "react";
import BrandModal from "../components/BrandModal";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import BrandEditModal from "../components/BrandEditModal";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/get-brand")
      .then((json) => setBrands(json.data.Brands || [])) // Handle null or undefined value by providing an empty array as a fallback
      .catch((err) => console.log(err));
  }, []);

  const deleteBrand = (_id) => {
    console.log(_id);
    axios
      .delete("http://localhost:1234/api/delete-products-by-brand", {
        data: { _id },
      })
      .then((json) => setBrands(json.data.brands))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-theme p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">Brands</span>
        <BrandModal recallData={setBrands} />
      </div>

      <div className="container">
        {brands.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Brand Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((val, key) => (
                <tr key={key}>
                  <td>{val._id}</td>
                  <td>{val.BrandName}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      className="btn btn-dark"
                      onClick={() => deleteBrand(val._id)}
                    >
                      <AiOutlineDelete />
                    </button>
                    <BrandEditModal
                      recallData={setBrands}
                      Name={val.BrandName}
                      ID={val._id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center">No Brand</h2>
        )}
      </div>
    </div>
  );
}
