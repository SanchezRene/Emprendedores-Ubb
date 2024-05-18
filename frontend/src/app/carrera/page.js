"use client";
import React, { useEffect, useState } from 'react';
import { getCarreras } from '../../services/carrera.service';

const CarreraPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCarreras();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar los datos: {error.message}</div>;

    return (
        <div>
            <h1>Datos de Carrera</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default CarreraPage;
