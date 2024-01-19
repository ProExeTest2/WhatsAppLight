// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/splash/WelcomeScreen';
import SplasScreen from '../screens/splash/SplasScreen';
import PhoneAuth from '../screens/auth/PhoneAuth';
import OtpScreen from '../screens/auth/OtpScreen';
import CallScreen from '../screens/tab/CallScreen';
import StoryScreen from '../screens/tab/status/StoryScreen';
import ChatScreen from '../screens/tab/chat/ChatScreen';
import ChatData from '../screens/tab/chat/ChatData';
import Index from '../screens/tab/Index';
import VideoCall from '../screens/tab/chat/video/VideoCall';
import StatusShow from '../screens/tab/status/StatusShow';
import SettingIndex from '../screens/setting/SettingIndex';
import ProfileScreen from '../screens/setting/Account/ProfileScreen';
import ChatsSetting from '../screens/setting/chat/ChatsSetting';


const Stack = createNativeStackNavigator();

const routes=()=> {
// import { useColorScheme } from "react-native";
// const colorScheme = useColorScheme();
// console.log('colorScheme', colorScheme)
  return (
    <NavigationContainer
    // theme={}
    >
      <Stack.Navigator initialRouteName='SplasScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name="SplasScreen" component={SplasScreen} />
        <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen name="StoryScreen" component={StoryScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ChatData" component={ChatData} />
        <Stack.Screen name="VideoCall" component={VideoCall} />
        <Stack.Screen name="StatusShow" component={StatusShow} />
        <Stack.Screen name="SettingIndex" component={SettingIndex} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChatsSetting" component={ChatsSetting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default routes;