// src\components\Portfolio.tsx
import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Tooltip,
  Typography,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  GitHub,
  Share,
  Star,
  TrendingUp,
  BugReport,
  
  FolderOpen,
  Event,
  ExpandMore,
  Error,
  Warning,
  CheckCircle,
} from "@mui/icons-material";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { useApiContext } from "../context/ApiContext";

// Registrar componentes de Chart.js
ChartJS.register(ArcElement, ChartTooltip, Legend);

function Portfolio() {
  const [projects, setProjects] = React.useState<any[]>([]);
   const { darkMode } = useApiContext();

  React.useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        // Fetch projects from both users
        const [responseUser1, responseUser2] = await Promise.all([
          fetch("https://api.github.com/users/ratel4150/repos"),
          fetch("https://api.github.com/users/RiemanNClav/repos")
        ]);

        const dataUser1 = await responseUser1.json();
        const dataUser2 = await responseUser2.json();

        // Combine and alternate the projects from both users
        const combinedData = [];
        const maxLength = Math.max(dataUser1.length, dataUser2.length);

        for (let i = 0; i < maxLength; i++) {
          if (dataUser1[i]) combinedData.push(dataUser1[i]);
          if (dataUser2[i]) combinedData.push(dataUser2[i]);
        }

        // Get languages for each project
        const projectsWithLanguages = await Promise.all(
          combinedData.map(async (project: any) => {
            const languageResponse = await fetch(project.languages_url);
            const languages = await languageResponse.json();
            return { ...project, languages: Object.keys(languages) };
          })
        );

        setProjects(projectsWithLanguages);
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
      }
    };

    fetchGitHubProjects();
  }, []);

  const generatePieChartData = (project: any) => ({
    labels: project.languages,
    datasets: [
      {
        label: "Lenguajes",
        data: project.languages.map(() => Math.random() * 100),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  });

  return (
    <>
      <Helmet>
        <title>Portafolio - DevBusiness</title>
        <meta
          name="description"
          content="Mira nuestros proyectos exitosos en el desarrollo de productos digitales y soluciones personalizadas."
        />
      </Helmet>
      <Box
        sx={{
          py: 6,
          background:darkMode?'linear-gradient(to right, #232526, #414345)': "linear-gradient(to bottom, #f5f7fa, #ffffff)",
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              gutterBottom
              sx={{ fontWeight: 'bold', color: darkMode?'orange':'rgb(0, 162, 255)',textShadow:'gray 2px 2px px' }}
            >
              Portafolio de Proyectos
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="textSecondary"
              mb={4}  sx={{color:darkMode?'white':'gray'}}
            >
              Proyectos destacados con análisis visual y detalles avanzados.
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {projects.slice(0, 6).map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
 <Card
  sx={{
    position: "relative", // Permite posicionar elementos dentro del Card
    borderRadius: 4,
    boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
    },
  }}
>
  <CardMedia
    component="img"
    height="180"
    image="https://anincubator.com/wp-content/uploads/2022/08/Diferencias-entre-la-app-mo%CC%81vil-y-la-app-web.png"
    alt={project.name}
    sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
  />
  {/* Gráfica en esquina superior derecha */}
  <Box
    sx={{
      position: "absolute",
      top: 8, // Ajuste desde la parte superior
      right: 8, // Ajuste desde la parte derecha
      width: 80, // Tamaño de la gráfica
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo semitransparente
      borderRadius: "50%", // Circular
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Sombra
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Pie
      data={generatePieChartData(project)}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // Oculta la leyenda
        },
      }}
      style={{
        maxWidth: "100%", // Asegura que encaje en el contenedor
        maxHeight: "100%",
      }}
    />
  </Box>
  <CardContent sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
  {/* Encabezado con ícono personalizado */}
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <FolderOpen sx={{ fontSize: 24, color: "primary.main", mr: 1 }} />
    <Typography
      variant="h6"
      sx={{
        fontWeight: 500,
        color: "text.primary",
        textTransform: "capitalize",
        letterSpacing: 0.5,
        fontSize: "1rem",
      }}
    >
      {project.name}
    </Typography>
  </Box>

  {/* Descripción del proyecto */}
  <Typography
    variant="body2"
    sx={{
      mb: 2,
      color: project.description ? "text.secondary" : "grey.500",
      fontSize: "0.875rem",
      fontStyle: project.description ? "normal" : "italic",
    }}
  >
    {project.description || "Este proyecto aún no tiene descripción."}
  </Typography>

  <Divider sx={{ mb: 2, bgcolor: "grey.300" }} />

  {/* Barra de progreso con porcentaje */}
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="textSecondary" sx={{ fontSize: "0.75rem" }}>
      Progreso Estimado
    </Typography>
    <Box sx={{ position: "relative" }}>
      {/* Barra de progreso con color condicional y animación */}
      <LinearProgress
        variant="determinate"
        value={project.progress}
        sx={{
          mt: 1,
          height: 10,
          borderRadius: 6,
          bgcolor: "grey.200",
          transition: "width 1s ease-out",
          "& .MuiLinearProgress-bar": {
            bgcolor:
              project.progress < 30
                ? "error.main"
                : project.progress < 70
                ? "warning.main"
                : "success.main",
            borderRadius: 6,
          },
        }}
      />
      {/* Número de porcentaje con sombra y animación */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "primary.contrastText",
          textShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
        }}
      >
        {`${Math.round(project.progress)}%`}
      </Box>
    </Box>

    {/* Estado de progreso con íconos y mensaje */}
    <Box sx={{ mt: 1, display: "flex", alignItems: "center" }}>
      <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
        Estado:{" "}
      </Typography>
      {project.progress < 30 && (
        <Tooltip title="Bajo progreso" arrow>
          <Error sx={{ fontSize: 20, color: "error.main", ml: 1 }} />
        </Tooltip>
      )}
      {project.progress >= 30 && project.progress < 70 && (
        <Tooltip title="En progreso" arrow>
          <Warning sx={{ fontSize: 20, color: "warning.main", ml: 1 }} />
        </Tooltip>
      )}
      {project.progress >= 70 && (
        <Tooltip title="Casi completado" arrow>
          <CheckCircle sx={{ fontSize: 20, color: "success.main", ml: 1 }} />
        </Tooltip>
      )}
    </Box>
  </Box>

  {/* Estadísticas clave */}
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={6}>
      <Box>
        <Typography variant="caption" color="textSecondary" sx={{ fontSize: "0.75rem" }}>
          Última Actualización
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            fontSize: "0.875rem",
            color: "info.main",
          }}
        >
          <Event sx={{ fontSize: 20, mr: 1 }} />
          {new Date(project.updated_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box>
        <Typography variant="caption" color="textSecondary" sx={{ fontSize: "0.75rem" }}>
          Issues Abiertas
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: project.open_issues_count > 0 ? "error.main" : "success.main",
            display: "flex",
            alignItems: "center",
            fontSize: "0.875rem",
          }}
        >
          <BugReport sx={{ fontSize: 20, mr: 1 }} />
          {project.open_issues_count}
        </Typography>
      </Box>
    </Grid>
  </Grid>

  <Divider sx={{ mb: 2, bgcolor: "grey.300" }} />

  {/* Botones de acción compactos */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
    <Tooltip title="Ver en GitHub">
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<GitHub />}
        onClick={() => window.open(project.html_url, "_blank")}
        sx={{
          borderRadius: 2,
          px: 2,
          fontSize: "0.75rem",
          height: 30,
        }}
      >
        GitHub
      </Button>
    </Tooltip>
    <Tooltip title="Compartir proyecto">
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<Share />}
        sx={{
          borderRadius: 2,
          px: 2,
          fontSize: "0.75rem",
          height: 30,
        }}
      >
        Compartir
      </Button>
    </Tooltip>
  </Box>

  {/* Estadísticas adicionales */}
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={6}>
      <Chip
        label={`⭐ ${project.stargazers_count.toLocaleString()}`}
        icon={<Star />}
        color="primary"
        sx={{
          fontSize: "0.75rem",
          px: 2,
          py: 1.25,
          fontWeight: 600,
          height: 30,
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <Chip
        label={`🔗 ${project.forks_count.toLocaleString()}`}
        icon={<TrendingUp />}
        color="success"
        sx={{
          fontSize: "0.75rem",
          px: 2,
          py: 1.25,
          fontWeight: 600,
          height: 30,
        }}
      />
    </Grid>
  </Grid>

  {/* Información extendida en acordeón */}
  <Accordion sx={{ mt: 2, bgcolor: "grey.50", borderRadius: 3 }}>
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
        Detalles
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          lineHeight: 1.6,
          fontSize: "0.875rem",
          letterSpacing: 0.3,
        }}
      >
        Este repositorio se centra en optimizar la colaboración y escalabilidad a través de pruebas automatizadas, integración continua (CI/CD) y documentación exhaustiva. La seguridad y el monitoreo son elementos clave del proyecto para garantizar la integridad y calidad a largo plazo.
      </Typography>
    </AccordionDetails>
  </Accordion>
</CardContent>

  








</Card>

                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Portfolio;
