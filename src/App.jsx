import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Container, Typography, Grid, Pagination, Box } from '@mui/material';
import Navbar from './components/Navbar';
import EditProduct from './pages/EditProduct';



function App() {
 

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/:id/edit" element={<EditProduct />} />
          
        </Routes>
      </Container>
    </>
  );
}

export default App;
