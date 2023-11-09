import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './StackNavigation/StackNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (

      <NavigationContainer>
            {/* <GestureHandlerRootView></GestureHandlerRootView> */}
        <StackNavigation/>
      </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})