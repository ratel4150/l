// src\components\Services.tsx
import  { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Typography, Card, CardContent, Button, Avatar, Modal, Backdrop, Fade, Stepper, Step, StepLabel, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import WebIcon from '@mui/icons-material/Web';
import SecurityIcon from '@mui/icons-material/Security';
import { useApiContext } from '../context/ApiContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import DevicesIcon from '@mui/icons-material/Devices';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
const services = [
  {
    title: "Ciberseguridad",
    desc: "Protección avanzada para sistemas y datos.",
    icon: <SecurityIcon />,
    colors: {
      lightMode: { bgColor: "#e3f2fd", textColor: "#1a237e" },
      darkMode: { bgColor: "#0d47a1", textColor: "#ffffff" },
    },
    detailedInfo: [
      {
        subservice: "Auditorías de Seguridad",
        description: "Revisión exhaustiva del código y configuración de sistemas.",
        tools: ["Nessus", "Metasploit", "OWASP ZAP"],
        estimatedPrice: "$15,000 MXN - $50,000 MXN",
        estimatedTime: "2-4 semanas",
        steps: [
          "Realizar un análisis inicial del sistema y arquitectura.",
          "Identificar posibles vulnerabilidades mediante herramientas especializadas.",
          "Generar un informe con hallazgos y recomendaciones.",
          "Implementar correcciones en colaboración con el equipo de TI.",
        ],
      },
      {
        subservice: "Implementación de Firewalls",
        description: "Configuración avanzada de firewalls y redes seguras.",
        tools: ["pfSense", "Fortinet", "Cisco ASA"],
        estimatedPrice: "$20,000 MXN - $60,000 MXN",
        estimatedTime: "3-5 semanas",
        steps: [
          "Evaluar las necesidades de seguridad y red del cliente.",
          "Seleccionar la tecnología de firewall adecuada.",
          "Configurar reglas personalizadas para proteger contra amenazas específicas.",
          "Realizar pruebas de penetración para garantizar la efectividad.",
        ],
      },
    ],
  },
  {
    title: "Desarrollo de Aplicaciones Móviles",
    desc: "Creación de apps innovadoras y funcionales.",
    icon: <SmartphoneIcon />,
    colors: {
      lightMode: { bgColor: "#f1f8e9", textColor: "#33691e" },
      darkMode: { bgColor: "#1b5e20", textColor: "#ffffff" },
    },
    detailedInfo: [
      {
        subservice: "Aplicaciones Nativas (iOS y Android)",
        description:
          "Desarrollo de aplicaciones optimizadas para plataformas específicas.",
        tools: ["Swift (iOS)", "Kotlin (Android)"],
        estimatedPrice: "$30,000 MXN - $120,000 MXN",
        estimatedTime: "6-12 semanas",
        steps: [
          "Diseñar la experiencia de usuario (UI/UX) utilizando herramientas como Figma o Adobe XD.",
          "Configurar un entorno de desarrollo nativo para iOS o Android.",
          "Escribir código optimizado utilizando Swift (iOS) o Kotlin (Android).",
          "Realizar pruebas en dispositivos físicos y simuladores.",
          "Publicar la aplicación en App Store o Google Play.",
        ],
      },
      {
        subservice: "Aplicaciones Multiplataforma (Cross-Platform)",
        description: "Creación de apps que funcionan en múltiples plataformas.",
        tools: ["Flutter", "React Native", "Ionic"],
        estimatedPrice: "$25,000 MXN - $90,000 MXN",
        estimatedTime: "4-10 semanas",
        steps: [
          "Definir requisitos de la aplicación y diseñar wireframes.",
          "Configurar el entorno de desarrollo multiplataforma (Flutter o React Native).",
          "Implementar componentes reutilizables para ambas plataformas.",
          "Integrar APIs y servicios backend utilizando REST o GraphQL.",
          "Optimizar el rendimiento para dispositivos iOS y Android.",
          "Lanzar la aplicación en las tiendas correspondientes.",
        ],
      },
      {
        subservice: "Integración con APIs",
        description: "Conexión de apps móviles con servicios backend.",
        tools: ["REST", "GraphQL", "Firebase"],
        estimatedPrice: "$15,000 MXN - $60,000 MXN",
        estimatedTime: "2-6 semanas",
        steps: [
          "Identificar los endpoints y servicios necesarios.",
          "Configurar un cliente HTTP (Axios o Fetch) para la comunicación con la API.",
          "Implementar autenticación y manejo de errores para las solicitudes.",
          "Realizar pruebas de integración para garantizar la confiabilidad.",
        ],
      },
    ],
  },
  {
    title: "Desarrollo Web",
    desc: "Sitios web modernos, rápidos y funcionales.",
    icon: <WebIcon />,
    colors: {
      lightMode: { bgColor: "#e0f7fa", textColor: "#006064" },
      darkMode: { bgColor: "#004d40", textColor: "#ffffff" },
    },
    detailedInfo: [
      {
        subservice: "Sitios Web Corporativos",
        description: "Diseño y desarrollo de sitios web profesionales.",
        tools: ["React.js", "Next.js", "WordPress"],
        estimatedPrice: "$15,000 MXN - $60,000 MXN",
        estimatedTime: "3-6 semanas",
        steps: [
          "Entender los objetivos y necesidades del cliente.",
          "Diseñar una maqueta inicial para aprobación.",
          "Implementar el frontend con React.js o Next.js.",
          "Optimizar el sitio para SEO y velocidad.",
          "Realizar pruebas en múltiples navegadores y dispositivos.",
        ],
      },
      {
        subservice: "Optimización de Velocidad",
        description: "Mejoras en el rendimiento para tiempos de carga más rápidos.",
        tools: ["Lighthouse", "WebPageTest", "Cloudflare"],
        estimatedPrice: "$8,000 MXN - $30,000 MXN",
        estimatedTime: "2-4 semanas",
        steps: [
          "Analizar el sitio utilizando herramientas como Google Lighthouse.",
          "Reducir el tamaño de imágenes y recursos estáticos.",
          "Configurar un sistema de cacheo y una CDN.",
          "Optimizar el código y eliminar dependencias innecesarias.",
        ],
      },
    ],
  },
  {
    title: "Desarrollo de Aplicaciones Multiplataforma",
    desc: "Aplicaciones para diferentes dispositivos con un solo código base.",
    icon: <DevicesIcon />,
    colors: {
      lightMode: { bgColor: "#f1f8e9", textColor: "#4caf50" },
      darkMode: { bgColor: "#1b5e20", textColor: "#ffffff" },
    },
    detailedInfo: [
      {
        subservice: "Aplicaciones de Negocios",
        description: "Aplicaciones que optimizan flujos de trabajo empresariales.",
        tools: ["Electron", "React Native", "Capacitor"],
        estimatedPrice: "$30,000 MXN - $90,000 MXN",
        estimatedTime: "5-8 semanas",
        steps: [
          "Recopilar requisitos de negocio.",
          "Diseñar interfaces fáciles de usar para empleados y clientes.",
          "Integrar bases de datos y APIs empresariales.",
          "Probar en diferentes dispositivos y entornos.",
        ],
      },
      {
        subservice: "Aplicaciones de E-commerce",
        description: "Soluciones completas para ventas en línea.",
        tools: ["React Native", "Flutter", "Firebase"],
        estimatedPrice: "$40,000 MXN - $120,000 MXN",
        estimatedTime: "6-12 semanas",
        steps: [
          "Definir un flujo de usuario intuitivo para las compras.",
          "Configurar pasarelas de pago seguras.",
          "Implementar características como carrito de compras y seguimiento de pedidos.",
          "Probar funcionalidad en múltiples plataformas.",
        ],
      },
    ],
  },
];




function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
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
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < selectedService?.detailedInfo?.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };
 const { darkMode } = useApiContext();
  const handleOpenModal = (service: any) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };
  const cardStyles = (service:any, darkMode:any) => ({
    mx: 2,
    p: 2,
    
    textAlign: 'center',
    borderRadius: 4,
    backgroundColor: darkMode ? service.colors.darkMode.bgColor : service.colors.lightMode.bgColor,
    color: darkMode ? service.colors.darkMode.textColor : service.colors.lightMode.textColor,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.2)',
    },
  });
  return (
    <>
      <Helmet>
        <title>Servicios - HoneyBadger-Labs</title>
        <meta
          name="description"
          content="Descubre los servicios que ofrecemos, como desarrollo web, móvil, DevOps y consultoría."
        />
      </Helmet>
      <Box sx={{ background:darkMode?'linear-gradient(to right, #232526, #414345)': '#f9f9f9', py: 8 }}>
        <Container>
        <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: darkMode?'orange':'rgb(0, 162, 255)',textShadow:'gray 2px 2px px' }}
      >
        Nuestros Servicios
      </Typography>
          <Typography textAlign="center" sx={{color:darkMode?'white':'gray'}} mb={4}>
            Ofrecemos soluciones innovadoras para tus necesidades tecnológicas.
          </Typography>
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                 <Card sx={cardStyles(service, darkMode)}>
              <Avatar
                sx={{
                  mx: 'auto',
                  mb: 2,
                  width: 56,
                  height: 56,
                  bgcolor: 'white',
                  color:"gray",
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
                  sx={{
                    mt: 2,
                    backgroundColor: darkMode ? 'orange' : 'blue',
                  }}
                  onClick={() => handleOpenModal(service)}
                >
                  Ver más <ExpandMoreIcon />
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
  onClose={() => {
    setActiveStep(0); // Resetear los pasos
    handleCloseModal(); // Cerrar el modal
  }}
  closeAfterTransition
  BackdropComponent={Backdrop}
  BackdropProps={{ timeout: 500 }}
>
  <Fade in={openModal}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 4,
        borderRadius: 2,
        boxShadow: 24,
        width: "80%",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
        backgroundColor: darkMode?'black':'white',
      
      }}
    >
      <Typography variant="h5" gutterBottom>
        {selectedService?.title}
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ marginBottom: 3 ,color:darkMode?'white':'gray'}}>
        {selectedService?.detailedInfo?.map((info: any, index: any) => (
          <Step sx={{ marginBottom: 3 ,color:darkMode?'white':'gray'}} key={index}>
            <StepLabel sx={{ marginBottom: 3 ,color:darkMode?'white':'gray'}}>{info.subservice}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      {selectedService?.detailedInfo && selectedService.detailedInfo[activeStep] && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom sx={{color:darkMode?'orange':'gray'}}>
            {selectedService.detailedInfo[activeStep].subservice}
          </Typography>
          <Typography variant="body2" mb={1} sx={{color:darkMode?'white':'gray'}}>
            {selectedService.detailedInfo[activeStep].description}
          </Typography>
          <Typography variant="caption" color="textSecondary" mb={1} display="block" sx={{color:darkMode?'white':'gray'}}>
            Estimado:{" "}
            <Box
              component="span"
              sx={{ color: "green", fontWeight: "bold" }}
            >
              {selectedService.detailedInfo[activeStep].estimatedPrice}
            </Box>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {selectedService.detailedInfo[activeStep].tools.map(
              (tool: any, index: any) => (
                <Chip key={index} label={tool} variant="filled" sx={{color:darkMode?'white':'black',backgroundColor:darkMode?'orange':'lightgray'}} />
              )
            )}
          </Box>
          <Typography variant="subtitle2" gutterBottom sx={{color:darkMode?'white':'gray'}}>
            Pasos:
          </Typography>
          <List>
            {selectedService.detailedInfo[activeStep].steps.map(
              (step: any, stepIndex: any) => (
                <ListItem key={stepIndex} disableGutters>
                  <ListItemIcon>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: darkMode?'orange':'blue',
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                      }}
                    >
                      {stepIndex + 1}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="textPrimary" sx={{color:darkMode?'white':'gray'}}>
                        {step}
                      </Typography>
                    }
                  />
                </ListItem>
              )
            )}
          </List>
        </Box>
      )}

      {/* Stepper Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button startIcon={<ArrowCircleLeftIcon/>} disabled={activeStep === 0} onClick={handleBack}>
          Atrás
        </Button>
        <Button startIcon={<ArrowCircleRightIcon/>}
          variant="contained"
          onClick={() => {
            if (activeStep === selectedService?.detailedInfo?.length - 1) {
              // Resetear los pasos y cerrar el modal
              setActiveStep(0);
              handleCloseModal();
            } else {
              handleNext();
            }
          }}
        >
          {activeStep === selectedService?.detailedInfo?.length - 1
            ? "Finalizar"
            : "Siguiente"}
        </Button>
      </Box>
    </Box>
  </Fade>
</Modal>;
    </>
  );
};

export default Services;
