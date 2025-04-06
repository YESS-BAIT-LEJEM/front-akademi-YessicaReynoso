import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import Message from '../components/Message';

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    category: '',
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('success');
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'stock') {
      const stockValue = parseInt(value, 10);
      if (stockValue < 0) {
        setErrors(prev => ({ ...prev, stock: 'No puede ser negativo' }));
      } else {
        setErrors(prev => ({ ...prev, stock: '' }));
      }
    }
  
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3001/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      setMessageText('Producto agregado exitosamente');
      setMessageSeverity('success');
      setMessageOpen(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('Error al agregar producto:', err);
      setMessageText('Error al agregar el producto');
      setMessageSeverity('error');
      setMessageOpen(true);
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const stockValue = parseInt(formData.stock, 10);
    if (stockValue < 0) {
      setErrors(prev => ({ ...prev, stock: 'No puede ser negativo' }));
      return;
    }
  
    if (
      !formData.name ||
      !formData.price ||
      !formData.stock ||
      !formData.description ||
      !formData.image||
      !formData.category
    ) {
      setMessageText('Todos los campos son obligatorios');
      setMessageSeverity('warning');
      setMessageOpen(true);
      return;
    }
  
    setConfirmOpen(true);
  };
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{
    my: 3,
    fontWeight: 600,
    color: 'primary.main',
    letterSpacing: '1px'
  }}>
        Agregar nuevo producto
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth name="name" label="Nombre*" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="price" label="Precio*" type="number" value={formData.price} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="stock" label="Stock*" type="number" value={formData.stock} onChange={handleChange} error={!!errors.stock} helperText={errors.stock} sx={{ mb: 2 }} />
        <TextField fullWidth name="description" label="Descripción*" value={formData.description} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="image" label="URL Imagen*" value={formData.image} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="category" label="Categoría*" select value={formData.category} onChange={handleChange} sx={{ mb: 2 }}>
          <MenuItem value="alimento">Alimento</MenuItem>
          <MenuItem value="accesorio">Accesorio</MenuItem>
          <MenuItem value="juguete">Juguete</MenuItem>
          <MenuItem value="higiene">Higiene</MenuItem>
        </TextField>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/')}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit">
            Guardar producto
          </Button>
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSave}
        title="¿Guardar producto?"
        description="¿Estás segura/o de que querés guardar este nuevo producto?"
        confirmLabel="Guardar"
        confirmColor="primary"
      />

      <Message
        open={messageOpen}
        onClose={() => setMessageOpen(false)}
        message={messageText}
        severity={messageSeverity}
      />
    </Container>
  );
};

export default AddProduct;
