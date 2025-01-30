// src/components/Footer.tsx
import { Box, Container, Typography, Grid, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";
import { useApiContext } from "../context/ApiContext";

const Footer = () => {
  const { darkMode } = useApiContext();

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#222" : "#333",
        color: "white",
        py: 4,
        borderTop: "1px solid #444",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Sección de Información de la Empresa */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              HoneyBadger-Labs
            </Typography>
            <Typography variant="body2" mb={1}>
              Somos una empresa enfocada en soluciones tecnológicas innovadoras para negocios de todos los tamaños.
            </Typography>
            <Link href="/about" variant="body2" color="inherit">
              Más sobre nosotros
            </Link>
          </Grid>

          {/* Sección de Navegación */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Enlaces
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/" variant="body2" color="inherit">
                Inicio
              </Link>
              <Link href="/services" variant="body2" color="inherit">
                Servicios
              </Link>
              <Link href="/contact" variant="body2" color="inherit">
                Contacto
              </Link>
              <Link href="/privacy-policy" variant="body2" color="inherit">
                Política de Privacidad
              </Link>
            </Box>
          </Grid>

          {/* Sección de Redes Sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Síguenos
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton color="inherit" href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" href="https://github.com" target="_blank" aria-label="GitHub">
                <GitHub />
              </IconButton>
            </Box>
          </Grid>

          {/* Sección de Contacto */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Contacto
            </Typography>
            <Typography variant="body2" mb={1}>
              <strong>Dirección:</strong> 123 Main Street, Nueva York, NY 10001, EE.UU.
            </Typography>
            <Typography variant="body2" mb={1}>
              <strong>Teléfono:</strong> +1 212-555-1234
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> contact@devbusiness.com
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: darkMode ? "#555" : "#ddd" }} />

        <Typography textAlign="center" variant="body2">
          &copy; 2025 HoneyBadger-Labs. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
