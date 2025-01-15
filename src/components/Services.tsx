// src\components\Services.tsx
import  { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Typography, Card, CardContent, Button, Avatar, Modal, Backdrop, Fade } from '@mui/material';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import WebIcon from '@mui/icons-material/Web';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import InsightsIcon from '@mui/icons-material/Insights';

const services = [
  {
    title: 'Desarrollo Web',
    desc: 'Sitios modernos y responsivos.',
    icon: <WebIcon />,
    bgColor: '#e3f2fd',
    detailedInfo: 'Creación de sitios web a medida, con un enfoque en el diseño responsivo, optimización para motores de búsqueda (SEO) y rendimiento.',
  },
  {
    title: 'Desarrollo Móvil',
    desc: 'Aplicaciones multiplataforma.',
    icon: <PhoneAndroidIcon />,
    bgColor: '#f3e5f5',
    detailedInfo: 'Desarrollo de aplicaciones móviles para Android e iOS, utilizando tecnologías como React Native y Flutter.',
  },
  {
    title: 'DevOps',
    desc: 'Automatización con CI/CD.',
    icon: <BuildCircleIcon />,
    bgColor: '#e8f5e9',
    detailedInfo: 'Implementación de pipelines de integración y entrega continua, automatización de pruebas y despliegues con herramientas como Jenkins y GitLab.',
  },
  {
    title: 'Consultoría',
    desc: 'Estrategias personalizadas.',
    icon: <InsightsIcon />,
    bgColor: '#fff8e1',
    detailedInfo: 'Ofrecemos consultoría en tecnología, transformación digital y análisis de negocios para ayudar a las empresas a crecer en un entorno competitivo.',
  },
];

function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray",color:"black" }}
        onClick={onClick}
      />
    );
  }

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const Services = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const handleOpenModal = (service: any) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };

  return (
    <>
      <Helmet>
        <title>Servicios - DevBusiness</title>
        <meta
          name="description"
          content="Descubre los servicios que ofrecemos, como desarrollo web, móvil, DevOps y consultoría."
        />
      </Helmet>
      <Box sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Nuestros Servicios
          </Typography>
          <Typography textAlign="center" color="textSecondary" mb={4}>
            Ofrecemos soluciones innovadoras para tus necesidades tecnológicas.
          </Typography>
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    mx: 2,
                    p: 2,
                    textAlign: 'center',
                    borderRadius: 4,
                    backgroundColor: service.bgColor,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      mx: 'auto',
                      mb: 2,
                      width: 56,
                      height: 56,
                      bgcolor: '#ffffff',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    {service.icon}
                  </Avatar>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography color="textSecondary" mb={2}>
                      {service.desc}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 2 }}
                      onClick={() => handleOpenModal(service)}
                    >
                      Ver más
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* Modal con información detallada del servicio */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
              width: '80%',
              maxWidth: '600px',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {selectedService?.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={2}>
              {selectedService?.detailedInfo}
            </Typography>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Services;
