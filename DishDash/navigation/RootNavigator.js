import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from '../screens/LandingPage';  // import LandingPage here
import BottomTabNavigator from './BottomTabNavigator';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={({ route }) => ({ title: route.params.recipeName || 'Recipe Details' })}
      />
    </Stack.Navigator>
  );
}

