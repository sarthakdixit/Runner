import React, {useEffect, useState, useContext} from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import { FIRESTORE } from '../utils/Firestore'
import {LoginContext} from '../contexts/LoginContext'
import { showMessage } from 'react-native-flash-message'
import { GlobalCSS } from '../GlobalCSS'
import { Colors } from '../utils/Colors'
import HistoryList from '../components/HistoryList'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const History = () => {
    const {user} = useContext(LoginContext)
    const [history, setHistory] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let data = await FIRESTORE.getData("UsersHistory", `${user.uid}`)
        if(data.success){
            setHistory(data.data)
            showMessage({
                message: 'Database',
                description: data.mssg,
                type: 'success',
            })
            console.log(data.data)
        }else{
            showMessage({
                message: 'Database',
                description: data.mssg,
                type: 'danger',
            })
        }
    }

    return (
        <View style={GlobalCSS.container}>
            <FlatList
            data={history}
            renderItem={({ item }) => (
                <HistoryList obj={item} />
            )}
            keyExtractor={(item) => item.user}
            // onEndReachedThreshold={0}
            // onEndReached={loadMoreData}
            // ListFooterComponent={renderFooter}
      />
        </View>
    )
}

export default History

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
})