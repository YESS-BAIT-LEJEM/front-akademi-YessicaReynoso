import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const productId = parseInt(id, 10);

  const product = useSelector(state =>
    state.productsState.products.find(p => p.id === productId)
  );

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ mt: 4 }}>
          Producto no encontrado.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={product.image_url}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
              Categoría: {product.category}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Precio: ${product.price}
            </Typography>
            <Typography variant="body2">Stock: {product.stock}</Typography>

            <Button variant="outlined" sx={{ mt: 3 }} onClick={() => navigate(-1)}>
              Volver
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ProductDetail;
