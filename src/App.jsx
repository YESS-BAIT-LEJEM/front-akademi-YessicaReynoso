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

        <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
          <Container
            maxWidth="md"
            sx={{
              minHeight: 'calc(0vh - 10px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              py: -1,
            }}
          >
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
