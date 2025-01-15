// src\App.tsx
import React from 'react';
import {
  AppBar,
  Box,
  Button,
 
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
 
  Modal,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
 
  ListItemText,

  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


import { faker } from '@faker-js/faker';
import { Helmet } from 'react-helmet';
import Hero from './components/Hero';
import AboutUs from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import { AccountCircle, HelpOutline, Settings } from '@mui/icons-material';

const App = () => {

  

  const theme = useTheme();
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
      <AppBar position="static" sx={{ backgroundColor: '#1a1a1a', boxShadow: 3 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Icon Button with Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isSmallScreen ? (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            ) : null}
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
              Ratel-Nexus-Technologies
            </Typography>
          </Box>

          {/* Navigation Links with Hover Effects */}
          {!isSmallScreen ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {['Inicio', 'Servicios', 'Tecnologías', 'Contacto'].map((page) => (
                <Button
                  key={page}
                  color="inherit"
                  sx={{
                    mx: 1,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.light,
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          ) : null}

          {/* User Profile & Settings */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'account-button',
              }}
              sx={{
                '& .MuiMenu-paper': {
                  backgroundColor: '#333',
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

            {/* Help Button with Tooltip */}
            <IconButton color="inherit" sx={{ ml: 2 }}>
              <HelpOutline />
            </IconButton>

            {/* Settings Button */}
            <IconButton color="inherit" sx={{ ml: 2 }}>
              <Settings />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer for Small Screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }}>
          <List>
            {['Inicio', 'Servicios', 'Tecnologías', 'Contacto'].map((text) => (
              <ListItemButton key={text}>
              <ListItemText primary={text} />
            </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>

      {/* Hero Section */}
   
    <Hero/>
    <AboutUs/>

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
 <Services/>
      {/* Portfolio Section */}
     <Portfolio/>

      {/* Testimonials Section */}
      <Testimonials/>
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
      <Helmet>
  <title>Equipo - DevBusiness</title>
  <meta
    name="description"
    content="Conoce a nuestro equipo de expertos en desarrollo de software. Profesionales apasionados y comprometidos con el éxito de nuestros clientes."
  />
</Helmet>
<Box sx={{ py: 10, backgroundColor: '#f4f6f9' }}>
  <Container>
    <Typography variant="h4" textAlign="center" fontWeight={700} gutterBottom>
      Nuestro Equipo
    </Typography>
    <Typography
      variant="body1"
      textAlign="center"
      color="textSecondary"
      mb={6}
    >
      Conoce a las personas que lideran nuestras soluciones innovadoras y 
      transforman ideas en realidades.
    </Typography>
    <Grid container spacing={6} justifyContent="center">
  {[
    { 
      name: 'Uriel Chavez', 
      role: 'Analista de Datos', 
      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHd9kB8Ua8LYQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731383645850?e=1742428800&v=beta&t=hcNdav8-5MgJK4iI86PmZaATu2I889HiT03HXYBHBmo', 
      description: 'Líder visionario con más de 10 años de experiencia en el desarrollo de estrategias empresariales exitosas.', 
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/angelclavellina/' },
        { platform: 'GitHub', url: 'https://github.com/RiemanNClav' },
      ],
    },
    { 
      name: 'Arturo Chavez', 
      role: 'Desarrollador Fullstack', 
      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHo5dvV_WeVDQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704060418269?e=1742428800&v=beta&t=bHaGvg1mVSXHY28DT54oN227kC1bGMy66ZNBStykWIs', 
      description: 'Desarrollador full-stack especializado en React y Node.js con un enfoque en aplicaciones de alto rendimiento.', 
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/arturo-chavez-53a57a236/' },
      ],
    },
    { 
      name: 'Carlos Ruiz', 
      role: 'Desarrollador', 
      avatar: faker.image.avatar(), 
      description: 'Desarrollador full-stack especializado en React y Node.js con un enfoque en aplicaciones de alto rendimiento.', 
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/carlosruiz' },
        { platform: 'Portfolio', url: 'https://carlosruiz.dev' },
      ],
    },
  ].map((member, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
          backgroundColor: '#fff',
          borderRadius: 3,
          boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Avatar
          src={member.avatar}
          alt={member.name}
          sx={{
            width: 90,
            height: 90,
            mx: 'auto',
            mb: 3,
            border: '4px solid #2196f3',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {member.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          mb={2}
          fontStyle="italic"
        >
          {member.role}
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3} textAlign="justify">
          {member.description}
        </Typography>
        
        {/* Botón para más detalles o contacto */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            mb: 2,
            borderRadius: 2,
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#1e88e5',
            },
          }}
          onClick={() => console.log(`Contacting ${member.name}`)}
        >
          Contactar
        </Button>

        {/* Redes sociales */}
        <Box display="flex" justifyContent="center" gap={3}>
          {member.socialLinks.map((social, i) => (
            <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  border: '1px solid #42a5f5',
                  borderRadius: 2,
                  color: '#42a5f5',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#42a5f5',
                    color: '#fff',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {social.platform}
                </Typography>
              </Box>
            </a>
          ))}
        </Box>

        {/* Modal para mostrar detalles adicionales (si es necesario) */}
        <Modal
          open={false} // Puedes controlar este estado con un hook useState
          onClose={() => console.log('Cerrar Modal')}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ p: 4, backgroundColor: '#fff', borderRadius: 3, boxShadow: 24 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Más sobre {member.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Aquí puedes incluir más detalles sobre {member.name}, su trayectoria, logros, o proyectos recientes.
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Grid>
  ))}
</Grid>

  </Container>
</Box>


      {/* Contact Us Section */}
   <ContactForm/>


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
