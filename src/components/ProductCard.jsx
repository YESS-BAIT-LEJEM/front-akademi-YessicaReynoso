import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 300, m: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image_url}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;


