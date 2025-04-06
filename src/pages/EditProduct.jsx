import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import ProductCard from '../components/ProductTable';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/products/${id}`, product);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ my: 3 }}>
        Editar producto
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth name="name" label="Nombre"
          value={product.name} onChange={handleChange} sx={{ mb: 2 }}
        />
        <TextField
          fullWidth name="price" label="Precio" type="number"
          value={product.price} onChange={handleChange} sx={{ mb: 2 }}
        />
        <TextField
          fullWidth name="stock" label="Stock" type="number"
          value={product.stock} onChange={handleChange} sx={{ mb: 2 }}
        />
        <TextField
          fullWidth name="description" label="Descripción"
          value={product.description} onChange={handleChange} sx={{ mb: 2 }}
        />
        <TextField
          fullWidth name="image_url" label="Imagen URL"
          value={product.image_url} onChange={handleChange} sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </Box>
    </Container>
  );
};

export default EditProduct;
