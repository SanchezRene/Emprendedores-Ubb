// src/components/AccordionList.jsx

import React from "react";
import { Accordion, Box, Divider } from "@chakra-ui/react";
import AccordionItemComponent from "./Accordion";

const accordionData = [
  {
    title: "Actividades",
    icon: "FaListAlt",
    links: [
      { label: "Lista de Actividades", path: "/actividades", icon: "FaListAlt", roles: ["encargado", "admin"] },
      { label: "Inscripción Manual", path: "/inscripcion-manual", icon: "FaPlus", roles: ["encargado", "admin"] },
    ],
  },
  {
    title: "Gestión de emprendedores",
    icon: "FaCog",
    links: [
      { label: "Aprobar o rechazar Inscripción", path: "/aprobar-rechazar-inscripcion", roles: ["encargado", "admin"] },
      { label: "Listado de emprendedores inscritos", path: "/emprendedores-inscritos", roles: ["encargado", "admin"] },
    ],
  },
  {
    title: "Registro emprendedores",
    icon: "FaFileAlt",
    links: [
      { label: "Formulario de inscripción", path: "/formulario-inscripcion", roles: ["user", "emprendedor", "admin"] },
      { label: "Estado de inscripción", path: "/estado-inscripcion", roles: ["user", "emprendedor", "admin"] },
    ],
  },
  {
    title: "Carreras",
    icon: "FaBook",
    links: [
      { label: "Lista de Carreras", path: "/carreras", roles: ["admin"] },
    ],
  },
  {
    title: "Gestión usuarios",
    icon: "FaUsersCog",
    links: [
      { label: "Gestión Usuarios", path: "/gestion-usuarios", roles: ["admin"] },
    ],
  },
];

const AccordionList = ({ userRoles }) => {
  return (
    <Accordion allowToggle width="100%">
      {accordionData
        .filter(item => item.links.some(link => link.roles.some(role => userRoles.includes(role))))
        .map((item, index) => (
          <React.Fragment key={index}>
            <Box mb={4} mt={index === 0 ? 0 : 4}>
              <AccordionItemComponent
                title={item.title}
                icon={item.icon}
                links={item.links.filter(link => link.roles.some(role => userRoles.includes(role)))}
              />
            </Box>
            {index < accordionData.length - 1 && <Divider borderColor="whiteAlpha.400" />}
          </React.Fragment>
        ))}
    </Accordion>
  );
};

export default AccordionList;
