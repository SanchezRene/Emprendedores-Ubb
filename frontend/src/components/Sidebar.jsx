import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Box bg="gray.800" color="white" width="200px" p={4}>
      <VStack align="start">
        <Link to="/"><Text>Home</Text></Link>
        <Link to="/profile"><Text>Profile</Text></Link>
        <Link to="/settings"><Text>Settings</Text></Link>
        <Link to="/carreras"><Text>Carreras</Text></Link>
      </VStack>
    </Box>
  );
}

export default Sidebar;
