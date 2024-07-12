// src/components/ProductoModal.jsx

import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

function ProductoModal({ isOpen, onClose, onSave }) {
  const [producto, setProducto] = useState({
    nombre: '',
    fotografia: null,
    descripcion: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleFileChange = (e) => {
    setProducto({ ...producto, fotografia: e.target.files[0] });
  };

  const handleSave = () => {
    onSave(producto);
    setProducto({
      nombre: '',
      fotografia: null,
      descripcion: '',
      stock: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Añadir Producto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre producto</FormLabel>
            <Input
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              placeholder="Nombre producto"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Fotografía producto</FormLabel>
            <Input type="file" onChange={handleFileChange} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción producto</FormLabel>
            <Textarea
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              placeholder="Descripción producto"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Stock producto</FormLabel>
            <Input
              name="stock"
              value={producto.stock}
              onChange={handleChange}
              placeholder="Stock producto"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button colorScheme="blue" onClick={handleSave} ml={3}>Añadir</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductoModal;
