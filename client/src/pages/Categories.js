import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import "./Categories.css";
import { FaBoxOpen } from "react-icons/fa"; // Example icon

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="categories-container mt-5">
        <h2 className="categories-title">Explore Our Categories</h2>
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 col-sm-6 col-12 mt-2" key={c._id}>
              <div className="category-card">
                <Link to={`/category/${c.slug}`} className="category-link">
                  <div className="category-icon">
                    <FaBoxOpen size={40} />
                  </div>
                  <div className="category-content">
                    <h3 className="category-name">{c.name}</h3>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
