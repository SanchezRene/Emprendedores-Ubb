import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, HStack, Table, Tbody, Tr, Td, Thead, Th, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { getCarreras } from '../services/carrera.service';
import { createEmprendedor } from '../services/emprendedor.service';
import ProductoModal from '../components/formulario/ProductoModal';
import AyudanteModal from '../components/formulario/AyudanteModal';

function FormularioPage() {
  const [carreras, setCarreras] = useState([]);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rut: '',
    celular: '',
    carreraId: '',
    nombre_puesto: ''
  });
  const [productos, setProductos] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  const [isProductoModalOpen, setProductoModalOpen] = useState(false);
  const [isAyudanteModalOpen, setAyudanteModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchCarreras = async () => {
      const carrerasData = await getCarreras();
      setCarreras(carrerasData);
    };

    fetchCarreras();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre_completo) newErrors.nombre_completo = 'El nombre es obligatorio';
    if (!formData.rut) newErrors.rut = 'El rut es obligatorio';
    if (!formData.celular) newErrors.celular = 'El celular es obligatorio';
    if (!formData.carreraId) newErrors.carreraId = 'La carrera es obligatoria';
    if (!formData.nombre_puesto) newErrors.nombre_puesto = 'El nombre del puesto es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProducto = () => {
    setSelectedProducto(null);
    setProductoModalOpen(true);
  };

  const handleSaveProducto = (producto) => {
    if (selectedProducto) {
      const updatedProductos = productos.map((p) => (p === selectedProducto ? producto : p));
      setProductos(updatedProductos);
      toast({
        title: "Producto actualizado",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      setProductos([...productos, producto]);
    }
    setProductoModalOpen(false);
  };

  const handleEditProducto = (producto) => {
    setSelectedProducto(producto);
    setProductoModalOpen(true);
  };

  const handleDeleteProducto = (producto) => {
    setSelectedProducto(producto);
    setIsDeleting(true);
  };

  const confirmDeleteProducto = () => {
    const updatedProductos = productos.filter((p) => p !== selectedProducto);
    setProductos(updatedProductos);
    setIsDeleting(false);
    setSelectedProducto(null);
    toast({
      title: "Producto eliminado",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const cancelDeleteProducto = () => {
    setIsDeleting(false);
    setSelectedProducto(null);
  };

  const handleAddAyudante = () => {
    setAyudanteModalOpen(true);
  };

  const handleSaveAyudante = (ayudante) => {
    setAyudantes([...ayudantes, ayudante]);
    setAyudanteModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Por favor, complete todos los campos obligatorios.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await createEmprendedor(formData);
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Emprendedor creado exitosamente.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: response.data.message || "Ocurrió un error al crear el emprendedor.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Ocurrió un error al crear el emprendedor.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Error al crear emprendedor:", error.response?.data);
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={5} align="stretch">
        <FormControl isInvalid={errors.nombre_completo}>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            placeholder="Nombre del emprendedor"
            borderColor={errors.nombre_completo ? 'red.500' : 'gray.200'}
          />
          {errors.nombre_completo && (
            <Box color="red.500" fontSize="sm">
              {errors.nombre_completo}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={errors.rut}>
          <FormLabel>Rut</FormLabel>
          <Input
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            placeholder="Rut del emprendedor"
            borderColor={errors.rut ? 'red.500' : 'gray.200'}
          />
          {errors.rut && (
            <Box color="red.500" fontSize="sm">
              {errors.rut}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={errors.carreraId}>
          <FormLabel>Carrera</FormLabel>
          <Select
            name="carreraId"
            value={formData.carreraId}
            onChange={handleChange}
            placeholder="Seleccionar"
            borderColor={errors.carreraId ? 'red.500' : 'gray.200'}
          >
            {carreras.map((carrera) => (
              <option key={carrera._id} value={carrera._id}>
                {carrera.titulo}
              </option>
            ))}
          </Select>
          {errors.carreraId && (
            <Box color="red.500" fontSize="sm">
              {errors.carreraId}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={errors.celular}>
          <FormLabel>Celular</FormLabel>
          <Input
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            placeholder="Número de contacto"
            borderColor={errors.celular ? 'red.500' : 'gray.200'}
          />
          {errors.celular && (
            <Box color="red.500" fontSize="sm">
              {errors.celular}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={errors.nombre_puesto}>
          <FormLabel>Nombre del puesto</FormLabel>
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

        <Button onClick={handleAddProducto}>Añadir artículo</Button>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Categoría</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((producto, index) => (
              <Tr key={index}>
                <Td>{producto.nombre}</Td>
                <Td>{producto.tipo}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => handleEditProducto(producto)}>Modificar</Button>
                    <Button size="sm" onClick={() => handleDeleteProducto(producto)}>Eliminar</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button onClick={handleAddAyudante}>Añadir ayudante</Button>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Carrera</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ayudantes.map((ayudante, index) => (
              <Tr key={index}>
                <Td>{ayudante.nombre}</Td>
                <Td>{ayudante.carrera}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Enviar
        </Button>
      </VStack>

      <ProductoModal
        isOpen={isProductoModalOpen}
        onClose={() => setProductoModalOpen(false)}
        onSave={handleSaveProducto}
        producto={selectedProducto}
      />

      <AyudanteModal
        isOpen={isAyudanteModalOpen}
        onClose={() => setAyudanteModalOpen(false)}
        onSave={handleSaveAyudante}
      />

      {isDeleting && (
        <Modal isOpen={isDeleting} onClose={cancelDeleteProducto}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Eliminar Producto</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              ¿Está seguro de que desea eliminar este producto?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={confirmDeleteProducto}>Eliminar</Button>
              <Button variant="ghost" onClick={cancelDeleteProducto}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default FormularioPage;
