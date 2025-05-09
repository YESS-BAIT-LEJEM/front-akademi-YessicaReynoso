import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        mb: 4,
        bgcolor: '#FFE4E1',
        color: '#4A4A4A',
        fontFamily: 'Poppins, sans-serif',
        height: 64 // Altura del navbar
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 2 }}>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <img
            src="src\assets\logo.png"
            alt="Logo GestorRuff"
            style={{ width: 90, height: 90, marginRight: 10 }}
          />
        </Box>

        <Button
          component={RouterLink}
          to="/"
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
          Inicio
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
