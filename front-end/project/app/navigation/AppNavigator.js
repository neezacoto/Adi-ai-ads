import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import routes from './routes';
import PromptNavigator from './PromptNavigator';
import PromptScreen from '../screens/PromptScreen';

const Stack = createStackNavigator();

function AppNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name={routes.WELCOME} 
                component={WelcomeScreen}
                options={{headerShown: false}}
                
            />
            <Stack.Screen 
                name={routes.LOGIN} 
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name={routes.SIGNUP}
                component={SignUpScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen 
                mode="modal"
                options={{
                    gestureEnabled: false,
                    headerShown: false
                }}
                name={routes.PROMPT}
                component={PromptNavigator}
            />
        </Stack.Navigator>
    );
}

export default AppNavigator;