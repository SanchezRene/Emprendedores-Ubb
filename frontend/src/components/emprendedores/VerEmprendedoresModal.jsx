// src/components/emprendedores/VerEmprendedoresModal.jsx

import React from "react";
import {
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,
  ModalBody,ModalCloseButton,Button,Text,VStack,
} from "@chakra-ui/react";

const VerEmprendedoresModal = ({ isOpen, onClose, emprendedor }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalle del Emprendedor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={2}>
            <Text>
              <strong>Nombre Completo:</strong> {emprendedor.nombre_completo}
            </Text>
            <Text>
              <strong>RUT:</strong> {emprendedor.rut}
            </Text>
            <Text>
              <strong>Celular:</strong> {emprendedor.celular}
            </Text>
            <Text>
              <strong>Nombre del Puesto:</strong> {emprendedor.nombre_puesto}
            </Text>
          </VStack>
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

export default VerEmprendedoresModal;
