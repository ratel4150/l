// src\components\About.tsx

import { Box, Container, Typography, Grid } from '@mui/material';
import { useApiContext } from '../context/ApiContext';


const AboutUs = () => {
  const { darkMode } = useApiContext();
  return (
    <Box sx={{ py: 8, background: darkMode?'linear-gradient(to right, #232526, #414345)':'#f9f9f9' }}>
    <Container>
      <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: darkMode?'orange':'rgb(0, 162, 255)',textShadow:'gray 2px 2px px' }}
      >
        ¿Quiénes Somos?
      </Typography>
  
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
        <Typography
  variant="h6"
  paragraph
  sx={{ lineHeight: 1.8, color: darkMode ? 'white' : 'gray' }}
>
  En <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}>HoneyBadger-Labs</strong>, nos especializamos en 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> crear soluciones tecnológicas innovadoras</strong> que están a la 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> vanguardia del mercado</strong>. 
  Somos un equipo de 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> profesionales apasionados</strong> por el  
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> desarrollo de software</strong>, enfocados en 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> calidad, rendimiento y excelencia</strong>. 
  Desde <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}>sitios web dinámicos</strong> hasta 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> aplicaciones móviles</strong> y 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> servicios en la nube</strong>, trabajamos para que cada proyecto alcance su 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}> máximo potencial</strong>.
</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
        <Typography
  variant="h6"
  paragraph
  sx={{ lineHeight: 1.8, color: darkMode ? 'white' : 'gray' }}
>
  Nuestra visión es  
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}>
      convertirnos en líderes en la industria tecnológica
  </strong>, destacándonos por 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}>
    crear productos digitales que no solo cumplen, sino que superan las expectativas de nuestros clientes
  </strong>. 
  Cada solución que desarrollamos está diseñada para ser 
  <strong style={{ color: darkMode ? 'orange' : 'rgb(0, 162, 255)' }}>
    escalable, eficiente y sostenible a largo plazo
  </strong>.
</Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
  
  );
};

export default AboutUs;
