import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import AppText from './app/components/AppText';
import OptionSliderForm from './app/components/Forms/OptionSliderForm';

import appStyles from './app/config/appStyles';
import LoginScreen from './app/screens/LoginScreen';
import PromptScreen from './app/screens/PromptScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <PromptScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    
  },
});
