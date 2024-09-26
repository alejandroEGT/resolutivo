import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data almacenada');
    } catch (e) {
      console.log('Error al almacenar data', e);
    }
};

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data recuperada:', value);
        return value; 
      }
    } catch (e) {
      console.log('Error al recuperar data', e);
    }
    return null;
};