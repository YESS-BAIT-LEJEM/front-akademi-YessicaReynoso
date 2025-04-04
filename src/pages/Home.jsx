import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../redux/actions/productActions';
import ProductCard from '../components/ProductCard';
import { Container, Typography, Grid, Pagination, Box } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsState.products);


  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Lista de productos
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {paginatedProducts.map((product) => (
          <Box
            key={product.id}
            sx={{ width: '100%', maxWidth: 300, m: 1 }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Home;
