import { StyleProp, View, ViewStyle } from "react-native";
interface Props{
    style?: StyleProp<ViewStyle>;
}
export const Separator = ({style}:Props) => {
    return (
        <View style={[
            {
                height: 1, // Altura del separador
                width: '100%', // Ancho completo
                backgroundColor: '#CED0CE', // Color del separador
                marginVertical: 10, // Espacio vertical,
                borderBottomColor: '#d5dbdb', // Color del borde inferior
                borderBottomWidth: 2, // Grosor del borde inferior
            },
            style
        ]}>

        </View>
    )
}