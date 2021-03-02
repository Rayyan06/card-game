import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import 'react-native-gesture-handler'
import { createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"


// You can import from local files
import HomeScreen from './components/HomeScreen';
import GameScreen from "./components/GameScreen";

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game" screenOptions={{
        headerStyle: {
             backgroundColor: '#f4511e'
           },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerShown: false
      }}>
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Game" component={GameScreen} options={{ 
           headerShown: true,

          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

