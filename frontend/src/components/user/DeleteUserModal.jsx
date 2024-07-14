// src/components/user/DeleteUserModal.jsx

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

function DeleteUserModal({ isOpen, onClose, onDelete, user }) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await onDelete(user._id);
      toast({
        title: 'Usuario eliminado.',
        description: `El usuario ${user.username} ha sido eliminado correctamente.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error al eliminar usuario.',
        description: 'Ocurrió un error al intentar eliminar el usuario. Inténtalo nuevamente.',
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
        <ModalHeader>Eliminar Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            ¿Estás seguro de que deseas eliminar al usuario {user.username}? Esta acción no se puede deshacer.
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

export default DeleteUserModal;
