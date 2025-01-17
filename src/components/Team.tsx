// src\components\Team.tsx
import { faker } from '@faker-js/faker'
import { Avatar, Box, Container, Grid, Modal, Typography } from '@mui/material'

import { Helmet } from 'react-helmet'


const Team = () => {
  return (
   <>
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
   </>
  )
}

export default Team