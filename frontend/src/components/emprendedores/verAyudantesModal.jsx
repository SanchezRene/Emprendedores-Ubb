// src/components/emprendedores/verAyudantesModal.jsx

import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";
import { getAyudanteById } from '../../services/ayudantes.service';

const VerAyudantesModal = ({ isOpen, onClose, emprendedor }) => {
  const [ayudantes, setAyudantes] = useState([]);

  useEffect(() => {
    const fetchAyudantes = async () => {
      if (emprendedor?.ayudantesId.length > 0) {
        const ayudantesData = await Promise.all(
          emprendedor.ayudantesId.map((ayudanteId) => getAyudanteById(ayudanteId))
        );
        setAyudantes(ayudantesData);
      } else {
        setAyudantes([]);
      }
    };

    fetchAyudantes();
  }, [emprendedor]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ayudantes de {emprendedor?.nombre_completo}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            {ayudantes.length > 0 ? (
              ayudantes.map((ayudante) => (
                <ListItem key={ayudante._id}>
                  <div>{ayudante.nombre}</div>
                  <div>{ayudante.rut}</div>
                </ListItem>
              ))
            ) : (
              <ListItem>No hay ayudantes registrados</ListItem>
            )}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerAyudantesModal;
