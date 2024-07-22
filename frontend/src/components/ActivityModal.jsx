// src/components/ActivityModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import activityService from '../services/activity.service';

const ActivityModal = ({ isOpen, onClose, activity, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    fechaInicio: '',
    fechaFin: '',
    horaInicio: '',
    horaFin: '',
    lugar: '',
    capacidadAsistentes: 0,
  });

  useEffect(() => {
    if (activity) {
      setFormData(activity);
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (activity) {
      await activityService.updateActividadById(activity._id, formData);
    } else {
      await activityService.createActividad(formData);
    }
    onSave();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{activity ? 'Editar Actividad' : 'Crear Actividad'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input name="nombre" value={formData.nombre} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Input name="descripcion" value={formData.descripcion} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Categoría</FormLabel>
            <Select name="categoria" value={formData.categoria} onChange={handleChange}>
              <option value="Reunión">Reunión</option>
              <option value="Taller">Taller</option>
              <option value="Evento">Evento</option>
              <option value="Otro">Otro</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de Inicio</FormLabel>
            <Input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de Fin</FormLabel>
            <Input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Hora de Inicio</FormLabel>
            <Input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Hora de Fin</FormLabel>
            <Input type="time" name="horaFin" value={formData.horaFin} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Lugar</FormLabel>
            <Input name="lugar" value={formData.lugar} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Capacidad de Asistentes</FormLabel>
            <Input type="number" name="capacidadAsistentes" value={formData.capacidadAsistentes} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {activity ? 'Actualizar' : 'Crear'}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActivityModal;
