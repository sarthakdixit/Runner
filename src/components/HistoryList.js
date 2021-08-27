import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import IconA from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../utils/Colors'
import { GlobalCSS } from '../GlobalCSS'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const HistoryList = ({obj}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, {fontWeight:'bold', fontSize:0.025*windowHeight}]}>{obj.datetime.toLocaleString('default', { month: 'long' })}</Text>
            <View style={[GlobalCSS.container, {flexDirection:'row'}]}>
                <View style={[GlobalCSS.container, {flex:0.1}]}>
                    <IconA
                        name="run"
                        color={Colors.primary}
                        size={0.055*windowWidth}
                    />
                </View>
                <View style={[GlobalCSS.container, {flex:0.9, alignItems:'flex-start'}]}>
                    <Text style={styles.text}>{obj.distance}</Text>
                </View>
            </View>
            <View style={[GlobalCSS.container, {flexDirection:'row'}]}>
                <View style={[GlobalCSS.container, {flex:0.1}]}>
                    <IconA
                        name="timer-outline"
                        color={Colors.primary}
                        size={0.055*windowWidth}
                    />
                </View>
                <View style={[GlobalCSS.container, {flex:0.9, alignItems:'flex-start'}]}>
                    <Text style={styles.text}>{obj.time}</Text>
                </View>
            </View>
        </View>
    )
}

export default HistoryList

const styles = StyleSheet.create({
    inner:{
        display:'flex'
    },
    container:{
        marginVertical:0.02*windowWidth,
        width:0.97*windowWidth,
        padding:0.03*windowWidth,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        borderRadius:0.02*windowWidth,
    },
    text:{
        fontSize:0.02*windowHeight,
        color:Colors.primary,
        marginLeft:0.01*windowWidth
    }
})