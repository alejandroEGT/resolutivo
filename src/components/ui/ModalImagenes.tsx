import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Carousel from 'react-native-reanimated-carousel';
import { host } from '../../utils/host';


// Obtén el ancho de la pantalla
const { width, height } = Dimensions.get('window');

const ModalImagenes = ({indice, incidencia, toggleModal, isModalVisible}) => {

  const images = [
   {uri:host+'/mediafiles/'+incidencia?.imagen1},
   {uri:host+'/mediafiles/'+incidencia?.imagen2},
   {uri:host+'/mediafiles/'+incidencia?.imagen3}
  ]

console.log("array-imgs:: ", indice)

  return (
    <View style={styles.container}>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Cierra el modal al hacer clic fuera de él
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Imagenes de la Incidencia</Text>

          <Carousel
            width={width}    // Ancho del carrusel igual al ancho de la pantalla
            height={300}           // Altura fija del carrusel
            data={images}          // Datos que contendrán las imágenes
            renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                    <Text style={{ marginTop:20 }}>{item.uri}</Text>
                <Image
                    source={{ uri: item.uri }} // Muestra la imagen desde el array
                    style={styles.image}
                    resizeMode="cover"  // Ajusta la imagen
                />
                </View>
            )}
            />
           
          <Button  title="Cerrar Modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  justifyContent: 'center',
   // alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0, // Establece el margen a 0 para usar el ancho completo
    marginBottom:-100,
  },
  modalContent: {
    height:400,
    width: width * 1, // Ancho del modal (80% del ancho de la pantalla)
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingBottom:10
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
   //////
   imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    height:'100%',
    width:'100%',
    marginBottom:10
  },
  image: {
    width: '90%',
    height: '100%',
  },
});

export default ModalImagenes;