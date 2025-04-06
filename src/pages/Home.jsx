import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../redux/actions/productActions';
import ProductTable from '../components/ProductTable';
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsState.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      categoryFilter === 'Todos' || product.category === categoryFilter;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Lista de productos
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Select
          value={categoryFilter}
          onChange={handleFilterChange}
          displayEmpty
          sx={{ width: 200 }}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          {[...new Set(products.map(p => p.category))].map((cat, i) => (
            <MenuItem key={i} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <ProductTable products={paginatedProducts} />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Home;
