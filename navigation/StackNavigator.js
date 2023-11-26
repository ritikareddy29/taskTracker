import React from 'react';
import TaskScreen from "../screens/TaskScreen"
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return(
    <Stack.Navigator
    initialRouteName = "Home"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={TabNavigator} />
    <Stack.Screen name ="TaskScreen" component={TaskScreen}/>
    </Stack.Navigator>
  )
}

export default StackNavigator