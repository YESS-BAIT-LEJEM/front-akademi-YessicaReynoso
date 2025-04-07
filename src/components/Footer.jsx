// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
  sx={{
    background: 'linear-gradient(to top, #FADADD 0%, #FFE4EC 40%, #fff0f5 100%)',
    py: 4,
    mt: 5,
    color: '#5A5A5A',
    textAlign: 'center',
    boxShadow: 'inset 0 1px 5px rgba(0,0,0,0.05)',
  }}
>
  <Typography variant="body1" sx={{ fontWeight: 500, color: '#7B3F61' }}>
    © {new Date().getFullYear()} GestorRuff Petshop 🐾
  </Typography>
  <Typography variant="body2" sx={{ mt: 1, color: '#8E4A65' }}>
    Desarrollado con ❤️ por Yessica Reynoso
  </Typography>
  <Link
    href="https://github.com/YESS-BAIT-LEJEM"
    color="inherit"
    underline="hover"
    target="_blank"
    rel="noopener"
    sx={{
      mt: 1,
      display: 'inline-block',
      fontWeight: 500,
      color: '#A0617B',
    }}
  >
    GitHub
  </Link>
</Box>

  );
};

export default Footer;
