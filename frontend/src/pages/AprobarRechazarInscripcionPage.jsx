// src/pages/AprobarRechazarInscripcion.jsx

import React, { useEffect, useState } from "react";
import {
  Box,Button,Table,Thead,Tbody,Tr,Th,Td,VStack,HStack,Spinner,
  useToast,} from "@chakra-ui/react";
import {
  getInscripcionesSummary,
  updateInscripcion,
} from "../services/inscripcion.service";

const AprobarRechazarInscripcion = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const data = await getInscripcionesSummary();
        console.log("data: ", data);
        setInscripciones(data[1]?.Data || []);
      } catch (error) {
        console.error("Error fetching inscripciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInscripciones();
  }, []);

  const handleUpdate = async (id, estado) => {
    try {
      await updateInscripcion(id, { estado });
      setInscripciones((prev) =>
        prev.map((inscripcion) =>
          inscripcion.inscripcionId === id
            ? { ...inscripcion, estado }
            : inscripcion
        )
      );
      toast({
        title: `Inscripción ${estado}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating inscripcion:", error);
      toast({
        title: `Error al ${estado === "aprobada" ? "aprobar" : "rechazar"} la inscripción`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <VStack justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </VStack>
    );
  }

  return (
    <Box p={5}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Estado</Th>
            <Th>Fecha de Inscripción</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inscripciones.map((inscripcion) => (
            <Tr key={inscripcion.inscripcionId}>
              <Td>{inscripcion.nombre}</Td>
              <Td>{inscripcion.estado}</Td>
              <Td>{inscripcion.fechaInscripcion}</Td>
              <Td>
                {inscripcion.estado === "pendiente" ? (
                  <HStack spacing={2}>
                    <Button
                      colorScheme="green"
                      onClick={() =>
                        handleUpdate(inscripcion.inscripcionId, "aprobada")
                      }
                    >
                      Aprobar
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() =>
                        handleUpdate(inscripcion.inscripcionId, "rechazada")
                      }
                    >
                      Rechazar
                    </Button>
                  </HStack>
                ) : (
                  <Button colorScheme="blue" isDisabled>
                    {inscripcion.estado}
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AprobarRechazarInscripcion;
