// src\components\Location.tsx
import { Box, Typography, Grid, CardContent, Divider, Avatar, Paper, useMediaQuery } from "@mui/material";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Logo from '../assets/Logo-Li.png'
import { useApiContext } from "../context/ApiContext";

export const Location = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");
  const mapSize = isSmallScreen ? "320x280" : isMediumScreen ? "450x350" : "500x400";
  const { darkMode } = useApiContext();
  const googleMapsApiKey = "AIzaSyBzS-HWVRYys3QHH8U5ICgHAlK-QATogZk";

  const locations = [
    {
      name: "Oficina Central",
      address: "Cuernavaca numero 32,Valle Ceylan,Tlalnepantla de Baz,Edo.Mex",
      phone: "+52-56-37-30-30-10",
      email: "honeybadgerlabs@protonmail.com",
      latitude: 19.5404411,
      longitude: -99.1787453,
      icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    },
    {
      name: "Sucursal México",
      address: "Av. Reforma 200, Ciudad de México, CDMX, México",
      phone: "+52 55-5555-1234",
      email: "mexico@devbusiness.com",
      latitude: 19.432608,
      longitude: -99.133209,
      icon: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    },
  ];

  return (
    <Box
      sx={{
        px: 4,
        py: 6,
        background: darkMode ? "linear-gradient(to right, #232526, #414345)" : "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        mb={4}
        fontWeight="bold"
        textAlign="center"
        sx={{
          color: darkMode ? "orange" : "rgb(0, 162, 255)",
        }}
      >
        Nuestras Oficinas
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Sección del Mapa */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
        <Paper
            elevation={6}
            sx={{
              borderRadius: 3,
              overflow: 'hidden', // Para que el mapa no sobresalga del Paper
              backgroundColor: darkMode ? "#333" : "#fff",
              transition: "0.3s",
              "&:hover": { boxShadow: darkMode ? "0px 4px 12px rgba(255,255,255,0.1)" : "0px 4px 12px rgba(0,0,0,0.1)" },
            }}
          >
            <StaticGoogleMap size={mapSize} apiKey={googleMapsApiKey} zoom="11">
              {locations.map((loc, index) => (
                <Marker key={index} location={`${loc.latitude},${loc.longitude}`} />
              ))}
            </StaticGoogleMap>
          </Paper>
        </Grid>

        {/* Sección de Información */}
        <Grid item xs={12} md={6}>
          {locations.map((loc, index) => (
            <Paper
              key={index}
              elevation={6}
              sx={{
                mb: 3,
                borderRadius: 3,
                backgroundColor: darkMode ? "#333" : "#fff",
                color: darkMode ? "#f1f1f1" : "#333",
                transition: "0.3s",
                "&:hover": { boxShadow: darkMode ? "0px 4px 12px rgba(255,255,255,0.1)" : "0px 4px 12px rgba(0,0,0,0.1)" },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={Logo}
                    sx={{
                      width: 56,
                      height: 56,
                      mr: 2,
                      bgcolor: "black",
                      border: "2px solid #ddd",
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {loc.name}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2, bgcolor: darkMode ? "#555" : "#ddd" }} />

                <Box display="flex" alignItems="center" mb={1}>
                  <PlaceIcon sx={{ mr: 1, color: darkMode ? "orange" : "grey.600" }} />
                  <Typography variant="body1">{loc.address}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1}>
                  <PhoneIcon sx={{ mr: 1, color: darkMode ? "orange" : "grey.600" }} />
                  <Typography variant="body1">{loc.phone}</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <EmailIcon sx={{ mr: 1, color: darkMode ? "orange" : "grey.600" }} />
                  <Typography variant="body1">{loc.email}</Typography>
                </Box>
              </CardContent>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
