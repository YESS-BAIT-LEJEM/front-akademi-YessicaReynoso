import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box,
  MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import Message from '../components/Message';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/productActions';

const imageOptions = [
  'collar-rosa.png', 'tazon-doble.png', 'shampoo-mascota.png',
  'collar-rosa-monio.png', 'cepillo-mascota.png', 'piedras-sanitarias.png',
  'pipeta-gato.png', 'pipeta-perro.png', 'raton-peluche.png',
  'ropa-perrito.png', 'soga-juguete.png', 'bolsa-transportadora-mascota.png'
];

const DEFAULT_IMAGE = 'pet-images/default.png';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '', price: '', category: '', stock: '', description: '', image: ''
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('success');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stock' && parseInt(value, 10) < 0) {
      setErrors(prev => ({ ...prev, stock: 'No puede ser negativo' }));
    } else {
      setErrors(prev => ({ ...prev, stock: '' }));
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:3001/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.image || DEFAULT_IMAGE
      });

      dispatch(addProduct(response.data));

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
    if (!formData.name || !formData.price || !formData.stock || !formData.description) {
      setMessageText('Todos los campos son obligatorios');
      setMessageSeverity('warning');
      setMessageOpen(true);
      return;
    }

    if (parseInt(formData.stock, 10) < 0) {
      setErrors(prev => ({ ...prev, stock: 'No puede ser negativo' }));
      return;
    }

    setConfirmOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ my: 3, fontWeight: 600, color: 'primary.main' }}>
        Agregar nuevo producto
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth name="name" label="Nombre*" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="price" label="Precio*" type="number" value={formData.price} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="category" label="Categoría*" value={formData.category} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth name="stock" label="Stock*" type="number" value={formData.stock} onChange={handleChange} error={!!errors.stock} helperText={errors.stock} sx={{ mb: 2 }} />
        <TextField fullWidth name="description" label="Descripción*" value={formData.description} onChange={handleChange} sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="image-label">Imagen</InputLabel>
          <Select
            labelId="image-label"
            name="image"
            value={formData.image}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <img src={`/${selected}`} alt="preview" width={40} />
                  {selected.replace('pet-images/', '')}
                </Box>
              ) : 'Imagen por defecto'
            }
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
          >
            <MenuItem value="">
              <Box display="flex" alignItems="center" gap={1}>
                <img src={`/${DEFAULT_IMAGE}`} alt="default" width={40} />
                Imagen por defecto
              </Box>
            </MenuItem>
            {imageOptions.map((img, i) => (
              <MenuItem key={i} value={`pet-images/${img}`}>
                <Box display="flex" alignItems="center" gap={1}>
                  <img src={`/pet-images/${img}`} alt={img} width={40} />
                  {img}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/')}>Cancelar</Button>
          <Button variant="contained" type="submit">Guardar producto</Button>
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
