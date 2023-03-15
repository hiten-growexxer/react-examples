import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CartList from '../CartList';
import Navbar from '../Navbar';
import ProductList from '../ProductList';

export default function Main() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="" element={<ProductList />} />
      </Routes>
      <Routes>
        <Route path="cart" element={<CartList />} />
      </Routes>
    </div>
  );
}
