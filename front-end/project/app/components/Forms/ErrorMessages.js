import React from 'react';
import { StyleSheet } from 'react-native';
import appStyles from '../../config/appStyles';
import AppText from '../AppText';


function ErrorMessages({error,visible}) {
    if(!visible || !error) return null;

    return (
       <AppText style={styles.error}>{error}</AppText>
    );
}

const styles = StyleSheet.create({
    error: {color: appStyles.themes.danger}
})

export default ErrorMessages;