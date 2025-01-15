// src\components\About.tsx

import { Box, Container, Typography, Grid } from '@mui/material';


const AboutUs = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
    <Container>
      <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        ¿Quiénes Somos?
      </Typography>
  
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            paragraph 
            sx={{ lineHeight: 1.8, color: '#555' }}
          >
            En <strong>DevBusiness</strong>, nos especializamos en crear soluciones tecnológicas innovadoras que están a la vanguardia del mercado. Somos un equipo de profesionales apasionados por el desarrollo de software, enfocados en calidad, rendimiento y excelencia. Desde sitios web dinámicos hasta aplicaciones móviles y servicios en la nube, trabajamos para que cada proyecto alcance su máximo potencial.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            paragraph 
            sx={{ lineHeight: 1.8, color: '#555' }}
          >
            Nuestra visión es convertirnos en líderes en la industria tecnológica, destacándonos por crear productos digitales que no solo cumplen, sino que superan las expectativas de nuestros clientes. Cada solución que desarrollamos está diseñada para ser escalable, eficiente y sostenible a largo plazo.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
  
  );
};

export default AboutUs;
