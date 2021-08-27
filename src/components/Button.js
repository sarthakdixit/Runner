import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Colors } from '../utils/Colors'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Button = ({methodToCall, text}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => methodToCall()}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container:{
        borderWidth:0.005*windowWidth,
        borderColor:Colors.primary,
        borderRadius:0.2*windowWidth,
        alignItems:'center',
        justifyContent:'center',
        width:0.3*windowWidth,
        height:0.05*windowHeight
    },
    text:{
        fontSize:0.02*windowHeight,
        fontWeight:'bold',
        color:Colors.primary
    }
})