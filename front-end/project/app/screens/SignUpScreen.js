import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import App from '../../App';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

import {
    AppForm,
    AppFormField,
    SubmitButton,
} from '../components/Forms'
import appStyles from '../config/appStyles';

import routes from '../navigation/routes';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
    passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})


function SignUpScreen({ navigation }) {
    const handleSubmit = (values) => {
        console.log(values)
        navigation.navigate(routes.PROMPT)
    }
    return (
        <View style={[appStyles.statusBar, styles.container]}>
                <View style={styles.headerContainer}>
                    <AppText style={styles.header}>SignUp </AppText>
                    <AppText style={styles.subText}>Create your new account. </AppText>
                </View>
                <AppForm
                    initialValues={{email: '', password: '', passwordConfirmation: ''}}

                    onSubmit={values => handleSubmit(values)}
                    validationSchema={validationSchema}
                >
                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        name="email"
                        placeholder="Email"
                        textContentType="emailAddress"
                        style={styles.loginField}
                    />
                    <AppFormField 
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="password"
                        placeholder="Password"
                        secureTextEntry
                        textContentType="password"
                        style={styles.loginField}
                    />
                    <AppFormField 
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="passwordConfirmation"
                        placeholder="Re-type password"
                        secureTextEntry
                        textContentType="passwordConfirmation"
                        style={styles.loginField}
                    />
                    <SubmitButton 
                        style={styles.loginButton}
                        textColor={appStyles.themes.white} 
                        color={appStyles.themes.black} title="Sign up"/>
                    <View style={styles.loginNavContainer}>
                            <AppText style={styles.wrongText}>
                                Already have an account?
                            </AppText>

                            <TouchableWithoutFeedback
                                onPress={()=> navigation.navigate(routes.LOGIN)}
                            >
                                <AppText style={styles.loginText}>
                                    Login
                                </AppText>
                            </TouchableWithoutFeedback>
                    </View>   
                </AppForm>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "flexstart",
        marginTop: "25%"
    },
    loginText: {
        color: appStyles.themes.black,
        fontSize: 18,
        fontWeight: "800",
        marginLeft: 4
    },
    wrongText: {
        color: appStyles.themes.medium,
        fontSize: 18
    },
    loginNavContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 18
    },
    container: {
        padding: 10,
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'flex-start'
    },
    header: {
        fontWeight: "800",
        fontSize: 40
    },
    subText: {
        color: appStyles.themes.medium,
        marginBottom: 40,
        
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
        
    },
    loginField: {
        borderRadius: 8,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 2.65,

        elevation: 3,
        padding: 20,
    },
    loginButton: {
        backgroundColor: appStyles.themes.black,
        fontWeight: "100",
        borderRadius: 10,
        paddingVertical: 24,
        marginTop: 20
    },

})

export default SignUpScreen;