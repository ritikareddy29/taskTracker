import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout"
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return(
    <Drawer.Navigator screenOptions={{headerShown: false}}>
    <Drawer.Screen name="MyTasks" component={StackNavigator}/>
    <Drawer.Screen name = "Profile" component={Profile}/>
    <Drawer.Screen name = "Logout" component={Logout} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;