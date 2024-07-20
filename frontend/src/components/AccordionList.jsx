import React from "react";
import { Accordion, Box, Divider } from "@chakra-ui/react";
import AccordionItemComponent from "./Accordion";

const accordionData = [
  {
    title: "Gestión de emprendedores",
    icon: "⚙️",
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
    icon: "📝",
    links: [
      { label: "Formulario de inscripción", path: "/formulario-inscripcion" },
      { label: "Estado de inscripción", path: "/estado-inscripcion" },
    ],
  },
  {
    title: 'Actividades',
    icon: '📅',
    links: [
      { label: 'Otra opción 1', path: '/otra-opcion-1' },
      { label: 'Otra opción 2', path: '/otra-opcion-2' },
    ],
  },
  {
    title: 'Gestión usuarios',
    icon: '🛠️', 
    links: [
      { label: 'Gestión Usuarios', path: '/gestion-usuarios' },
    ],
  },
  /**Otos acordeones pueden ser agregados de la siguiente forma:
   * {
    title: 'Otro acordeón',
    icon: '📂', //<- cambiar icono
    links: [
      { label: 'Otra opción 1', path: '/otra-opcion-1' },
      { label: 'Otra opción 2', path: '/otra-opcion-2' },
    ],
  },*/
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
