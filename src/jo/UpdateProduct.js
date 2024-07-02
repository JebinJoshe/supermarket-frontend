import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./UpdateProduct.css"
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: '',
    product_brand: '',
    product_size: '',
    product_color: '',
    order_no: '',
    quantity: '' || 1,
    image_url: ''
  });

  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const check = localStorage.getItem('userId');
    if (check) {
      const getUserId = localStorage.getItem('user');
      const getUser = JSON.parse(getUserId);
      setUserId(getUser.id);
    }
    
    generateOrderNumber();
  }, []);

  const generateOrderNumber = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    setProduct(prevProduct => ({ ...prevProduct, order_no: `${randomNum}` }));
  };

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(`https://supermarket-data-mrti.onrender.com/api/products/add`, {
        ...product,
        user_id: userId
      });
      console.log(res);
      setMessage('Product added successfully!');
      setTimeout(()=>{
        setMessage('')
      },4000)
      // Clear form fields after successful submission
      setProduct({
        product_name: '',
        product_brand: '',
        product_size: '',
        product_color: '',
        order_no: '',
        quantity: '' || 1,
        image_url: ''
      });
      generateOrderNumber(); // Generate new order number for next product
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product. Please try again.');
      setTimeout(()=>{
        setMessage('')
      },4000)
    }
  };

  return (
    <>
    {userId ?
    <>
    <h1 className='updateHead'>Add Products</h1>
    <form className='update' onSubmit={onSubmit}>
      {message && <div className="message">{message}</div>}
      
      <div>
        <label>Order Number</label>
        <input type="text" name="order_no" value={product.order_no} readOnly />
      </div>
      <div>
        <label>Product Name</label>
        <input type="text" name="product_name" value={product.product_name} onChange={onChange} required />
      </div>
      <div>
        <label>Product Brand</label>
        <input type="text" name="product_brand" value={product.product_brand} onChange={onChange} required />
      </div>
      <div>
        <label>Amount per item</label>
        <input type="text" name="product_size" value={product.product_size} onChange={onChange} />
      </div>
      <div>
        <label>Product Color</label>
        <input type="text" name="product_color" value={product.product_color} onChange={onChange} />
      </div>
      <div>
        <label>Quantity</label>
        <input type="text" name="quantity" value={product.quantity} onChange={onChange} required /> 
      </div>
      <div>
        <label>Image URL</label>
        <input type="text" name="image_url" value={product.image_url} onChange={onChange} />
      </div>
      <button type="submit">Add Product</button>
    </form>
    </>
    :
    <div>
      <h1 className='headingLog'>Please login or register to continue</h1>
      <div className='logButtons'>
      <Link to="/login"><button className='log' >Login</button></Link>
      <Link to="/register"> <button className='logReg'>Register</button></Link>
      </div>
    </div>
}
</>
  );
};

export default AddProduct;