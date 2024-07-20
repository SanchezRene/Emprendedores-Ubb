import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

const ProductoModal = ({ isOpen, onClose, onSave, producto }) => {
  const [formValues, setFormValues] = useState({
    nombre: '',
    tipo: '',
    descripcion: '',
    stock: '',
    fotografia: ''
  });
  const [file, setFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (producto) {
      setFormValues(producto);
    } else {
      setFormValues({
        nombre: '',
        tipo: '',
        descripcion: '',
        stock: '',
        fotografia: ''
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFormValues({
      ...formValues,
      fotografia: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleSave = () => {
    onSave(formValues);
    toast({
      title: "Producto guardado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{producto ? 'Modificar Producto' : 'Añadir Producto'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
              placeholder="Nombre del producto"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Categoría</FormLabel>
            <Input
              name="tipo"
              value={formValues.tipo}
              onChange={handleChange}
              placeholder="Categoría del producto"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
              placeholder="Descripción del producto"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Stock</FormLabel>
            <Input
              name="stock"
              value={formValues.stock}
              onChange={handleChange}
              placeholder="Stock del producto"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Fotografía</FormLabel>
            {formValues.fotografia && (
              <img src={formValues.fotografia} alt="Fotografía del producto" style={{ marginBottom: '10px' }} />
            )}
            <Input
              type="file"
              name="fotografia"
              onChange={handleFileChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            {producto ? 'Guardar Cambios' : 'Guardar'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductoModal;
