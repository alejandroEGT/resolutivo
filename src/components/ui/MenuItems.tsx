import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { globalStyles, colors } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";
import { Separator } from "./Separator";
//import { Icon } from "react-native-vector-icons/Icon";

interface Props{
    name: string;
    icon?: string;
    component?: string;
    //todo:
    isFirst?:boolean;
    isLast?:boolean;
    list?:boolean
}

export const MenuItems = ({name, icon, isFirst, isLast, list}:Props) => {

    const navigation = useNavigation<any>();

    return(
        <Pressable onPress={()=>{console.log(navigation.navigate(name))}}>
            <View style={{
                ...style.container,
                backgroundColor:colors.cardBackground,
                ...(isFirst && {borderTopLeftRadius: 10, borderTopRightRadius:10, marginTop:10}),
                ...(isLast && {borderBottomLeftRadius:10, borderBottomRightRadius:10, marginBottom:10}),
                borderBottomColor: '#d5dbdb', // Color del borde inferior
                borderBottomWidth: 2, // Grosor del borde inferior
            }}>
                <Image
                    source={{ uri: icon }}
                    style={{ width: 40, height: 40, marginRight:5 }}
                />
                <Text style={{color:colors.text}}>{name}</Text>

                {
                    list &&  <Image
                    source={{ uri: 'https://img.icons8.com/fluency/48/forward--v1.png' }}
                    style={{ width: 30, height: 30, marginLeft:'auto' }}
                />
                }

                {
                    !list  &&  <Image
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/menu-2.png' }}
                    style={{ width: 30, height: 30, marginLeft:'auto' }}
                />
                }

               
              
            </View>
        
        </Pressable>
        
    )
} 

const style = StyleSheet.create({
    container:{
        height:70,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:5
    }
})