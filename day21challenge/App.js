import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from './screens/MarketplaceScreen';
import SettingsScreen from './screens/SettingsScreen';
import AdminScreen from './screens/AdminScreen';
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Marketplace">
        <Drawer.Screen name="Marketplace" component={MarketplaceScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Administration" component={AdminScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}