// src/components/formulario/AyudantesTable.jsx

import React from 'react';
import { Table, Tbody, Tr, Td, Thead, Th, Button } from '@chakra-ui/react';

function AyudantesTable({ ayudantes }) {
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
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default AyudantesTable;
