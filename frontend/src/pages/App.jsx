// src/pages/App.jsx
import React from 'react';
import { Box, Text, VStack } from "@chakra-ui/react";

function App() {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Bienvenido a Emprendedores UBB</Text>
      <VStack align="start" spacing={4}>
        <Text fontSize="lg">
          Este es el sistema de gestión para emprendedores de la Universidad del Bío-Bío. Aquí puedes inscribirte, gestionar tus actividades y ver el estado de tu inscripción.
        </Text>
        <Text fontSize="md">
          Usa el menú de la izquierda para navegar a las diferentes secciones. Si necesitas ayuda, contacta al administrador.
        </Text>
      </VStack>
    </Box>
  );
}

export default App;
