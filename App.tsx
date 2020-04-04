/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, isMountedRef } from './src/Services/navigation.services';
import Login from './src/Scenes/loginScene';
import UserEvents from './src/Scenes/userEvents';
import EventList from './src/Scenes/eventList';
import EventDetails from './src/Scenes/eventDetails';

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
        isMountedRef.current = true;
        return () => (isMountedRef.current = false);
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="LoginScene">

                    <Stack.Screen name="LoginScene" component={Login} options={{ title: 'Login' }} />
                    <Stack.Screen name="UserEvents" component={UserEvents} options={{ title: 'Tracking Events', headerLeft: null }} />
                    <Stack.Screen name="EventList" component={EventList} options={{ title: 'Events' }} />
                    <Stack.Screen name="EventDetails" component={EventDetails} options={{ title: 'Event Description' }} />

                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView >
    );
};

export default App;
