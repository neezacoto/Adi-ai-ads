import {useFormikContext } from 'formik';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';

import App from '../../../App';
import appStyles from '../../config/appStyles';
import AppText from '../AppText';
import ErrorMessages from './ErrorMessages';

const list = [
    {
        name: "Random",
        uri: require('../../assets/randomOption.png')
    },
    {
        name: "Photo",
        uri: require('../../assets/photoOption.png')
    },
    {
        name: "3D Render",
        uri: require('../../assets/3drenderOption.png')
    },
    {
        name: "Cartoon",
        uri: require('../../assets/cartoonOption.png')
    },
    {
        name: "Painting",
        uri: require('../../assets/paintingOption.png')
    },
    {
        name: "Hand Drawn",
        uri: require('../../assets/handDrawnOption.png')
    },
]
function OptionSliderForm({name}) {
    const scrollView = useRef(); 
    const { errors, setFieldValue, touched} = useFormikContext();

    const [isSelected, setIsSelected] = useState({});

    const toggleSelected = (style) => {
        setIsSelected({
          //...isSelected, <- to allow for multiple to be selected
          [style]: !isSelected[style],
        });
      };

    return (
        <>
            <View style={styles.container}>
                <ScrollView ref={scrollView} horizontal >
                    <View style={styles.listContainer}>
                        {list.map(option => (
                            <View>
                            <TouchableWithoutFeedback onPress={()=> {
                                    setFieldValue(option.name, option.name)
                                    toggleSelected(option.name)
                                }}>
                                <View style={[styles.styleContainer, styles.containerShadow]}>
                                    { isSelected[option.name] && <View style={styles.shadow}/> }
                                    <Image source={option.uri} style={styles.image} />
                                </View>
                            </TouchableWithoutFeedback>
                            <AppText style={styles.text}>{option.name}</AppText>
                            </ View>
                            
                            ))} 
                        
                    </View>
                </ScrollView>
            </View>
            <ErrorMessages visible={touched[name]} error={errors[name]} />
        </>
    );
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 20
  },
  listContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingLeft: 15
  },
  text: {
    fontWeight: "600"
  },
  shadow: {
    position: "absolute",
    backgroundColor: appStyles.themes.black,
    width: 100,
    height: 100,
    zIndex: 2,
    borderRadius: 20,
    opacity: .6,
    
  },
  styleContainer:{
    positon: "relative",
    borderRadius: 20,
    
  },
  containerShadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.59,
    shadowRadius: 2.65,

    elevation: 7,
  }
  
})

export default OptionSliderForm;