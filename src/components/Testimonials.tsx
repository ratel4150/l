// src\components\Testimonials.tsx

import { Box, Container, Typography, Card, CardContent, Avatar, Stack, Rating,  Chip,  LinearProgress, Divider } from '@mui/material';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';

import { Helmet } from 'react-helmet';
import { useApiContext } from '../context/ApiContext';


import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
// Lazy import for Slider (react-slick) and framer-motion (optional for lazy loading of animation libraries)


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const testimonials = [
  {
    name: 'María López',
    feedback: 'El equipo de HoneyBadgerLabs superó nuestras expectativas. La plataforma que desarrollaron transformó completamente nuestra forma de operar, mejorando tanto la eficiencia interna como la experiencia de nuestros clientes.',
    avatar: faker.image.avatarGitHub(),
    jobTitle: 'CEO',
    company: 'InnovateTech',
    industry: 'Tecnología',
    rating: 5,
    services: ['Desarrollo Web', 'Consultoría Técnica', 'Integración de Sistemas'],
    date: '2024-01-10', // Fecha del testimonio
    comments: 'El trabajo colaborativo fue increíble. Siempre estuvieron atentos a nuestras necesidades y se adaptaron rápidamente a cualquier cambio.',
    feedbackCategory: 'Desarrollo de Plataforma', // Categoría del feedback
    location: 'LA, USA',
    impact: {
      productivity: 40, // Aumento en la productividad (%)
      revenue: 25, // Aumento en ingresos (%)
      customerSatisfaction: 95, // Satisfacción del cliente (%)
    },
  },
  {
    name: 'Carlos Méndez',
    feedback: 'Su dedicación y atención a los detalles nos ayudaron a lanzar nuestro producto en tiempo récord. ¡Totalmente recomendados! El soporte post-lanzamiento también ha sido excelente.',
    avatar: faker.image.avatarGitHub(),
    jobTitle: 'CTO',
    company: 'FinSmart Solutions',
    industry: 'Finanzas',
    rating: 4.5,
    services: ['Optimización de Procesos', 'Soporte Técnico'],
    date: '2023-12-15',
    comments: 'Fue un proceso fluido y sin estrés, gracias al apoyo constante del equipo. La implementación fue exitosa y todo salió según lo planeado.',
    feedbackCategory: 'Optimización de Procesos Financieros',
    location: 'Barcelona, España',
    impact: {
      productivity: 30,
      revenue: 15,
      customerSatisfaction: 90,
    },
  },
  {
    name: 'Lucía González',
    feedback: 'Gracias a sus servicios, nuestro sitio web ahora es más rápido, seguro y mucho más eficiente. El tráfico y las ventas han aumentado significativamente, superando nuestras expectativas.',
    avatar: faker.image.avatarGitHub(),
    jobTitle: 'Marketing Manager',
    company: 'EcoMart',
    industry: 'Retail',
    rating: 4,
    services: ['SEO', 'Desarrollo Web'],
    date: '2023-11-02',
    comments: 'El enfoque personalizado fue clave. Mejoraron el tiempo de carga del sitio, lo que resultó en una mejor experiencia para nuestros usuarios.',
    feedbackCategory: 'SEO y Rendimiento Web',
    location: 'CDMX, México',
    impact: {
      productivity: 20,
      revenue: 10,
      customerSatisfaction: 85,
    },
  },
  {
    name: 'Juan Pérez',
    feedback: 'Trabajar con ellos fue una experiencia increíble. Siempre estuvieron disponibles para resolver cualquier inquietud y las soluciones que ofrecieron fueron muy innovadoras.',
    avatar: faker.image.avatarGitHub(),
    jobTitle: 'Gerente de Proyecto',
    company: 'Buildify',
    industry: 'Construcción',
    rating: 5,
    services: ['Desarrollo de Aplicaciones', 'Consultoría Técnica'],
    date: '2023-09-18',
    comments: 'Desde el inicio, su capacidad para adaptarse a nuestro proceso fue excepcional. Su flexibilidad en los tiempos y su comunicación clara fueron vitales para el éxito.',
    feedbackCategory: 'Desarrollo de Aplicaciones Personalizadas',
    location: 'Sao Paulo, Brasil',
    impact: {
      productivity: 35,
      revenue: 12,
      customerSatisfaction: 92,
    },
  },
  {
    name: 'Sofía Martínez',
    feedback: 'Un equipo excepcional que entiende nuestras necesidades y entrega soluciones personalizadas. Siempre escucharon nuestros requerimientos y nos sorprendieron con resultados innovadores.',
    avatar: faker.image.avatarGitHub(),
    jobTitle: 'COO',
    company: 'HealthTrack',
    industry: 'Salud',
    rating: 4.8,
    services: ['Integración de API', 'Consultoría Técnica'],
    date: '2023-08-25',
    comments: 'Nos proporcionaron soluciones tecnológicas avanzadas que mejoraron nuestra operativa. La integración de la API fue un proceso muy sencillo y eficaz.',
    feedbackCategory: 'Consultoría y Transformación Digital',
    location: 'Medellin, Colombia',
    impact: {
      productivity: 45,
      revenue: 30,
      customerSatisfaction: 98,
    },
  },
  {
    name: 'Andrés Ramírez',
    feedback: 'Sus servicios han sido clave para modernizar nuestra infraestructura y mejorar la experiencia del cliente. Hemos optimizado varios procesos internos y la satisfacción de nuestros usuarios ha crecido.',
    avatar: faker.image.avatarGitHub(),
    jobTitle: 'Director de TI',
    company: 'SmartHome Inc.',
    industry: 'Tecnología Doméstica',
    rating: 4.7,
    services: ['Automatización de Procesos', 'Soporte Técnico', 'Desarrollo Web'],
    date: '2023-07-12',
    comments: 'La transformación digital ha sido una de las mejores decisiones que hemos tomado. El equipo nos brindó un soporte continuo durante todo el proceso.',
    feedbackCategory: 'Automatización y Soporte TI',
    location: 'Lima, Peru',
    impact: {
      productivity: 50,
      revenue: 20,
      customerSatisfaction: 93,
    },
  },
];


const Testimonials = () => {
  const { darkMode } = useApiContext();

  return (
    <>
      <Helmet>
        <title>Testimonios - HoneyBadgerLabs</title>
        <meta
          name="description"
          content="Lee lo que nuestros clientes dicen sobre nuestros servicios y cómo ayudamos a transformar sus negocios."
        />
      </Helmet>
      <Box sx={{ py: 8, background: darkMode ? 'linear-gradient(to right, #232526, #414345)' : '#f9f9f9' }}>
        <Container>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: darkMode ? 'orange' : 'rgb(0, 162, 255)',
            }}
          >
            Opiniones de Nuestros Clientes
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="textSecondary"
            mb={4}
            sx={{ color: darkMode ? 'white' : 'gray' }}
          >
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
          p: 2,
          borderRadius: 4,
          boxShadow: darkMode ? '0px 12px 28px rgba(0, 0, 0, 0.3)' : '0px 12px 28px rgba(0, 0, 0, 0.2)',
          background: darkMode
            ? 'linear-gradient(145deg, #333, #555)'
            : 'linear-gradient(145deg, #ffffff, #f8f9fa)',
          maxWidth: 400, // Card más pequeña
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          border: darkMode ? '1px solid #444' : '1px solid #e0e0e0',
          transform: 'scale(1)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.3s ease-in-out',
          },
          '&:before': {
            content: '" "',
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: darkMode
              ? 'radial-gradient(circle, rgba(66, 165, 245, 0.1), transparent)'
              : 'radial-gradient(circle, rgba(66, 165, 245, 0.1), transparent)',
            transform: 'rotate(-30deg)',
            zIndex: -1,
          },
        }}
      >
        <CardContent sx={{ position: 'relative' }}>
          {/* Header with Avatar and Name */}
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.name}
              sx={{
                width: 50, // Avatar más pequeño
                height: 50,
                border: '3px solid #2196f3',
                boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
                },
              }}
            />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? 'white' : 'text.primary' }}>
                {testimonial.name}
              </Typography>
              <Typography variant="body2" sx={{ color: darkMode ? '#c1c1c1' : 'text.secondary' }}>
                {testimonial.jobTitle}
              </Typography>
            </Box>
            <Rating value={testimonial.rating} readOnly precision={0.1} size="small" sx={{ color: '#2196f3' }} />
          </Stack>

          {/* Quote Section */}
          <Box sx={{ fontStyle: 'italic', color: darkMode ? 'white' : 'gray', mb: 1 }}>
            <FormatQuoteIcon sx={{ fontSize: 30, color: '#2196f3' }} />
            <Typography variant="body2" sx={{ mt: 1, color: darkMode ? 'white' : 'text.primary' }}>
              {testimonial.feedback}
            </Typography>
            <FormatQuoteIcon sx={{ fontSize: 30, color: '#2196f3' }} />
          </Box>

          {/* Impact Section with Linear Progress */}
          <Stack direction="row" spacing={1} sx={{ mt: 1 }} justifyContent="space-between">
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color={darkMode ? 'white' : 'text.primary'}>
                Productividad
              </Typography>
              <LinearProgress
                variant="determinate"
                value={testimonial.impact.productivity}
                sx={{
                  mt: 0.5,
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#2196f3',
                  },
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color={darkMode ? 'white' : 'text.primary'}>
                Ingresos
              </Typography>
              <LinearProgress
                variant="determinate"
                value={testimonial.impact.revenue}
                sx={{
                  mt: 0.5,
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#4caf50',
                  },
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color={darkMode ? 'white' : 'text.primary'}>
                Satisfacción
              </Typography>
              <LinearProgress
                variant="determinate"
                value={testimonial.impact.customerSatisfaction}
                sx={{
                  mt: 0.5,
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#ff9800',
                  },
                }}
              />
            </Box>
          </Stack>

          {/* Services with Chips */}
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {testimonial.services.map((service, index) => (
              <Chip
                key={index}
                label={service}
                color="primary"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  cursor: 'pointer',
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                  },
                }}
              />
            ))}
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 1 }} />

          {/* Footer with Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
            <LocationOnIcon sx={{ color: '#2196f3', mr: 1 }} />
            <Typography variant="body2" sx={{ color: darkMode ? 'white' : 'text.secondary' }}>
              {testimonial.location}
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
