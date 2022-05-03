import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import HomeScreen from '../screens/Home/HomeScreen';
import ProfilScreen from '../screens/Home/ProfilScreen';
import PiyasaScreen from '../screens/Home/PiyasaScreen';
import AlSatScreen from '../screens/Home/AlSatScreen';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName='ProfilScreen'
      screenOptions={{
        tabBarActiveTintColor: '#f00',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#000',
          padding: 8,
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 14
        }
      }}
    >

      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='ProfilScreen'
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name='user' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='PiyasaScreen'
        component={PiyasaScreen}
        options={{
          tabBarLabel: 'Piyasalar',
          tabBarIcon: ({ color, size }) => (
            <Icon name='bitcoin' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='AlSatScreen'
        component={AlSatScreen}
        options={{
          tabBarLabel: 'Kolay Al Sat',
          tabBarIcon: ({ color, size }) => (
            <Icon name='exchange-alt' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='BottomTabStack'>
      <Stack.Screen
        name='BottomTabStack'
        component={BottomTabStack}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack