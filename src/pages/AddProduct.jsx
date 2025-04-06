import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    image_url: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.description ||
      !formData.image_url ||
      !formData.category
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      await axios.post('http://localhost:3001/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      navigate('/');
    } catch (err) {
      console.error('Error al agregar producto:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ my: 3 }}>
        Agregar nuevo producto
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="name"
          label="Nombre"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="price"
          label="Precio"
          type="number"
          value={formData.price}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="stock"
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="description"
          label="Descripción"
          value={formData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="image_url"
          label="URL Imagen"
          value={formData.image_url}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="category"
          label="Categoría"
          select
          value={formData.category}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="alimento">Alimento</MenuItem>
          <MenuItem value="accesorio">Accesorio</MenuItem>
          <MenuItem value="juguete">Juguete</MenuItem>
          <MenuItem value="higiene">Higiene</MenuItem>
        </TextField>

        <Button variant="contained" type="submit">
          Guardar producto
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
