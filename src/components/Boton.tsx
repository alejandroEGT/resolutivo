import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

interface BotonProps {
    texto: string;
    backGroundColor: string;
    onPress: () => void; // Cambiado de onpress: () => {} a onPress: () => void
    style?: any; // Estilo opcional
    imgurl?: string
}

const Boton = ({ texto, backGroundColor, onPress, style, imgurl }: BotonProps) => {
  const [bgColor, setBgColor] = useState<string | null>(null); // Añadido tipo string | null

  useEffect(() => {
    setBgColor(backGroundColor);
  }, [backGroundColor]);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style]} // Combina estilos base y personalizados
      onPress={onPress}
    >
       <View style={{ flexDirection:'row' }}>
        {
                imgurl != null && <Image tintColor={'white'} source={{ uri:''+imgurl+'' }} style={{ width:20, height:20 }} />
            }
        <Text style={styles.buttonText}>{texto}</Text>
       </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10, // Bordes redondeados
    alignItems: 'center', // Centrar el texto
    marginVertical: 10, // Separación vertical
  },
  buttonText: {
    color: 'white', // Color del texto blanco
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Boton;