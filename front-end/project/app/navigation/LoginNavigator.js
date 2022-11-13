import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PromptNavigator from './PromptNavigator';
import routes from './routes';
import GenerateScreen from '../screens/GenerateScreen';

const Stack = createStackNavigator();

function LoginNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={routes.PROMPT} component={PromptNavigator}/>
            <Stack.Screen name={routes.GENERATE} component={GenerateScreen} />
            
        </Stack.Navigator>
    );
}

export default LoginNavigator;