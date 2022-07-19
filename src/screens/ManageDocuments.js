import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyUploads from './MyUploads';
import SharedUploads from './SharedUploads';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="My Uploads" component={MyUploads} />
            <Tab.Screen name="Shared Uploads" component={SharedUploads} />
        </Tab.Navigator>
    );
}