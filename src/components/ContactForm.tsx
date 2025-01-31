// src\components\ContactForm.tsx
import React, { useState } from 'react';
import { Box, Container, Grid, TextField,  Button, Typography,   MenuItem, Autocomplete} from '@mui/material';
import emailjs from '@emailjs/browser';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useApiContext } from '../context/ApiContext';
import dayjs from 'dayjs';
type SubmitStatus = {
    success: boolean;
    message: string;
  } | null;

  const countries = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo, The Democratic Republic of The",
    "Cook Islands",
    "Costa Rica",
    "Cote D'ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-bissau",
    "Guyana",
    "Haiti",
    "Heard Island and Mcdonald Islands",
    "Holy See (Vatican City State)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran, Islamic Republic of",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, Democratic People's Republic of",
    "Korea, Republic of",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia, The Former Yugoslav Republic of",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Helena",
  ];
  const opciones: Record<string, string> = {
    'social-media': 'Redes sociales',
    'word-of-mouth': 'Boca a boca',
    'online-advertising': 'Publicidad en línea',
    'search-engine': 'Motor de búsqueda',
    event: 'Evento',
  };

  const servicios = {
    'web-development': 'Desarrollo web',
    'technical-support': 'Soporte técnico',
    consulting: 'Consultoría',
    'mobile-development': 'Desarrollo móvil',
    'custom-software': 'Software a medida',
  } as const;
  
  type ServicioKey = keyof typeof servicios;
  const currencies = [
  // Monedas más usadas en el mundo
  { value: 'USD', label: '$ - US Dollar' },        // Dólar estadounidense
  { value: 'EUR', label: '€ - Euro' },            // Euro
  { value: 'JPY', label: '¥ - Japanese Yen' },    // Yen japonés
  { value: 'GBP', label: '£ - British Pound' },   // Libra esterlina
  { value: 'AUD', label: 'A$ - Australian Dollar' }, // Dólar australiano
  { value: 'CAD', label: 'C$ - Canadian Dollar' }, // Dólar canadiense
  { value: 'CHF', label: 'CHF - Swiss Franc' },   // Franco suizo
  { value: 'CNY', label: '¥ - Chinese Yuan' },    // Yuan chino
  { value: 'HKD', label: 'HK$ - Hong Kong Dollar' }, // Dólar de Hong Kong
  { value: 'NZD', label: 'NZ$ - New Zealand Dollar' }, // Dólar neozelandés

  // Monedas más usadas en América
  { value: 'MXN', label: '$ - Mexican Peso' },    // Peso mexicano
  { value: 'BRL', label: 'R$ - Brazilian Real' }, // Real brasileño
  { value: 'ARS', label: '$ - Argentine Peso' },  // Peso argentino
  { value: 'CLP', label: '$ - Chilean Peso' },    // Peso chileno
  { value: 'COP', label: '$ - Colombian Peso' },  // Peso colombiano
  { value: 'PEN', label: 'S/ - Peruvian Sol' },   // Sol peruano
  { value: 'UYU', label: '$ - Uruguayan Peso' },  // Peso uruguayo
  { value: 'PYG', label: '₲ - Paraguayan Guarani' }, // Guaraní paraguayo
  { value: 'VEF', label: 'Bs - Venezuelan Bolivar' }, // Bolívar venezolano
  { value: 'CRC', label: '₡ - Costa Rican Colon' }, // Colón costarricense
];
const ContactForm = () => {
  const { darkMode } = useApiContext();
    const [formData, setFormData] = useState({
        currency:'',                   //Moneda
        name: '',                      // Nombre del usuario
        email: '',                     // Correo electrónico
        phone: '',                     // Número de teléfono
        address: '',                   // Dirección del usuario
        subject: '',                   // Asunto de la consulta
        message: '',                   // Mensaje del usuario
        contactDate: '',               // Fecha en la que el usuario prefiere ser contactado
        contactPreference: '',         // Preferencia de contacto (Teléfono, Email, etc.)
        serviceRequired: '',           // Qué servicio de software necesita
        howDidYouHear: '',             // Cómo se enteró de nosotros
        file: null,                    // Archivo adjunto (por ejemplo, documentación del proyecto)
        estimatedBudget: '',           // Presupuesto estimado para el proyecto
        servicePriority: '',           // Prioridad del servicio (Baja, Media, Alta)
        referral: '',                  // ¿Cómo fue referido?
        country: '',                   // País del usuario
        city: '',                      // Ciudad del usuario
        employeesCount: '',            // Número de empleados en la empresa
        reason: '',                    // Motivo de la consulta
        preferredContactTime: '',      // Hora preferida para ser contactado
        previousExperience: '',        // Experiencia previa con software similar
        businessType: '',              // Tipo de negocio (si aplica)
        additionalComments: '',        // Comentarios adicionales
        marketingConsent: false,       // Consentimiento para recibir marketing
        termsAndConditions: false,    // Aceptación de términos y condiciones
        socialMediaHandles: '',        // Cuentas en redes sociales
        accountManager: '',            // Nombre del encargado del proyecto
        productInterested: '',         // Producto o servicio de software de interés
        urgency: '',                   // Urgencia del proyecto (Alta, Media, Baja)
        feedback: '',                  // Retroalimentación sobre el proceso
        languagePreference: '',        // Preferencia de idioma
        previousPurchases: '',         // Información sobre compras previas de software
        paymentMethod: '',             // Método de pago preferido
        billingAddress: '',            // Dirección de facturación (si aplica)
        deliveryMethod: '',            // Método de entrega del software (Descarga, Envío físico, etc.)
        clientType: '',                // Tipo de cliente (Nuevo, Recurrente, Corporativo, etc.)
        serviceLocation: '',           // Ubicación para el servicio de software (si aplica)
        
        // Nuevos campos para una empresa de software
        softwarePlatform: '',          // Plataforma de software que usa (Windows, Mac, Linux, etc.)
        currentSoftware: '',           // Software actual que usan (si aplica)
        programmingLanguages: '',      // Lenguajes de programación utilizados por la empresa
        integrationsRequired: '',       // Integraciones necesarias con otros sistemas o software
        projectDeadline: '',           // Fecha límite del proyecto
        scalabilityRequirements: '',   // Requerimientos de escalabilidad (si aplica)
        securityRequirements: '',      // Requerimientos de seguridad (encriptación, autenticación, etc.)
        teamSize: '',                  // Tamaño del equipo de desarrollo (si aplica)
        projectDescription: '',        // Descripción detallada del proyecto de software
        preferredDevelopmentMethod: '',// Metodología de desarrollo preferida (Agile, Scrum, etc.)
        currentTechStack: '',          // Tecnología que utiliza actualmente la empresa
        apiRequirements: '',           // Requerimientos para APIs (si aplica)
        dataMigration: '',             // Requerimientos para migración de datos (si aplica)
        hostingRequirements: '',       // Requerimientos de hosting (en la nube, servidor propio, etc.)
        supportAndMaintenance: '',     // Necesidades de soporte y mantenimiento post-lanzamiento
        testingRequirements: '',       // Requerimientos de pruebas del software
        budgetRange: '',               // Rango de presupuesto para el proyecto de software
        roiExpectations: '',           // Expectativas de retorno de inversión (ROI)
        complianceRequirements: '',    // Requerimientos de cumplimiento (por ejemplo, GDPR, ISO 27001)
        customizationLevel: '',        // Nivel de personalización necesario
        trainingRequirements: '',      // Requerimientos de capacitación para los empleados
        feedbackMethod: '',            // Método para recibir retroalimentación del cliente durante el desarrollo
        expectedOutcome: '',           // Resultado esperado del proyecto
        competitionAnalysis: '',       // Análisis de la competencia (si aplica)
        partnerInterest: '',           // Interés en asociaciones con otras empresas
      });
      

  const [formErrors] = useState({
    name: false,                      // Nombre del usuario
    email: false,                     // Correo electrónico
    phone: false,                     // Número de teléfono
    address: false,                   // Dirección del usuario
    subject: false,                   // Asunto de la consulta
    message: false,                   // Mensaje del usuario
    contactDate: false,               // Fecha en la que el usuario prefiere ser contactado
    contactPreference: false,         // Preferencia de contacto (Teléfono, Email, etc.)
    serviceRequired: false,           // Qué servicio de software necesita
    howDidYouHear: false,             // Cómo se enteró de nosotros
    file: false,                    // Archivo adjunto (por ejemplo, documentación del proyecto)
    estimatedBudget: false,           // Presupuesto estimado para el proyecto
    servicePriority: false,           // Prioridad del servicio (Baja, Media, Alta)
    referral: false,                  // ¿Cómo fue referido?
    country: false,                   // País del usuario
    city: false,                      // Ciudad del usuario
    employeesCount: false,            // Número de empleados en la empresa
    reason: false,                    // Motivo de la consulta
    preferredContactTime: false,      // Hora preferida para ser contactado
    previousExperience: false,        // Experiencia previa con software similar
    businessType: false,              // Tipo de negocio (si aplica)
    additionalComments: false,        // Comentarios adicionales
    marketingConsent: false,       // Consentimiento para recibir marketing
    termsAndConditions: false,    // Aceptación de términos y condiciones
    socialMediaHandles: false,        // Cuentas en redes sociales
    accountManager: false,            // Nombre del encargado del proyecto
    productInterested: false,         // Producto o servicio de software de interés
    urgency: false,                   // Urgencia del proyecto (Alta, Media, Baja)
    feedback: false,                  // Retroalimentación sobre el proceso
    languagePreference: false,        // Preferencia de idioma
    previousPurchases: false,         // Información sobre compras previas de software
    paymentMethod: false,             // Método de pago preferido
    billingAddress: false,            // Dirección de facturación (si aplica)
    deliveryMethod: false,            // Método de entrega del software (Descarga, Envío físico, etc.)
    clientType: false,                // Tipo de cliente (Nuevo, Recurrente, Corporativo, etc.)
    serviceLocation: false,           // Ubicación para el servicio de software (si aplica)
    
    // Nuevos campos para una empresa de software
    softwarePlatform: false,          // Plataforma de software que usa (Windows, Mac, Linux, etc.)
    currentSoftware: false,           // Software actual que usan (si aplica)
    programmingLanguages: false,      // Lenguajes de programación utilizados por la empresa
    integrationsRequired: false,       // Integraciones necesarias con otros sistemas o software
    projectDeadline: false,           // Fecha límite del proyecto
    scalabilityRequirements: false,   // Requerimientos de escalabilidad (si aplica)
    securityRequirements: false,      // Requerimientos de seguridad (encriptación, autenticación, etc.)
    teamSize: false,                  // Tamaño del equipo de desarrollo (si aplica)
    projectDescription: false,        // Descripción detallada del proyecto de software
    preferredDevelopmentMethod: false,// Metodología de desarrollo preferida (Agile, Scrum, etc.)
    currentTechStack: false,          // Tecnología que utiliza actualmente la empresa
    apiRequirements: false,           // Requerimientos para APIs (si aplica)
    dataMigration: false,             // Requerimientos para migración de datos (si aplica)
    hostingRequirements: false,       // Requerimientos de hosting (en la nube, servidor propio, etc.)
    supportAndMaintenance: false,     // Necesidades de soporte y mantenimiento post-lanzamiento
    testingRequirements: false,       // Requerimientos de pruebas del software
    budgetRange: false,               // Rango de presupuesto para el proyecto de software
    roiExpectations: false,           // Expectativas de retorno de inversión (ROI)
    complianceRequirements: false,    // Requerimientos de cumplimiento (por ejemplo, GDPR, ISO 27001)
    customizationLevel: false,        // Nivel de personalización necesario
    trainingRequirements: false,      // Requerimientos de capacitación para los empleados
    feedbackMethod: false,            // Método para recibir retroalimentación del cliente durante el desarrollo
    expectedOutcome: false,           // Resultado esperado del proyecto
    competitionAnalysis: false,       // Análisis de la competencia (si aplica)
    partnerInterest: false,           // Interés en asociaciones con otras empresas
  });


  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 /*  const cleanForm = () =>{
    return {
        name: '',                      // Nombre del usuario
        email: '',                     // Correo electrónico
        phone: '',                     // Número de teléfono
        address: '',                   // Dirección del usuario
        subject: '',                   // Asunto de la consulta
        message: '',                   // Mensaje del usuario
        contactDate: '',               // Fecha en la que el usuario prefiere ser contactado
        contactPreference: '',         // Preferencia de contacto (Teléfono, Email, etc.)
        serviceRequired: '',           // Qué servicio de software necesita
        howDidYouHear: '',             // Cómo se enteró de nosotros
        file: null,                    // Archivo adjunto (por ejemplo, documentación del proyecto)
        estimatedBudget: '',           // Presupuesto estimado para el proyecto
        servicePriority: '',           // Prioridad del servicio (Baja, Media, Alta)
        referral: '',                  // ¿Cómo fue referido?
        country: '',                   // País del usuario
        city: '',                      // Ciudad del usuario
        employeesCount: '',            // Número de empleados en la empresa
        reason: '',                    // Motivo de la consulta
        preferredContactTime: '',      // Hora preferida para ser contactado
        previousExperience: '',        // Experiencia previa con software similar
        businessType: '',              // Tipo de negocio (si aplica)
        additionalComments: '',        // Comentarios adicionales
        marketingConsent: false,       // Consentimiento para recibir marketing
        termsAndConditions: false,    // Aceptación de términos y condiciones
        socialMediaHandles: '',        // Cuentas en redes sociales
        accountManager: '',            // Nombre del encargado del proyecto
        productInterested: '',         // Producto o servicio de software de interés
        urgency: '',                   // Urgencia del proyecto (Alta, Media, Baja)
        feedback: '',                  // Retroalimentación sobre el proceso
        languagePreference: '',        // Preferencia de idioma
        previousPurchases: '',         // Información sobre compras previas de software
        paymentMethod: '',             // Método de pago preferido
        billingAddress: '',            // Dirección de facturación (si aplica)
        deliveryMethod: '',            // Método de entrega del software (Descarga, Envío físico, etc.)
        clientType: '',                // Tipo de cliente (Nuevo, Recurrente, Corporativo, etc.)
        serviceLocation: '',           // Ubicación para el servicio de software (si aplica)
        
        // Nuevos campos para una empresa de software
        softwarePlatform: '',          // Plataforma de software que usa (Windows, Mac, Linux, etc.)
        currentSoftware: '',           // Software actual que usan (si aplica)
        programmingLanguages: '',      // Lenguajes de programación utilizados por la empresa
        integrationsRequired: '',       // Integraciones necesarias con otros sistemas o software
        projectDeadline: '',           // Fecha límite del proyecto
        scalabilityRequirements: '',   // Requerimientos de escalabilidad (si aplica)
        securityRequirements: '',      // Requerimientos de seguridad (encriptación, autenticación, etc.)
        teamSize: '',                  // Tamaño del equipo de desarrollo (si aplica)
        projectDescription: '',        // Descripción detallada del proyecto de software
        preferredDevelopmentMethod: '',// Metodología de desarrollo preferida (Agile, Scrum, etc.)
        currentTechStack: '',          // Tecnología que utiliza actualmente la empresa
        apiRequirements: '',           // Requerimientos para APIs (si aplica)
        dataMigration: '',             // Requerimientos para migración de datos (si aplica)
        hostingRequirements: '',       // Requerimientos de hosting (en la nube, servidor propio, etc.)
        supportAndMaintenance: '',     // Necesidades de soporte y mantenimiento post-lanzamiento
        testingRequirements: '',       // Requerimientos de pruebas del software
        budgetRange: '',               // Rango de presupuesto para el proyecto de software
        roiExpectations: '',           // Expectativas de retorno de inversión (ROI)
        complianceRequirements: '',    // Requerimientos de cumplimiento (por ejemplo, GDPR, ISO 27001)
        customizationLevel: '',        // Nivel de personalización necesario
        trainingRequirements: '',      // Requerimientos de capacitación para los empleados
        feedbackMethod: '',            // Método para recibir retroalimentación del cliente durante el desarrollo
        expectedOutcome: '',           // Resultado esperado del proyecto
        competitionAnalysis: '',       // Análisis de la competencia (si aplica)
        partnerInterest: '',           // Interés en asociaciones con otras empresas
      }
  } */

  /* const validateForm = () => {
    let errors = {
        name: false,                      // Nombre del usuario
        email: false,                     // Correo electrónico
        phone: false,                     // Número de teléfono
        address: false,                   // Dirección del usuario
        subject: false,                   // Asunto de la consulta
        message: false,                   // Mensaje del usuario
        contactDate: false,               // Fecha en la que el usuario prefiere ser contactado
        contactPreference: false,         // Preferencia de contacto (Teléfono, Email, etc.)
        serviceRequired: false,           // Qué servicio de software necesita
        howDidYouHear: false,             // Cómo se enteró de nosotros
        file: false,                    // Archivo adjunto (por ejemplo, documentación del proyecto)
        estimatedBudget: false,           // Presupuesto estimado para el proyecto
        servicePriority: false,           // Prioridad del servicio (Baja, Media, Alta)
        referral: false,                  // ¿Cómo fue referido?
        country: false,                   // País del usuario
        city: false,                      // Ciudad del usuario
        employeesCount: false,            // Número de empleados en la empresa
        reason: false,                    // Motivo de la consulta
        preferredContactTime: false,      // Hora preferida para ser contactado
        previousExperience: false,        // Experiencia previa con software similar
        businessType: false,              // Tipo de negocio (si aplica)
        additionalComments: false,        // Comentarios adicionales
        marketingConsent: false,       // Consentimiento para recibir marketing
        termsAndConditions: false,    // Aceptación de términos y condiciones
        socialMediaHandles: false,        // Cuentas en redes sociales
        accountManager: false,            // Nombre del encargado del proyecto
        productInterested: false,         // Producto o servicio de software de interés
        urgency: false,                   // Urgencia del proyecto (Alta, Media, Baja)
        feedback: false,                  // Retroalimentación sobre el proceso
        languagePreference: false,        // Preferencia de idioma
        previousPurchases: false,         // Información sobre compras previas de software
        paymentMethod: false,             // Método de pago preferido
        billingAddress: false,            // Dirección de facturación (si aplica)
        deliveryMethod: false,            // Método de entrega del software (Descarga, Envío físico, etc.)
        clientType: false,                // Tipo de cliente (Nuevo, Recurrente, Corporativo, etc.)
        serviceLocation: false,           // Ubicación para el servicio de software (si aplica)
        
        // Nuevos campos para una empresa de software
        softwarePlatform: false,          // Plataforma de software que usa (Windows, Mac, Linux, etc.)
        currentSoftware: false,           // Software actual que usan (si aplica)
        programmingLanguages: false,      // Lenguajes de programación utilizados por la empresa
        integrationsRequired: false,       // Integraciones necesarias con otros sistemas o software
        projectDeadline: false,           // Fecha límite del proyecto
        scalabilityRequirements: false,   // Requerimientos de escalabilidad (si aplica)
        securityRequirements: false,      // Requerimientos de seguridad (encriptación, autenticación, etc.)
        teamSize: false,                  // Tamaño del equipo de desarrollo (si aplica)
        projectDescription: false,        // Descripción detallada del proyecto de software
        preferredDevelopmentMethod: false,// Metodología de desarrollo preferida (Agile, Scrum, etc.)
        currentTechStack: false,          // Tecnología que utiliza actualmente la empresa
        apiRequirements: false,           // Requerimientos para APIs (si aplica)
        dataMigration: false,             // Requerimientos para migración de datos (si aplica)
        hostingRequirements: false,       // Requerimientos de hosting (en la nube, servidor propio, etc.)
        supportAndMaintenance: false,     // Necesidades de soporte y mantenimiento post-lanzamiento
        testingRequirements: false,       // Requerimientos de pruebas del software
        budgetRange: false,               // Rango de presupuesto para el proyecto de software
        roiExpectations: false,           // Expectativas de retorno de inversión (ROI)
        complianceRequirements: false,    // Requerimientos de cumplimiento (por ejemplo, GDPR, ISO 27001)
        customizationLevel: false,        // Nivel de personalización necesario
        trainingRequirements: false,      // Requerimientos de capacitación para los empleados
        feedbackMethod: false,            // Método para recibir retroalimentación del cliente durante el desarrollo
        expectedOutcome: false,           // Resultado esperado del proyecto
        competitionAnalysis: false,       // Análisis de la competencia (si aplica)
        partnerInterest: false,           // Interés en asociaciones con otras empresas
      };

      // Validación de nombre
  if (!formData.name) errors.name = true;

  // Validación de email con expresión regular
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = true;

  // Validación de teléfono (solo números)
  if (!formData.phone || !/^\d{10}$/.test(formData.phone)) errors.phone = true;

  // Validación de dirección (si se requiere un formato específico, ajustar la expresión regular)
  if (!formData.address) errors.address = true;

  // Validación de mensaje
  if (!formData.message) errors.message = true;

  // Validación de fecha de contacto (si debe seguir un formato específico)
  if (!formData.contactDate || !/^\d{4}-\d{2}-\d{2}$/.test(formData.contactDate)) errors.contactDate = true;

  // Validación de preferencias de contacto
  if (!formData.contactPreference) errors.contactPreference = true;

  // Validación de los demás campos
  if (!formData.subject) errors.subject = true;
  if (!formData.serviceRequired) errors.serviceRequired = true;
  if (!formData.howDidYouHear) errors.howDidYouHear = true;
  if (!formData.estimatedBudget) errors.estimatedBudget = true;
  if (!formData.servicePriority) errors.servicePriority = true;
  if (!formData.referral) errors.referral = true;
  if (!formData.country) errors.country = true;
  if (!formData.city) errors.city = true;
  if (!formData.employeesCount || !/^\d+$/.test(formData.employeesCount)) errors.employeesCount = true;
  if (!formData.reason) errors.reason = true;
  if (!formData.preferredContactTime) errors.preferredContactTime = true;
  if (!formData.previousExperience) errors.previousExperience = true;
  if (!formData.businessType) errors.businessType = true;
  if (!formData.additionalComments) errors.additionalComments = true;
  if (formData.marketingConsent === false) errors.marketingConsent = true;
  if (formData.termsAndConditions === false) errors.termsAndConditions = true;
  if (!formData.socialMediaHandles) errors.socialMediaHandles = true;
  if (!formData.accountManager) errors.accountManager = true;
  if (!formData.productInterested) errors.productInterested = true;
  if (!formData.urgency) errors.urgency = true;
  if (!formData.feedback) errors.feedback = true;
  if (!formData.languagePreference) errors.languagePreference = true;
  if (!formData.previousPurchases) errors.previousPurchases = true;
  if (!formData.paymentMethod) errors.paymentMethod = true;
  if (!formData.billingAddress) errors.billingAddress = true;
  if (!formData.deliveryMethod) errors.deliveryMethod = true;
  if (!formData.clientType) errors.clientType = true;
  if (!formData.serviceLocation) errors.serviceLocation = true;
  if (!formData.softwarePlatform) errors.softwarePlatform = true;
  if (!formData.currentSoftware) errors.currentSoftware = true;
  if (!formData.programmingLanguages) errors.programmingLanguages = true;
  if (!formData.integrationsRequired) errors.integrationsRequired = true;
  if (!formData.projectDeadline || !/^\d{4}-\d{2}-\d{2}$/.test(formData.projectDeadline)) errors.projectDeadline = true;
  if (!formData.scalabilityRequirements) errors.scalabilityRequirements = true;
  if (!formData.securityRequirements) errors.securityRequirements = true;
  if (!formData.teamSize || !/^\d+$/.test(formData.teamSize)) errors.teamSize = true;
  if (!formData.projectDescription) errors.projectDescription = true;
  if (!formData.preferredDevelopmentMethod) errors.preferredDevelopmentMethod = true;
  if (!formData.currentTechStack) errors.currentTechStack = true;
  if (!formData.apiRequirements) errors.apiRequirements = true;
  if (!formData.dataMigration) errors.dataMigration = true;
  if (!formData.hostingRequirements) errors.hostingRequirements = true;
  if (!formData.supportAndMaintenance) errors.supportAndMaintenance = true;
  if (!formData.testingRequirements) errors.testingRequirements = true;
  if (!formData.budgetRange) errors.budgetRange = true;
  if (!formData.roiExpectations) errors.roiExpectations = true;
  if (!formData.complianceRequirements) errors.complianceRequirements = true;
  if (!formData.customizationLevel) errors.customizationLevel = true;
  if (!formData.trainingRequirements) errors.trainingRequirements = true;
  if (!formData.feedbackMethod) errors.feedbackMethod = true;
  if (!formData.expectedOutcome) errors.expectedOutcome = true;
  if (!formData.competitionAnalysis) errors.competitionAnalysis = true;
  if (!formData.partnerInterest) errors.partnerInterest = true;

    setFormErrors(errors);

    return Object.values(errors).every((error) => !error);
  }; */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Validación de los campos del formulario
   /*  if (!validateForm()) {
      return;
    } */
  
    setIsSubmitting(true);
  
    try {
      // Enviar datos con EmailJS
      await emailjs.send(
        'service_lkr8ogg', // service_id
        'template_8lmxv3f', // template_id
        { currency:formData.currency,
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
          phone: formData.phone,
          address: formData.address,
          subject: formData.subject,
          contactDate: formData.contactDate,
          contactPreference: formData.contactPreference,
          serviceRequired: formData.serviceRequired,
          howDidYouHear: formData.howDidYouHear,
          estimatedBudget: formData.estimatedBudget,
          servicePriority: formData.servicePriority,
          referral: formData.referral,
          country: formData.country,
          city: formData.city,
          employeesCount: formData.employeesCount,
          reason: formData.reason,
          preferredContactTime: formData.preferredContactTime,
          previousExperience: formData.previousExperience,
          businessType: formData.businessType,
          additionalComments: formData.additionalComments,
          marketingConsent: formData.marketingConsent,
          termsAndConditions: formData.termsAndConditions,
          socialMediaHandles: formData.socialMediaHandles,
          accountManager: formData.accountManager,
          productInterested: formData.productInterested,
          urgency: formData.urgency,
          feedback: formData.feedback,
          languagePreference: formData.languagePreference,
          previousPurchases: formData.previousPurchases,
          paymentMethod: formData.paymentMethod,
          billingAddress: formData.billingAddress,
          deliveryMethod: formData.deliveryMethod,
          clientType: formData.clientType,
          serviceLocation: formData.serviceLocation,
          softwarePlatform: formData.softwarePlatform,
          currentSoftware: formData.currentSoftware,
          programmingLanguages: formData.programmingLanguages,
          integrationsRequired: formData.integrationsRequired,
          projectDeadline: formData.projectDeadline,
          scalabilityRequirements: formData.scalabilityRequirements,
          securityRequirements: formData.securityRequirements,
          teamSize: formData.teamSize,
          projectDescription: formData.projectDescription,
          preferredDevelopmentMethod: formData.preferredDevelopmentMethod,
          currentTechStack: formData.currentTechStack,
          apiRequirements: formData.apiRequirements,
          dataMigration: formData.dataMigration,
          hostingRequirements: formData.hostingRequirements,
          supportAndMaintenance: formData.supportAndMaintenance,
          testingRequirements: formData.testingRequirements,
          budgetRange: formData.budgetRange,
          roiExpectations: formData.roiExpectations,
          complianceRequirements: formData.complianceRequirements,
          customizationLevel: formData.customizationLevel,
          trainingRequirements: formData.trainingRequirements,
          feedbackMethod: formData.feedbackMethod,
          expectedOutcome: formData.expectedOutcome,
          competitionAnalysis: formData.competitionAnalysis,
          partnerInterest: formData.partnerInterest,
        },
        'Lkv_iY882VjMpg20m' // 
      );
  
      setSubmitStatus({ success: true, message: 'Tu mensaje ha sido enviado exitosamente.' });
     /*  setFormData(cleanForm()); // Limpiar el formulario */
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Hubo un problema al enviar tu mensaje. Intenta nuevamente.' });
      console.error('Error al enviar el correo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  


  return (
    <Box sx={{ py: 8, background:darkMode?'linear-gradient(to right, #232526, #414345)': '#f9f9f9', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" textAlign="center" gutterBottom fontWeight="bold" sx={{ color: darkMode?'orange':'rgb(0, 162, 255)' }}>
          Contáctanos
        </Typography>
        <Typography variant="body1" textAlign="center" mb={4} sx={{color:darkMode?'white':'gray'}}>
          ¿Tienes preguntas o deseas más información? Completa el siguiente formulario, y nuestro equipo se pondrá en contacto contigo pronto.
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
  <Grid container spacing={4}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Nombre Completo"
        variant="outlined"
        fullWidth
        required
        error={formErrors.name}
        helperText={formErrors.name ? "Este campo es obligatorio" : ""}
        value={formData.name}
        onChange={handleInputChange}
        name="name"
        sx={{
          borderRadius: '12px', // Bordes redondeados
          backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
          transition: 'all 0.3s ease-in-out', // Transición suave
          boxShadow: darkMode
            ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
            : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
          '& .MuiInputLabel-root': {
            color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
            
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '2px', // Grosor del borde
              borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
            },
            '&:hover fieldset': {
              borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
              boxShadow: darkMode
                ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
                : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
              boxShadow: darkMode
                ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
                : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
            },
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black', // Color del texto ingresado
          
          },
        }}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        label="Correo Electrónico"
        variant="outlined"
        fullWidth
        required
        type="email"
        error={formErrors.email}
        helperText={formErrors.email ? "Ingresa un correo válido" : ""}
        value={formData.email}
        onChange={handleInputChange}
        name="email"
        sx={{
          borderRadius: '12px', // Bordes redondeados
          backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
          transition: 'all 0.3s ease-in-out', // Transición suave
          boxShadow: darkMode
            ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
            : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
          '& .MuiInputLabel-root': {
            color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
            
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '2px', // Grosor del borde
              borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
            },
            '&:hover fieldset': {
              borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
              boxShadow: darkMode
                ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
                : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
              boxShadow: darkMode
                ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
                : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
            },
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black', // Color del texto ingresado
          
          },
        }}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        label="Número de Teléfono"
        variant="outlined"
        fullWidth
        value={formData.phone}
        onChange={handleInputChange}
        name="phone"
        sx={{
          borderRadius: '12px', // Bordes redondeados
          backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
          transition: 'all 0.3s ease-in-out', // Transición suave
          boxShadow: darkMode
            ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
            : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
          '& .MuiInputLabel-root': {
            color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
            
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '2px', // Grosor del borde
              borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
            },
            '&:hover fieldset': {
              borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
              boxShadow: darkMode
                ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
                : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
              boxShadow: darkMode
                ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
                : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
            },
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black', // Color del texto ingresado
           
          },
        }}
      />
    </Grid>

    <Grid item xs={12}>
      <TextField
        label="Asunto de la Consulta"
        variant="outlined"
        fullWidth
        value={formData.subject}
        onChange={handleInputChange}
        name="subject"
        sx={{
          borderRadius: '12px', // Bordes redondeados
          backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
          transition: 'all 0.3s ease-in-out', // Transición suave
          boxShadow: darkMode
            ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
            : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
          '& .MuiInputLabel-root': {
            color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
            
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '2px', // Grosor del borde
              borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
            },
            '&:hover fieldset': {
              borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
              boxShadow: darkMode
                ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
                : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
              boxShadow: darkMode
                ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
                : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
            },
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black', // Color del texto ingresado
         
          },
        }}
      />
    </Grid>
    
    <Grid item xs={12} sm={3}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimePicker
      label="Fecha de contacto"
      value={formData.contactDate ? dayjs(formData.contactDate) : null}
      onChange={(newValue) =>
        handleInputChange({
          target: { name: 'contactDate', value: newValue ? newValue.toISOString() : '' },
        })
      }
      slotProps={{
        textField: {
          fullWidth: true,
          variant: "outlined",
          error: !!formErrors.contactDate,
          helperText: formErrors.contactDate ? "Este campo es obligatorio" : "",
          sx: {
            "& .MuiInputLabel-root": { color: darkMode ? "orange" : "#2196f3" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: darkMode ? "orange" : "#2196f3" },
              "&:hover fieldset": { borderColor: darkMode ? "orange" : "#1976d2" },
              "&.Mui-focused fieldset": { borderColor: darkMode ? "orange" : "#1976d2" },
            },
            "& .MuiInputBase-input": { color: darkMode ? "white" : "black" },
          },
        },
      }}
    />
  </LocalizationProvider>
</Grid>
   

<Grid item xs={12} sm={3}>
  <Autocomplete
    options={Object.entries(servicios).map(([value, label]) => ({ value, label }))}
    getOptionLabel={(option) => option.label}
    value={
      formData.serviceRequired && servicios[formData.serviceRequired as ServicioKey]
        ? { label: servicios[formData.serviceRequired as ServicioKey], value: formData.serviceRequired }
        : null
    }
    onChange={(_, newValue) => {
      handleInputChange({
        target: { name: 'serviceRequired', value: newValue ? newValue.value : '' },
      });
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Servicio requerido"
        variant="outlined"
        fullWidth
        name="serviceRequired"
        error={!!formErrors.serviceRequired}
        helperText={formErrors.serviceRequired && 'Este campo es obligatorio'}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: darkMode ? '#333' : '#fff',
            '& fieldset': {
              borderWidth: '2px',
              borderColor: formErrors.howDidYouHear ? 'red' : darkMode ? 'orange' : '#2196f3',
            },
            '&:hover fieldset': {
              borderColor: formErrors.howDidYouHear ? 'red' : darkMode ? '#ff9800' : '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: formErrors.howDidYouHear ? 'red' : darkMode ? '#ffcc80' : '#0d47a1',
            },
          },
          '& .MuiInputLabel-root': {
            color: formErrors.howDidYouHear ? 'red' : darkMode ? 'orange' : '#2196f3',
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black',
          },
        }}
      />
    )}
  />
</Grid>

  <Grid item xs={12} sm={3}>
  <Autocomplete
    options={[
      { label: 'Redes sociales', value: 'social-media' },
      { label: 'Boca a boca', value: 'word-of-mouth' },
      { label: 'Publicidad en línea', value: 'online-advertising' },
      { label: 'Motor de búsqueda', value: 'search-engine' },
      { label: 'Evento', value: 'event' },
    ]}
    getOptionLabel={(option) => option.label}
    value={
      formData.howDidYouHear
        ? { label: opciones[formData.howDidYouHear], value: formData.howDidYouHear }
        : null
    }
    onChange={(_, newValue) => {
      handleInputChange({
        target: { name: 'howDidYouHear', value: newValue ? newValue.value : '' },
      });
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="¿Cómo nos escuchaste?"
        variant="outlined"
        fullWidth
        name="howDidYouHear"
        error={!!formErrors.howDidYouHear}
        helperText={formErrors.howDidYouHear && 'Este campo es obligatorio'}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: darkMode ? '#333' : '#fff',
            '& fieldset': {
              borderWidth: '2px',
              borderColor: formErrors.howDidYouHear ? 'red' : darkMode ? 'orange' : '#2196f3',
            },
            '&:hover fieldset': {
              borderColor: formErrors.howDidYouHear ? 'red' : darkMode ? '#ff9800' : '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: formErrors.howDidYouHear ? 'red' : darkMode ? '#ffcc80' : '#0d47a1',
            },
          },
          '& .MuiInputLabel-root': {
            color: formErrors.howDidYouHear ? 'red' : darkMode ? 'orange' : '#2196f3',
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black',
          },
        }}
      />
    )}
  />
</Grid>
  <Grid item xs={12}>
  <Button
  variant="contained"
  component="label"
  startIcon={<CloudUploadIcon />}
  sx={{
    backgroundColor: darkMode ? "orange" : "#2196f3",  // Cambia el color según el modo oscuro
    color: darkMode ? "#fff" : "#fff",  // El texto sigue siendo blanco en ambos modos
    "&:hover": { backgroundColor: darkMode ? "orange" : "#1976d2" },  // Hover para ambos modos
    padding: "10px 20px",
    textTransform: "none",
    fontSize: "16px",
  }}
>
  Subir archivo
  <input
    type="file"
    hidden
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        handleInputChange(e.target.files[0]);
      }
    }}
  />
</Button>
</Grid>;


<Grid item xs={12} sm={6}>
      <TextField
        label="Prioridad del servicio"
        variant="outlined"
        fullWidth
        value={formData.servicePriority}
        onChange={handleInputChange}
        name="servicePriority"
        sx={{
          borderRadius: '12px', // Bordes redondeados
          backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
          transition: 'all 0.3s ease-in-out', // Transición suave
          boxShadow: darkMode
            ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
            : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
          '& .MuiInputLabel-root': {
            color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
            
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '2px', // Grosor del borde
              borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
            },
            '&:hover fieldset': {
              borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
              boxShadow: darkMode
                ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
                : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
              boxShadow: darkMode
                ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
                : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
            },
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black', // Color del texto ingresado
      
          },
        }}
      />
    </Grid>
    <Grid item xs={12}>
  <TextField
    label="Tu mensaje"
    variant="outlined"
    fullWidth
    multiline
    minRows={6}
    value={formData.message}
    onChange={handleInputChange}
    name="message"
    error={!!formErrors.message}
    helperText={formErrors.message && "Este campo es obligatorio"}
    sx={{
      borderRadius: '12px', // Bordes redondeados
      backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
      transition: 'all 0.3s ease-in-out', // Transición suave
      boxShadow: formErrors.message
        ? '0px 0px 10px rgba(255, 0, 0, 0.6)' // Sombra en caso de error
        : darkMode
        ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
        : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
      '& .MuiInputLabel-root': {
        color: formErrors.message ? 'red' : darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
        fontWeight: 'bold',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: '2px', // Grosor del borde
          borderColor: formErrors.message ? 'red' : darkMode ? 'orange' : '#2196f3', // Color del borde
        },
        '&:hover fieldset': {
          borderColor: formErrors.message ? 'red' : darkMode ? '#ff9800' : '#1976d2', // Color al hacer hover
          boxShadow: formErrors.message
            ? '0px 0px 12px rgba(255, 0, 0, 0.8)'
            : darkMode
            ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
            : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
        },
        '&.Mui-focused fieldset': {
          borderColor: formErrors.message ? 'red' : darkMode ? '#ffcc80' : '#0d47a1', // Color al enfocar
          boxShadow: formErrors.message
            ? '0px 0px 14px rgba(255, 0, 0, 0.9)'
            : darkMode
            ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
            : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
        },
      },
      '& .MuiInputBase-input': {
        color: darkMode ? 'white' : 'black', // Color del texto ingresado
      },
    }}
  />
</Grid>
  
  {/* Campo de Presupuesto Estimado */}
  <Grid item xs={8}>
  <TextField
    label="Presupuesto Estimado"
    variant="outlined"
    fullWidth
    value={formData.estimatedBudget}
    onChange={handleInputChange}
    name="estimatedBudget"
    type="number"
    sx={{
      borderRadius: '12px', // Bordes redondeados
      backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
      transition: 'all 0.3s ease-in-out', // Transición suave
      boxShadow: darkMode
        ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
        : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
      '& .MuiInputLabel-root': {
        color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
        
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: '2px', // Grosor del borde
          borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
        },
        '&:hover fieldset': {
          borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
          boxShadow: darkMode
            ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
            : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
        },
        '&.Mui-focused fieldset': {
          borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
          boxShadow: darkMode
            ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
            : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
        },
      },
      '& .MuiInputBase-input': {
        color: darkMode ? 'white' : 'black', // Color del texto ingresado
        fontWeight: 'bold',
      },
    }}
  />
</Grid>


  {/* Selección de Moneda */}
  <Grid item xs={4}>
  <TextField
    select
    label="Moneda"
    variant="outlined"
    fullWidth
    value={formData.currency}
    onChange={handleInputChange}
    name="currency"
    sx={{
      borderRadius: '12px', // Bordes redondeados
      backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
      transition: 'all 0.3s ease-in-out', // Transición suave
      boxShadow: darkMode
        ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
        : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
      '& .MuiInputLabel-root': {
        color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
        fontWeight: 'bold',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: '2px', // Grosor del borde
          borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
        },
        '&:hover fieldset': {
          borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
          boxShadow: darkMode
            ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
            : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
        },
        '&.Mui-focused fieldset': {
          borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
          boxShadow: darkMode
            ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
            : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
        },
      },
      '& .MuiSelect-icon': {
        color: darkMode ? 'orange' : '#2196f3', // Color del ícono del Select
      },
      '& .MuiInputBase-input': {
        color: darkMode ? 'white' : 'black', // Color del texto seleccionado
      },
    }}
  >
    {currencies.map((currency) => (
      <MenuItem key={currency.value} value={currency.value}>
        {currency.label}
      </MenuItem>
    ))}
  </TextField>
</Grid>


<Grid item xs={12} sm={6}>
  <TextField
    select
    label="País"
    variant="outlined"
    fullWidth
    value={formData.country}
    onChange={handleInputChange}
    name="country"
    sx={{
      borderRadius: '12px', // Bordes redondeados
      backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
      transition: 'all 0.3s ease-in-out', // Transición suave
      boxShadow: darkMode
        ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
        : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
      '& .MuiInputLabel-root': {
        color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
        fontWeight: 'bold',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: '2px', // Grosor del borde
          borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
        },
        '&:hover fieldset': {
          borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
          boxShadow: darkMode
            ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
            : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
        },
        '&.Mui-focused fieldset': {
          borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
          boxShadow: darkMode
            ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
            : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
        },
      },
      '& .MuiSelect-icon': {
        color: darkMode ? 'orange' : '#2196f3', // Color del ícono del Select
      },
      '& .MuiInputBase-input': {
        color: darkMode ? 'white' : 'black', // Color del texto seleccionado
      },
    }}
  >
    {countries.map((country) => (
      <MenuItem key={country} value={country}>
        {country}
      </MenuItem>
    ))}
  </TextField>
</Grid>


    <Grid item xs={12}>
      <TextField
        label="Descripción del Proyecto"
        variant="outlined"
        fullWidth
        value={formData.projectDescription}
        onChange={handleInputChange}
        name="projectDescription"
        sx={{
          borderRadius: '12px', // Bordes redondeados
          backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
          transition: 'all 0.3s ease-in-out', // Transición suave
          boxShadow: darkMode
            ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
            : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
          '& .MuiInputLabel-root': {
            color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
            
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '2px', // Grosor del borde
              borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
            },
            '&:hover fieldset': {
              borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
              boxShadow: darkMode
                ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
                : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
              boxShadow: darkMode
                ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
                : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
            },
          },
          '& .MuiInputBase-input': {
            color: darkMode ? 'white' : 'black', // Color del texto ingresado
          
          },
        }}
      />
    </Grid>
    <Grid item xs={12}>
  <TextField
    select
    label="Método de Desarrollo Preferido"
    variant="outlined"
    fullWidth
    value={formData.preferredDevelopmentMethod}
    onChange={handleInputChange}
    name="preferredDevelopmentMethod"
    sx={{
      borderRadius: '12px', // Bordes redondeados
      backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
      transition: 'all 0.3s ease-in-out', // Transición suave
      boxShadow: darkMode
        ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
        : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
      '& .MuiInputLabel-root': {
        color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: '2px', // Grosor del borde
          borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
        },
        '&:hover fieldset': {
          borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
          boxShadow: darkMode
            ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
            : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
        },
        '&.Mui-focused fieldset': {
          borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
          boxShadow: darkMode
            ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
            : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
        },
      },
      '& .MuiInputBase-input': {
        color: darkMode ? 'white' : 'black', // Color del texto ingresado
      },
      '& .MuiSelect-icon': {
        color: darkMode ? 'orange' : '#2196f3', // Color del ícono del Select
      },
    }}
  >
    {[
      'Metodología Ágil',
      'Desarrollo en Cascada',
      'Prototipado Rápido',
      'DevOps Integrado',
      'Scrum',
      'Kanban',
      'Modelo en Espiral',
      'Modelo Incremental',
      'Otro'
    ].map((method) => (
      <MenuItem key={method} value={method}>
        {method}
      </MenuItem>
    ))}
  </TextField>
</Grid>

<Grid item xs={12} sm={6}>
  <TextField
    select
    label="Método de Pago Preferido"
    variant="outlined"
    fullWidth
    value={formData.paymentMethod}
    onChange={handleInputChange}
    name="paymentMethod"
    sx={{
      borderRadius: '12px', // Bordes redondeados
      backgroundColor: darkMode ? '#333' : '#fff', // Fondo según el modo
      transition: 'all 0.3s ease-in-out', // Transición suave
      boxShadow: darkMode
        ? '0px 0px 10px rgba(255, 165, 0, 0.6)'
        : '0px 0px 10px rgba(33, 150, 243, 0.6)', // Sombra del contorno
      '& .MuiInputLabel-root': {
        color: darkMode ? 'orange' : '#2196f3', // Color de la etiqueta
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderWidth: '2px', // Grosor del borde
          borderColor: darkMode ? 'orange' : '#2196f3', // Color del borde
        },
        '&:hover fieldset': {
          borderColor: darkMode ? '#ff9800' : '#1976d2', // Color del borde al pasar el cursor
          boxShadow: darkMode
            ? '0px 0px 12px rgba(255, 152, 0, 0.8)'
            : '0px 0px 12px rgba(25, 118, 210, 0.8)', // Sombra al hacer hover
        },
        '&.Mui-focused fieldset': {
          borderColor: darkMode ? '#ffcc80' : '#0d47a1', // Color del borde cuando está enfocado
          boxShadow: darkMode
            ? '0px 0px 14px rgba(255, 200, 120, 0.9)'
            : '0px 0px 14px rgba(13, 71, 161, 0.9)', // Sombra al enfocar
        },
      },
      '& .MuiInputBase-input': {
        color: darkMode ? 'white' : 'black', // Color del texto ingresado
      },
      '& .MuiSelect-icon': {
        color: darkMode ? 'orange' : '#2196f3', // Color del ícono del Select
      },
    }}
  >
    {[
      'Tarjeta de Crédito',
      'PayPal',
      'Transferencia Bancaria',
      'Criptomonedas',
      'Efectivo',
      'Cheque',
      'Pago Móvil',
      'Apple Pay',
      'Google Pay',
      'Otro',
    ].map((method) => (
      <MenuItem key={method} value={method}>
        {method}
      </MenuItem>
    ))}
  </TextField>
</Grid>

  {/*   <Grid item xs={12} sm={6}>
      <TextField
        label="Ubicación del Servicio"
        variant="outlined"
        fullWidth
        value={formData.serviceLocation}
        onChange={handleInputChange}
        name="serviceLocation"
        sx={{
          '& .MuiInputLabel-root': { color: '#2196f3' },
          '& .MuiOutlinedInput-root': {
            '&:focus': { borderColor: '#2196f3' },
          },
        }}
      />
    </Grid> */}

   {/*  <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.termsAndConditions}
            onChange={handleInputChange}
            name="termsAndConditions"
          />
        }
        label="Acepto los términos y condiciones"
      />
    </Grid> */}

<Grid item xs={12} textAlign="center">
  <Button
    variant="contained"
    color="primary"
    size="large"
    type="submit"
    sx={{
      mt: 3,
      borderRadius: '8px',
      padding: '12px 40px',
      textTransform: 'none',
      boxShadow: darkMode ? '0px 6px 20px rgba(255, 255, 255, 0.1)' : '0px 6px 20px rgba(0, 0, 0, 0.1)',
      backgroundColor: darkMode ? 'orange' : '#1976d2',
      '&:hover': {
        backgroundColor: darkMode ? 'orange' : '#2196f3',
        boxShadow: darkMode ? '0px 10px 30px rgba(255, 255, 255, 0.2)' : '0px 10px 30px rgba(0, 0, 0, 0.2)',
      },
    }}
    disabled={isSubmitting}
  >
    {isSubmitting ? "Enviando..." : "Enviar"}
  </Button>

  {/* Botón de llamada */}
  <Button
    variant="contained"
    color="secondary"
    size="large"
    sx={{
      mt: 2,
      ml: 2,
      borderRadius: '8px',
      padding: '12px 40px',
      textTransform: 'none',
      backgroundColor: darkMode ? '#ff5722' : '#4caf50',
      boxShadow: darkMode ? '0px 6px 20px rgba(255, 255, 255, 0.1)' : '0px 6px 20px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundColor: darkMode ? '#ff7043' : '#45a049',
        boxShadow: darkMode ? '0px 10px 30px rgba(255, 255, 255, 0.2)' : '0px 10px 30px rgba(0, 0, 0, 0.2)',
      },
    }}
    href="tel:+1234567890" // Reemplaza con el número de teléfono real
  >
    Llamar 📞
  </Button>
</Grid>

    {submitStatus && (
      <Grid item xs={12} textAlign="center" sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ color: submitStatus.success ? 'green' : 'red' }}>
          {submitStatus.message}
        </Typography>
      </Grid>
    )}
  </Grid>
</form>


      {/*   <Box sx={{ textAlign: 'center', mt: 6, borderTop: '2px solid #2196f3', paddingTop: 4 }}>
          <Typography variant="body2" color="textSecondary">
            ¿Prefieres llamarnos? Llámanos al <strong>(+52) 56-3730-3010</strong>
          </Typography>
        </Box> */}

      
      </Container>
    </Box>
  );
};

export default ContactForm;
