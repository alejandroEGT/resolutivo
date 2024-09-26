import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Button, Image, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { generarCadenaAleatoria } from '../../utils/Utils';
import { host } from '../../utils/host';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const IngresarIncidenciaScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('NUEVA');
  const [gradoUrgencia, setGradoUrgencia] = useState(null);
  const [tipoIncidencia, setTipoIncidencia] = useState(null);
  const [fechaEstimada, setFechaEstimada] = useState(null);
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagen3, setImagen3] = useState(null);

  const [tipoIncidencias, setTipoIncidencias] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const selectedYear = date.getFullYear(); // Obtiene el año
    const selectedMonth = date.getMonth() + 1; // Obtiene el mes (sumamos 1 porque los meses empiezan en 0)
    const selectedDay = date.getDate(); // Obtiene el día

    hideDatePicker();
  };

  // Solicitar permisos de acceso a la galería
  const pedirPermiso = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se necesita permiso', 'Se necesita acceso a la cámara y galería.');
      }
    }
  };

  useEffect(() => {
    pedirPermiso();
  }, []);

  const fetchIncidencias = async () => {
     
    try {
      const response = await axios.get(`${host}/tipo-incidencia/listar`);
      setTipoIncidencias(response.data);
      //setLoading(false);
      console.log("responsekkck:: ", tipoIncidencias)
    } catch (error) {
      //setError(error.message);
      //setLoading(false);
    }
}

  useEffect(()=>{
    fetchIncidencias()
  }, [])

  const seleccionarImagen1 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImagen1(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen.');
    }
  };

  const seleccionarImagen2 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImagen2(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen.');
    }
  };

  const seleccionarImagen3 = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImagen3(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen.');
    }
  };

  const enviarFormulario = async () => {
    if (!titulo || !descripcion || !ubicacion || !estado || !gradoUrgencia || !tipoIncidencia) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    // Lógica para enviar el formulario
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('ubicacion', ubicacion);
    formData.append('estado', estado);
    formData.append('gradoUrgencia', gradoUrgencia);
    formData.append('tipoIncidencia', tipoIncidencia);
    formData.append('fechaEstimada', fechaEstimada.toISOString());
    // Asegúrate de que la URI esté en un formato correcto y accesible
    const appendImage = (key, imageUri) => {
      if (imageUri) {
        formData.append(key, {
          uri: imageUri,
          type: 'image/jpeg', // Asegúrate de usar el tipo correcto
          name: `${key}-${generarCadenaAleatoria(10, 10)}.jpg`, // Nombre del archivo
        } as any);
      }
    };

    appendImage('imagen1', imagen1);
    appendImage('imagen2', imagen2);
    appendImage('imagen3', imagen3);
    console.log(formData)

    try {
      const response = await axios.post(host + '/incidencia/ingresar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        Alert.alert('Éxito', 'Incidencia ingresada con éxito.');
        setTitulo('');
        setDescripcion
        setUbicacion('')
        setEstado('NUEVA');
        setGradoUrgencia(null);
        setTipoIncidencia(null);
        setImagen1(null);
        setImagen2(null);
        setImagen3(null);
      }
    } catch (error) {
      console.log("PASO UN ERROR:: ", host + '/incidencia/ingresar')
      Alert.alert('Error', 'Ocurrió un error al ingresar la incidencia.');
      console.log("ERROR::::", error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
      />

  
      

      <Text style={styles.label}>Grado de Urgencia</Text>
      <Picker
        selectedValue={gradoUrgencia}
        onValueChange={(itemValue) => setGradoUrgencia(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value={null} />
        <Picker.Item label="Bajo" value="BAJA" />
        <Picker.Item label="Medio" value="MEDIA" />
        <Picker.Item label="Alto" value="ALTA" />
        <Picker.Item label="Critico" value="CRITICA" />
      </Picker>

      <Text style={styles.label}>Tipo de Incidencia</Text>
      <Picker
        selectedValue={tipoIncidencia}
        onValueChange={(itemValue) => setTipoIncidencia(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione" value={null} />
        {
          tipoIncidencias.map(ti =>(
            <Picker.Item label={ti.titulo} value={ti.id} />
          ))
        }
      
      </Picker>

     
      <Button title="Fecha estimativa de resolución" onPress={() => setDatePickerVisibility(true)} />
      <Text style={styles.input}>
        {fechaEstimada ? fechaEstimada.toLocaleDateString() : 'Fecha no seleccionada'}
      </Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display="calendar"
        onConfirm={(date) => {
          setFechaEstimada(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        //maximumDate={new Date()}
      />

      <Text style={styles.label}>Selecciona al menos 3 imagenes</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        <View style={{ marginHorizontal: 5 }}>
          <Button title="Imagen 1" onPress={seleccionarImagen1} />
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Button title="Imagen 2" onPress={seleccionarImagen2} />
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <Button title="Imagen 3" onPress={seleccionarImagen3} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#cacfd2', paddingTop: 10, marginBottom: 5 }}>
        {imagen1 && (
          <Image
            source={{ uri: imagen1 }}
            style={styles.imagen}
          />
        )}
        {imagen2 && (
          <Image
            source={{ uri: imagen2 }}
            style={styles.imagen}
          />
        )}
        {imagen3 && (
          <Image
            source={{ uri: imagen3 }}
            style={styles.imagen}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Button title="Enviar Incidencia" onPress={enviarFormulario} />
      </View>
    </ScrollView>
  );
};

export default IngresarIncidenciaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 20,
    margin: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#b2babb'
  },
  footer: {
    marginBottom: 80,  // Ajusta este valor según el espacio necesario
  },
});