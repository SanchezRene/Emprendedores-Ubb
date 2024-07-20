import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useToast
} from '@chakra-ui/react';
import { deleteActividad } from '../../services/activity.service';

function DeleteActivityModal({ isOpen, onClose, activity, onDelete }) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteActividad(activity._id);
      onDelete(activity._id);
      toast({
        title: 'Actividad eliminada.',
        description: `La actividad ${activity.nombre} ha sido eliminada correctamente.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error al eliminar actividad.',
        description: 'Ocurrió un error al intentar eliminar la actividad. Inténtalo nuevamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Eliminar Actividad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            ¿Estás seguro de que deseas eliminar la actividad {activity.nombre}? Esta acción no se puede deshacer.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={handleDelete} ml={3}>
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteActivityModal;
