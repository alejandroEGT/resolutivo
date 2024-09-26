import {createStackNavigator} from '@react-navigation/stack' 
import { Text, View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import IngresarIncidenciaScreen from '../screens/incidencias/IngresarIncidenciaScreen';
import ListarIncidenciasScreen from '../screens/incidencias/ListarIncidenciasScreen';
import DetalleIncidenciaScreen from '../screens/incidencias/DetalleIncidenciaScreen';
import { colorBtnGlobal } from '../config/theme';

const Stack = createStackNavigator();

interface componentNameProps {}

const Navigator = (props: componentNameProps) => {
  return (
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: colorBtnGlobal, // Color de fondo del encabezado
          },
          headerTintColor: '#fff',
    }}>
        <Stack.Screen name='RESOLUTIVO' component={HomeScreen}></Stack.Screen>
        <Stack.Screen name='INGRESAR INCIDENCIA' component={IngresarIncidenciaScreen}></Stack.Screen>
        <Stack.Screen name='LISTAR INCIDENCIAS' component={ListarIncidenciasScreen}></Stack.Screen>
            <Stack.Screen options={{
                headerLeft:null
            }} name='DETALLE INCIDENCIA' component={DetalleIncidenciaScreen} ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {}
});
