import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import QrHistory from '../screens/QrHistory';
import Home from '../screens/Home';


const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home" >
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Stack.Screen name="History" component={QrHistory} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StackNavigation