import React, {useEffect, useState, useContext} from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Colors } from '../utils/Colors'
import Map from '../components/Map'
import Button from '../components/Button'
import { GlobalCSS } from '../GlobalCSS'
import Geolocation from "react-native-geolocation-service"
import { showMessage } from 'react-native-flash-message'
import {LoginContext} from '../contexts/LoginContext'
import IconA from 'react-native-vector-icons/MaterialCommunityIcons'
import IconB from 'react-native-vector-icons/AntDesign'
import IconStop from 'react-native-vector-icons/FontAwesome'
import { FIRESTORE } from '../utils/Firestore'
import {calculateDistance} from '../utils/Distance'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Runner = () => {
    const {userLocation, setUserLocation, timer, startTimer, stopTimer, resetTimer, distanceData, setDistanceData, user, startAction, setStartAction, coordinates, setCoordinates} = useContext(LoginContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(userLocation.latitude != 0 && userLocation.longitude != 0 && startAction){
            setCoordinates([...coordinates, userLocation])
        }
    }, [userLocation])

    useEffect(() => {
        console.log(coordinates)
        if(coordinates.length > 1 && startAction){
            let len = coordinates.length
            let distance = calculateDistance(coordinates[len-1].latitude, coordinates[len-2].latitude, coordinates[len-1].longitude, coordinates[len-2].longitude)
            if(distance > 1){
                let obj = {...distanceData}
                setDistanceData({...distanceData, distance: obj.distance+distance})
            }
            console.log(distance)
        }
    }, [coordinates])

    useEffect(() => {
        currentLocation()
    }, [])

    const currentLocation = () => {
        Geolocation.watchPosition(
            position => {
                // let disObj = {...coordinates}
                const { latitude, longitude } = position.coords;
                // const newCoordinate = {
                //     latitude,
                //     longitude
                // };
                setUserLocation({...userLocation, latitude: latitude, longitude: longitude})
                // setCoordinates([...coordinates, newCoordinate])
                // if(startAction){
                //     console.log('start')
                //     console.log(startAction)
                //     let disObj = {...userLocation}
                //     setUserLocation({...userLocation, latitude: position.coords.latitude, longitude: position.coords.longitude, coordinates: disObj.coordinates.concat({
                //         latitude: position.coords.latitude,
                //         longitude: position.coords.longitude
                //     })})
                //     if(userLocation.coordinates.length > 1){
                //         let disObj = {...distanceData}
                //         setDistanceData({...distanceData, distance:disObj.distance+5})
                //     }
                // }else{
                //     console.log('stop')
                //     console.log(startAction)
                //     setUserLocation({...userLocation, latitude: position.coords.latitude, longitude: position.coords.longitude,})
                // }
                // let location = {...userLocation}
                // location = {
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //     coordinates: userLocation.coordinates.concat({
                //         latitude: position.coords.latitude,
                //         longitude: position.coords.longitude
                //     })
                // }
                // console.log(userLocation)
                // setUserLocation(location)
            },
            error => {
                showMessage({
                    message: 'Location',
                    description: error.message.toString(),
                    type: 'danger',
                })
            },
            {
                enableHighAccuracy: true, 
                distanceFilter:1
            }
        )
    }

    const startRunning = () => {
        startTimer()
        setStartAction(true)
        // currentLocation()
    }

    const stopRunning = () => {
        // Geolocation.clearWatch(watchid)
        // Geolocation.stopObserving()
        setStartAction(false)
        stopTimer()
    }

    const reset = () => {
        if(startAction){
            showMessage({
                message: 'Runner',
                description: "First stop the service",
                type: 'warning',
            })
        }else{
            resetTimer()
            setCoordinates([])
            setDistanceData({
                distance:0,
                average:0
            })
        }
    }

    const saveToDatabase = async () => {
        setLoading(true)
        // if(true){
        if(startAction){
            showMessage({
                message: 'Runner',
                description: "First stop the service",
                type: 'warning',
            })
        }else if(coordinates.length != 0){
            let data = await FIRESTORE.addData("UsersHistory", `${user.uid}`, `${timer.hours}:${timer.minutes}:${timer.seconds}`, `${((distanceData.distance)/1000).toFixed(3)} km`)
            if(data.success){
                showMessage({
                    message: 'Database',
                    description: data.mssg,
                    type: 'success',
                })
            }else{
                showMessage({
                    message: 'Database',
                    description: data.mssg,
                    type: 'danger',
                })
            }
        }else{
            showMessage({
                message: 'Runner',
                description: 'There is no data to save',
                type: 'danger',
            })
        }
        setLoading(false)
        reset()
    }

    return (
        <View>
            {loading ? <View style={styles.loadingContainer}>
                <ActivityIndicator color={Colors.primary} size={0.2*windowWidth} />
            </View> : null}
            <Map baseHeight={0.35*windowHeight} />
            {/* <Text style={styles.text}>{typeof(userLocation.coordinates)}</Text>
            <Text style={styles.text}>{startAction ? "True" : "False"}</Text>
            <Text style={styles.text}>{userLocation.coordinates.length}</Text> */}
            {/* <Text style={styles.text}>{coordinates.length}</Text> */}
            <View style={styles.belowContainer}>
                <View style={[styles.container, {flex:0.3}]}>
                    <View style={GlobalCSS.container}>
                        <Text style={styles.text}>{timer.hours}:{timer.minutes}:{timer.seconds}</Text>
                        <Text style={styles.text}>Timer</Text>
                    </View>
                    <View style={GlobalCSS.container}>
                        <Text style={styles.text}>{((distanceData.distance)/1000).toFixed(3)} km</Text>
                        <Text style={styles.text}>Distance</Text>
                    </View>
                    {/* <View style={GlobalCSS.container}>
                        <Text style={styles.text}>0/hr</Text>
                        <Text style={styles.text}>Average</Text>
                    </View> */}
                </View>
                <View style={[styles.container, {justifyContent:'center', flex:0.7}]}>
                    <View style={GlobalCSS.container}>
                        <IconA
                            name="reload"
                            color={Colors.primary}
                            size={0.1*windowWidth}
                            onPress={reset}
                        />
                    </View>
                    <View style={GlobalCSS.container}>
                        <View style={styles.btnContainer}>
                            {startAction ? <IconStop
                                name="stop"
                                color={Colors.primary}
                                size={0.2*windowWidth}
                                onPress={stopRunning}
                            /> : <IconA
                                name="run"
                                color={Colors.primary}
                                size={0.2*windowWidth}
                                onPress={startRunning}
                            />}
                        </View>
                    </View>
                    <View style={GlobalCSS.container}>
                        <IconB
                            name="cloudupload"
                            color={Colors.primary}
                            size={0.1*windowWidth}
                            onPress={saveToDatabase}
                        />
                    {/* <Button text="Save" methodToCall={saveToDatabase} /> */}
                    </View>
                </View>
                {/* <View style={[styles.container, {justifyContent:'center'}]}>
                    <Button text="Save" methodToCall={saveToDatabase} />
                </View> */}
            </View>
            {/* <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={[GlobalCSS.container, {backgroundColor:Colors.background_color}]}>
                        <Text style={styles.text}></Text>
                        <Text style={styles.text}>Timer</Text>
                    </View>
                    <View style={[GlobalCSS.container, {backgroundColor:Colors.background_color}]}>
                        <Text style={styles.text}>0 cal</Text>
                        <Text style={styles.text}>Calories</Text>
                    </View>
                    <View style={[GlobalCSS.container, {backgroundColor:Colors.background_color}]}>
                        <Text style={styles.text}>0/hr</Text>
                        <Text style={styles.text}>Average</Text>
                    </View>
                </View>
                <View style={[styles.container, {justifyContent:'center'}]}></View>
            </ScrollView> */}
        </View>
    )
}

export default Runner

const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        position:'absolute',
        zIndex:4,
        backgroundColor:'rgba(0,0,0,0.3)',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    btnContainer:{
        borderRadius:0.5*windowWidth,
        borderWidth:0.01*windowWidth,
        borderColor:Colors.primary,
        width:0.3*windowWidth,
        height:0.3*windowWidth,
        alignItems:'center',
        justifyContent:'center'
    },
    belowContainer:{
        width:'100%', 
        height:0.55*windowHeight,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:Colors.background_color
    },
    scrollContainer:{
        width:'100%',
        height:0.6*windowHeight,
    },
    container:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        color:Colors.primary,
        fontWeight:'bold',
        fontSize:0.05*windowWidth
    }
})