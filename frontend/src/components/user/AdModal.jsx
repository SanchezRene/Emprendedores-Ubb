// src/components/user/AdModal.jsx

import React, { useEffect } from "react";
import {
  Box,
  Image,
  Text,
  CloseButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

function AdModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onOpen]);

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="1rem"
      right="1rem"
      bottom="1"
      width="320px" // 10% más angosto que los 350px originales
      height="100px" // 10% más largo para dar más espacio al contenido
      background="white"
      boxShadow="lg"
      borderRadius="md"
      overflow="hidden"
      p={4}
    >
      <HStack align="flex-start">
        <Image
          src="/Ad 2.jpg"
          alt="Publicidad"
          boxSize="80px" 
          objectFit="cover"
          borderRadius="md"
        />
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="lg" fontWeight="bold">
            AD - TRÁGICO ACCIDENTE
          </Text>
          <Text fontSize="sm">Benito Umaña lo pierde todo...</Text>
        </VStack>
        <CloseButton onClick={onClose} position="absolute" top="1rem" right="1rem" />
      </HStack>
    </Box>
  );
}

export default AdModal;
