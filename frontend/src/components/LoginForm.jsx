import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <Box maxW="sm" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            {...register('email', { required: 'Este campo es requerido' })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} mb={4}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Input
            id="password"
            type="password"
            {...register('password', { required: 'Este campo es requerido' })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full" mt={4}>
          Iniciar sesión
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;
