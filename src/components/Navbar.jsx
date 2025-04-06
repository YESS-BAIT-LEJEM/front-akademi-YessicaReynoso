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
        bgcolor: '#FFE4E1', // rosa suave pastel
        color: '#4A4A4A',    // gris oscuro pastel
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          Gestor Petshop 🐶
        </Typography>
        <Box>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
