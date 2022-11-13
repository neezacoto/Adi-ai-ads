import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import GenerateScreen from '../screens/GenerateScreen';
import PromptScreen from '../screens/PromptScreen';
import routes from './routes';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

function PromptNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                options={{
                    gestureEnabled: false,
                    headerShown: false
                }}
                name={routes.PROMPT} 
                component={PromptScreen}/>
            <Stack.Screen 
                options={{
                    headerShown: false
                }}
                name={routes.GENERATE}
                component={GenerateScreen}
            />
            <Stack.Screen
                options={{
                    gestureEnabled: false,
                    headerShown: false
                }}
                name={routes.LOAD}
                component={LoadingScreen}
            />
        </Stack.Navigator>
    );
}

export default PromptNavigator;