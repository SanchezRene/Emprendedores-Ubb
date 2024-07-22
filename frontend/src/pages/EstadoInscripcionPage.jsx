// pages/EstadoInscripcionPage.js

import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
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

  return (
    <Container maxW="container.xl" mt={10}>
      <Box p={6} boxShadow="md" borderRadius="md" bg="white">
        <Heading as="h2" size="xl" mb={6}>
          Estado de Inscripción
        </Heading>
        <Box overflowX="auto">
          {inscripciones.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No se han encontrado inscripciones.
            </Alert>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Fecha solicitud</Th>
                  <Th>Estado</Th>
                </Tr>
              </Thead>
              <Tbody>
                {inscripciones.map((inscripcion) => (
                  <Tr key={inscripcion._id}>
                    <Td>{new Date(inscripcion.fechaInscripcion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Td>
                    <Td>{inscripcion.estado}</Td>
                  </Tr>
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
