import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import PromptNavigator from './PromptNavigator';
import LoginNavigator from './LoginNavigator';

const Stack = createStackNavigator();

function SignupNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Prompt" component={PromptNavigator}/>
            <Stack.Screen name="Login" component={LoginNavigator}/>

        </Stack.Navigator>
    );
}

export default SignupNavigator;