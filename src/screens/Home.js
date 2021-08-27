import React, {useContext, useEffect} from 'react'
import { Text, View, StyleSheet, Image, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import { GlobalCSS } from '../GlobalCSS'
import { Colors } from '../utils/Colors'
import {Auth} from '../utils/Auth'
import { showMessage } from 'react-native-flash-message'
import {LoginContext} from '../contexts/LoginContext'
import IconLogout from 'react-native-vector-icons/SimpleLineIcons'
import IconA from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackActions } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Home = ({navigation}) => {
    const {user} = useContext(LoginContext)

    const logout = async () => {
        let data = await Auth.logout()
        if(data.success){
            showMessage({
                message: 'Google',
                description: data.mssg,
                type: 'success',
            })
            navigation.dispatch(
                StackActions.replace('Login')
            );
        }else{
            showMessage({
                message: 'Google',
                description: data.mssg,
                type: 'danger',
            })
        }
    }
    return (
        <SafeAreaView style={[GlobalCSS.container, {flexDirection:'column'}]}>
            <View style={[styles.container1, styles.shadow]}>
                <View style={styles.details_container}>
                    <View style={styles.image_container}>
                        <Image style={styles.image} source={{uri: user.photoURL}} />
                    </View>
                    <Text style={styles.main_text}>{user.displayName}</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <TouchableOpacity style={styles.inner_container} onPress={() => navigation.navigate("Runner")}>
                    <View style={styles.inner_container1}>
                    <IconA
                        name="run"
                        color={Colors.primary}
                        size={0.06*windowWidth}
                    />
                    </View>
                    <View style={styles.inner_container2}>
                        <Text style={styles.text}>Run</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inner_container} onPress={() => navigation.navigate("History")}>
                    <View style={styles.inner_container1}>
                    <IconA
                        name="history"
                        color={Colors.primary}
                        size={0.06*windowWidth}
                    />
                    </View>
                    <View style={styles.inner_container2}>
                        <Text style={styles.text}>History</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inner_container} onPress={logout}>
                    <View style={styles.inner_container1}>
                    <IconLogout
                        name="logout"
                        color={Colors.primary}
                        size={0.06*windowWidth}
                    />
                    </View>
                    <View style={styles.inner_container2}>
                        <Text style={styles.text}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* <Header text="Welcome" header={false} />
            <TouchableOpacity style={styles.button_container} onPress={logout}>
                <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    inner_container1:{
        flex:0.3,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    inner_container2:{
        flex:0.7,
        justifyContent:'center'
    },
    inner_container:{
        width:'100%',
        marginTop:0.01*windowHeight,
        flexDirection:'row',
        padding:0.005*windowHeight
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:0.5*windowWidth
    },
    image_container:{
        width:0.2*windowWidth,
        height:0.1*windowHeight,
        marginBottom:0.01*windowHeight
    },
    details_container:{
        marginBottom:0.03*windowHeight,
        marginLeft:0.05*windowWidth
    },
    shadow: {  
        borderColor:"#000",
        borderWidth:1,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    container1:{
        flex:0.5,
        backgroundColor:Colors.primary,
        width:'100%',
        borderBottomRightRadius:0.3*windowWidth,
        elevation:10,
        flexDirection:'column',
        justifyContent:'flex-end'
    },
    container2:{
        flex:0.5,
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:0.1*windowWidth
    },
    button_container:{
        padding:0.03*windowWidth,
        width:0.8*windowWidth,
        position:'absolute',
        bottom:0.15*windowHeight,
        backgroundColor:Colors.primary,
        borderRadius:0.1*windowWidth,
        alignItems:'center'
    },
    main_text:{
        fontSize:0.025*windowHeight,
        fontWeight:'bold',
        color:Colors.background_color
    },
    text:{
        fontSize:0.025*windowHeight,
        fontWeight:'bold',
        color:Colors.primary
    },
})