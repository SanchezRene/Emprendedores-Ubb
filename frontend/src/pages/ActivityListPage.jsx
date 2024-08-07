import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { getAllActividades, deleteActividad } from '../services/activity.service';
import CreateActivityModal from '../components/activity/CreateActivityModal';
import EditActivityModal from '../components/activity/EditActivityModal';
import DeleteActivityModal from '../components/activity/DeleteActivityModal';
import { parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

function ActivityListPage() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Controladores para los modales
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();

  // Efecto para obtener las actividades
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const activitiesData = await getAllActividades();
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities([]); // En caso de error, asegurarse de que activities es un array vacío
    }
  };

  // Eliminar actividad
  const handleDelete = async (id) => {
    try {
      await deleteActividad(id);
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Error al eliminar la actividad. Inténtalo nuevamente.');
    }
  };

  // Crear actividad
  const handleCreateActivity = async () => {
    await fetchActivities();
  };

  // Editar actividad
  const handleEditActivity = async () => {
    await fetchActivities();
  };

  // Funciones para manejar los botones
  const handleEditButtonClick = (activity) => {
    setSelectedActivity(activity);
    onEditOpen();
  };

  const handleDeleteButtonClick = (activity) => {
    setSelectedActivity(activity);
    onDeleteOpen();
  };

  const handleDetailButtonClick = (activity) => {
    setSelectedActivity(activity);
    onDetailOpen();
  };

  // Función para formatear texto
  const formatText = (text) => {
    return text.replace(/\b\w/g, (char, index) => index === 0 ? char.toUpperCase() : char.toLowerCase());
  };

  // Ajuste manual para sumar 4 horas a la fecha
  const adjustTimeZoneOffset = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 4); // Sumar 4 horas
    return date;
  };

  // Formatear la fecha después de ajustar
  const formatDate = (dateString) => {
    const adjustedDate = adjustTimeZoneOffset(dateString);
    return format(adjustedDate, 'd MMMM yyyy', { locale: es });
  };

  // Formatear la hora después de ajustar
  const formatTime = (timeString) => {
    const adjustedTime = adjustTimeZoneOffset(timeString);
    return format(adjustedTime, 'HH:mm', { locale: es });
  };

  return (
    <Box p={5}>
      <Button colorScheme="blue" onClick={onCreateOpen}>
        Crear Actividad
      </Button>

      <Box overflowX="auto" whiteSpace="nowrap" mt={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Fecha Inicio</Th>
              <Th>Fecha Fin</Th>
              <Th>Lugar</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <Tr key={activity._id}>
                  <Td>{formatText(activity.nombre)}</Td>
                  <Td>{formatDate(activity.fechaInicio)}</Td>
                  <Td>{formatDate(activity.fechaFin)}</Td>
                  <Td>{activity.lugar}</Td>
                  <Td textAlign="center">
                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleDetailButtonClick(activity)}
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleEditButtonClick(activity)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDeleteButtonClick(activity)}
                      >
                        Eliminar
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5}>No hay actividades disponibles</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <CreateActivityModal
        isOpen={isCreateModalOpen}
        onClose={onCreateClose}
        onCreate={handleCreateActivity}
      />
      {selectedActivity && (
        <>
          <EditActivityModal
            isOpen={isEditModalOpen}
            onClose={onEditClose}
            activity={selectedActivity}
            onEdit={handleEditActivity}
          />
          <DeleteActivityModal
            isOpen={isDeleteModalOpen}
            onClose={onDeleteClose}
            activity={selectedActivity}
            onDelete={handleDelete}
          />
          <Modal isOpen={isDetailModalOpen} onClose={onDetailClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Detalles de la Actividad</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p><strong>Nombre:</strong> {formatText(selectedActivity.nombre)}</p>
                <p><strong>Descripción:</strong> {formatText(selectedActivity.descripcion)}</p>
                <p><strong>Categoría:</strong> {formatText(selectedActivity.categoria)}</p>
                <p><strong>Fecha Inicio:</strong> {formatDate(selectedActivity.fechaInicio)}</p>
                <p><strong>Hora Inicio:</strong> {formatTime(selectedActivity.horaInicio)}</p>
                <p><strong>Fecha Fin:</strong> {formatDate(selectedActivity.fechaFin)}</p>
                <p><strong>Hora Fin:</strong> {formatTime(selectedActivity.horaFin)}</p>
                <p><strong>Lugar:</strong> {selectedActivity.lugar}</p>
                <p><strong>Capacidad de Asistentes:</strong> {selectedActivity.capacidadAsistentes}</p>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onDetailClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default ActivityListPage;
