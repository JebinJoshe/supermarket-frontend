import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './jo/Home';
import Login from './jo/Login';
import Register from './jo/Register';
import ProductList from './jo/ProductList';
import UpdateProduct from './jo/UpdateProduct';
import './App.css';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/update-product" element={<UpdateProduct />} />
    </Routes>
    </>
  );
}

export default App;
