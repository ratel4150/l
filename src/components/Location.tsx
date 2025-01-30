// src\components\Location.tsx
import { Box, Typography, Grid, CardContent, Divider, Avatar, Paper } from "@mui/material";
import { StaticGoogleMap, Marker } from "react-static-google-map";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useApiContext } from "../context/ApiContext";

export const Location = () => {
  const { darkMode } = useApiContext();
  const googleMapsApiKey = "AIzaSyBzS-HWVRYys3QHH8U5ICgHAlK-QATogZk";

  const locations = [
    {
      name: "Oficina Central",
      address: "123 Main Street, Nueva York, NY 10001, EE.UU.",
      phone: "+1 212-555-1234",
      email: "contact@devbusiness.com",
      latitude: 40.712776,
      longitude: -74.005974,
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
          <StaticGoogleMap size="500x400" apiKey={googleMapsApiKey} zoom="4">
            {locations.map((loc, index) => (
              <Marker key={index} location={`${loc.latitude},${loc.longitude}`} />
            ))}
          </StaticGoogleMap>
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
                    src={loc.icon}
                    sx={{
                      width: 56,
                      height: 56,
                      mr: 2,
                      bgcolor: "white",
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
