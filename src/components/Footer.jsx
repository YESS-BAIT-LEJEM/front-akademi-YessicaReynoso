// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#FADADD', py: 3, mt: 5, color: 'white' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          © {new Date().getFullYear()} Gestor Petshop 🐾
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Desarrollado con ❤️ por Yessica Reynoso
        </Typography>
        <Link
          href="https://github.com/YESS-BAIT-LEJEM"
          color="inherit"
          underline="hover"
          target="_blank"
          rel="noopener"
          sx={{ mt: 1, display: 'inline-block' }}
        >
          GitHub
        </Link>
      </Container>
    </Box>
  );
};

export default Footer;
