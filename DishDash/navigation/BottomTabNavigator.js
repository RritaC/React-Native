// navigation/BottomTabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RecipesScreen from '../screens/RecipesScreen';
import MealPlannerScreen from '../screens/MealPlannerScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CookingSpaceScreen from '../screens/CookingSpaceScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF7043',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#FFF3E0',
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0.1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Recipes':
              iconName = 'silverware-fork-knife';
              break;
            case 'Meal Planner':
              iconName = 'calendar-check';
              break;
            case 'Favorites':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Fridge':
              iconName = 'fridge';
              break;
            case 'Cooking Space':
              iconName = 'chef-hat';
              break;
            default:
              iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Recipes" component={RecipesScreen} />
      <Tab.Screen name="Meal Planner" component={MealPlannerScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cooking Space" component={CookingSpaceScreen} />
    </Tab.Navigator>
  );
}
