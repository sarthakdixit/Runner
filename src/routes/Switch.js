import React, {useEffect, useContext} from 'react'
import { View, ActivityIndicator } from 'react-native'
import { GlobalCSS } from '../GlobalCSS'
import {Colors} from '../utils/Colors'
import auth from '@react-native-firebase/auth'
import {LoginContext} from '../contexts/LoginContext'
import { StackActions } from '@react-navigation/native'

const Switch = ({navigation}) => {
    const {user, setUser} = useContext(LoginContext)
    
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if(user){
                setUser(user)
                // navigation.navigate("Home")
                navigation.dispatch(
                    StackActions.replace('Home')
                );
            }else{
                navigation.navigate("Login")
            }
        })
    }, [])

    return (
        <View style={GlobalCSS.container}>
            <ActivityIndicator size="large" color={Colors.primary}></ActivityIndicator>
        </View>
    )
}

export default Switch
