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
  Pagination,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsState.products);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory =
      categoryFilter === 'Todos' || product.category === categoryFilter;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortBy) return 0;

    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === 'string') {
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // 🔐 Corregimos categorías con filtro de valores válidos
  const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          my: 3,
          fontWeight: 600,
          color: 'primary.main',
          letterSpacing: '1px'
        }}
      >
        PRODUCTOS
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
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
          {uniqueCategories.map((cat, i) => (
            <MenuItem key={i} value={cat}>
              {typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Sin categoría'}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          onClick={() => navigate('/add-product')}
          sx={{
            backgroundColor: '#FFB6B9',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#FF9AA2',
            },
          }}
        >
          Agregar producto
        </Button>
      </Box>

      {paginatedProducts.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          🐶 No hay productos disponibles para mostrar.
        </Typography>
      ) : (
        <ProductTable
          products={paginatedProducts}
          onSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 0 }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#4a4a4a',
              fontWeight: 'bold',
            },
            '& .Mui-selected': {
              backgroundColor: '#FFB6B9 !important',
              color: '#fff',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: '#FF9AA2',
              color: '#fff',
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Home;
