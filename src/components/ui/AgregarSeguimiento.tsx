import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Button, Alert, Dimensions, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { generarCadenaAleatoria } from '../../utils/Utils';
import axios from 'axios';
import { colorBtnGlobal, colorGreenBtn } from '../../config/theme';
import { Picker } from '@react-native-picker/picker';
import { host } from '../../utils/host';
import Tooltip from 'react-native-walkthrough-tooltip';

const AgregarSeguimiento = ({idIncidencia, getEstado, rollback, rollbackUpdateEstado}) => {
  
  const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleCh, setModalVisibleChange] = useState(false);

  const [descripcion, setDescripcion] = useState('');
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagen3, setImagen3] = useState(null);

  const [visible, setVisible] = useState(true);

  const [estado, setEstado] = useState(getEstado);

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
    if (!descripcion) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    // Lógica para enviar el formulario
    const formData = new FormData();
    formData.append('incidenciaId',idIncidencia);
    formData.append('descripcion', descripcion);


    // Asegúrate de que la URI esté en un formato correcto y accesible
    const appendImage = (key, imageUri) => {
      if (imageUri) {
        formData.append(key, {
          uri: imageUri,
          type: 'image/jpeg', // Asegúrate de usar el tipo correcto
          name: `${key}-${generarCadenaAleatoria(10,10)}.jpg`, // Nombre del archivo
        } as any);
      }
    };

    appendImage('imagen1', imagen1);
    appendImage('imagen2', imagen2);
    appendImage('imagen3', imagen3);

    try {
      const response = await axios.post(host+'/detalle-incidencia/ingresar', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
    
        Alert.alert('Éxito', 'Incidencia ingresada con éxito.');
        rollback(true);
        
        setDescripcion('')
        setImagen1(null);
        setImagen2(null);
        setImagen3(null);
        setModalVisible(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al ingresar la incidencia.');
      console.log("ERROR::::", error);
    }
  };

  const enviarFormularioEstado = async () => {
    
    if (estado == 'null') {
        Alert.alert('Error', 'Seleccione algun estado.');
        return;
    }
    const data = {
        estado
    }
    try {
      
        const response = await axios.patch(host+'/incidencia/actualizarEstado/'+idIncidencia, data);
        if (response.status === 200) {
      
          Alert.alert('Éxito', 'Incidencia actualizada con éxito.');
          rollbackUpdateEstado(true, response.data.estado);
          
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al actualizar la incidencia.');
        console.log("ERROR::::", error, host+'/incidencia/actualizarEstado/'+idIncidencia, data);
      }
  }
  return (
    <View>



        {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay}>

        <View style={[styles.modalView, {width}]}>
        <Text style={[styles.label, {fontSize:20, marginBottom:30}]}>Ingresar un seguimiento</Text>

          <Text style={[styles.label]}>Descripción</Text>
            <TextInput
                placeholderTextColor={Platform.OS === 'ios' ? 'gray' : 'lightgray'}
                placeholder="Ingrese la descripción"
                style={styles.textArea}
                numberOfLines={5} // Número de líneas visibles
                value={descripcion}
                onChangeText={setDescripcion}
                multiline={true}
                
            />

        <Text style={styles.label}>Selecciona al menos 3 imagenes</Text>
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:20}}>
            <View style={{marginHorizontal: 5}}>
            <Button title="Imagen 1" onPress={seleccionarImagen1} />
            </View>
            <View style={{marginHorizontal: 5}}>
            <Button title="Imagen 2" onPress={seleccionarImagen2} />
            </View>
            <View style={{marginHorizontal: 5}}>
            <Button title="Imagen 3" onPress={seleccionarImagen3} />
            </View>
        </View>
      
        <View style={{flexDirection:'row', justifyContent:'center', backgroundColor:'#cacfd2', paddingTop:10, marginBottom:5}}>
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

            

          <View style={{ flexDirection:'row' }}>
            <TouchableOpacity
                style={styles.guardarButton}
                onPress={() => enviarFormulario()}
            >
                <Text style={styles.textStyle}>Ingresar Seguimiento</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text style={styles.textStyle}>Cerrar Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>

      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisibleCh}
        onRequestClose={() => {
            setModalVisibleChange(!modalVisibleCh);
          }}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalView, {width}]}>
                    <Text style={[styles.label, {fontSize:20}]}>Editar incidencial</Text>

                    <Text style={styles.label}>Estado</Text>
                    <Picker
                        selectedValue={estado}
                        onValueChange={(itemValue) => setEstado(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Seleccione" value={null} />
                        <Picker.Item label="Nueva" value="NUEVA" />
                        <Picker.Item label="Abierta" value="ABIERTA" />
                        <Picker.Item label="En Investigación" value={"EN_INVESTIGACION"} />
                        <Picker.Item label="En Progreso" value="EN_PROGRESO" />
                        <Picker.Item label="Pendiente" value="PENDIENTE" />
                        <Picker.Item label="Resuelta" value="RESUELTA" />
                        <Picker.Item label="En Revisión" value="EN_REVISION" />
                        <Picker.Item label="Escalada" value="ESCALADA" />
                        <Picker.Item label="Cerrada" value="CERRADA" />
                        <Picker.Item label="Reabierta" value="REABIERTA" />
                    </Picker>

                    <TouchableOpacity
                        style={styles.guardarButton}
                        onPress={() => enviarFormularioEstado()}
                    >
                        <Text style={styles.textStyle}>Cambiar estado</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisibleChange(!modalVisibleCh)}
                    >
                        <Text style={styles.textStyle}>Cerrar Modal</Text>
                    </TouchableOpacity>
                </View>
            </View>

      </Modal>









        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
        style={styles.roundButtonStatus}
        onPress={() => {
          setModalVisibleChange(true);
          setVisible(false); // Ocultar tooltip al abrir el modal
        }}
      >
    <Image
      style={styles.image}
      tintColor={'white'}
      source={{ uri: 'https://img.icons8.com/ios-glyphs/30/change--v1.png' }} // Image placeholder
    />
  </TouchableOpacity>
        <Tooltip
          isVisible={visible}
          content={<Text>Agregar un seguimiento</Text>}
          placement="top"
          onClose={() => setVisible(false)}
          arrowSize={{ width: 16, height: 8 }} // Ajusta el tamaño de la flecha si es necesario
          tooltipStyle={styles.tooltip} // Aplica el estilo del tooltip
        >
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => {
              setModalVisible(true);
              setVisible(false); // Ocultar tooltip al abrir el modal
            }}
          
          >
            <Image
              style={styles.image}
              tintColor={'white'}
              source={{ uri: 'https://img.icons8.com/ios/50/add--v1.png' }} // Image placeholder
            />
          </TouchableOpacity>
        </Tooltip>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  roundButton: {
    //width: 80,
    //height: 80,
    backgroundColor: colorGreenBtn,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    padding:0

  },
  roundButtonStatus: {
    //width: 80,
    //height: 80,
    backgroundColor: colorBtnGlobal,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    padding:0

  },
  image: {
    width: 30,
    height: 30,
    margin:10
    
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
  },
  modalView: {
    backgroundColor: '#aeb6bf',
    padding: 20,
    borderRadius: 10,
   // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    marginHorizontal:8
  },
  guardarButton: {
    backgroundColor: '#5dade2',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    marginHorizontal:8
  },
  textStyle: {
    color: 'white',
  },

  //form
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textArea: {
    width:'100%',
    height: 150, // Altura de la TextArea
    justifyContent: "flex-start", // Alineación del texto al inicio
    textAlignVertical: 'top', // Para que el texto empiece en la parte superior
    borderColor: 'gray', // Borde
    borderWidth: 1,
    padding: 10, // Espaciado interno
    borderRadius: 10, // Bordes redondeados
    backgroundColor:Platform.OS === 'ios'? 'white':'black',
    color: Platform.OS === 'ios'?'black':'yellow'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor:'white',
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 20,
    margin:5,
    borderRadius:10,
    borderWidth: 3,
    borderColor:'#b2babb'
  },
  footer: {
    marginBottom: 80,  // Ajusta este valor según el espacio necesario
  },
  tooltip: {
    backgroundColor: 'white', // Fondo del tooltip
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width:'40%',
    position: 'absolute', // Asegura que no afecte el layout
  },
});

export default AgregarSeguimiento;