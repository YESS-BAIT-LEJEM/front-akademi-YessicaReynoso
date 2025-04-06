import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestor Petshop 🐶
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Inicio
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
