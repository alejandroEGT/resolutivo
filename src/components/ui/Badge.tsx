import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Badge = ({param, texto, colorFondo, colorTexto }) => {
  return (
    <View style={[styles.badge, { backgroundColor: colorFondo }]}>
        <Text style={{fontSize:12, color:'white'

        }}>{param+': '}</Text>
        <Text style={[styles.text, { color: colorTexto }]}>{texto}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    flexDirection:'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline', // Ajusta el tamaño según el contenido
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});