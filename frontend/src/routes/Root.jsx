// src/routes/Root.jsx

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
        <Box>
          <Header />
          <Flex>
            <Sidebar />
            <Box flex="1" p="4">
              <Outlet />
            </Box>
          </Flex>
        </Box>
        <Toaster position="top-right" />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default Root;
