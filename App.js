// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginPage from './screens/loginPage';
import registerPage from './screens/registerPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="loginPage" component={loginPage} />
        <Stack.Screen name="registerPage" component={registerPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;