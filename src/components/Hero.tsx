// src\components\Hero.tsx
import React, { useState } from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import IMFSD from '../assets/4974708-hd_1920_1080_25fps.mp4';
import { useApiContext } from '../context/ApiContext';

import PhoneIcon from '@mui/icons-material/Phone'; // Icono para la acción de llamada
import { Helmet } from 'react-helmet';
interface HeroProps {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
}

const Hero = ({ trackEvent }: HeroProps) => {
  const { darkMode } = useApiContext();
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  // Rastrear evento 'ViewContent' cuando el componente se monta
  React.useEffect(() => {
    trackEvent('ViewContent', {
      content_name: 'Hero Section',
      content_category: 'Homepage',
    });
  }, [trackEvent]);

  // Rastrear evento 'Hover' cuando el usuario pasa el mouse sobre el título
  React.useEffect(() => {
    if (isHovered) {
      trackEvent('Hover', {
        element: 'Hero Title',
        action: 'Hovered',
      });
    }
  }, [isHovered, trackEvent]);

  // Rastrear evento 'Scroll' cuando el usuario hace scroll en la sección Hero
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        trackEvent('Scroll', {
          section: 'Hero',
          scroll_position: scrollY,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackEvent]);

  // Manejo del clic en el botón de WhatsApp
  const handleButtonClick = () => {
    trackEvent('Contact', {
      action: 'WhatsApp Button Clicked',
      method: 'Click',
    });
    window.open(
      'https://wa.me/525637303010?text=Hola,%20estoy%20muy%20interesado%20en%20sus%20servicios.%20Me%20gustaría%20recibir%20más%20información%20sobre%20los%20paquetes%20que%20ofrecen,%20así%20como%20asesoría%20para%20mi%20proyecto.%20Gracias!',
      '_blank'
    );
  };

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
            {/* React Helmet para SEO */}
            <Helmet>
        <title>HoneyBadger Labs | Innovación en Desarrollo de Software</title>
        <meta
          name="description"
          content="Diseñamos productos digitales que transforman negocios y hacen crecer tu marca. Contáctanos para más información."
        />
        <meta
          name="keywords"
          content="desarrollo de software, innovación, productos digitales, transformación de negocios"
        />
        <meta name="author" content="HoneyBadger Labs" />
        <meta property="og:title" content="HoneyBadger Labs | Innovación en Desarrollo de Software" />
        <meta
          property="og:description"
          content="Diseñamos productos digitales que transforman negocios y hacen crecer tu marca."
        />
        <meta property="og:image" content="https://honeybadger-labs.netlify.app/logo.png" />
        <meta property="og:url" content="https://honeybadger-labs.netlify.app/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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
        <motion.div
          animate={controls}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              transition: 'all 0.3s ease',
            }}
          >
            Innovación en Desarrollo de Software
          </Typography>
        </motion.div>

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

        {/* Botón de WhatsApp */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
          <Button
            startIcon={<PhoneIcon />}
            variant="contained"
            size="large"
            onClick={handleButtonClick}
            sx={{
              padding: '12px 36px',
              fontSize: '1.2rem',
              borderRadius: '30px',
              boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
              backgroundColor: darkMode ? 'orange' : '#007BFF',
              '&:hover': {
                backgroundColor: darkMode ? 'orange' : '#0056b3',
                boxShadow: '0px 12px 25px rgba(0,0,0,0.4)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Envia Whats App
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
export default Hero;
