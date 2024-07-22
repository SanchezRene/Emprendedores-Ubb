import React from 'react';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,
  ModalBody,ModalCloseButton,Button,Text,VStack,
} from '@chakra-ui/react';

const VerActividadModal = ({ isOpen, onClose, actividad }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalle de la Actividad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={2}>
            <Text>
              <strong>Nombre:</strong> {actividad.nombre}
            </Text>
            <Text>
              <strong>Descripción:</strong> {actividad.descripcion}
            </Text>
            <Text>
              <strong>Categoría:</strong> {actividad.categoria}
            </Text>
            <Text>
              <strong>Fecha de Inicio:</strong>{" "}
              {new Date(actividad.fechaInicio).toLocaleDateString()}
            </Text>
            <Text>
              <strong>Hora de Inicio:</strong> {actividad.horaInicio}
            </Text>
            <Text>
              <strong>Fecha de Fin:</strong>{" "}
              {new Date(actividad.fechaFin).toLocaleDateString()}
            </Text>
            <Text>
              <strong>Hora de Fin:</strong> {actividad.horaFin}
            </Text>
            <Text>
              <strong>Lugar:</strong> {actividad.lugar}
            </Text>
            <Text>
              <strong>Capacidad de Asistentes:</strong>{" "}
              {actividad.capacidadAsistentes}
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

export default VerActividadModal;
