import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { updateActividad } from '../../services/activity.service';

const EditActivityModal = ({ isOpen, onClose, activity, onEdit }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [lugar, setLugar] = useState('');
  const [capacidadAsistentes, setCapacidadAsistentes] = useState('');

  useEffect(() => {
    if (activity) {
      setNombre(activity.nombre);
      setDescripcion(activity.descripcion);
      setCategoria(activity.categoria);
      setFechaInicio(activity.fechaInicio.split('T')[0]);
      setHoraInicio(activity.horaInicio.split('T')[1]);
      setFechaFin(activity.fechaFin.split('T')[0]);
      setHoraFin(activity.horaFin.split('T')[1]);
      setLugar(activity.lugar);
      setCapacidadAsistentes(activity.capacidadAsistentes);
    }
  }, [activity]);

  const handleSave = async () => {
    const fechaInicioDate = new Date(`${fechaInicio}T${horaInicio}`);
    const fechaFinDate = new Date(`${fechaFin}T${horaFin}`);

    const updatedActivity = {
      nombre,
      descripcion,
      categoria,
      fechaInicio: fechaInicioDate,
      fechaFin: fechaFinDate,
      lugar,
      capacidadAsistentes,
    };

    try {
      await updateActividad(activity._id, updatedActivity);
      onEdit();
      onClose();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Actividad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Categoría</FormLabel>
            <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="Reunión">Reunión</option>
              <option value="Taller">Taller</option>
              <option value="Evento">Evento</option>
              <option value="Otro">Otro</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Fecha Inicio</FormLabel>
            <Input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Hora Inicio</FormLabel>
            <Input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Fecha Fin</FormLabel>
            <Input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Hora Fin</FormLabel>
            <Input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Lugar</FormLabel>
            <Input value={lugar} onChange={(e) => setLugar(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Capacidad de Asistentes</FormLabel>
            <Input type="number" value={capacidadAsistentes} onChange={(e) => setCapacidadAsistentes(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Guardar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditActivityModal;
