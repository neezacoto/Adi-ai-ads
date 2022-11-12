import React, { useRef } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import App from '../../../App';
import AppText from '../AppText';

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
function OptionSliderForm(props) {
    const scrollView = useRef(); 

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollView} horizontal >
                <View style={styles.listContainer}>
                    {list.map(option => (
                        <View>
                        <TouchableOpacity onPress={()=> console.log(option.name)}>
                            <Image source={option.uri} style={styles.image} />
                        </TouchableOpacity>
                        <AppText style={styles.text}>{option.name}</AppText>
                        </ View>
                        
                    ))} 
                    
                </View>
            </ScrollView>
        </View>
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
  }

})

export default OptionSliderForm;