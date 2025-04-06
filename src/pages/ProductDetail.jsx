import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Cargando...</p>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 3 }}>
        {product.name}
      </Typography>
      <Typography><strong>Precio:</strong> ${product.price}</Typography>
      <Typography><strong>Stock:</strong> {product.stock}</Typography>
      <Typography><strong>Descripción:</strong> {product.description}</Typography>
      <Typography><strong>Categoría:</strong> {product.category}</Typography>
      <img src={product.image_url} alt={product.name} width="100%" style={{ marginTop: 16 }} />
      
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" onClick={() => navigate(`/product/${product.id}/edit`)}>
          Editar producto ✏️
        </Button>
      </Box>
    </Container>
  );
};

export default ProductDetail;
