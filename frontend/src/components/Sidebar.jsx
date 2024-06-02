import React from "react";
import { Box, VStack, Text, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AccordionList from "./AccordionList";

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

        <AccordionList></AccordionList>
      </VStack>
    </Box>
  );
}

export default Sidebar;
