import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (user) {
    return (
      <Container centerContent>
        <Text fontSize="2xl" fontWeight="semibold" mb={4}>Ya estás logueado!</Text>
        <Button colorScheme="teal" onClick={() => navigate('/')}>Ir a home</Button>
      </Container>
    );
  }

  return (
    <Container centerContent>
      <Box p={6} boxShadow="md" borderRadius="md" bg="white" maxW="md">
        <Text fontSize="2xl" fontWeight="semibold" mb={4}>Inicia sesión</Text>
        <LoginForm />
      </Box>
    </Container>
  );
}

export default LoginPage;
