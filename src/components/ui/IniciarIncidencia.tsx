import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { colorGreenBtn } from '../../config/theme';
import Tooltip from 'react-native-walkthrough-tooltip';
import { host } from '../../utils/host';
import axios from 'axios';

interface ComponentNameProps {

}

const IniciarIncidencia = ({idIncidencia, rollbackUpdateEstadoInc}) => {
  const [visible, setVisible] = useState(true);

  const showConfirmAlert = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que quieres iniciar la incidencia?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel" // Estilo para el botón de cancelar
        },
        {
          text: "Aceptar",
          onPress: () => enviarFormularioEstado(), // Aquí puedes realizar la acción deseada
          style: "default" // Estilo para el botón de aceptar
        }
      ],
      { cancelable: false } // Evita que se cierre al tocar fuera del alert
    );
  };

  const enviarFormularioEstado = async () => {
    console.log("id:: ", idIncidencia)
    const data = {
        estado:'EN_PROGRESO'
    }
    try {
      
        const response = await axios.patch(host+'/incidencia/actualizarEstado/'+idIncidencia, data);
        if (response.status === 200) {
      
          Alert.alert('Éxito', 'Incidencia actualizada con éxito.');
          rollbackUpdateEstadoInc(true, data.estado);
          
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al actualizar la incidencia.');
        console.log("ERROR::::", error, host+'/incidencia/actualizarEstado/'+idIncidencia, data);
      }
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Tooltip
        isVisible={visible}
        content={<Text>Iniciar la incidencia</Text>}
        placement="top"
        onClose={() => setVisible(false)}
        arrowSize={{ width: 16, height: 8 }} // Ajusta el tamaño de la flecha si es necesario
        tooltipStyle={styles.tooltip} // Aplica el estilo del tooltip
      >
        <TouchableOpacity 
          style={styles.roundButtonStatus} 
          onPress={() => {showConfirmAlert()}} // Alternar visibilidad
        >
          <Image
            style={styles.image}
            tintColor={'white'}
            source={{ uri: 'https://img.icons8.com/material-rounded/24/circled-play.png' }}
          />
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
};

export default IniciarIncidencia;

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: 'white', // Fondo del tooltip
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    position: 'absolute', // Asegura que no afecte el layout
  },
  roundButtonStatus: {
    backgroundColor: colorGreenBtn,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    padding: 0,
  },
  image: {
    width: 30,
    height: 30,
    margin: 10,
  },
});