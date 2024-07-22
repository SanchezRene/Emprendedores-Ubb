import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Radio,
  useDisclosure,
} from '@chakra-ui/react';
import { getAllActividades } from '../services/activity.service';
import { getEmprendedores } from '../services/emprendedor.service';
import { inscribirEmprendedorEnActividad } from '../services/activity.service';
import toast from 'react-hot-toast';
import VerActividadModal from '../components/activity/VerActividadModal';
import VerEmprendedoresModal from '../components/emprendedores/VerEmprendedoresModal';

const InscripcionManual = () => {
  const [actividades, setActividades] = useState([]);
  const [emprendedores, setEmprendedores] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [selectedEmprendedor, setSelectedEmprendedor] = useState(null);
  const [actividadToView, setActividadToView] = useState(null);
  const [emprendedorToView, setEmprendedorToView] = useState(null);

  const {
    isOpen: isActividadModalOpen,
    onOpen: onActividadModalOpen,
    onClose: onActividadModalClose,
  } = useDisclosure();

  const {
    isOpen: isEmprendedorModalOpen,
    onOpen: onEmprendedorModalOpen,
    onClose: onEmprendedorModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchActividades = async () => {
      const data = await getAllActividades();
      setActividades(data);
    };

    const fetchEmprendedores = async () => {
      const data = await getEmprendedores();
      setEmprendedores(data);
    };

    fetchActividades();
    fetchEmprendedores();
  }, []);

  const handleInscribir = async () => {
    if (selectedActividad && selectedEmprendedor) {
      try {
        await inscribirEmprendedorEnActividad(
          selectedEmprendedor._id,
          selectedActividad._id
        );
        toast.success('El emprendedor ha sido inscrito en la actividad.');
      } catch (error) {
        toast.error('No se pudo inscribir al emprendedor en la actividad.');
      }
    } else {
      toast.warning('Por favor seleccione una actividad y un emprendedor.');
    }
  };

  const handleViewActividad = (actividad) => {
    setActividadToView(actividad);
    onActividadModalOpen();
  };

  const handleViewEmprendedor = (emprendedor) => {
    setEmprendedorToView(emprendedor);
    onEmprendedorModalOpen();
  };

  return (
    <Box p={5}>
      <h1>Inscripción Manual de Actividades</h1>
      <Box border="1px" borderRadius="md" p={4} my={4}>
        <h2>Seleccionar Actividad</h2>
        <Table variant="striped" mt={3}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Nombre</Th>
              <Th>Lugar</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {actividades.map((actividad) => (
              <Tr key={actividad._id}>
                <Td>
                  <Radio
                    value={actividad._id}
                    onChange={() => setSelectedActividad(actividad)}
                    isChecked={selectedActividad?._id === actividad._id}
                  />
                </Td>
                <Td>{actividad.nombre}</Td>
                <Td>{actividad.lugar}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleViewActividad(actividad)}
                  >
                    Ver
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box border="1px" borderRadius="md" p={4} my={4}>
        <h2>Seleccionar Emprendedor</h2>
        <Table variant="striped" mt={3}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Nombre Completo</Th>
              <Th>Nombre del Puesto</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {emprendedores.map((emprendedor) => (
              <Tr key={emprendedor._id}>
                <Td>
                  <Radio
                    value={emprendedor._id}
                    onChange={() => setSelectedEmprendedor(emprendedor)}
                    isChecked={selectedEmprendedor?._id === emprendedor._id}
                  />
                </Td>
                <Td>{emprendedor.nombre_completo}</Td>
                <Td>{emprendedor.nombre_puesto}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleViewEmprendedor(emprendedor)}
                  >
                    Ver
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Button
        colorScheme="green"
        mt={4}
        onClick={handleInscribir}
        isDisabled={!selectedActividad || !selectedEmprendedor}
      >
        Inscribir
      </Button>

      {actividadToView && (
        <VerActividadModal
          isOpen={isActividadModalOpen}
          onClose={onActividadModalClose}
          actividad={actividadToView}
        />
      )}

      {emprendedorToView && (
        <VerEmprendedoresModal
          isOpen={isEmprendedorModalOpen}
          onClose={onEmprendedorModalClose}
          emprendedor={emprendedorToView}
        />
      )}
    </Box>
  );
};

export default InscripcionManual;
