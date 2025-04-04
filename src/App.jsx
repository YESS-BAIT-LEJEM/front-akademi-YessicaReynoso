import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Container, Typography, Grid, Pagination, Box } from '@mui/material';




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
        </Routes>
      </Container>
    </>
  );
}

export default App;
