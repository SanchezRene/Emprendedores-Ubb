import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, HStack, Table, Tbody, Tr, Td, Thead, Th } from '@chakra-ui/react';
import { getCarreras } from '../services/carrera.service';
import { createEmprendedor } from '../services/emprendedor.service';
import ProductoModal from '../components/ProductoModal';
import AyudanteModal from '../components/AyudanteModal';

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

  const handleAddProducto = () => {
    setProductoModalOpen(true);
  };

  const handleSaveProducto = (producto) => {
    setProductos([...productos, producto]);
    setProductoModalOpen(false);
  };

  const handleAddAyudante = () => {
    setAyudanteModalOpen(true);
  };

  const handleSaveAyudante = (ayudante) => {
    setAyudantes([...ayudantes, ayudante]);
    setAyudanteModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // Asumiendo que tienes un userId disponible en tu estado de autenticación
      const userId = "6668a43c405e5441790552c7"; // Debe ser dinámico según el usuario autenticado
      const emprendedorData = {
        userId,
        ...formData
      };
      const response = await createEmprendedor(emprendedorData);
      console.log("Emprendedor creado:", response);
    } catch (error) {
      console.error("Error al crear emprendedor:", error);
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={5} align="stretch">
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            placeholder="Nombre del emprendedor"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Rut</FormLabel>
          <Input
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            placeholder="Rut del emprendedor"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Carrera</FormLabel>
          <Select
            name="carreraId"
            value={formData.carreraId}
            onChange={handleChange}
            placeholder="Seleccionar"
          >
            {carreras.map((carrera) => (
              <option key={carrera._id} value={carrera._id}>
                {carrera.titulo}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Celular</FormLabel>
          <Input
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            placeholder="Número de contacto"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Nombre del puesto</FormLabel>
          <Input
            name="nombre_puesto"
            value={formData.nombre_puesto}
            onChange={handleChange}
            placeholder="Nombre del puesto"
          />
        </FormControl>

        <Button onClick={handleAddProducto}>Añadir artículo</Button>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Título</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productos.map((producto, index) => (
              <Tr key={index}>
                <Td>{producto.nombre}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm">Ver</Button>
                    <Button size="sm">Modificar</Button>
                    <Button size="sm">Eliminar</Button>
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
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ayudantes.map((ayudante, index) => (
              <Tr key={index}>
                <Td>{ayudante.nombre_completo}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm">Ver</Button>
                    <Button size="sm">Modificar</Button>
                    <Button size="sm">Eliminar</Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Enviar Formulario
        </Button>
      </VStack>

      <ProductoModal
        isOpen={isProductoModalOpen}
        onClose={() => setProductoModalOpen(false)}
        onSave={handleSaveProducto}
      />

      <AyudanteModal
        isOpen={isAyudanteModalOpen}
        onClose={() => setAyudanteModalOpen(false)}
        onSave={handleSaveAyudante}
      />
    </Box>
  );
}

export default FormularioPage;
