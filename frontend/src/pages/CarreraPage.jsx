import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getCarreras } from "../services/carrera.service";
import CarreraTable from "../components/CarreraTable";

function Carrera() {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const data = await getCarreras();
        console.log("data", data);
        setCarreras(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCarreras();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Carreras</Text>
      <CarreraTable careers={carreras} />
    </Box>
  );
}
export default Carrera;
