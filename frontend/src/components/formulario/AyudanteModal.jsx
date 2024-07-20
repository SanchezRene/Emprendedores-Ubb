// src/components/AyudanteModal.jsx

import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

function AyudanteModal({ isOpen, onClose, onSave }) {
  const [ayudante, setAyudante] = useState({
    nombre_completo: '',
    rut: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAyudante({ ...ayudante, [name]: value });
  };

  const handleSave = () => {
    onSave(ayudante);
    setAyudante({
      nombre_completo: '',
      rut: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Añadir Ayudante</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre completo</FormLabel>
            <Input
              name="nombre_completo"
              value={ayudante.nombre_completo}
              onChange={handleChange}
              placeholder="Nombre completo"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>RUT</FormLabel>
            <Input
              name="rut"
              value={ayudante.rut}
              onChange={handleChange}
              placeholder="RUT"
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

export default AyudanteModal;
