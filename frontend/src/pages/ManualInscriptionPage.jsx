// src/pages/ManualInscriptionPage.jsx

import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';
import activityService from '../services/activity.service';
import userService from '../services/user.service';

const ManualInscriptionPage = () => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    loadActivities();
    loadUsers();
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

  const loadUsers = async () => {
    try {
      const [data, error] = await userService.getAllUsers();
      if (error) {
        console.error('Error al cargar usuarios:', error);
      } else {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await activityService.inscribirEmprendedor(selectedActivity, selectedUser);
      // Provide feedback to the user
    } catch (error) {
      console.error('Error al inscribir emprendedor:', error);
    }
  };

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel>Actividad</FormLabel>
        <Select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
          {activities.map((activity) => (
            <option key={activity._id} value={activity._id}>{activity.nombre}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Usuario</FormLabel>
        <Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.email}</option>
          ))}
        </Select>
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={handleSubmit}>Inscribir Emprendedor</Button>
    </Box>
  );
};

export default ManualInscriptionPage;
