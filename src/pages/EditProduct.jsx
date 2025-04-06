import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Box
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

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Editar producto
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" name="name" value={product.name} onChange={handleChange} />
        <TextField label="Precio" name="price" type="number" value={product.price} onChange={handleChange} />
        <TextField label="Categoría" name="category" value={product.category} onChange={handleChange} />
        <TextField label="Stock" name="stock" type="number" value={product.stock} onChange={handleChange} />
        <TextField label="Descripción" name="description" value={product.description} onChange={handleChange} />
        <TextField label="URL de imagen" name="image_url" value={product.image_url} onChange={handleChange} />

        <Button variant="contained" onClick={() => setConfirmOpen(true)}>
          Guardar cambios
        </Button>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSave}
        title="Guardar cambios"
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
