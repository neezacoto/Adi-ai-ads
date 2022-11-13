import Constants  from 'expo-constants';
import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
    statusBar: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },
    statusBarHeight: Constants.statusBarHeight,
    text: {
        fontSize: 20,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }, 
    themes: {
        primary: '#000',
        secondary: '#fff',
        black: "#000",
        white: "#fff",
        medium: "#888888",

        light: "#EEEEEE",
        dark: "#0c0c0c",
        danger:"#ff5252"
    }
})
export default appStyles;