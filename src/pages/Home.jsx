import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../redux/actions/productActions';
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard;

const Home = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsState.products);

  useEffect(() => {
    console.log('Home renderizado 🐾');

    axios.get('http://localhost:3001/products')
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
<Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Lista de productos
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
