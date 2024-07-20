// src/components/ActivityTable.jsx

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const ActivityTable = ({ activities, onEdit, onDelete }) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>Nombre</Th>
        <Th>Descripción</Th>
        <Th>Categoría</Th>
        <Th>Acciones</Th>
      </Tr>
    </Thead>
    <Tbody>
      {activities.map((activity) => (
        <Tr key={activity._id}>
          <Td>{activity.nombre}</Td>
          <Td>{activity.descripcion}</Td>
          <Td>{activity.categoria}</Td>
          <Td>
            <Button colorScheme="blue" onClick={() => onEdit(activity)}>Editar</Button>
            <Button colorScheme="red" ml={2} onClick={() => onDelete(activity._id)}>Eliminar</Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default ActivityTable;
