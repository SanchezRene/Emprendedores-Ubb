// src/components/formulario/ProductosTable.jsx

import React from 'react';
import { Table, Tbody, Tr, Td, Thead, Th, Button, useToast } from '@chakra-ui/react';

function ProductosTable({ productos, onEdit, onDelete }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Categoría</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {productos.map((producto, index) => (
          <Tr key={index}>
            <Td>{producto.nombre}</Td>
            <Td>{producto.tipo}</Td>
            <Td>
              <Button onClick={() => onEdit(producto)}>Editar</Button>
              <Button onClick={() => onDelete(producto)} colorScheme="red">
                Eliminar
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ProductosTable;
