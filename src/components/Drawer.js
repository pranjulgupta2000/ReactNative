import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Image, ImageBackground, Text } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import ManageUser from "../screens/ManageUser";
import ManageDocuments from "../screens/ManageDocuments";
import GroupChat from "../screens/GroupChat";
//import Logout from "./Logout";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logout from "../screens/Logout";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        // <Drawer.Navigator
        // drawerContent={props => <CustomDrawer {...props} />}
        // screenOptions={{
        //   headerShown: false,
        //   drawerActiveBackgroundColor: '#aa18ea',
        //   drawerActiveTintColor: '#fff',
        //   drawerInactiveTintColor: '#333',
        //   drawerLabelStyle: {
        //     marginLeft: -25,
        //     fontFamily: 'Roboto-Medium',
        //     fontSize: 15,
        //   },
        // }}>
        <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
            }} />
            <Drawer.Screen name="Manage User" component={ManageUser} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="people-outline" size={22} color={color} />
                ),
            }} />
            <Drawer.Screen name="Manage Documents" component={ManageDocuments} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="document-text-outline" size={22} color={color} />
                ),
            }} />
            <Drawer.Screen name="Group Chat" component={GroupChat} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="chatbubbles-outline" size={22} color={color} />
                ),
            }} />
            <Drawer.Screen name="Profile" component={Profile} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
            }} />
            <Drawer.Screen name="Logout" component={Logout} options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
            }} />
        </Drawer.Navigator>
    )
}