import React from 'react';
import { Box, FormControl, FormLabel, Input, Select, VStack } from '@chakra-ui/react';

const Formulario = ({ formData, handleChange, carreras, errors }) => {
  return (
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
    </VStack>
  );
};

export default Formulario;
