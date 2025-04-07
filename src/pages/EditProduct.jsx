import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Box,
  Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/actions/productActions';
import ConfirmDialog from '../components/ConfirmDialog';
import Message from '../components/Message';

const imageOptions = [
  'collar-rosa.png',
  'tazon-doble.png',
  'shampoo-mascota.png',
  'collar-rosa-monio.png',
  'cepillo-mascota.png',
  'piedras-sanitarias.png',
  'pipeta-gato.png',
  'pipeta-perro.png',
  'raton-peluche.png',
  'ropa-perrito.png',
  'soga-juguete.png',
  'bolsa-transportadora-mascota.png'
];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const [product, setProduct] = useState({
    name: '', price: '', category: '', stock: '', description: '', image: ''
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('success');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => {
        const data = res.data;
        setProduct({
          ...data,
          image: data.image || 'pet-images/default.png' 
        });
      })
      .catch(err => console.log(err));
  }, [id]);

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

    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/products/${id}`, {
      ...product,
      image: product.image || 'pet-images/default.png'
    })
      .then((res) => {
        dispatch(updateProduct(res.data)); 
        setMessageText('Producto editado exitosamente');
        setMessageSeverity('success');
        setMessageOpen(true);
        setTimeout(() => navigate('/'), 1500);
      })
      .catch(() => {
        setMessageText('Error al editar el producto');
        setMessageSeverity('error');
        setMessageOpen(true);
      })
      .finally(() => setConfirmOpen(false));
  };

  const openSaveConfirm = () => {
    const stockValue = parseInt(product.stock, 10);
    if (stockValue < 0) {
      setErrors(prev => ({ ...prev, stock: 'No puede ser negativo' }));
      return;
    }

    setConfirmOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ my: 3, fontWeight: 600, color: 'primary.main' }}>
        Editar producto
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField fullWidth label="Nombre*" name="name" value={product.name} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Precio*" name="price" type="number" value={product.price} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Categoría*" name="category" value={product.category} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Stock*" name="stock" type="number" value={product.stock} onChange={handleChange} error={!!errors.stock} helperText={errors.stock} sx={{ mb: 2 }} />
        <TextField fullWidth label="Descripción*" name="description" value={product.description} onChange={handleChange} sx={{ mb: 2 }} />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="image-label">Imagen</InputLabel>
          <Select
            labelId="image-label"
            name="image"
            value={product.image}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box display="flex" alignItems="center" gap={1}>
                <img src={`/${selected}`} alt="preview" width={40} />
                {selected}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
          >
            {imageOptions.map((img, index) => (
              <MenuItem key={index} value={`pet-images/${img}`}>
                <Box display="flex" alignItems="center" gap={1}>
                  <img src={`/pet-images/${img}`} alt={img} width={40} />
                  {img}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/')}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={openSaveConfirm}
            sx={{
              backgroundColor: '#FFB6B9',
              color: '#fff',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#FF9AA2'
              }
            }}
          >
            Guardar cambios
          </Button>
        </Box>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSave}
        title="¿Guardar cambios?"
        description="¿Estás segura/o de que querés guardar los cambios?"
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

export default EditProduct;
