import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Text, Button } from '@chakra-ui/react';

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem('user')) {
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

export default Login;