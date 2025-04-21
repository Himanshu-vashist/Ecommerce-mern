import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import './ProductDetailsStyles.css';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart() || [[], () => {}];
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container product-details">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading product details...</p>
          </div>
        ) : (
          <div className="product-details-container">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="product-image-container">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default-product.png";
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6 product-details-info">
                <h1>{product.name}</h1>
                <div className="category">{product?.category?.name}</div>
                <div className="price">
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <h6><span>Description:</span> {product.description}</h6>
                <h6><span>Availability:</span> {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}</h6>

                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    if (product.quantity <= 0) {
                      toast.error("Product is out of stock");
                      return;
                    }
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to cart");
                  }}
                  disabled={product.quantity <= 0}
                >
                  {product.quantity > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="similar-products">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <div className="text-center py-4">
            <div className="empty-product-icon mb-3">👀</div>
            <p className="text-muted">No similar products found</p>
          </div>
        )}
        <div className="row">
          {relatedProducts?.map((p) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={p._id}>
              <div className="card">
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
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <button
                    className="btn"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;