"use client";
import Sidebar from "./Sidebar";
import { Flex, Box } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { Providers } from "../context/Providers";

function RootLayout({ children }) {
  return (
    <Providers>
      <AuthProvider>
        <Flex>
          <Sidebar />
          <Box flex="1" p="4">
            {children}
          </Box>
        </Flex>
      </AuthProvider>
    </Providers>
  );
}

export default RootLayout;
