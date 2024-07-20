// src/pages/EmprendedoresPage.jsx
import React, { useEffect, useState } from 'react';
import { getEmprendedores } from '../services/emprendedor.service';
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import VerProductosModal from '../components/emprendedores/VerProductosModal';
import VerAyudantesModal from '../components/emprendedores/VerAyudantesModal';

const EmprendedoresPage = () => {
  const [emprendedores, setEmprendedores] = useState([]);
  const [selectedEmprendedor, setSelectedEmprendedor] = useState(null);
  const { isOpen: isProductosOpen, onOpen: onProductosOpen, onClose: onProductosClose } = useDisclosure();
  const { isOpen: isAyudantesOpen, onOpen: onAyudantesOpen, onClose: onAyudantesClose } = useDisclosure();

  useEffect(() => {
    const fetchEmprendedores = async () => {
      const data = await getEmprendedores();
      setEmprendedores(data);
    };

    fetchEmprendedores();
  }, []);

  const handleViewProductos = (emprendedor) => {
    setSelectedEmprendedor(emprendedor);
    onProductosOpen();
  };

  const handleViewAyudantes = (emprendedor) => {
    setSelectedEmprendedor(emprendedor);
    onAyudantesOpen();
  };

  return (
    <Box p={5}>
      <h1>Emprendedores Inscritos</h1>
      <Table variant="striped" colorScheme="teal" mt={5}>
        <Thead>
          <Tr>
            <Th>Nombre Completo</Th>
            <Th>RUT</Th>
            <Th>Celular</Th>
            <Th>Nombre del Puesto</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {emprendedores.map((emprendedor) => (
            <Tr key={emprendedor._id}>
              <Td>{emprendedor.nombre_completo}</Td>
              <Td>{emprendedor.rut}</Td>
              <Td>{emprendedor.celular}</Td>
              <Td>{emprendedor.nombre_puesto}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleViewProductos(emprendedor)}
                  >
                    Ver Productos
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="green"
                    onClick={() => handleViewAyudantes(emprendedor)}
                  >
                    Ver Ayudantes
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <VerProductosModal
        isOpen={isProductosOpen}
        onClose={onProductosClose}
        emprendedor={selectedEmprendedor}
      />
      <VerAyudantesModal
        isOpen={isAyudantesOpen}
        onClose={onAyudantesClose}
        emprendedor={selectedEmprendedor}
      />
    </Box>
  );
};

export default EmprendedoresPage;
