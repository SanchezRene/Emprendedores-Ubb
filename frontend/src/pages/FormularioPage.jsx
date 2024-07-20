import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, VStack, HStack, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import ProductoModal from '../components/formulario/ProductoModal';
import AyudanteModal from '../components/formulario/AyudanteModal';
import { toast } from 'react-hot-toast';

const FormularioPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    celular: '',
    nombre_puesto: '',
  });
  const [productos, setProductos] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedAyudante, setSelectedAyudante] = useState(null);
  const [isProductoModalOpen, setProductoModalOpen] = useState(false);
  const [isAyudanteModalOpen, setAyudanteModalOpen] = useState(false);
  const [isDeletingProducto, setDeletingProducto] = useState(false);
  const [isDeletingAyudante, setDeletingAyudante] = useState(false);
  const [productoToDelete, setProductoToDelete] = useState(null);
  const [ayudanteToDelete, setAyudanteToDelete] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddProducto = () => {
    setSelectedProducto(null);
    setProductoModalOpen(true);
  };

  const handleSaveProducto = (producto) => {
    if (selectedProducto) {
      setProductos(productos.map((p) => (p === selectedProducto ? producto : p)));
      toast.success('Producto modificado exitosamente');
    } else {
      setProductos([...productos, producto]);
      toast.success('Producto añadido exitosamente');
    }
    setProductoModalOpen(false);
  };

  const handleEditProducto = (producto) => {
    setSelectedProducto(producto);
    setProductoModalOpen(true);
  };

  const handleDeleteProducto = (producto) => {
    setProductoToDelete(producto);
    setDeletingProducto(true);
  };

  const confirmDeleteProducto = () => {
    setProductos(productos.filter((p) => p !== productoToDelete));
    setDeletingProducto(false);
    toast.success('Producto eliminado exitosamente');
  };

  const cancelDeleteProducto = () => {
    setDeletingProducto(false);
  };

  const handleAddAyudante = () => {
    setSelectedAyudante(null);
    setAyudanteModalOpen(true);
  };

  const handleSaveAyudante = (ayudante) => {
    if (selectedAyudante) {
      setAyudantes(ayudantes.map((a) => (a === selectedAyudante ? ayudante : a)));
      toast.success('Ayudante modificado exitosamente');
    } else {
      setAyudantes([...ayudantes, ayudante]);
      toast.success('Ayudante añadido exitosamente');
    }
    setAyudanteModalOpen(false);
  };

  const handleEditAyudante = (ayudante) => {
    setSelectedAyudante(ayudante);
    setAyudanteModalOpen(true);
  };

  const handleDeleteAyudante = (ayudante) => {
    setAyudanteToDelete(ayudante);
    setDeletingAyudante(true);
  };

  const confirmDeleteAyudante = () => {
    setAyudantes(ayudantes.filter((a) => a !== ayudanteToDelete));
    setDeletingAyudante(false);
    toast.success('Ayudante eliminado exitosamente');
  };

  const cancelDeleteAyudante = () => {
    setDeletingAyudante(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar el formulario
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="flex-start">
        <FormControl isInvalid={errors.nombre}>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del emprendedor"
            borderColor={errors.nombre ? 'red.500' : 'gray.200'}
          />
          {errors.nombre && (
            <Box color="red.500" fontSize="sm">
              {errors.nombre}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email del emprendedor"
            borderColor={errors.email ? 'red.500' : 'gray.200'}
          />
          {errors.email && (
            <Box color="red.500" fontSize="sm">
              {errors.email}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={errors.celular}>
          <FormLabel>Celular</FormLabel>
          <Input
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            placeholder="Celular del emprendedor"
            borderColor={errors.celular ? 'red.500' : 'gray.200'}
          />
          {errors.celular && (
            <Box color="red.500" fontSize="sm">
              {errors.celular}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={errors.nombre_puesto}>
          <FormLabel>Nombre del Puesto</FormLabel>
          <Input
            name="nombre_puesto"
            value={formData.nombre_puesto}
            onChange={handleChange}
            placeholder="Nombre del puesto"
            borderColor={errors.nombre_puesto ? 'red.500' : 'gray.200'}
          />
          {errors.nombre_puesto && (
            <Box color="red.500" fontSize="sm">
              {errors.nombre_puesto}
            </Box>
          )}
        </FormControl>

        <HStack justify="space-between" width="100%">
          <FormLabel>Productos</FormLabel>
          <Button onClick={handleAddProducto} colorScheme="blue">
            Añadir Producto
          </Button>
        </HStack>
        {productos.length > 0 && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Tipo</Th>
                <Th>Stock</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productos.map((producto, index) => (
                <Tr key={index}>
                  <Td>{producto.nombre}</Td>
                  <Td>{producto.tipo}</Td>
                  <Td>{producto.stock}</Td>
                  <Td>
                    <Button onClick={() => handleEditProducto(producto)} colorScheme="blue" mr={2}>
                      Modificar
                    </Button>
                    <Button onClick={() => handleDeleteProducto(producto)} colorScheme="blue">
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <HStack justify="space-between" width="100%">
          <FormLabel>Ayudantes</FormLabel>
          <Button onClick={handleAddAyudante} colorScheme="blue">
            Añadir Ayudante
          </Button>
        </HStack>
        {ayudantes.length > 0 && (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>RUT</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ayudantes.map((ayudante, index) => (
                <Tr key={index}>
                  <Td>{ayudante.nombre}</Td>
                  <Td>{ayudante.rut}</Td>
                  <Td>
                    <Button onClick={() => handleEditAyudante(ayudante)} colorScheme="blue" mr={2}>
                      Modificar
                    </Button>
                    <Button onClick={() => handleDeleteAyudante(ayudante)} colorScheme="blue">
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <Button onClick={handleSubmit} colorScheme="green">
          Enviar
        </Button>
      </VStack>

      <ProductoModal
        isOpen={isProductoModalOpen}
        onClose={() => setProductoModalOpen(false)}
        onSave={handleSaveProducto}
        producto={selectedProducto}
      />

      <Modal isOpen={isDeletingProducto} onClose={cancelDeleteProducto}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>¿Estás seguro de que deseas eliminar este producto?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={confirmDeleteProducto}>
              Eliminar
            </Button>
            <Button ml={3} onClick={cancelDeleteProducto}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AyudanteModal
        isOpen={isAyudanteModalOpen}
        onClose={() => setAyudanteModalOpen(false)}
        onSave={handleSaveAyudante}
        ayudante={selectedAyudante}
      />

      <Modal isOpen={isDeletingAyudante} onClose={cancelDeleteAyudante}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>¿Estás seguro de que deseas eliminar este ayudante?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={confirmDeleteAyudante}>
              Eliminar
            </Button>
            <Button ml={3} onClick={cancelDeleteAyudante}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FormularioPage;
