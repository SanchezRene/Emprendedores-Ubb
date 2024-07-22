import React from "react";
import { Accordion, Box, Divider } from "@chakra-ui/react";
import AccordionItemComponent from "./Accordion";

const accordionData = [
  {
    title: "Actividades",
    icon: "FaListAlt",
    links: [
      { label: "Lista de Actividades", path: "/actividades", icon: "FaListAlt" },
      { label: "Inscripción Manual", path: "/inscripcion-manual", icon: "FaPlus" },
    ],
  },
  {
    title: "Gestión de emprendedores",
    icon: "FaCog",
    links: [
      { label: "Aprobar o rechazar Inscripción", path: "/aprobar-rechazar-inscripcion" },
      { label: "Listado de emprendedores inscritos", path: "/emprendedores-inscritos" },
    ],
  },
  {
    title: "Registro emprendedores",
    icon: "FaFileAlt",
    links: [
      { label: "Formulario de inscripción", path: "/formulario-inscripcion" },
      { label: "Estado de inscripción", path: "/estado-inscripcion" },
    ],
  },
  {
    title: "Carreras",
    icon: "FaBook",
    links: [
      { label: "Lista de Carreras", path: "/carreras" },
    ],
  },
  {
    title: "Gestión usuarios",
    icon: "FaUsersCog",
    links: [
      { label: "Gestión Usuarios", path: "/gestion-usuarios" },
    ],
  },
];

const AccordionList = () => {
  return (
    <Accordion allowToggle width="100%">
      {accordionData.map((item, index) => (
        <React.Fragment key={index}>
          <Box mb={4} mt={index === 0 ? 0 : 4}>
            <AccordionItemComponent title={item.title} icon={item.icon} links={item.links} />
          </Box>
          {index < accordionData.length - 1 && <Divider borderColor="whiteAlpha.400" />}
        </React.Fragment>
      ))}
    </Accordion>
  );
};

export default AccordionList;
