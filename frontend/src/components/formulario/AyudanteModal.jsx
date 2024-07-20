import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";

const AyudanteModal = ({ isOpen, onClose, onSave, ayudante }) => {
  const [nombre, setNombre] = useState(ayudante ? ayudante.nombre : "");
  const [rut, setRut] = useState(ayudante ? ayudante.rut : "");
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorRut, setErrorRut] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    if (!nombre || !rut) {
      setErrorNombre(!nombre);
      setErrorRut(!rut);
      return;
    }

    onSave({ nombre, rut });
    onClose();
    setNombre("");
    setRut("");
    setErrorNombre(false);
    setErrorRut(false);
  };

  const handleCancel = () => {
    setNombre("");
    setRut("");
    setErrorNombre(false);
    setErrorRut(false);
    onClose();
  };

  const handleBlur = () => {
    if (!nombre && !rut) {
      toast({
        title: "Error",
        description: "Debe llenar todos los campos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Añadir Ayudante</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={errorNombre}>
            <FormLabel>Nombre completo</FormLabel>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={handleBlur}
            />
            {errorNombre && (
              <FormErrorMessage>
                El nombre no puede estar vacío.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={4} isInvalid={errorRut}>
            <FormLabel>Rut</FormLabel>
            <Input
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              onBlur={handleBlur}
            />
            {errorRut && (
              <FormErrorMessage>El Rut no puede estar vacío.</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSave} ml={3}>
            Añadir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AyudanteModal;
