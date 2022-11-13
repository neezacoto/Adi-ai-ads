import LottieView from 'lottie-react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native'
import AppText from '../components/AppText';
import appStyles from '../config/appStyles';
import routes from '../navigation/routes';

function LoadingScreen({ onDone }) {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView 
            source={require('../assets/animations/generating.json')}
            autoPlay
            loop
            onAnimationFinish={onDone}
            />
            <AppText style={styles.text}>Painting...</AppText>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appStyles.themes.black,
        zIndex: 5
    },
    text: {
        position: "absolute",
        bottom: "15%",
        color: appStyles.themes.white,
        fontSize: 40,
        fontWeight: "bold"

    }
})


export default LoadingScreen;