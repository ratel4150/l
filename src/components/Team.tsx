// src\components\Team.tsx
import { faker } from '@faker-js/faker';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Instagram,
  Facebook,
  Language,
  Web,
  Telegram,
  YouTube,
  Reddit,

  WhatsApp,
} from '@mui/icons-material';
import { Helmet } from 'react-helmet';
import { useApiContext } from '../context/ApiContext';

const Team = () => {
  const { darkMode } = useApiContext();

  const socialIcons: Record<string, JSX.Element> = {
    GitHub: <GitHub />,
    LinkedIn: <LinkedIn />,
    Twitter: <Twitter />,
    Instagram: <Instagram />,
    Facebook: <Facebook />,
    Portfolio: <Language />,
    Website: <Web />,
    Telegram: <Telegram />,
    YouTube: <YouTube />,
    Reddit: <Reddit />,

    WhatsApp: <WhatsApp />,
  };

  const teamMembers = [
    {
      name: 'Uriel Chavez',
      role: 'Analista de Datos',
      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQHd9kB8Ua8LYQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731383645850?e=1742428800&v=beta&t=hcNdav8-5MgJK4iI86PmZaATu2I889HiT03HXYBHBmo',
      description: 'Líder visionario con más de 10 años de experiencia en el desarrollo de estrategias empresariales exitosas.',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/angelclavellina/' },
        { platform: 'GitHub', url: 'https://github.com/RiemanNClav' },
        { platform: 'Twitter', url: 'https://twitter.com/' },
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
        { platform: 'Portfolio', url: 'https://arturochavez.dev' },
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
        { platform: 'Twitter', url: 'https://twitter.com/' },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Equipo - DevBusiness</title>
        <meta
          name="description"
          content="Conoce a nuestro equipo de expertos en desarrollo de software. Profesionales apasionados y comprometidos con el éxito de nuestros clientes."
        />
      </Helmet>
      <Box
        sx={{
          py: 10,
          background: darkMode
            ? 'linear-gradient(to right, #232526, #414345)'
            : '#f9f9f9',
        }}
      >
        <Container>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: darkMode ? 'orange' : 'rgb(0, 162, 255)',
              textShadow: 'gray 2px 2px px',
              transition: 'all 0.3s ease',
            }}
          >
            Nuestro Equipo
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="textSecondary"
            mb={6}
            sx={{
              color: darkMode ? 'white' : 'gray',
              transition: 'color 0.3s ease',
            }}
          >
            Conoce a las personas que lideran nuestras soluciones innovadoras y transforman ideas en realidades.
          </Typography>

          <Grid container spacing={6} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    backgroundColor: darkMode ? '#2C2C2C' : '#fff',
                    borderRadius: 3,
                    boxShadow: darkMode ? '0px 6px 30px rgba(255, 255, 255, 0.2)' : '0px 6px 30px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s ease',
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
                      border: darkMode ? '4px solid #FF9800' : '4px solid #2196f3',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  />
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                    sx={{ transition: 'color 0.3s ease', color: darkMode ? 'white' : 'black' }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={darkMode ? 'gray' : 'textSecondary'}
                    mb={2}
                    fontStyle="italic"
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={darkMode ? 'white' : 'textSecondary'}
                    mb={3}
                    textAlign="justify"
                    sx={{
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {member.description}
                  </Typography>

                  {/* Redes sociales */}
                  <Box display="flex" justifyContent="center" gap={3}>
  {member.socialLinks.map((social, i) => (
    <Button 
    size='small'
      key={i}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      startIcon={socialIcons[social.platform]} // Ícono del botón
      sx={{
        p:0.5,
        border: `1px solid ${darkMode ? '#FF9800' : '#42a5f5'}`,
        borderRadius: 2,
        color: darkMode ? '#FF9800' : '#42a5f5',
        textTransform: 'none', // Evita que el texto se convierta en mayúsculas
        fontWeight: 'bold',
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: darkMode ? '#FF9800' : '#42a5f5',
          color: '#fff',
          borderColor: darkMode ? '#FF9800' : '#42a5f5'
        },
      }}
    >
      {social.platform}
    </Button>
  ))}
</Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Team;