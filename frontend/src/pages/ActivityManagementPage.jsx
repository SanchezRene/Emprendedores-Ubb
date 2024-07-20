// src/pages/ActivityManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { Button, Box } from '@chakra-ui/react';
import ActivityTable from '../components/ActivityTable';
import ActivityModal from '../components/ActivityModal';
import activityService from '../services/activity.service';

const ActivityManagementPage = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const [data, error] = await activityService.getAllActividades();
      if (error) {
        console.error('Error al cargar actividades:', error);
      } else {
        setActivities(data);
      }
    } catch (error) {
      console.error('Error al cargar actividades:', error);
    }
  };

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await activityService.deleteActividad(id);
      loadActivities();
    } catch (error) {
      console.error('Error al eliminar actividad:', error);
    }
  };

  const handleSave = () => {
    loadActivities();
    setIsModalOpen(false);
  };

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>Crear Actividad</Button>
      <ActivityTable activities={activities} onEdit={handleEdit} onDelete={handleDelete} />
      <ActivityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} activity={selectedActivity} onSave={handleSave} />
    </Box>
  );
};

export default ActivityManagementPage;
