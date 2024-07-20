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
} from "@chakra-ui/react";
import { getAllActividades, deleteActividad } from "../services/activity.service";
import CreateActivityModal from "../components/activity/CreateActivityModal";
import EditActivityModal from "../components/activity/EditActivityModal";
import DeleteActivityModal from "../components/activity/DeleteActivityModal";

function ActivityListPage() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
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

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const activitiesData = await getAllActividades();
      setActivities(activitiesData);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]); // En caso de error, asegurarse de que activities es un array vacío
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteActividad(id);
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert('Error al eliminar la actividad. Inténtalo nuevamente.');
    }
  };

  const handleCreateActivity = async () => {
    await fetchActivities();
  };

  const handleEditActivity = async () => {
    await fetchActivities();
  };

  const handleEditButtonClick = (activity) => {
    setSelectedActivity(activity);
    onEditOpen();
  };

  const handleDeleteButtonClick = (activity) => {
    setSelectedActivity(activity);
    onDeleteOpen();
  };

  return (
    <Box p={5}>
      <Button colorScheme="blue" onClick={onCreateOpen}>
        Crear Actividad
      </Button>

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>Categoría</Th>
            <Th>Fecha Inicio</Th>
            <Th>Hora Inicio</Th>
            <Th>Fecha Fin</Th>
            <Th>Hora Fin</Th>
            <Th>Lugar</Th>
            <Th>Capacidad de Asistentes</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <Tr key={activity._id}>
                <Td>{activity.nombre}</Td>
                <Td>{activity.descripcion}</Td>
                <Td>{activity.categoria}</Td>
                <Td>{new Date(activity.fechaInicio).toLocaleDateString()}</Td>
                <Td>{activity.horaInicio}</Td>
                <Td>{new Date(activity.fechaFin).toLocaleDateString()}</Td>
                <Td>{activity.horaFin}</Td>
                <Td>{activity.lugar}</Td>
                <Td>{activity.capacidadAsistentes}</Td>
                <Td>
                  <HStack spacing={2}>
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
              <Td colSpan={10}>No hay actividades disponibles</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

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
        </>
      )}
    </Box>
  );
}

export default ActivityListPage;
