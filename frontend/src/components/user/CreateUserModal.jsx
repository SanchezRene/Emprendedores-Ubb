// src/components/user/CreateUserModal.jsx

import React, { useState, useEffect } from "react";
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
  InputGroup,
  InputRightElement,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { createUser } from "../../services/user.service";
import { getRoles } from "../../services/role.service";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import toast from "react-hot-toast";

function CreateUserModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: [],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const rolesData = await getRoles();
      setRoles(rolesData);
    };

    fetchRoles();
  }, []);

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
      roles: [value],
    });
  };

  const handleSubmit = async () => {
    try {
      const newUser = await createUser(formData);
      if (newUser && (newUser.status === 200 || newUser.status === 201)) {
        onCreate(newUser);
        onClose();
        toast.success("Usuario creado correctamente");
      } else {
        toast.error(newUser.data.message || "Error al crear usuario");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear usuario");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Nombre de usuario</FormLabel>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Contraseña</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
              />
              <InputRightElement width="3rem">
                <Tooltip label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                  <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </Tooltip>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel>Rol</FormLabel>
            <Menu>
              <MenuButton as={Button}>
                {formData.roles[0] || "Selecciona un rol"}
              </MenuButton>
              <MenuList>
                <MenuOptionGroup
                  defaultValue={formData.roles[0]}
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
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            ml={3}
            disabled={
              !formData.username ||
              !formData.email ||
              !formData.password ||
              !formData.roles.length
            }
          >
            Crear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateUserModal;
