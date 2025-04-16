import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import CountriesScreen from './src/screens/CountriesScreen.js'

const Stack = createStackNavigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Countries">
        <Stack.Screen name="Countries" components={CountriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
