import React from 'react';
import { View, StyleSheet } from 'react-native';

const Circulo = ({ color, size }) => {
  return (
    <View style={[styles.circle, { backgroundColor: color, width: size, height: size }]} />
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50, // Radio para hacer el View circular
  },
});

export default Circulo;