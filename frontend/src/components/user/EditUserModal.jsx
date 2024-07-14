// src/components/user/EditUserModal.jsx

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { updateUser } from '../../services/user.service';
import { getRoles } from '../../services/role.service';
import toast from 'react-hot-toast';

function EditUserModal({ isOpen, onClose, user, onEdit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // Solo un rol
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getRoles();
      setRoles(rolesData);
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
        role: user.roles.length > 0 ? user.roles[0].name : '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedUser = await updateUser(user._id, {
        ...formData,
        roles: [formData.role], // Convertimos el rol a un array
      });
      onEdit(updatedUser);
      onClose();
      toast.success('Usuario actualizado correctamente');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al actualizar usuario');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nombre de usuario</FormLabel>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Rol</FormLabel>
            <Menu>
              <MenuButton as={Button}>
                {formData.role || "Selecciona un rol"}
              </MenuButton>
              <MenuList>
                <MenuOptionGroup
                  defaultValue={formData.role}
                  title="Roles"
                  type="radio"
                  onChange={handleRoleChange}
                >
                  {roles.map((role) => (
                    <MenuItemOption key={role._id} value={role.name}>
                      {role.name}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} ml={3}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditUserModal;
