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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';
const services = [{
  title: "Desarrollo Web",
  desc: "Creación de sitios web modernos, responsivos y altamente funcionales.",
  icon: <WebIcon />,
  colors: {
    lightMode: { bgColor: "#e3f2fd", textColor: "#0d47a1" },
    darkMode: { bgColor: "#1565c0", textColor: "#ffffff" },
  },
  detailedInfo: [
    {
      subservice: "Desarrollo Frontend",
      description: "Creación de interfaces de usuario interactivas y atractivas.",
      tools: ["React", "Angular", "Vue.js", "Tailwind CSS"],
      estimatedPrice: "$20,000 MXN - $70,000 MXN",
      estimatedTime: "3-6 semanas",
      steps: [
        "Diseñar la estructura y componentes de la interfaz.",
        "Desarrollar la interfaz utilizando frameworks modernos.",
        "Optimizar el rendimiento y la compatibilidad con dispositivos.",
        "Realizar pruebas de usabilidad y accesibilidad.",
      ],
      whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20desarrollo%20frontend.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
      facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/frontend",
    },
    {
      subservice: "Desarrollo Backend",
      description: "Implementación de servidores, APIs y bases de datos robustas.",
      tools: ["Node.js", "Django", "Spring Boot", "PostgreSQL"],
      estimatedPrice: "$25,000 MXN - $80,000 MXN",
      estimatedTime: "4-8 semanas",
      steps: [
        "Diseñar la arquitectura del servidor y las APIs.",
        "Configurar bases de datos y sistemas de almacenamiento.",
        "Implementar lógica de negocio y seguridad.",
        "Realizar pruebas de carga y optimización.",
      ],
      whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20desarrollo%20backend.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
      facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/backend",
    },
  ],
},
 /*  {
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20las%20auditor%C3%ADas%20de%20seguridad.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=//https:honeybadger-labs.netlify.app",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20la%20implementaci%C3%B3n%20de%20firewalls.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/implementacion-firewalls",
      },
    ],
  }, */
  {
    title: "Inteligencia Artificial",
    desc: "Soluciones avanzadas de IA para optimizar procesos y tomar decisiones inteligentes.",
    icon: <LightbulbCircleIcon />, // Puedes usar un ícono personalizado o de una librería como Material-UI.
    colors: {
      lightMode: { bgColor: "#f3e5f5", textColor: "#4a148c" }, // Colores claros para el modo claro.
      darkMode: { bgColor: "#6a1b9a", textColor: "#ffffff" }, // Colores oscuros para el modo oscuro.
    },
    detailedInfo: [
      {
        subservice: "Desarrollo de Modelos de Machine Learning",
        description: "Creación de modelos predictivos y de clasificación para análisis de datos.",
        tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
        estimatedPrice: "$30,000 MXN - $100,000 MXN",
        estimatedTime: "4-8 semanas",
        steps: [
          "Definir el problema y los objetivos del modelo.",
          "Recopilar y preprocesar los datos necesarios.",
          "Seleccionar y entrenar el algoritmo de Machine Learning adecuado.",
          "Evaluar el rendimiento del modelo y ajustar hiperparámetros.",
          "Implementar el modelo en producción y monitorear su desempeño.",
        ],
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20el%20desarrollo%20de%20modelos%20de%20Machine%20Learning.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/machine-learning",
      },
      {
        subservice: "Procesamiento de Lenguaje Natural (NLP)",
        description: "Soluciones de IA para análisis y generación de texto, chatbots y más.",
        tools: ["spaCy", "NLTK", "Hugging Face Transformers", "GPT-3"],
        estimatedPrice: "$40,000 MXN - $120,000 MXN",
        estimatedTime: "6-10 semanas",
        steps: [
          "Identificar los casos de uso y los requisitos del cliente.",
          "Recopilar y limpiar datos de texto relevantes.",
          "Entrenar modelos de NLP para tareas específicas (clasificación, generación, etc.).",
          "Implementar el modelo en una aplicación o sistema.",
          "Realizar pruebas y ajustes para mejorar la precisión.",
        ],
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20soluciones%20de%20Procesamiento%20de%20Lenguaje%20Natural.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/nlp",
      },
      {
        subservice: "Visión por Computadora",
        description: "Desarrollo de sistemas de IA para análisis de imágenes y videos.",
        tools: ["OpenCV", "YOLO", "TensorFlow Object Detection", "PyTorch Vision"],
        estimatedPrice: "$50,000 MXN - $150,000 MXN",
        estimatedTime: "8-12 semanas",
        steps: [
          "Definir los requisitos del sistema de visión por computadora.",
          "Recopilar y etiquetar un conjunto de datos de imágenes o videos.",
          "Entrenar modelos de detección, clasificación o segmentación.",
          "Implementar el modelo en un entorno de producción.",
          "Optimizar el rendimiento para aplicaciones en tiempo real.",
        ],
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20soluciones%20de%20Visi%C3%B3n%20por%20Computadora.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/vision-por-computadora",
      },
      {
        subservice: "Sistemas de Recomendación",
        description: "Desarrollo de algoritmos para personalizar recomendaciones basadas en datos.",
        tools: ["Surprise", "LightFM", "TensorFlow Recommenders", "Amazon Personalize"],
        estimatedPrice: "$35,000 MXN - $90,000 MXN",
        estimatedTime: "5-9 semanas",
        steps: [
          "Analizar los datos del usuario y del producto/servicio.",
          "Seleccionar el enfoque de recomendación (colaborativo, basado en contenido, etc.).",
          "Entrenar y validar el modelo de recomendación.",
          "Integrar el sistema de recomendación en la plataforma del cliente.",
          "Monitorear y ajustar el sistema para mejorar la precisión.",
        ],
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20sistemas%20de%20recomendaci%C3%B3n.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/sistemas-de-recomendacion",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20el%20desarrollo%20de%20aplicaciones%20nativas%20para%20iOS%20y%20Android.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/aplicaciones-nativas",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20el%20desarrollo%20de%20aplicaciones%20multiplataforma.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/aplicaciones-multiplataforma",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20la%20integraci%C3%B3n%20de%20APIs%20para%20aplicaciones%20m%C3%B3viles.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/integracion-con-apis",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20el%20desarrollo%20de%20sitios%20web%20corporativos.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/sitios-web-corporativos",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20optimizar%20la%20velocidad%20de%20mi%20sitio%20web.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/optimizacion-de-velocidad",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20el%20desarrollo%20de%20aplicaciones%20de%20negocios.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/aplicaciones-de-negocios",
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
        whatsAppLink: "https://wa.me/525637303010?text=Estoy%20interesado%20en%20el%20desarrollo%20de%20aplicaciones%20de%20e-commerce.",
        facebookShare: "https://www.facebook.com/sharer/sharer.php?u=https://www.tusitio.com/servicios/aplicaciones-de-e-commerce",
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
        <title>Servicios - HoneyBadgerLabs</title>
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
      bgcolor: darkMode ? 'gray' : 'white', // Cambia el color de fondo del Avatar en dark mode
      color: darkMode ? 'white' : 'gray', // Cambia el color del icono según el modo
      boxShadow: darkMode ? '0 4px 10px rgba(0,0,0,0.5)' : '0 4px 10px rgba(0,0,0,0.1)', // Más sombra en dark mode
    }}
  >
    {service.icon}
  </Avatar>
  <CardContent>
    <Typography
      variant="h5"
      gutterBottom
      sx={{
        color: darkMode ? 'white' : 'black', // Cambia el color del título en dark mode
      }}
    >
      {service.title}
    </Typography>
    <Typography
      color="textSecondary"
      mb={2}
      sx={{
        color: darkMode ? 'lightgray' : 'textSecondary', // Cambia el color de la descripción
      }}
    >
      {service.desc}
    </Typography>
    <Button
      variant="contained"
      size="small"
      sx={{
        mt: 2,
        backgroundColor: darkMode ? 'orange' : 'blue', // Colores de fondo para el botón
        '&:hover': {
          backgroundColor: darkMode ? 'darkorange' : 'darkblue', // Efecto hover
        },
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
        backgroundColor: darkMode ? "#303132" : "white",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {selectedService?.title}
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ marginBottom: 3, color: darkMode ? "white" : "gray" }}>
        {selectedService?.detailedInfo?.map((info: any, index: any) => (
          <Step sx={{ marginBottom: 3, color: darkMode ? "white" : "gray" }} key={index}>
            <StepLabel sx={{ marginBottom: 3, color: darkMode ? "white" : "gray" }}>
              {info.subservice}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      {selectedService?.detailedInfo && selectedService.detailedInfo[activeStep] && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ color: darkMode ? "orange" : "gray" }}>
            {selectedService.detailedInfo[activeStep].subservice}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ color: darkMode ? "white" : "gray" }}>
            {selectedService.detailedInfo[activeStep].description}
          </Typography>
          <Typography variant="caption" color="textSecondary" mb={1} display="block" sx={{ color: darkMode ? "white" : "gray" }}>
            Estimado:{" "}
            <Box component="span" sx={{ color: "green", fontWeight: "bold" }}>
              {selectedService.detailedInfo[activeStep].estimatedPrice}
            </Box>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {selectedService.detailedInfo[activeStep].tools.map((tool: any, index: any) => (
              <Chip
                key={index}
                label={tool}
                variant="filled"
                sx={{ color: darkMode ? "white" : "black", backgroundColor: darkMode ? "orange" : "lightgray" }}
              />
            ))}
          </Box>
          <Typography variant="subtitle2" gutterBottom sx={{ color: darkMode ? "white" : "gray" }}>
            Pasos:
          </Typography>
          <List>
            {selectedService.detailedInfo[activeStep].steps.map((step: any, stepIndex: any) => (
              <ListItem key={stepIndex} disableGutters>
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: darkMode ? "orange" : "blue",
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
                  primary={<Typography variant="body2" color="textPrimary" sx={{ color: darkMode ? "white" : "gray" }}>{step}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Redes sociales (WhatsApp & Facebook Share) */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginTop: 3, mb: 3 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon />}
          size="small"  // Tamaño pequeño
          onClick={() => {
            const whatsappUrl = `https://wa.me/525637303010?text=¡Hola! Estoy interesado en el servicio de ${selectedService?.title} y sus subservicios.`;
            window.open(whatsappUrl, "_blank");
          }}
        >
          WhatsApp
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FacebookIcon />}
          size="small"  // Tamaño pequeño
          onClick={() => {
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=¡Mira este servicio! ${selectedService?.title}`;
            window.open(facebookUrl, "_blank");
          }}
        >
          Compartir en Facebook
        </Button>
      </Box>

      {/* Stepper Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button startIcon={<ArrowCircleLeftIcon />} disabled={activeStep === 0} onClick={handleBack}>
          Atrás
        </Button>
        <Button
          startIcon={<ArrowCircleRightIcon />}
          variant="contained"
          onClick={() => {
            if (activeStep === selectedService?.detailedInfo?.length - 1) {
              setActiveStep(0);
              handleCloseModal();
            } else {
              handleNext();
            }
          }}
        >
          {activeStep === selectedService?.detailedInfo?.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </Box>
    </Box>
  </Fade>
</Modal>

    </>
  );
};

export default Services;
