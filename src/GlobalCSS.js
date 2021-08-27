import { StyleSheet } from 'react-native'
import { Colors } from './utils/Colors'

export const GlobalCSS = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.background_color
    }
})