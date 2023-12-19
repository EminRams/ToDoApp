import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyDayScreen from './src/components/MyDayScreen';
import TasksScreen from './src/components/TasksScreen';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const COLORS = { primary: '#1f145c', white: '#fff' };

export default function MyTabs() {
  const styles = StyleSheet.create({
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      color: COLORS.primary
    }
  })


  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="My Day" component={MyDayScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}