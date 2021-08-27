import React, {useContext} from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {LoginContext} from '../contexts/LoginContext'
import User from '../assets/user.png'
import { Colors } from '../utils/Colors'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Header = ({navigation, text, header=true}) => {
    const {user} = useContext(LoginContext)
    return (
        <View style={styles.container}>
            {header ? 
                <TouchableOpacity style={[{flex:0.3, justifyContent:'flex-start'}, styles.inner_container]}>
                </TouchableOpacity> : 
                <View style={{flex:0.3}}>
                </View>
            }
            <View style={[{flex:0.4, justifyContent:'center'}, styles.inner_container]}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={[{flex:0.3, justifyContent:'flex-end'}, styles.inner_container]}>
                <View style={styles.image_container}>
                    {user.photoURL ? <Image style={styles.image} source={{uri: user.photoURL}} /> : <Image style={styles.image} source={User}/>}
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        height:0.1*windowHeight,
        width:'100%',
        position:'absolute',
        top:0
    },
    inner_container:{
        flexDirection:'row',
        alignItems:'center',
        padding:0.01*windowWidth
    },
    text:{
        fontSize:0.03*windowHeight,
        fontWeight:'bold',
        color:Colors.primary
    },
    image_container:{
        width:0.13*windowWidth,
        height:0.13*windowWidth,
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:windowWidth
    }
})
