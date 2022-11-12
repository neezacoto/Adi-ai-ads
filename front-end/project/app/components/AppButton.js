import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import appStyles from '../config/appStyles';
import AppText from './AppText';

function AppButton({title, color, style, isInverted, upperCase, ...otherProps}) {

        return (
            <TouchableOpacity 
            {...otherProps} 
            style={[
                style, 
                styles.container,
                isInverted
                    ? {borderColor: color, borderWidth: 1} 
                    : {backgroundColor: color}
            ]}>
                
            <AppText style={[
                (upperCase)? {textTransform: 'uppercase'}: {},
                {fontWeight: "bold", fontSize: 18},
                
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
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row"
    
  }

})

export default AppButton;