import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio, Badge } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart"; // Ensure useCart is properly implemented
import axios from "../config/axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import AdBlockerWarning from "../components/AdBlockerWarning";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart() || [[], () => {}]; // Fallback to prevent crash
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      // Check if the error might be due to an ad blocker
      if (error.message === 'Network Error' || error.code === 'ERR_BLOCKED_BY_CLIENT') {
        setAdBlockerDetected(true);
      }
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // Check if the error might be due to an ad blocker
      if (error.message === 'Network Error' || error.code === 'ERR_BLOCKED_BY_CLIENT') {
        setAdBlockerDetected(true);
      }
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products - Best offers"}>
      {/* Ad Blocker Warning */}
      <AdBlockerWarning show={adBlockerDetected} />

      {/* banner image */}
      <img
        src="/images/banner.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />

      {/* Main content */}
      <div className="container mt-4 home-page">
        <div className="row">
          {/* Filters */}
          <div className="col-lg-3 col-md-4">
            <div className="filters">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0">Filters</h4>
                {(checked.length > 0 || radio.length > 0) && (
                  <span className="filter-count">
                    <span className="badge bg-primary">{checked.length + (radio.length > 0 ? 1 : 0)}</span>
                  </span>
                )}
              </div>

              <h4>Categories</h4>
              <div className="category-filters">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    checked={checked.includes(c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>

              <h4 className="mt-4">Price Range</h4>
              <div className="price-filters">
                <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>

              <button onClick={() => window.location.reload()}>
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="col-lg-9 col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="mb-0">Our Products</h1>
              <div className="product-count">
                <Badge count={`${products.length} of ${total}`} style={{ backgroundColor: 'var(--primary-color)' }} />
              </div>
            </div>

            {products.length === 0 && !loading && (
              <div className="text-center py-5">
                <div className="empty-product-icon mb-3">🔍</div>
                <h3>No Products Found</h3>
                <p className="text-muted">Try different filters or check back later for new products.</p>
              </div>
            )}
            <div className="row">
              {products?.map((p) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={p._id}>
                  <div className="card">
                    {p.quantity <= 0 && (
                      <div className="card-badge">Out of Stock</div>
                    )}
                    {p.quantity > 0 && p.quantity < 5 && (
                      <div className="card-badge">Limited Stock</div>
                    )}
                    <div className="card-img-container">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/default-product.png";
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title" title={p.name}>{p.name}</h5>
                        <h5 className="card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p className="card-text">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                          disabled={p.quantity <= 0}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {products && products.length < total && (
              <div className="text-center mt-4 mb-4">
                <button
                  className="loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner"></span> Loading...
                    </>
                  ) : (
                    <>
                      Load More <AiOutlineReload />
                    </>
                  )}
                </button>
                <div className="mt-2 text-muted small">
                  Showing {products.length} of {total} products
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
