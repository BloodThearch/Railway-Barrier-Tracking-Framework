// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginPage from './screens/loginPage';
import registerPage from './screens/registerPage';
import directionPage from './screens/directionPage';
import mapPage from './screens/mapPage'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='mapPage'>
        <Stack.Screen name="loginPage" component={loginPage} />
        <Stack.Screen name="registerPage" component={registerPage} />
        <Stack.Screen name="directionPage" component={directionPage} />
        <Stack.Screen name="mapPage" component={mapPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;