import React from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import AppText from '../components/AppText';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import appStyles from '../config/appStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get('window').width

let inks = 0;

function GenerateScreen(props) {
        return (
            <ScrollView style={[appStyles.statusBar]} contentContainerStyle={{flex: 1, justifyContent: "center"}}>
                <View style={styles.container}>

                  <View style={styles.imageContainer}>
                    <Image />
                  </View>

                  <View style={styles.inkContainer}>
                    <MaterialCommunityIcons name="water" size={35} color="black" />
                    <AppText>{inks}</AppText>
                  </View>
                    {/* this really should be a component, but I'm lazy and don't have the time */}
                    
                  <View style={styles.buttonContainer}>
                        <View style={styles.pickContainer}>
                            <View style={styles.subButton}>
                             <TouchableOpacity>
                                <MaterialCommunityIcons name="file-document-edit-outline" size={50} color="black" />
                              </TouchableOpacity>
                            </View>
                            <AppText style={styles.buttonText}>Keep copy</AppText>
                        </View>

                        <View style={styles.pickContainer}>
                                <View style={styles.buttonMain}>
                                    <TouchableOpacity>
                                        <MaterialCommunityIcons name="restart" size={76} color={appStyles.themes.white} />
                                    </TouchableOpacity>
                                </View>
                                <AppText style={styles.buttonTextMain}>Regenerate</AppText>
                        </View>
                   

                    <View style={styles.pickContainer}>
                            <View style={styles.subButton}>
                                 <TouchableOpacity>
                                    <FontAwesome name="paint-brush" size={40} color="black" />
                                 </TouchableOpacity>
                            </View>
                            <AppText style={styles.buttonText}>Keep Design</AppText>
                    </View>
                   
                </View>
                  </View>
            </ScrollView>
        );
}

const styles = StyleSheet.create({

  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonMain: {
    backgroundColor: appStyles.themes.black,
    borderRadius: "100%",
    width: 120,
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.59,
    shadowRadius: 1.65,
    justifyContent: 'center',
    alignItems: "center",
  },
  buttonText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700"
  },
  buttonTextMain: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700"
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  imageContainer: {
    marginTop: 50,
    width: "100%",
    height: width - 24,
    backgroundColor: appStyles.themes.black,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.59,
    shadowRadius: 5.65,

    elevation: 9,
  },
  inkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  subButton: {
    backgroundColor: "white",
    borderRadius: "50%",
    width: 80,
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.59,
    shadowRadius: 1.65,
    justifyContent: 'center',
    alignItems: "center",

    elevation: 7,
   },
   pickContainer: {
    alignItems: "center",
    justifyContent: "center"
   }

})

export default GenerateScreen;