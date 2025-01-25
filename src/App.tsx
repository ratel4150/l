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

  useMediaQuery,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Tooltip,
  createTheme,
  Divider,
  ListItemIcon,
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
import {  Brightness4, Brightness7} from '@mui/icons-material';
import Team from './components/Team';
import { Location } from './components/Location';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import DeveloperModeTwoToneIcon from '@mui/icons-material/DeveloperModeTwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import ConnectWithoutContactTwoToneIcon from '@mui/icons-material/ConnectWithoutContactTwoTone';
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import ContactsTwoToneIcon from '@mui/icons-material/ContactsTwoTone';
import PersonPinCircleTwoToneIcon from '@mui/icons-material/PersonPinCircleTwoTone';
import { useApiContext } from './context/ApiContext';
const App = () => {
  const { darkMode, toggleDarkMode } = useApiContext(); // Usando el contexto

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
    { label: 'Inicio', ref: HomeRef ,icon:<HomeTwoToneIcon/>},
    { label: 'Nosotros', ref: AboutUsRef,icon:<NaturePeopleIcon/> },
    { label: 'Servicios', ref: ServicesRef,icon: <DeveloperModeTwoToneIcon/>},
    {label:'Portafolio', ref:PortfolioRef,icon:<AutoStoriesTwoToneIcon/>},
    { label: 'Testimonios', ref: TestimonialsRef,icon :<ConnectWithoutContactTwoToneIcon/> },
    { label: 'Equipo', ref: TeamRef,icon:<Diversity3TwoToneIcon/> },
    { label: 'Contacto', ref: contactoRef ,icon:<ContactsTwoToneIcon/>},
    {label:'Lugar',ref:LocationRef,icon:<PersonPinCircleTwoToneIcon/>}
  ];

 
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'light' : 'dark',
        },
      }),
    [darkMode]
  );

  /* const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); */
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  

/* 
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }; */

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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
    background:theme.palette.mode === 'dark'? 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)':' linear-gradient(to right, #000000, #434343)', 
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
              height: '50px',
              marginRight: '16px',
            /*   filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none', */
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize:'1.8rem',
              fontFamily:'Patua One',
              fontWeight: 'bold', 
              color: 'white',
              flexGrow: 1, // Ensures the title expands
              textAlign: isSmallScreen ? 'center' : 'left', // Center for small screens
      
            

              

            }}
          >
            HB-LABS
          </Typography>
        </Box>
      </Box>

      {/* Navigation Links */}
      {!isSmallScreen ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {sections.map((section) => (
            <Button 
            startIcon={section.icon}
              key={section.label}
              onClick={() => handleScroll(section.ref)}
              size="small"
              sx={{
                mx: 1,
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : 'orange',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              <Typography variant='caption' >
              {section.label}
              </Typography>
             
            </Button>
          ))}
        </Box>
      ) : null}

      {/* User Profile & Settings */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/*   <Tooltip title="Perfil">
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
        </Menu> */}

        {/* Dark Mode Toggle */}
        <Tooltip title="Cambiar Tema">
          <IconButton sx={{color:darkMode?'#ffea00':'#2c387e'}} onClick={toggleDarkMode}>
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
  <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      transitionDuration={500} // Animación suave
    >
      <Box
        sx={{
          width: 300,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: theme.palette.mode === "dark"
            ? "linear-gradient(to top, #3b3b3b 0%, #434343 100%)"
            : "linear-gradient(to top, #d5d4d0 0%, #eeeeec 100%)",
          boxShadow: 8,
        }}
      >
        {/* Encabezado */}
        <Box
          sx={{
            padding: 2,
            textAlign: "center",
            borderBottom: `1px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.divider
                : theme.palette.grey[300]
            }`,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              color: theme.palette.mode === "dark" ? "#fff" : "#333",
            }}
          >
            Navegación
          </Typography>
        </Box>

        {/* Lista de Secciones con Iconos */}
        <List>
          {sections.map((section) => (
            <Tooltip
              key={section.label}
              title={section.label}
              placement="right"
              arrow
            >
              <ListItemButton
                onClick={() => {
                  handleScroll(section.ref);
                  setDrawerOpen(false);
                }}
                sx={{
                  transition: "all 0.3s",
                  "&:hover": {
                    background: theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.05)",
                    transform: "scale(1.05)",
                  },
                  "&.Mui-selected": {
                    background: theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                  }}
                >
                  {section.icon}
                </ListItemIcon>
                <ListItemText
                  primary={section.label}
                  primaryTypographyProps={{
                    variant: "body1",
                    sx: {
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.text.secondary
                          : theme.palette.text.primary,
                    },
                  }}
                />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

        {/* Footer */}
        <Divider />
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.disabled,
            }}
          >
            © {new Date().getFullYear()} Mi Proyecto
          </Typography>
        </Box>
      </Box>
    </Drawer>
</AppBar>


      {/* Hero Section */}
   <Box ref={HomeRef}>
   <Hero  />
   </Box>
    <Box ref={AboutUsRef} >
    <AboutUs />
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
