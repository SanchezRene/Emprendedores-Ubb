// src/components/formulario/AyudantesTable.jsx

import React from 'react';
import { Table, Tbody, Tr, Td, Thead, Th, Button } from '@chakra-ui/react';

function AyudantesTable({ ayudantes, onEdit, onDelete }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Rut</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ayudantes.map((ayudante, index) => (
          <Tr key={index}>
            <Td>{ayudante.nombre}</Td>
            <Td>{ayudante.rut}</Td>
            <Td>
              <Button
                size="sm"
                colorScheme="yellow"
                onClick={() => onEdit(ayudante)}
                mr={2}
              >
                Editar
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => onDelete(ayudante)}
              >
                Eliminar
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default AyudantesTable;
