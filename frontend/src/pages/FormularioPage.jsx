import React, { useState, useEffect } from "react";
import { Box, Button, VStack, useToast, Divider } from "@chakra-ui/react";
import { getCarreras } from "../services/carrera.service";
import { createEmprendedor } from "../services/emprendedor.service";
import { createProducto } from "../services/productos.service";
import { createAyudante } from "../services/ayudantes.service";
import { createInscripcion } from "../services/inscripcion.service";
import ProductoModal from "../components/formulario/ProductoModal";
import AyudanteModal from "../components/formulario/AyudanteModal";
import Formulario from "../components/formulario/Formulario";
import ProductosTable from "../components/formulario/ProductosTable";
import AyudantesTable from "../components/formulario/AyudantesTable";
import DeleteProductoModal from "../components/formulario/DeleteProductoModal";
import { useAuth } from "../context/AuthContext";

function FormularioPage() {
  const { user } = useAuth();
  const [carreras, setCarreras] = useState([]);
  const [formData, setFormData] = useState({
    nombre_completo: "",
    rut: "",
    celular: "",
    carreraId: "",
    nombre_puesto: "",
  });
  const [productos, setProductos] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  const [isProductoModalOpen, setProductoModalOpen] = useState(false);
  const [isAyudanteModalOpen, setAyudanteModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedAyudante, setSelectedAyudante] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchCarreras = async () => {
      const carrerasData = await getCarreras();
      setCarreras(carrerasData);
    };

    fetchCarreras();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre_completo)
      newErrors.nombre_completo = "El nombre es obligatorio";
    if (!formData.rut) newErrors.rut = "El rut es obligatorio";
    if (!formData.celular) newErrors.celular = "El celular es obligatorio";
    if (!formData.carreraId) newErrors.carreraId = "La carrera es obligatoria";
    if (!formData.nombre_puesto)
      newErrors.nombre_puesto = "El nombre del puesto es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProducto = () => {
    setSelectedProducto(null);
    setProductoModalOpen(true);
  };

  const handleSaveProducto = async (producto) => {
    try {
      if (selectedProducto) {
        // Editar producto existente
        const updatedProductos = productos.map((p) =>
          p === selectedProducto ? producto : p
        );
        setProductos(updatedProductos);
      } else {
        // Añadir nuevo producto
        setProductos([...productos, producto]);
      }
      toast({
        title: "Producto guardado",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setProductoModalOpen(false);
      setSelectedProducto(null);
    } catch (error) {
      toast({
        title: "Error al guardar el producto",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleEditProducto = (producto) => {
    setSelectedProducto(producto);
    setProductoModalOpen(true);
  };

  const handleDeleteProducto = (producto) => {
    setSelectedProducto(producto);
    setIsDeleting(true);
  };

  const confirmDeleteProducto = () => {
    const updatedProductos = productos.filter((p) => p !== selectedProducto);
    setProductos(updatedProductos);
    setIsDeleting(false);
    setSelectedProducto(null);
    toast({
      title: "Producto eliminado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const cancelDeleteProducto = () => {
    setIsDeleting(false);
    setSelectedProducto(null);
  };

  const handleAddAyudante = () => {
    setAyudanteModalOpen(true);
  };

  const handleSaveAyudante = (ayudante) => {
    if (selectedAyudante) {
      // Editar ayudante existente
      const updatedAyudantes = ayudantes.map((a) =>
        a === selectedAyudante ? ayudante : a
      );
      setAyudantes(updatedAyudantes);
    } else {
      // Añadir nuevo ayudante
      setAyudantes([...ayudantes, ayudante]);
    }
    setAyudanteModalOpen(false);
    setSelectedAyudante(null);
  };

  const handleEditAyudante = (ayudante) => {
    setSelectedAyudante(ayudante);
    setAyudanteModalOpen(true);
  };

  const handleDeleteAyudante = (ayudante) => {
    const updatedAyudantes = ayudantes.filter((a) => a !== ayudante);
    setAyudantes(updatedAyudantes);
    toast({
      title: "Ayudante eliminado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Por favor, complete todos los campos obligatorios.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // Verificar que haya al menos un producto
    if (productos.length === 0) {
      toast({
        title: "Debes añadir al menos un producto antes de enviar el formulario.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {

      console.log("user", user);


      // Crear emprendedor
      const response = await createEmprendedor(formData);
      const { status, data } = response;

      if (status === 200 || status === 201) {
        // obtener el ID del emprendedor creado
        const emprendedorId = data.data._id;

        // Crear productos
        for (const producto of productos) {
          await createProducto({ ...producto, emprendedorId });
        }

        // Crear ayudantes
        for (const ayudante of ayudantes) {
          await createAyudante({ ...ayudante, emprendedorId });
        }

        // Crear inscripción
        const inscripcionData = {
          email: user.email,
          emprendedorId: emprendedorId,
          estado: "pendiente",
        };
        await createInscripcion(inscripcionData);

        toast({
          title: "Formulario enviado exitosamente.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title:
            response.data.message ||
            "Ocurrió un error al enviar el formulario.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Ocurrió un error al enviar el formulario.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Error al enviar el formulario:", error.response?.data);
    }
  };

  return (
    <Box p={5}>
      <Formulario
        formData={formData}
        handleChange={handleChange}
        carreras={carreras}
        errors={errors}
      />

      <Divider my={10} borderColor="gray.400" />

      <VStack spacing={5} align="stretch">
        <Button onClick={handleAddProducto}>Añadir Producto</Button>
        <ProductosTable
          productos={productos}
          onEdit={handleEditProducto}
          onDelete={handleDeleteProducto}
        />
        <Divider my={10} borderColor="gray.400" />
        
        <Button onClick={handleAddAyudante}>Añadir Ayudante</Button>
        <AyudantesTable
          ayudantes={ayudantes}
          onEdit={handleEditAyudante}
          onDelete={handleDeleteAyudante}
        />

        <Divider my={10} borderColor="gray.400" />

        <Button colorScheme="blue" onClick={handleSubmit}>
          Enviar Formulario
        </Button>
      </VStack>

      <ProductoModal
        isOpen={isProductoModalOpen}
        onClose={() => setProductoModalOpen(false)}
        onSave={handleSaveProducto}
        selectedProducto={selectedProducto}
      />

      <AyudanteModal
        isOpen={isAyudanteModalOpen}
        onClose={() => setAyudanteModalOpen(false)}
        onSave={handleSaveAyudante}
      />

      <DeleteProductoModal
        isOpen={isDeleting}
        onClose={cancelDeleteProducto}
        onConfirm={confirmDeleteProducto}
      />
    </Box>
  );
}

export default FormularioPage;
