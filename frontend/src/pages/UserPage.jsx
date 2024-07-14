// src/pages/UserPage.jsx

import React, { useState, useEffect } from "react";
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
import { getUsers, deleteUser } from "../services/user.service";
import CreateUserModal from "../components/user/CreateUserModal";
import EditUserModal from "../components/user/EditUserModal";
import DeleteUserModal from "../components/user/DeleteUserModal";
import AdModal from "../components/user/AdModal";

function UserPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

  const fetchUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleCreateUser = async () => {
    await fetchUsers();
  };

  const handleEditUser = async () => {
    await fetchUsers();
  };

  const handleEditButtonClick = (user) => {
    setSelectedUser(user);
    onEditOpen();
  };

  const handleDeleteButtonClick = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  return (
    <Box p={5}>
      <Button colorScheme="blue" onClick={onCreateOpen}>
        Crear Usuario
      </Button>

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th textAlign="center">Roles</Th>
            <Th textAlign="center">Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.roles ? user.roles.map((role) => role.name).join(", ") : "Sin rol"}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleEditButtonClick(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteButtonClick(user)}
                  >
                    Eliminar
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={onCreateClose}
        onCreate={handleCreateUser}
      />
      {selectedUser && (
        <>
          <EditUserModal
            isOpen={isEditModalOpen}
            onClose={onEditClose}
            user={selectedUser}
            onEdit={handleEditUser}
          />
          <DeleteUserModal
            isOpen={isDeleteModalOpen}
            onClose={onDeleteClose}
            user={selectedUser}
            onDelete={handleDelete}
          />
        </>
      )}
      <AdModal /> {/* componente de publicidad */}
    </Box>
  );
}

export default UserPage;
