import React from "react";
import { Box, VStack, Text, Divider, Icon, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaListAlt, FaPlus, FaCog, FaFileAlt, FaUsersCog, FaBook } from 'react-icons/fa';

const accordionData = [
  {
    title: "Actividades",
    icon: FaListAlt,
    links: [
      { label: "Lista de Actividades", path: "/actividades", icon: FaListAlt },
      { label: "Inscripción Manual", path: "/inscripcion-manual", icon: FaPlus },
    ],
  },
  {
    title: "Gestión de emprendedores",
    icon: FaCog,
    links: [
      { label: "Aprobación de registro", path: "/aprobacion-registro" },
      {
        label: "Listado de emprendedores inscritos",
        path: "/emprendedores-inscritos",
      },
    ],
  },
  {
    title: "Registro emprendedores",
    icon: FaFileAlt,
    links: [
      { label: "Formulario de inscripción", path: "/formulario-inscripcion" },
      { label: "Estado de inscripción", path: "/estado-inscripcion" },
    ],
  },
  {
    title: "Carreras",
    icon: FaBook,
    links: [
      { label: "Lista de Carreras", path: "/carreras" },
    ],
  },
  {
    title: "Gestión usuarios",
    icon: FaUsersCog,
    links: [
      { label: "Gestión Usuarios", path: "/gestion-usuarios" },
    ],
  },
];

const Sidebar = () => {
  return (
    <Box bg="gray.800" color="white" width="200px" p={4}>
      <VStack align="start" spacing={4}>
        <RouterLink to="/">
          <Text>Home</Text>
        </RouterLink>
        <Divider borderColor="whiteAlpha.400" />

        <Accordion allowToggle width="100%">
          {accordionData.map((item, index) => (
            <AccordionItem key={index} border="none">
              <AccordionButton>
                <Box flex="1" textAlign="left" display="flex" alignItems="center">
                  <Icon as={item.icon} mr={2} />
                  <Text fontSize="md">{item.title}</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {item.links.map((link, linkIndex) => (
                  <Box key={linkIndex} mb={2}>
                    <RouterLink to={link.path}>
                      <Text display="flex" alignItems="center">
                        {link.icon && <Icon as={link.icon} mr={2} />}
                        {link.label}
                      </Text>
                    </RouterLink>
                  </Box>
                ))}
              </AccordionPanel>
              {index < accordionData.length - 1 && <Divider borderColor="whiteAlpha.400" />}
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
}

export default Sidebar;
