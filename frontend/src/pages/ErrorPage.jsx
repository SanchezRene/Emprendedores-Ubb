import React from 'react';
import { useRouteError } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  const error = useRouteError();

  /**
   * Este mensaje de error, está pensado para los desarrolladores.
   * En un entorno de producción, no se debería mostrar este mensaje o almenos
   * no de esta forma.
   */
  console.error({
    status: error.status,
    statusText: error.statusText,
    message: error.message ? error.message : "No message",
  });

  return (
    <Box textAlign="center" mt="10">
      <Heading fontSize="2xl" color="red.500" mb="4">
        ERROR
      </Heading>
      <Text fontSize="lg">Lo sentimos, ha ocurrido un error inesperado.</Text>
    </Box>
  );
};

export default ErrorPage;
