// src/routes/Root.jsx
import React from 'react';
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { Toaster } from 'react-hot-toast';

function Root() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Flex direction="column" height="100vh">
          <Header />
          <Flex flex="1" overflow="hidden">
            <Sidebar />
            <Box flex="1" p="4" overflow="auto">
              <Outlet />
            </Box>
          </Flex>
        </Flex>
        <Toaster position="top-right" />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default Root;
