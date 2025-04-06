import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import EditProduct from './pages/EditProduct';
import React from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Navbar />

        {/* Contenido principal crece para llenar el espacio */}
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Container>
            <Routes>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/product/:id/edit" element={<EditProduct />} />
            </Routes>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default App;
