import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (!product) return <p>Error al cargar producto</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 6 }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
        {/* Imagen centrada y contenida */}
        <CardMedia
          component="div"
          sx={{
            height: 280,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fffafc',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: 2,
            boxSizing: 'border-box',
          }}
        >
          <img
            src={`/${product.image}`}
            alt={product.name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </CardMedia>

        <CardContent sx={{ backgroundColor: '#fff0f3' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
            {product.name}
          </Typography>

          <Typography><strong>Precio:</strong> ${product.price}</Typography>
          <Typography><strong>Stock:</strong> {product.stock}</Typography>
          <Typography><strong>Categoría:</strong> {product.category}</Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Descripción:</strong> {product.description}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                color: 'primary.main',
                borderColor: 'primary.main',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#ffe6ea',
                  borderColor: 'primary.main'
                }
              }}
            >
              Volver
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
