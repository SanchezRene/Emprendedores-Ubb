// pages/EstadoInscripcionPage.js

import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, Icon, Text, HStack } from '@chakra-ui/react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'; // Importa el ícono de close circle
import { getInscripcionByEmail } from '../services/inscripcion.service';
import { useAuth } from "../context/AuthContext";

const EstadoInscripcionPage = () => {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const email = user.email;
        const data = await getInscripcionByEmail(email);
        setInscripciones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInscripciones();
  }, [user.email]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <Spinner size="xl" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  // Obtener el último estado actual de la inscripción
  const currentEstado = inscripciones.length > 0 ? inscripciones[0].estado : null;

  return (
    <Container maxW="container.xl" mt={10}>
      <Box p={6} boxShadow="md" borderRadius="md" bg="white">
        <Heading as="h2" size="md" mb={6}>
          Estado de Inscripción
        </Heading>
        
        {currentEstado && (
          <HStack spacing={3} mb={6} alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              Estado: {currentEstado.charAt(0).toUpperCase() + currentEstado.slice(1)}
            </Text>
            {/* Condicional para mostrar el ícono correcto según el estado */}
            <Icon
              as={currentEstado === "aprobada" ? AiOutlineCheckCircle : AiOutlineCloseCircle}
              color={currentEstado === "aprobada" ? "green.500" : "red.500"}
              boxSize={6}
            />
          </HStack>
        )}

        <Box overflowX="auto">
          <Heading as="h3" size="md" mb={4}>
            Historial de la inscripción
          </Heading>

          {inscripciones.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No se han encontrado inscripciones.
            </Alert>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th>Estado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {inscripciones.map((inscripcion) => (
                  inscripcion.historialEstados
                    .sort((a, b) => new Date(a.fechaCambio) - new Date(b.fechaCambio))
                    .map((historial, index) => (
                      <Tr key={`${inscripcion._id}-${index}`}>
                        <Td>
                          {new Date(historial.fechaCambio).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </Td>
                        <Td>{historial.estado}</Td>
                      </Tr>
                    ))
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default EstadoInscripcionPage;
