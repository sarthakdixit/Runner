import React from 'react'
import {Dimensions} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home'
import Login from '../screens/Login'
import History from '../screens/History'
import Runner from '../screens/Runner'
import Switch from './Switch'
import {Colors} from '../utils/Colors'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Stack = createStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator
        initialRouteName="Login"
        detachInactiveScreens={true}
    >
      {/* <Stack.Screen name="Switch" component={Switch} /> */}
      <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
      <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
      <Stack.Screen options={{
          title: 'History',
          headerStyle: {
            backgroundColor: Colors.background_color,
            height:0.1*windowHeight
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="History" component={History} />
      <Stack.Screen options={{
          title: 'Run',
          headerStyle: {
            backgroundColor: Colors.background_color,
            height:0.1*windowHeight
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Runner" component={Runner} />
    </Stack.Navigator>
  );
}