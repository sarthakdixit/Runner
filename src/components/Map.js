import React, {useContext} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import {LoginContext} from '../contexts/LoginContext'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Map = ({baseHeight}) => {
    const {startAction, userLocation, coordinates, setCoordinates} = useContext(LoginContext)
    return (
        <MapView 
        provider={PROVIDER_GOOGLE}
        style={{height:baseHeight}}
        region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0003,
            longitudeDelta: 0.0003,
        }}
        >
            <Marker
                coordinate={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                }}>
            </Marker>
            <Polyline
                coordinates={coordinates}
                strokeColor="#bf8221"
                strokeColors={[ '#bf8221', '#ffe066', '#ffe066', '#ffe066', '#ffe066', ]}
                strokeWidth={3}
            />
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map:{
        height:'100%'
    }
})
