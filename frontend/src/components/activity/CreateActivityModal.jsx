import React, { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker';

import '../../TimePickerStyles.css';
import { createActividad } from '../../services/activity.service';

const CreateActivityModal = ({ isOpen, onClose, onCreate }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Reunión');
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('10:00');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('11:00');
  const [lugar, setLugar] = useState('');
  const [capacidadAsistentes, setCapacidadAsistentes] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Resetear los campos del formulario cuando el modal se abre
      setNombre('');
      setDescripcion('');
      setCategoria('Reunión');
      setFechaInicio('');
      setHoraInicio('10:00');
      setFechaFin('');
      setHoraFin('11:00');
      setLugar('');
      setCapacidadAsistentes('');
    }
  }, [isOpen]);

  const isValidTimeRange = (startTime, endTime) => {
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);

    if (startHour < 8 || startHour > 20 || endHour < 8 || endHour > 20) {
      return false;
    }

    if (fechaInicio === fechaFin && startHour >= endHour && startTime >= endTime) {
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!isValidTimeRange(horaInicio, horaFin)) {
      alert('La actividad debe comenzar y terminar entre las 8 AM y las 8 PM y la hora de fin debe ser posterior a la hora de inicio si es el mismo día.');
      return;
    }

    const newActivity = {
      nombre,
      descripcion,
      categoria,
      fechaInicio,
      horaInicio,
      fechaFin,
      horaFin,
      lugar,
      capacidadAsistentes,
    };

    try {
      console.log('Creating activity:', newActivity);
      await createActividad(newActivity);
      onCreate();
      onClose();
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Actividad</ModalHeader>
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
            <TimePicker
              onChange={setHoraInicio}
              value={horaInicio}
              disableClock={true}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Fecha Fin</FormLabel>
            <Input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Hora Fin</FormLabel>
            <TimePicker
              onChange={setHoraFin}
              value={horaFin}
              disableClock={true}
            />
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

export default CreateActivityModal;
