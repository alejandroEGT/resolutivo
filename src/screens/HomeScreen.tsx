import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { ListaMenu } from '../presentacion/ListaMenu';
import { globalStyles } from '../config/theme';
import { MenuItems } from '../components/ui/MenuItems';
import GraficoIncidenciasPorEstado from './graficos/GraficoIncidenciasPorEstado';

interface componentNameProps {}

const HomeScreen = (props: componentNameProps) => {
    const menuInit = ListaMenu();
  return (
    <View style={[globalStyles.mainContainer]}>
       <View style={[globalStyles.globalMargin]}>
            <ScrollView style={[styles.container]} >
              <MenuItems list={false} name='Alejandro' icon='https://img.icons8.com/fluency/48/user-male-circle--v1.png'></MenuItems>
                {
                    menuInit.map((list, index)=>(
                        <View key={list.id}>
                            <MenuItems
                                list={true}
                                isFirst={index === 0 }
                                isLast={index === menuInit.length - 1} 
                                {...list}
                            />
                        </View>
                    ))
                }

                <GraficoIncidenciasPorEstado></GraficoIncidenciasPorEstado>
            </ScrollView>
        </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    margin:0
  }
});
