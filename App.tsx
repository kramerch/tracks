import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Context as AuthContext, Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigation.service';
import { ParamListBase } from "@react-navigation/routers";

const LoginStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();
const TrackStack = createNativeStackNavigator();
const FullStack = createNativeStackNavigator();

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    }
}

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator initialRouteName="SignUp">
            <LoginStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }} />

            <LoginStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }} />
        </LoginStack.Navigator>
    );
}

const TrackStackScreen = () => {
    return (
        <TrackStack.Navigator>
            <TrackStack.Screen
                name="TrackList"
                component={TrackListScreen}
                options={{ title: 'Track List', headerTitleAlign:'center' }} />
            <TrackStack.Screen
                name="TrackDetail"
                component={TrackDetailScreen}
                options={{ title: 'Track Detail', headerTitleAlign:'center' }} />
        </TrackStack.Navigator>
    )
}

const MainStackScreen = () => {
    return (
        <MainTab.Navigator>
            <MainTab.Screen 
                name="TrackCreate"
                component={TrackCreateScreen}
                options={{ headerTitleAlign: 'center' }} />

            <MainTab.Screen
                name="Account"
                component={AccountScreen}
                options={{ headerTitleAlign: 'center' }} />

            <MainTab.Screen
                name="TrackStack"
                component={TrackStackScreen}
                options={{ headerShown: false }} />
        </MainTab.Navigator>
    )
}

const App: React.FC<{ ref: (navigator: NativeStackNavigationProp<ParamListBase>) => void }> = () => {
    const { state } = useContext(AuthContext);

    return (
        <NavigationContainer theme={AppTheme}>
            <FullStack.Navigator screenOptions={{ headerShown: false }}>
                { state.token
                    ? <FullStack.Screen
                        name="MainStack"
                        component={MainStackScreen} />
                    : <FullStack.Screen
                        name="LoginStack" 
                        component={LoginStackScreen} /> 
                }
            </FullStack.Navigator>
        </NavigationContainer>
    )
}

export default () => {
    return (
        <AuthProvider>
            <App ref={(navigator: NativeStackNavigationProp<ParamListBase>) => { setNavigator(navigator) }} />
        </AuthProvider>
    )
}
