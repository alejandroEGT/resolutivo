import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { host } from '../../utils/host';

const GraficoIncidenciasPorEstado = () => {
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [incidenciasNUEVA, setincidenciasNUEVA] = useState(0);
  const [incidenciasABIERTA, setincidenciasABIERTA] = useState(0);
  const [incidenciasEN_INVESTIGACION, setincidenciasEN_INVESTIGACION] = useState(0);
  const [incidenciasEN_PROGRESO, setincidenciasEN_PROGRESO] = useState(0);
  const [incidenciasPENDIENTE, setincidenciasPENDIENTE] = useState(0);
  const [incidenciasRESUELTA, setincidenciasRESUELTA] = useState(0);
  const [incidenciasEN_REVISION, setincidenciasEN_REVISION] = useState(0);
  const [incidenciasESCALADA, setincidenciasESCALADA] = useState(0);
  const [incidenciasCERRADA, setincidenciasCERRADA] = useState(0);
  const [incidenciasREABIERTA, setincidenciasREABIERTA] = useState(0);

  const fetchIncidencias = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${host}/incidencia/incidencias-graficas/2024`);
      setIncidencias(response.data);
      // Filtrar incidencias por diferentes estados
      const nuevasNUEVA = response.data.filter(incidencia => incidencia.estado === "NUEVA");
      const nuevasABIERTA = response.data.filter(incidencia => incidencia.estado === "ABIERTA");
      const nuevasEN_INVESTIGACION = response.data.filter(incidencia => incidencia.estado === "EN_INVESTIGACION");
      const nuevasEN_PROGRESO = response.data.filter(incidencia => incidencia.estado === "EN_PROGRESO");
      const nuevasPENDIENTE = response.data.filter(incidencia => incidencia.estado === "PENDIENTE");
      const nuevasRESUELTA = response.data.filter(incidencia => incidencia.estado === "RESUELTA");
      const nuevasEN_REVISION = response.data.filter(incidencia => incidencia.estado === "EN_REVISION");
      const nuevasESCALADA = response.data.filter(incidencia => incidencia.estado === "ESCALADA");
      const nuevasCERRADA = response.data.filter(incidencia => incidencia.estado === "CERRADA");
      const nuevasREABIERTA = response.data.filter(incidencia => incidencia.estado === "REABIERTA");

      // Actualizando los estados con la longitud de cada conjunto de incidencias
      setincidenciasNUEVA(nuevasNUEVA.length);
      setincidenciasABIERTA(nuevasABIERTA.length);
      setincidenciasEN_INVESTIGACION(nuevasEN_INVESTIGACION.length);
      setincidenciasEN_PROGRESO(nuevasEN_PROGRESO.length);
      setincidenciasPENDIENTE(nuevasPENDIENTE.length);
      setincidenciasRESUELTA(nuevasRESUELTA.length);
      setincidenciasEN_REVISION(nuevasEN_REVISION.length);
      setincidenciasESCALADA(nuevasESCALADA.length);
      setincidenciasCERRADA(nuevasCERRADA.length);
      setincidenciasREABIERTA(nuevasREABIERTA.length);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidencias();
  }, []);

  // Estado para guardar los datos de incidencias por estado
  const [data, setData] = useState({
    labels: ['Nueva', 'En Progreso', 'Cerrada'],
    datasets: [{
      data: [incidenciasNUEVA, incidenciasEN_PROGRESO, incidenciasCERRADA], // Inicialmente vacío
    }],
  });

  useEffect(() => {
    // Actualizar los datos del gráfico cuando cambian los conteos
    setData({
      labels: ['Nueva', 'En Progreso', 'Cerrada'],
      datasets: [{
        data: [incidenciasNUEVA, incidenciasEN_PROGRESO, incidenciasCERRADA], // Actualizados
      }],
    });
  }, [incidenciasNUEVA, incidenciasEN_PROGRESO, incidenciasCERRADA]);

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;


  console.log("dataset:: ", incidenciasNUEVA, incidenciasEN_PROGRESO, incidenciasCERRADA)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incidencias por Estado</Text>
      <BarChart
  data={{
    labels: ['Nueva', 'En Progreso', 'Cerrada'], // Cambia a los estados correctos
    datasets: [{
      data: [
        incidenciasNUEVA,
        incidenciasEN_PROGRESO,
        incidenciasCERRADA
      ],
    }],
  }}
  width={350}
  height={220}
  yAxisLabel=""
  yAxisSuffix=""
  chartConfig={{
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#34ceec',
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
/>
      <Button
        title="Actualizar Datos"
        onPress={fetchIncidencias}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GraficoIncidenciasPorEstado;