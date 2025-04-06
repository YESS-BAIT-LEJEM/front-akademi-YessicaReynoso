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

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { deleteProduct } from '../redux/actions/productActions';
import { Link as RouterLink } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
const dispatch = useDispatch();

const handleDelete = async () => {
  const confirm = window.confirm("¿Estás segura de eliminar este producto?");
  if (!confirm) return;

  try {
    await axios.delete(`http://localhost:3001/products/${product.id}`);
    dispatch(deleteProduct(product.id));
  } catch (err) {
    console.error('Error al eliminar:', err);
  }
};

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
        <Button color="inherit" component={RouterLink} to="/add-product">
          Agregar producto
        </Button>
        <Button size="small" color="error" onClick={handleDelete}>
          Eliminar 🗑
        </Button>


      </CardActions>
    </Card>
  );
};

export default ProductCard;


