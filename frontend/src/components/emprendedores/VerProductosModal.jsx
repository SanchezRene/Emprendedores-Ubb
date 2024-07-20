import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  List,
  ListItem,
  Image,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import { getProductoById } from '../../services/productos.service';

const placeholderImage = '../../../public/imagen-no-disponible.png';  

const VerProductosModal = ({ isOpen, onClose, emprendedor }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      if (emprendedor?.productosId.length > 0) {
        const productosData = await Promise.all(
          emprendedor.productosId.map((productoId) => getProductoById(productoId))
        );
        setProductos(productosData);
      } else {
        setProductos([]);
      }
    };

    fetchProductos();
  }, [emprendedor]);

  const handleImageError = (event) => {
    event.target.src = placeholderImage;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Productos de {emprendedor?.nombre_completo}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <ListItem key={producto._id}>
                  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
                    <Image 
                      src={producto.fotografia} 
                      alt={producto.nombre} 
                      boxSize="100px" 
                      mb="3" 
                      onError={handleImageError} 
                    />
                    <Text fontWeight="bold" fontSize="lg">{producto.nombre}</Text>
                    <Text>Categoría: {producto.categoria}</Text>
                    <Text>{producto.descripcion}</Text>
                    <Text fontWeight="bold">Stock: {producto.stock}</Text>
                  </Box>
                  <Divider my="3" />
                </ListItem>
              ))
            ) : (
              <ListItem>No hay productos registrados</ListItem>
            )}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerProductosModal;
