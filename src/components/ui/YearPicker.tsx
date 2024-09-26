import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Boton from '../Boton';
import { colorBtnGlobal } from '../../config/theme';

const YearPicker = ({ onDateSelected }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const selectedYear = date.getFullYear(); // Obtiene el año
    const selectedMonth = date.getMonth() + 1; // Obtiene el mes (sumamos 1 porque los meses empiezan en 0)
    const selectedDay = date.getDate(); // Obtiene el día


    // Llama a la función que proviene del componente padre
    if (onDateSelected) {
      onDateSelected(selectedDay, selectedMonth, selectedYear);
    }

    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Boton texto={"Seleccionar fecha"} imgurl='https://img.icons8.com/ios-glyphs/30/calendar.png' backGroundColor={colorBtnGlobal} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date" // El modo es "date"
        display="calendar" // Muestra un selector de fecha con modo "calendar"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date(1900, 0, 1)} // Año mínimo
        maximumDate={new Date()} // Año máximo (actual)
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default YearPicker;