import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useEffect,useState } from 'react';

const Navbar = () => {
  const [userId,setUserId] = useState('');
  useEffect(() => {
    const check = localStorage.getItem('userId');
    if (check) {
      const getUserId = localStorage.getItem('user');
      const getUser = JSON.parse(getUserId);
      setUserId(getUser?.id);
    }
   
  }, []);
  return (
    <nav>
      <h1>Supermarket Stock Management</h1>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/update-product">Add Product</Link></li>
        {userId && 
           <li onMouseDown={()=>{localStorage.clear();window.location.reload();}}>Logout</li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
