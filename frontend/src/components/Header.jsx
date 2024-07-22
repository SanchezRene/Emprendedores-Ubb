import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth.service';

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <Box bg="blue.500" color="white" p={4}>
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold">Emprendedores UBB</Text>
        {user && (
          <Flex align="center">
            <Text mr={4}>Estás logeado como: {user.email}</Text>
            <Button colorScheme="teal" onClick={handleLogout}>Cerrar sesión</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export default Header;