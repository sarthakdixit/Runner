import React, {useEffect, useState} from 'react'
import {LoginContext} from './contexts/LoginContext'
import {MyStack} from './routes/Stack'
import {Config} from './utils/Config'
import {NavigationContainer} from "@react-navigation/native"
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { enableScreens } from 'react-native-screens'
import { PermissionsAndroid } from 'react-native'

enableScreens(true)

const App = () => {
    const [user, setUser] = useState({})
    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
    })
    const [coordinates, setCoordinates] = useState([])
    const [startAction, setStartAction] = useState(false)
    const [permissions, setPermissions] = useState({
        location: false,
    })
    const [timer, setTimer] = useState({
        hours:0,
        minutes:0,
        seconds:0,
        totalSeconds:0
    })
    const [intervalId, setIntervalId] = useState(null)
    const [distanceData, setDistanceData] = useState({
        distance:0,
        average:0
    })

    const timerMethod = () => {
        let tempHours = Math.floor(timer.totalSeconds /3600)
        let tempMinutes = Math.floor((timer.totalSeconds - tempHours*3600)/60)
        let tempSeconds = timer.totalSeconds - (tempHours*3600 + tempMinutes*60)
        let tempTotalSeconds = ++(timer.totalSeconds)
        // let obj = {...timer}
        setTimer({...timer, hours:tempHours, minutes:tempMinutes, seconds:tempSeconds, totalSeconds:tempTotalSeconds})
        // setTimer(obj)
        // ++totalSeconds
        // hours = Math.floor(totalSeconds /3600)
        // minutes = Math.floor((totalSeconds - hours*3600)/60)
        // seconds = totalSeconds - (hours*3600 + minutes*60)
    }

    const startTimer = () => {
        setIntervalId(setInterval(timerMethod, 1000))
    }
    
    const stopTimer = () => {
        if (intervalId)
          clearInterval(intervalId)
          setIntervalId(null)
    }
    
    const resetTimer = () => {
        setIntervalId(null)
        setTimer({...timer, hours:0, minutes:0, seconds:0, totalSeconds:0})
        // let obj = {
        //     hours:0,
        //     minutes:0,
        //     seconds:0,
        //     totalSeconds:0
        // }
        // setTimer(obj)
    }

    useEffect(() => {
        locationPermissions()
    }, [])

    const locationPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Location Access',
                'message': 'Runner wants to access your location'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              setPermissions({...permissions, location:true})
            } else {
                showMessage({
                    message: 'Location Service',
                    description: 'Location service denied',
                    type: 'danger',
                })
            }
        } catch (err) {
            showMessage({
                message: 'Location Service',
                description: err,
                type: 'danger',
            })
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: Config.google_web_client_id,
        })
    }, [])

    return (
        <NavigationContainer>
            <LoginContext.Provider value={{user, setUser, userLocation, setUserLocation, permissions, timer, startTimer, stopTimer, resetTimer, distanceData, setDistanceData, startAction, setStartAction, coordinates, setCoordinates}}>
                <MyStack />
                <FlashMessage position="top" />
            </LoginContext.Provider>
        </NavigationContainer>
    )
}

export default App
