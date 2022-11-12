import Constants  from 'expo-constants';
import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
    statusBar: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    },
    text: {
        fontSize: 20,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }, 
    themes: {
        primary: '#000',
        secondary: '#fff',
        black: "#000",
        white: "#fff",
        medium: "#6e6969",
        light: "#f8f4f4",
        dark: "#0c0c0c",
        danger:"#ff5252"
    }
})
export default appStyles;