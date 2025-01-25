// src\components\Hero.tsx
import { useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-scroll';
import IMFSD from '../assets/4974708-hd_1920_1080_25fps.mp4';
import { useApiContext } from '../context/ApiContext';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
const Hero = () => {
  const { darkMode } = useApiContext(); // Accede a darkMode desde el contexto
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fondo de video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src={IMFSD} type="video/mp4" />
        <source src={IMFSD} type="video/webm" />
        Tu navegador no soporta el video.
      </video>

      {/* Contenido de texto */}
      <Container sx={{ zIndex: 1, position: 'relative', textAlign: 'center' }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            textShadow: isHovered ? '5px 5px 20px rgba(0,0,0,0.8)' : '2px 2px 10px rgba(0,0,0,0.7)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Innovación en Desarrollo de Software
        </Typography>

        <Typography
          variant="h6"
          paragraph
          sx={{
            fontWeight: 'lighter',
            color: 'white',
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            textShadow: '2px 2px 15px rgba(0,0,0,0.7)',
          }}
        >
          Diseñamos productos digitales que transforman negocios y hacen crecer tu marca.
        </Typography>

        {/* Botón dinámico según darkMode */}
        <Link to="section-about" spy={true} smooth={true} offset={50} duration={500} style={{ textDecoration: 'none' }}>
          <Button endIcon={<EmojiObjectsIcon/>}
            variant="contained"
            size="large"
            color="primary"
            sx={{
              padding: '12px 36px',
              fontSize: '1.2rem',
              borderRadius: '30px',
              boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
              backgroundColor: darkMode ? 'orange' : '#007BFF', // Color dinámico
              '&:hover': {
                backgroundColor: darkMode ? 'orange' : '#0056b3',
                boxShadow: '0px 12px 25px rgba(0,0,0,0.4)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {darkMode ? '¡Conoce Más!' : '¡Conoce Más!'}
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default Hero;
