import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import AgregarSeguimiento from './AgregarSeguimiento';
import IniciarIncidencia from './IniciarIncidencia';
import { estadoIncidencia } from '../../utils/Utils';
import Badge from './Badge';

const Card = ({ idIncidencia, title, description, date, getEstado, padreRollback, rollbackUpdateEstadoPadre }) => {
    const [estado, setEstado] = useState(false);
    const [_getEstado, _setEstado] = useState(getEstado);
  const rollback = (est)=>{
    padreRollback(est)
  }
  const rollbackUpdateEstado = (est, estado) => {
    console.log("CARD:: ", est);
    _setEstado(estado);
    rollbackUpdateEstadoPadre(est);
   
   
  }
  const rollbackUpdateEstadoInc = (condicion, estado) => {
    _setEstado(estado);
  }
 
  return (
    <View style={styles.card}>
        <View style={{ flexDirection:'row', justifyContent:'flex-start'  }}>
            <Image
                    source={{ uri: 'https://img.icons8.com/ios/50/calendar--v1.png' }}
                    style={{ width: 20, height: 18, marginRight:5, tintColor:'#aeb6bf' }}
                />
            <Text style={styles.date}>
                {date}
            </Text>
          </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Badge 
                param='Estado'
                texto={_getEstado} 
                colorFondo={estadoIncidencia(_getEstado)} 
                colorTexto={'white'}
            />

      {
        _getEstado === 'NUEVA' && <IniciarIncidencia idIncidencia={idIncidencia} rollbackUpdateEstadoInc={rollbackUpdateEstadoInc} />
      }
      {
        _getEstado !=='NUEVA' && <AgregarSeguimiento idIncidencia={idIncidencia} getEstado={getEstado} rollback={rollback} rollbackUpdateEstado={rollbackUpdateEstado} />
      }
      
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Sombra para Android
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});