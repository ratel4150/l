// src\components\Testimonials.tsx
import React from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Stack, Rating } from '@mui/material';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Helmet } from 'react-helmet';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const testimonials = Array.from({ length: 6 }, () => ({
  name: faker.person.firstName() + ' ' + faker.person.lastName(),
  feedback: faker.lorem.sentences(2),
  avatar: faker.image.avatar(),
  jobTitle: "CTO",
  company: "TechCorp",
  industry: "Software",
 /*  company: faker.company.name(), */
  rating: faker.number.int({ min: 3, max: 5 }), // Rating entre 3 y 5 estrellas
  services: ["Desarrollo Web", "Consultoría Técnica", "Soporte Técnico"]
}));

const Testimonials= () => {






  return (
    <>
      <Helmet>
        <title>Testimonios - DevBusiness</title>
        <meta
          name="description"
          content="Lee lo que nuestros clientes dicen sobre nuestros servicios y cómo ayudamos a transformar sus negocios."
        />
      </Helmet>
      <Box sx={{ py: 8, backgroundColor: '#f9fafc' }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Opiniones de Nuestros Clientes
          </Typography>
          <Typography variant="body1" textAlign="center" color="textSecondary" mb={4}>
            Descubre cómo hemos impactado en los negocios de nuestros clientes con nuestras soluciones.
          </Typography>
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
<Card
  sx={{
    mx: 2,
    p: 4,
    borderRadius: 4,
    boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.15)',
    background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
    maxWidth: 750,
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  }}
>
  {/* Fondo decorativo con patrones */}
  <Box
    sx={{
      position: 'absolute',
      top: '-20%',
      right: '-15%',
      width: '150%',
      height: '150%',
      background: 'radial-gradient(circle, rgba(66, 165, 245, 0.1), transparent)',
      transform: 'rotate(-20deg)',
      zIndex: 0,
    }}
  />
  <CardContent sx={{ position: 'relative', zIndex: 1 }}>
    {/* Header: Avatar, Nombre y Empresa */}
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
      {/* Persona */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Avatar
          src={testimonial.avatar}
          alt={testimonial.name}
          sx={{
            width: 64,
            height: 64,
            border: '3px solid #42a5f5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Box>
          <Typography variant="h6" color="textPrimary" fontWeight={700}>
            {testimonial.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" fontStyle="italic">
            {testimonial.jobTitle} at {testimonial.company}
          </Typography>
        </Box>
      </Stack>

      {/* Logo de la Empresa */}
      <Avatar
        src={faker.image.urlLoremFlickr({ category: 'business' })}
        alt={testimonial.company}
        variant="square"
        sx={{
          width: 56,
          height: 56,
          borderRadius: 1,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      />
    </Stack>

    {/* Testimonio */}
    <Box
      sx={{
        background: '#e3f2fd',
        padding: 3,
        borderRadius: 2,
        mb: 3,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      <FormatQuoteIcon
        fontSize="large"
        sx={{
          position: 'absolute',
          top: -20,
          left: -20,
          fontSize: 60,
          color: 'rgba(66, 165, 245, 0.2)',
        }}
      />
      <Typography
        variant="body1"
        color="textSecondary"
        fontStyle="italic"
        fontWeight={500}
        textAlign="justify"
        lineHeight={1.8}
      >
        {testimonial.feedback}
      </Typography>
    </Box>

    {/* Calificación y Detalles */}
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {/* Calificación */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating
          value={testimonial.rating}
          precision={0.5}
          readOnly
          sx={{
            fontSize: '2rem',
            color: '#FFD700',
            '& .MuiRating-iconFilled': {
              color: '#FFD700',
            },
          }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {testimonial.rating}/5
        </Typography>
      </Stack>

      {/* Categoría o Sector */}
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{
          fontSize: '0.9rem',
          fontStyle: 'italic',
          textAlign: 'right',
        }}
      >
        Sector: {testimonial.industry || 'Tecnología'}
      </Typography>
    </Stack>

    {/* Información Extra: Proyectos o Servicios Contratados */}
    <Box mt={3} sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2 }}>
      <Typography
        variant="subtitle1"
        color="textPrimary"
        fontWeight={700}
        gutterBottom
      >
        Servicios Contratados:
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {testimonial.services.join(', ')}
      </Typography>
    </Box>
  </CardContent>
</Card>


              </motion.div>
            ))}
          </Slider>
        </Container>
      </Box>
    </>
  );
};

export default Testimonials;
