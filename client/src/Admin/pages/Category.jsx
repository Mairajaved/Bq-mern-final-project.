import { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import CategoryModal from "../components/CategoryModal";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:1234/api/get-all-category")
      .then((response) => setCategoryList(response.data.Category))
      .catch((error) => console.log(error.message));
  };

  const deleteCategory = (categoryName) => {
    console.log("Deleting category:", categoryName);

    const payload = {
      categoryName: categoryName,
    };

    var config = {
      method: "delete",
      url: "http://localhost:1234/api/delete-products-by-category",
      data: payload,
    };

    axios(config)
      .then((response) => {
        // Update your category list here
        if (response.data.statusCode === 200) {
          alert("Successfully deleted products by this category!");
          fetchCategories(); // Fetch the updated category list after deletion
        } else {
          setCategoryList(response.data.Category);
        }
      })
      .catch((error) => {
        console.log("Delete error:", error.message);
      });
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
  };

  const handleEditCancel = () => {
    setEditCategory(null);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-secondary p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">Categories</span>
        <CategoryModal
          dummyData={setCategoryList}
          recallData={fetchCategories}
          editCategory={editCategory}
          onCancel={handleEditCancel}
        />
      </div>

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.map((category, index) => (
              <tr key={index}>
                <th scope="row">{category._id}</th>
                <td>{category.categoryName}</td>
                <td>
                  <img
                    src={category.categoryImages}
                    className="img-fluid"
                    style={{ height: "5vh", objectFit: "contain" }}
                    alt=""
                  />
                </td>
                <td>
                  <button
                    className="btn btn-dark mx-1"
                    onClick={() => handleEditClick(category)}
                  >
                    <BsFillPencilFill />
                  </button>
                  <button
                    className="btn btn-dark mx-1"
                    onClick={() => deleteCategory(category.categoryName)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
