// src/components/Accordion.jsx

import React from "react";
import { AccordionItem, AccordionButton, AccordionPanel, Box, Text, Icon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaListAlt, FaPlus, FaCog, FaFileAlt, FaUsersCog, FaBook } from 'react-icons/fa';

const icons = {
  FaListAlt: FaListAlt,
  FaPlus: FaPlus,
  FaCog: FaCog,
  FaFileAlt: FaFileAlt,
  FaUsersCog: FaUsersCog,
  FaBook: FaBook,
};

const AccordionItemComponent = ({ title, icon, links }) => {
  const IconComponent = icons[icon];

  return (
    <AccordionItem border="none">
      <AccordionButton>
        <Box flex="1" textAlign="left" display="flex" alignItems="center">
          <Icon as={IconComponent} mr={2} />
          <Text fontSize="md">{title}</Text>
        </Box>
      </AccordionButton>
      <AccordionPanel pb={4}>
        {links.map((link, linkIndex) => (
          <Box key={linkIndex} mb={2}>
            <RouterLink to={link.path}>
              <Text display="flex" alignItems="center">
                {link.icon && <Icon as={icons[link.icon]} mr={2} />}
                {link.label}
              </Text>
            </RouterLink>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionItemComponent;
