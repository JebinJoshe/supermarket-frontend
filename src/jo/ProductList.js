import React, { useEffect, useState } from "react";
import axios from "axios";
import shop from "../assests/top-view-delicious-groceries-paper-bag.jpg";
import "./Products.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const [validImageUrls, setValidImageUrls] = useState({});

  useEffect(() => {
    const check = localStorage.getItem("userId");
    if (check) {
      const getUserId = localStorage.getItem("user");
      const getUser = JSON.parse(getUserId);
      setUserId(getUser?.id);
      if(getUser?.id){
        fetchProducts(getUser?.id);
      }
    }
  }, []);

  const fetchProducts = async (userid) => {
    try {
      const res = await axios.get(
        `https://jebinjoshe-supermarket-backend-5k42.onrender.com/api/products/${userid}`
      );
      if (res.status === 200) {
        setError(false);
        setProducts(res?.data?.products);
        console.log(res?.data?.products);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleQuantityChange = (productId, change) => {
    setProducts(
      products.map((p) =>
        p._id === productId
          ? { ...p, quantity: Math.max(0, (p.quantity || 0) + change) }
          : p
      )
    );
  };

  const handleUpdate = async (product) => {
    setIsUpdating(product._id);
    try {
      const res = await axios.put(
        "https://jebinjoshe-supermarket-backend-5k42.onrender.com/api/products/updateProduct",
        {
          order_no: product.order_no,
          user_id: userId,
          quantity: product.quantity,
          product_name: product.product_name,
          product_size: product.product_size,
          product_brand: product.product_brand,
          product_color: product.product_color,
        }
      );
      if (res) {
        setEditingProduct(null);
        fetchProducts(userId);
      }
    } catch (err) {
      console.error("Error updating product:", err);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (productId) => {
    setIsDeleting(productId._id);
    try {
      await axios.delete(`https://jebinjoshe-supermarket-backend-5k42.onrender.com/api/products/deleteProduct`, {
        params: { user_id: userId, order_no: productId.order_no },
      });
      fetchProducts(userId);
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setIsDeleting(null);
    }
  };


  const isValidImageUrl = (url) => {
    if (!url) return false;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };



  useEffect(() => {
    const checkImageUrls = async () => {
      const urlChecks = await Promise.all(
        products.map(async (product) => {
          const isValid = await isValidImageUrl(product.image_url);
          return [product._id, isValid];
        })
      );
      setValidImageUrls(Object.fromEntries(urlChecks));
    };

    if (products.length > 0) {
      checkImageUrls();
    }
  }, [products]);
  
  
  

  return (
    <>
      {userId ? (
        !error ? (
          <div className="main">
            <h1>Product List</h1>
            <ul>
              {products.map((product) => (
                <div className="products" key={product._id}>
                  <div  className="groceryImg">
                  <img 
                      src={validImageUrls[product._id] ? product.image_url : shop} 
                      alt="grocery" 
                      className="groceryImg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = shop;
                      }}
                    />
                  </div>
                  <div className="list">
                    <p className="orderId">order no: {product.order_no}</p>
                    <p className="name">{product.product_name}</p>
                    <p className="brand">{product.product_brand}</p>
                    <p
                      className="color"
                      style={{
                        backgroundColor: product.product_color,
                        color: "white",
                        borderRadius: "10px",
                        width: "fit-content",
                        padding: "5px 15px",
                      }}
                    >
                      {product.product_color}
                    </p>
                    <p className="price">₹{product.product_size}</p>
                    <p className="quantity">
                      Quantity: {product.quantity || 1}
                    </p>
                    {editingProduct && editingProduct._id === product._id ? (
                      <div className="">
                        <button
                          onClick={() => handleQuantityChange(product._id, -1)}
                          className="less-button"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleQuantityChange(product._id, 1)}
                          className="add-button"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleUpdate(product)}
                          className="success-button"
                          disabled={isUpdating === product._id}
                        >
                          {isUpdating === product._id ? <span className="spinners"></span> : '✓'}
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="cancel-button"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <p>
                        <button
                          onClick={() => handleEdit(product)}
                          className="updates"
                        >
                          update
                        </button>
                      </p>
                    )}
                    <p>
                      <button
                        onClick={() => handleDelete(product)}
                        className="delete"
                        disabled={isDeleting === product._id}
                      >
                        {isDeleting === product._id ? <span className="spinner"></span> : 'Delete'}
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ textAlign: "center", marginTop: "8%" }}>
            No Products Available
          </p>
        )
      ) : (
        <div>
          <h1 className="headingLog">Please login or register to continue</h1>
          <div className="logButtons">
            <Link to="/login">
              <button className="log">Login</button>
            </Link>
            <Link to="/register">
              <button className="logReg">Register</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;