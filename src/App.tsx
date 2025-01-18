// src\App.tsx
import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,

  IconButton,
  Toolbar,
  Typography,
 
  Menu,
  MenuItem,

  useMediaQuery,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Tooltip,
  createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../src/assets/Logo-Li.png'
import { Helmet } from 'react-helmet';
import Hero from './components/Hero';
import AboutUs from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import { AccountCircle, Brightness4, Brightness7} from '@mui/icons-material';
import Team from './components/Team';
import { Location } from './components/Location';

const App = () => {

  const HomeRef = React.useRef(null);
  const AboutUsRef = React.useRef(null);
  const ServicesRef = React.useRef(null);
  const PortfolioRef = React.useRef(null);
  const TestimonialsRef = React.useRef(null);
  const TeamRef = React.useRef(null)
  const contactoRef = React.useRef(null);
  const LocationRef = React.useRef(null)
  const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
    const offset = 0; // Altura del AppBar
    if (ref.current) {
      const topPosition = ref.current.offsetTop - offset;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };


  const sections = [
    { label: 'Inicio', ref: HomeRef },
    { label: 'Nosotros', ref: AboutUsRef },
    { label: 'Servicios', ref: ServicesRef },
    {label:'Portafolio', ref:PortfolioRef},
    { label: 'Testimonios', ref: TestimonialsRef },
    { label: 'Equipo', ref: TeamRef },
    { label: 'Contacto', ref: contactoRef },
    {label:'Ubicacion',ref:LocationRef}
  ];
  const [darkMode, setDarkMode] = React.useState(false);
  console.log(darkMode)
 
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'light' : 'dark',
        },
      }),
    [darkMode]
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  
 
 
  

  return (
    <div>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>DevBusiness - Innovación en Desarrollo de Software</title>
        <meta name="description" content="Diseñamos productos digitales que transforman negocios. Servicios de desarrollo web, móvil, DevOps y más." />
        <meta name="keywords" content="Desarrollo Web, Desarrollo Móvil, DevOps, Consultoría, Innovación, Tecnología" />
        <meta name="author" content="DevBusiness" />
      </Helmet>

      {/* Header */}
      <AppBar 
  position="sticky" 
  sx={{ 
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)', 
    boxShadow: 3 
  }}
>
  <Container maxWidth="xl">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Icon Button with Menu */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
        {isSmallScreen ? (
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        ) : null}
        
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src={Logo} 
            alt="Logo" 
            style={{
              height: '75px',
              marginRight: '16px',
              filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              color: theme.palette.primary.main,
              flexGrow: 1, // Ensures the title expands
              textAlign: isSmallScreen ? 'center' : 'left', // Center for small screens
            }}
          >
            HoneyBadger-Labs
          </Typography>
        </Box>
      </Box>

      {/* Navigation Links */}
      {!isSmallScreen ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {sections.map((section) => (
            <Button 
              key={section.label}
              onClick={() => handleScroll(section.ref)}
              size="small"
              sx={{
                mx: 1,
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <Typography>
              {section.label}
              </Typography>
             
            </Button>
          ))}
        </Box>
      ) : null}

      {/* User Profile & Settings */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Perfil">
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'account-button',
          }}
          sx={{
            '& .MuiMenu-paper': {
              backgroundColor: theme.palette.background.paper,
              borderRadius: '8px',
              boxShadow: 3,
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
          <MenuItem onClick={handleMenuClose}>Mis Proyectos</MenuItem>
          <MenuItem onClick={handleMenuClose}>Configuraciones</MenuItem>
          <MenuItem onClick={handleMenuClose}>Cerrar Sesión</MenuItem>
        </Menu>

        {/* Dark Mode Toggle */}
        <Tooltip title="Cambiar Tema">
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        {/* Help Button */}
    {/*     <Tooltip title="Ayuda">
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <HelpOutline />
          </IconButton>
        </Tooltip>

        {/* Settings Button */}
    {/*     <Tooltip title="Configuraciones">
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <Settings />
          </IconButton>
        </Tooltip>  */}
      </Box>
    </Toolbar>
  </Container>

  {/* Drawer for Small Screens */}
  <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} >
    <Box sx={{ width: 250,background:'background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);' }}>
      <List >
        {sections.map((section) => (
          <ListItemButton 
            key={section.label} 
            onClick={() => { 
              handleScroll(section.ref); 
              setDrawerOpen(false); 
            }}
          >
            <ListItemText
              primary={section.label}
              primaryTypographyProps={{
                style: {
                  color: theme.palette.mode === 'dark' ? "gray" : theme.palette.text.secondary,
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  </Drawer>
</AppBar>


      {/* Hero Section */}
   <Box ref={HomeRef}>
   <Hero/>
   </Box>
    <Box ref={AboutUsRef}>
    <AboutUs/>
    </Box>


      {/* About Us Section */}
     {/*  <Helmet>
        <title>Sobre Nosotros - DevBusiness</title>
        <meta name="description" content="Conoce más sobre nosotros, nuestra misión y visión en el desarrollo de soluciones tecnológicas." />
      </Helmet>
      <Box sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Sobre Nosotros
          </Typography>
          <Typography variant="h6" paragraph>
            En DevBusiness, nuestra misión es crear soluciones tecnológicas innovadoras para ayudar a nuestros clientes a alcanzar sus objetivos. Nos apasiona la calidad, el rendimiento y la excelencia en cada proyecto.
          </Typography>
          <Typography variant="body1" paragraph>
            Somos un equipo de expertos en desarrollo de software, especializados en soluciones web, móviles y en la nube. Nuestro enfoque está en ofrecer productos digitales que no solo cumplen, sino que superan las expectativas de nuestros clientes.
          </Typography>
        </Container>
      </Box> */}

      {/* Services Section */}
    {/*   <Helmet>
        <title>Servicios - DevBusiness</title>
        <meta name="description" content="Descubre los servicios que ofrecemos, como desarrollo web, móvil, DevOps y consultoría." />
      </Helmet>
      <Box sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Nuestros Servicios
          </Typography>
          <Slider {...sliderSettings}>
            {[{ title: 'Desarrollo Web', desc: 'Sitios modernos y responsivos.' }, { title: 'Desarrollo Móvil', desc: 'Aplicaciones multiplataforma.' }, { title: 'DevOps', desc: 'Automatización con CI/CD.' }, { title: 'Consultoría', desc: 'Estrategias personalizadas.' }].map((service, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card sx={{ mx: 2, p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography textAlign="center" color="textSecondary">
                      {service.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Slider>
        </Container>
      </Box>
 */}
 <Box ref={ServicesRef}>
 <Services/>
 </Box>

      {/* Portfolio Section */}
      <Box ref={PortfolioRef}>
      <Portfolio/>
      </Box>
     

      {/* Testimonials Section */}
      <Box ref={TestimonialsRef}>
      <Testimonials/>
      </Box>
      
   {/*    <Helmet>
        <title>Testimonios - DevBusiness</title>
        <meta name="description" content="Lee lo que nuestros clientes dicen sobre nuestros servicios y cómo ayudamos a transformar sus negocios." />
      </Helmet>
      <Box sx={{ py: 8, backgroundColor: '#ffffff' }}>
        <Container>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Opiniones de Nuestros Clientes
          </Typography>
          <Slider {...sliderSettings}>
            {[{ name: faker.person.firstName(), feedback: '¡Excelente servicio!' }, { name: faker.person.firstName(), feedback: 'Muy profesionales y atentos.' }, { name: faker.person.firstName(), feedback: 'Transformaron nuestro negocio digital.' }].map((testimonial, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card sx={{ mx: 2, p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {testimonial.name}
                    </Typography>
                    <Typography color="textSecondary">{testimonial.feedback}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Slider>
        </Container>
      </Box>
 */}
      {/* Team Section */}
     <Box ref={TeamRef}>
      <Team/>
     </Box>


      {/* Contact Us Section */}
      <Box ref={contactoRef}>
      <ContactForm/>
      </Box>

      <Box ref={LocationRef}>
        <Location/>
      </Box>
   


      {/* Footer */}
      <Box sx={{ backgroundColor: '#333', color: 'white', py: 4 }}>
        <Container maxWidth="xl">
          <Typography textAlign="center">&copy; 2025 DevBusiness. Todos los derechos reservados.</Typography>
        </Container>
      </Box>
    </div>
  );
};

export default App;
