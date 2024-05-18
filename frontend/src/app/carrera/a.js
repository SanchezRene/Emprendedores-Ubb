"use client";
import React, { useEffect, useState } from "react";
import axios from "../../services/axios.service";
import CustomTable from "../../components/Table";
import { useAuth } from "../../context/AuthContext";
import { getCarreras } from "@/services/carrera.service";

const CarreraPage = () => {
  const columns = ["Título", "Facultad", "Sede"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { login, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/carrera/");
        console.log("response: ", response);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    getCarreras().then((response) => {
      console.log("response", response);
    });
  }, []);

  const data2 = [
    ["John Doe", 28, "New York"],
    ["Jane Smith", 34, "San Francisco"],
    ["Sam Johnson", 23, "Los Angeles"],
  ];



  return (
    <div>
      <h1>Carreras</h1>
      <br></br>
      <CustomTable
        columns={columns}
        data={data2}
        caption="Carreras en la base de datos"
      />
    </div>
  );
};

export default CarreraPage;
