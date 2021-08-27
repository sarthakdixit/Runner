import React, {useContext, useEffect} from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { Auth } from '../utils/Auth'
import { GlobalCSS } from '../GlobalCSS'
import Video from "react-native-video"
import VideoS from '../assets/video.mp4'
import { showMessage } from 'react-native-flash-message'
import auth from '@react-native-firebase/auth'
import {LoginContext} from '../contexts/LoginContext'
import { StackActions } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Login = ({navigation}) => {
    const {setUser, permissions} = useContext(LoginContext)

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if(user){
                setUser(user)
                // navigation.navigate("Home")
                navigation.dispatch(
                    StackActions.replace('Home')
                );
            }
        })
    }, [])

    const login = async () => {
        if(permissions.location){
            let data = await Auth.login()
        if(data.success){
            showMessage({
                message: 'Google',
                description: data.mssg,
                type: 'success',
            })
        }else{
            showMessage({
                message: 'Google',
                description: data.mssg,
                type: 'danger',
            })
        }
        }else{
            showMessage({
                message: 'Location service',
                description: 'Please give location access',
                type: 'danger',
            })
        }
    }

    return (
        <View style={GlobalCSS.container}>
            <Video
                source={VideoS}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                rate={1.0}
                resizeMode={"cover"}
                ignoreSilentSwitch={"obey"}
            />
             <GoogleSigninButton
                style={styles.googleButton}
                onPress={login}
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    googleButton:{
        padding:0.07*windowWidth,
        width:0.7*windowWidth,
        position:'absolute',
        bottom:0.15*windowHeight,
        zIndex:4
    },
    backgroundVideo:{
        width:'100%',
        height: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    }
})