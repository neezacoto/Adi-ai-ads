import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import appStyles from '../config/appStyles';

import routes from '../navigation/routes';

function WelcomeScreen({ navigation }) {

        return (
            <View style={[styles.container, appStyles.statusBar]}>
                <View style={styles.textContainer}>
                    <Image 
                        style={styles.image} 
                        source={require('../assets/LOGO.png')}
                    />
                    <AppText style={[styles.text, styles.header]} >
                         adi 
                    </AppText>
                    <AppText style={[styles.text, styles.subText]} >
                        Make ads in seconds with AI. 
                    </AppText>

                </View>
                <View style={styles.buttonContainer}>

                    <AppButton 
                        onPress={() => navigation.navigate(routes.SIGNUP)}
                        style={styles.loginButton} 
                        upperCase 
                        title="get started" 
                        color={appStyles.themes.white}/>
                    <AppButton 
                        onPress={() => navigation.navigate(routes.LOGIN)}
                        upperCase 
                        isInverted 
                        title="I already have an account" 
                        color={appStyles.themes.white}/>

                </View>
                
                
            </View>
        );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "90%",
    marginBottom: 60,
  },
  container: {
    backgroundColor: appStyles.themes.black,
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10
  },
  header: {
    fontSize: 50,
    fontWeight: "500"
  },
  image: {
    borderRadius: 15,
    width: 90,
    height: 90,
    backgroundColor: appStyles.themes.white
  },
  subText: {
    fontWeight: "400"
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: appStyles.themes.white
  },
  loginButton: {
    marginVertical: 20
  }

})

export default WelcomeScreen;