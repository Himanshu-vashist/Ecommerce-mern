import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "../../config/axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import "./CreateCategory.css";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle form submission for creating a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} created successfully!`);
        getAllCategory();
        setName(""); // Clear input after successful submission
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} updated successfully!`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete category
  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${categoryId}`
      );
      if (data.success) {
        toast.success("Category deleted successfully!");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid create-category-dashboard mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4 category-title">Manage Categories</h1>
            <div className="category-form-container mb-4">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="category-card-container">
              {categories?.map((category) => (
                <div className="category-card" key={category._id}>
                  <h5 className="category-name">{category.name}</h5>
                  <div className="card-buttons">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setVisible(true);
                        setUpdatedName(category.name);
                        setSelected(category);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              title="Update Category"
              onCancel={() => setVisible(false)}
              open={visible}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
