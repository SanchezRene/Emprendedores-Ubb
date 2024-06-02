import React from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  AccordionIcon,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const AccordionItemComponent = ({ title, icon, links, mt, mb }) => {
  return (
    <AccordionItem border="none" mb={mb}>
      <h2>
        <AccordionButton p={0}>
          <Box flex="1" textAlign="left" display="flex" alignItems="center">
            <Text mr={2}>{icon}</Text>
            <Text fontSize="md">{title}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={2} pl={4}>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <ChakraLink
              as={RouterLink}
              to={link.path}
              display="block"
              mb={index < links.length - 1 ? 2 : 0}
            >
              {link.label}
            </ChakraLink>
            {index < links.length - 1 && (
              <Divider borderColor="whiteAlpha.400" />
            )}
          </React.Fragment>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionItemComponent;
