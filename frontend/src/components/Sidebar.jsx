// src/components/Sidebar.jsx

import React from "react";
import { Box, VStack, Text, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AccordionList from "./AccordionList";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRoles = user ? user.roles.map((role) => role.name) : [];


  return (
    <Box bg="gray.800" color="white" width="200px" p={4} height="100vh">
      <VStack align="start" spacing={4} height="100%">
        <RouterLink to="/">
          <Text>Home</Text>
        </RouterLink>
        <Divider borderColor="whiteAlpha.400" />
        <AccordionList userRoles={userRoles} />
      </VStack>
    </Box>
  );
};

export default Sidebar;
