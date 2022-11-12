import React from 'react';
import { Platform, TextInput, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import appStyles from '../config/appStyles';

function AppTextInput({ icon, width = "100%", style, ...otherProps }) {
    return (
        <View style={[styles.container,{width}, style]}>
           {icon && <MaterialCommunityIcons 
                name={icon} 
                size={20}
                color={appStyles.themes.medium}
                style={styles.icon}
            />}
            <TextInput
            placeholderTextColor={appStyles.themes.medium}
            style={styles.textInput}
            {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appStyles.themes.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        alignItems: "center",
    },
    textInput: {
        color: appStyles.themes.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        flex: 1
    },
    icon: {
        marginRight: 10
    }
})

export default AppTextInput;