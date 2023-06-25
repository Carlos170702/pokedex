import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';
import { NavigatorScreen } from './src/navigator/NavigatorScreen';

const App = () => {
  return (
    <NavigationContainer>
      <NavigatorScreen />
    </NavigationContainer>
  )
}

export default App