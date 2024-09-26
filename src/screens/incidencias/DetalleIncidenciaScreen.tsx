import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Card from '../../components/ui/Card';
import { formatearFecha } from '../../utils/Utils';
import axios from 'axios';
import ModalImagenes from '../../components/ui/ModalImagenes';
import Boton from '../../components/Boton';
import { colorBtnGlobal } from '../../config/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { host } from '../../utils/host';

const DetalleIncidenciaScreen = ({route}) => {
    const navigation = useNavigation();
    
  const { data } = route.params || {}; // Obtener los parámetros

  const [estado, setEstado] = useState(false);
  const [gdata, setData] = useState([]); // Estado para guardar los datos de la respuesta
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [itemSelected, setItemSelected] = useState(null);
  const [indexSelected, setIndexSelected] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [reloadBack, setReloadBack] = useState(null);

  const toggleModal = (index, item) => {
    setIndexSelected(index);
    setItemSelected(item);
    setModalVisible(!isModalVisible);
  };

  useLayoutEffect(() => {
    // Configura el header dentro de useLayoutEffect
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <Boton texto="Ver detalle" imgurl='https://img.icons8.com/material-outlined/24/left.png'  style={{ margin:10 }} backGroundColor={colorBtnGlobal}  onPress={() => navigation.navigate('LISTAR INCIDENCIAS', { parametro:reloadBack })} />
      ),
    });
  }, [navigation, reloadBack]);

  const fetchData = async () => {
    if (!data?.id) return; // Asegúrate de que data?.id esté disponible
    try {
      setLoading(true);
      const response = await axios.get(`${host}/detalle-incidencia/listar/${data.id}`);
      setData(response.data); // Guarda los datos de la respuesta en el estado
      setLoading(false);
      console.log(gdata)
    } catch (err) {
      setError(err.message); // Guarda el error en caso de que falle la petición
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data?.id) {
      fetchData(); // Llama a la función fetchData cuando se monte el componente
    }
  }, [data?.id]); // Solo se ejecuta una vez al montar el componente y cuando data?.id cambia


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

    const rollbackUpdateEstadoPadre = (estado) => {
       console.log('rollbackUpdateEstadoPadre:: ', estado);
       if(estado){
        setReloadBack(estado ? 'reload_back' : null);
        console.log("reloadBack::::::" , reloadBack, estado)
       }
    }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card
        idIncidencia={data?.id}
        title={`#${data?.id} ${data?.titulo}`}
        description={data?.descripcion}
        date={formatearFecha(data?.fechaReportada)}
        getEstado={data?.estado}
        padreRollback={(estado) => estado && fetchData()}
        rollbackUpdateEstadoPadre={(estado) => console.log("detalle:: ", rollbackUpdateEstadoPadre(estado))}
      />

      <View style={styles.container2}>
        
        {gdata.length === 0 && <Text style={styles.title}>Sin seguimiento...</Text>}
        {gdata.length > 0 && <Text style={styles.title}>Seguimiento de Incidencia</Text>}
        {gdata.map((l, index) => (
          <View key={l.id} style={styles.card}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: '70%',
                  backgroundColor: 'white',
                  borderRightColor: '#eaecee',
                  borderRightWidth: 1,
                  marginEnd: 3,
                }}
              >
                <Text style={styles.date}>{formatearFecha(l.fechaDetalle)}</Text>
                <Text>{l.descripcion}</Text>
              </View>
              <View style={{ width: '30%', height: '50%', marginLeft: 1 }}>
                <Boton texto={'imagenes'} backGroundColor={colorBtnGlobal} onPress={() => toggleModal(index, l)} />
              </View>
            </View>
          </View>
        ))}
        <ModalImagenes
          incidencia={itemSelected}
          toggleModal={toggleModal}
          isModalVisible={isModalVisible} 
          indice={indexSelected}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor:'red',
    flex: 1,
    padding: 10,
    width:'100%'
  },
  container2: {
    //backgroundColor:'red',
    flex: 1,
   // padding: 10,
   // width:'100%'
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Sombra para Android
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default DetalleIncidenciaScreen;