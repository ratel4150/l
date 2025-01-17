// src\components\Location.tsx
import { Box, Typography } from '@mui/material'


export const Location = () => {
  return (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
    <Typography variant="h6" mb={2} fontWeight="bold" color="textPrimary">
      Ubicación de la Oficina
    </Typography>
    <Typography variant="body1" mb={4} color="textSecondary">
      Visítanos en nuestra oficina para discutir tus proyectos. Consulta el mapa interactivo a continuación.
    </Typography>
    <iframe
      width="100%"
      height="450"
      style={{ border: 0, borderRadius: '8px' }}
      loading="lazy"
      allowFullScreen
      src="https://www.google.com/maps/embed/v1/place?q=DevBusiness+HQ&key=YOUR_GOOGLE_MAPS_API_KEY"
    ></iframe>
  </Box>
  )
}
