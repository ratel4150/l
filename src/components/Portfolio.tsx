// src\components\Portfolio.tsx
import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  GitHub,
  Share,
  BugReport,
  FolderOpen,
  Event,
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
   console.log(projects);
   

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
        backgroundColor: darkMode
        ? [
            "#FF6384", // Rosa
            "#36A2EB", // Azul
            "#FFCE56", // Amarillo
            "#4BC0C0", // Turquesa
            "#9966FF", // Morado
          ]
        : [
            "#FF8A80", // Rosa claro
            "#64B5F6", // Azul claro
            "#FFD54F", // Amarillo claro
            "#4DB6AC", // Turquesa claro
            "#BA68C8", // Morado claro
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
    position: "relative",
    borderRadius: 4,
    boxShadow: darkMode
      ? "0px 6px 15px rgba(0,0,0,0.1)"
      : "0px 6px 15px rgba(255,255,255,0.5)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
    },
  }}
>
  {/* Imagen del proyecto */}
  <CardMedia
    component="img"
    height="180"
    image={project.image || "default-image.jpg"}
    alt={project.name}
    sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
  />

  {/* Pie chart en esquina superior derecha */}
  <Box
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "50%",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
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
        plugins: { legend: { display: false } },
      }}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  </Box>

  {/* Contenido del card */}
  <CardContent sx={{ p: 3 }}>
    {/* Encabezado */}
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <FolderOpen sx={{ fontSize: 24, color: "primary.main", mr: 1 }} />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          color: "text.primary",
          textTransform: "capitalize",
        }}
      >
        {project.name}
      </Typography>
    </Box>

    {/* Descripción */}
    <Typography
      variant="body2"
      sx={{
        mb: 2,
        color: project.description ? "text.secondary" : "grey.500",
        fontStyle: project.description ? "normal" : "italic",
      }}
    >
      {project.description || "Este proyecto aún no tiene descripción."}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    {/* Barra de progreso */}
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary">
        Progreso Estimado
      </Typography>
      <Box sx={{ position: "relative", mt: 1 }}>
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={{
            height: 10,
            borderRadius: 6,
            bgcolor: "grey.200",
            "& .MuiLinearProgress-bar": {
              bgcolor:
                project.progress < 30
                  ? "error.main"
                  : project.progress < 70
                  ? "warning.main"
                  : "success.main",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {`${Math.round(project.progress)}%`}
        </Box>
      </Box>
    </Box>

    {/* Estadísticas clave */}
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={6}>
        <Typography variant="caption" color="text.secondary">
          Última Actualización
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", color: "info.main" }}
        >
          <Event sx={{ fontSize: 20, mr: 1 }} />
          {new Date(project.updated_at).toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="caption" color="text.secondary">
          Issues Abiertas
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            color: project.open_issues_count > 0 ? "error.main" : "success.main",
          }}
        >
          <BugReport sx={{ fontSize: 20, mr: 1 }} />
          {project.open_issues_count}
        </Typography>
      </Grid>
    </Grid>

    <Divider sx={{ mb: 2 }} />

    {/* Botones de acción */}
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<GitHub />}
        onClick={() => window.open(project.html_url, "_blank")}
        sx={{ borderRadius: 2 }}
      >
        GitHub
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<Share />}
        sx={{ borderRadius: 2 }}
      >
        Compartir
      </Button>
    </Box>
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
