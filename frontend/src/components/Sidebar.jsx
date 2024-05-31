import React from "react";
import {
  Box,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link as ChakraLink,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box bg="gray.800" color="white" width="200px" p={4}>
      <VStack align="start" spacing={4}>
        <RouterLink to="/">
          <Text>Home</Text>
        </RouterLink>
        <Divider borderColor="whiteAlpha.400" />

        <RouterLink to="/carreras">
          <Text>Carreras</Text>
        </RouterLink>
        <Divider borderColor="whiteAlpha.400" />

        <Accordion allowToggle width="100%">
          <AccordionItem border="none">
            <h2>
              <AccordionButton p={0}>
                <Box
                  flex="1"
                  textAlign="left"
                  display="flex"
                  alignItems="center"
                >
                  <Text mr={2}>📝</Text>
                  <Text fontSize="md">Registro emprendedores</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2} pl={4}>
              <ChakraLink
                as={RouterLink}
                to="/formulario-inscripcion"
                display="block"
                mb={2}
              >
                Formulario de inscripción
              </ChakraLink>
              <Divider borderColor="whiteAlpha.400" />

              <ChakraLink
                as={RouterLink}
                to="/estado-inscripcion"
                display="block"
              >
                Estado de inscripción
              </ChakraLink>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Divider borderColor="whiteAlpha.400" />

        <Accordion allowToggle width="100%">
          <AccordionItem border="none">
            <h2>
              <AccordionButton p={0}>
                <Box
                  flex="1"
                  textAlign="left"
                  display="flex"
                  alignItems="center"
                >
                  <Text mr={2}>📅</Text>
                  <Text fontSize="md">Actividades</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2} pl={4}>
              <ChakraLink
                as={RouterLink}
                to="/inscribir-actividad"
                display="block"
                mb={2}
              >
                Inscribir actividad
              </ChakraLink>

              <Divider borderColor="whiteAlpha.400" />
              <ChakraLink
                as={RouterLink}
                to="/consultar-inscripcion"
                display="block"
                mb={2}
              >
                Consultar inscripción
              </ChakraLink>

              <Divider borderColor="whiteAlpha.400" />
              <ChakraLink
                as={RouterLink}
                to="/confirmar-asistencia"
                display="block"
                mb={2}
              >
                Confirmar asistencia
              </ChakraLink>
              <Divider borderColor="whiteAlpha.400" />

              <ChakraLink
                as={RouterLink}
                to="/calendario-actividades"
                display="block"
              >
                Calendario de actividades
              </ChakraLink>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Divider borderColor="whiteAlpha.400" />

        <RouterLink to="/perfil-emprendedor">
          <Box display="flex" alignItems="center">
            <Text mr={2}>👤</Text>
            <Text fontSize="md">Perfil Emprendedor</Text>
          </Box>
        </RouterLink>
      </VStack>
    </Box>
  );
}

export default Sidebar;
