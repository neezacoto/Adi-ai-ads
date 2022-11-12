import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import appStyles from '../config/appStyles';
import AppText from './AppText';

function AppButton({title, color, size, textColor, style, isInverted, upperCase, ...otherProps}) {

        return (
            <TouchableOpacity 
            {...otherProps} 
            style={[
                {borderRadius: 25},
                styles.container,
                style, 
                isInverted
                    ? {borderColor: color, borderWidth: 1} 
                    : {backgroundColor: color}
            ]}>
                
            <AppText style={[
                (upperCase)? {textTransform: 'uppercase'}: {},
                {fontWeight: "bold", fontSize: size || 18, color: textColor},
                
                isInverted
                    ? {color: appStyles.themes.white} 
                    : {backgroundColor: color}
            ]}> 
                {title}
            </AppText>
            </TouchableOpacity>
            
        );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row"
    
  }

})

export default AppButton;