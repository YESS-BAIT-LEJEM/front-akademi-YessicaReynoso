import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmDialog from '../components/ConfirmDialog';
import Message from '../components/Message';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image_url: ''
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSeverity, setMessageSeverity] = useState('success');

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/products/${id}`, product)
      .then(() => {
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
        Editar producto
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField fullWidth label="Nombre*" name="name" value={product.name} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Precio*" name="price" type="number" value={product.price} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Categoría*" name="category" value={product.category} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Stock*" name="stock" type="number" value={product.stock} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="Descripción*" name="description" value={product.description} onChange={handleChange} sx={{ mb: 2 }} />
        <TextField fullWidth label="URL de imagen*" name="image_url" value={product.image_url} onChange={handleChange} sx={{ mb: 2 }} />

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
