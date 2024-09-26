import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { colorPorGradoUrgencia, estadoIncidencia, formatearFecha } from '../../utils/Utils';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import YearPicker from '../../components/ui/YearPicker';
import ModalImagenes from '../../components/ui/ModalImagenes';
import Boton from '../../components/Boton';
import { colorBtnGlobal } from '../../config/theme';
import Circulo from '../../components/ui/Circulo';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';
import { getData, storeData } from '../../utils/Store';
import Badge from '../../components/ui/Badge';
import { host } from '../../utils/host';

interface componentNameProps {}

const ListarIncidenciasScreen = ({ navigation, route }) => {
  const {parametro} =  route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIncidencia,setSelectedIncidencia] = useState(null);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [incidencias, setIncidencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estado para almacenar la fecha seleccionada
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // Función para manejar la fecha seleccionada
  const handleDateSelected = (day, month, year) => {
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);

        storeData('day', day.toString());
        storeData('month', month.toString());
        storeData('year', year.toString());
    
        setLoading(true);
        fetchIncidencias({day, month, year});
     
  };
  const fetchIncidencias = async ({day, month, year}) => {
            const fecha = `${day}/${month}/${year}`;
            console.log("fecha selec: ", fecha)
          try {
            const response = await axios.get(`${host}/incidencia/listar-por-fecha?fecha=${fecha}`);
            setIncidencias(response.data);
            setLoading(false);
            console.log("response:: ", incidencias)
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
  };
  
  // Método que quieres disparar cuando el componente tenga el foco
  const dispararMetodo = async() => {
    const day = await getData('day');
    const month = await getData('month');
    const year = await getData('year');
    setSelectedDay(day);
    setSelectedMonth(month);
    setSelectedYear(year);
    fetchIncidencias({day:day, month:month, year:year}).then((res)=>{
        console.log("MIRESSS::::", res)
    });
    // Aquí puedes ejecutar cualquier lógica que necesites
  };

  // Utiliza el hook useFocusEffect para ejecutar código cuando el componente esté en foco
  useFocusEffect(
    useCallback(() => {
      // Llamar al método cada vez que el componente gane el foco
      dispararMetodo();

      // Función de limpieza opcional que se ejecuta cuando el componente pierde el foco
      return () => {
        console.log('El componente ha perdido el foco');
      };
    }, []) // Dependencias vacías para que se ejecute solo cuando el componente tenga o pierda el foco
  );

  

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
        <YearPicker onDateSelected={handleDateSelected}></YearPicker>
        {
            selectedYear && (
                <View style={{ justifyContent:'center', flexDirection:'row', marginBottom:10 }}>
                    <View style={[styles.badge, { backgroundColor: colorBtnGlobal, width: '100%', height: 22, borderRadius: 100 / 2 }]}>
                        <Text style={[{ color: 'white', fontSize:15 }]}>
                           Fecha seleccionada: {selectedDay+'/'+selectedMonth+'/'+ selectedYear}
                        </Text>
                    </View>
                </View>
              )
        }
        </View>
        {
         incidencias.length === 0 && ( 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:100 }}>
           <Text style={{ justifyContent:'center' }}>No hay registros.</Text>
            </View>)
        }
      {incidencias.map((incidencia, index) => (
        <View key={index} style={styles.card}>
          <View style={{ flexDirection:'row', justifyContent:'flex-start'}}>
            <Image
                    source={{ uri: 'https://img.icons8.com/ios/50/calendar--v1.png' }}
                    style={{ width: 20, height: 18, marginRight:5, tintColor:'#aeb6bf' }}
                />
            <Text style={styles.date}>
                {formatearFecha(incidencia.fechaReportada)}
            </Text>
          </View>
          <View style={{ flexDirection:'row', justifyContent:'flex-start', marginTop:10}}>
            <Text style={styles.title}>{incidencia.titulo}</Text>
          </View>
          <Text style={styles.description}>Descripción: {incidencia.descripcion}</Text>
          <Text>Ubicación: {incidencia.ubicacion}</Text>
          <View style={{ flexDirection:'row', marginTop:10 }}>
            
            <Badge 
                param='Estado'
                texto={incidencia.estado} 
                colorFondo={estadoIncidencia(incidencia.estado)} 
                colorTexto={'white'}
            />
            
          </View>
          <View style={{ flexDirection:'row', marginTop:10 }}>
            <Badge 
                param='Grado de urgencia'
                texto={incidencia.gradoUrgencia} 
                colorFondo={colorPorGradoUrgencia(incidencia.gradoUrgencia)} 
                colorTexto={'white'}
            />
           
            
          </View>
          <Text>Tipo de Incidencia: {incidencia.tipoIncidencia?.titulo}</Text>
          <View>
          <View style={{ flexDirection:'row', justifyContent:'space-evenly', marginTop:20 }}>
            <Boton texto="Ver imagenes" imgurl='https://img.icons8.com/forma-light/24/image.png' style={{ margin:10 }} backGroundColor={colorBtnGlobal}
               onPress={()=>{
                setSelectedIndex(index);
                setSelectedIncidencia(incidencia);
                toggleModal()
                }} />
            <Boton texto="Gestionar" imgurl='https://img.icons8.com/ios/50/request-service.png'  style={{ margin:10 }} backGroundColor={colorBtnGlobal}  onPress={() => navigation.navigate('DETALLE INCIDENCIA', { data:incidencia })} />
            </View>
            
          </View>
          
        </View>
      ))}
      <ModalImagenes indice={selectedIndex} incidencia={selectedIncidencia} toggleModal={toggleModal} isModalVisible={isModalVisible} ></ModalImagenes>
    </ScrollView>
  );
};

export default ListarIncidenciasScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      width:'100%'
    },
    item: {
      backgroundColor:'#fdfefe',
      marginBottom: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
    },
    selectedText: {
        marginTop: 20,
        fontSize: 10,
        fontWeight: 'bold',
      },
      badge: {
        justifyContent: 'center',
        alignItems: 'center',
        
        top: 0,
        right: 0,
      },
      badgeText: {
        fontWeight: 'bold',
      },
      card: {
        backgroundColor: '#fff',
        padding: 20,
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
      description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
      },
      date: {
        fontSize: 12,
        color: '#888',
      }
  });
