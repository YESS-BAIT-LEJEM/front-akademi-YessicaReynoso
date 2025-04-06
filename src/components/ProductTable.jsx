import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/productActions';
import SortMenu from './SortMenu';

const ProductTable = ({ products, onSort, sortBy, sortOrder }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás segura de eliminar este producto?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      dispatch(deleteProduct(id));
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <SortMenu
                field="name"
                label="Nombre"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            </TableCell>
            <TableCell>
              <SortMenu
                field="price"
                label="Precio"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            </TableCell>
            <TableCell><strong>Categoría</strong></TableCell>
            <TableCell><strong>Stock</strong></TableCell>
            <TableCell align="center"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell align="center">
                <Tooltip title="Ver detalle">
                  <IconButton onClick={() => navigate(`/product/${product.id}`)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar producto">
                  <IconButton onClick={() => navigate(`/product/${product.id}/edit`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar producto">
                  <IconButton color="error" onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
