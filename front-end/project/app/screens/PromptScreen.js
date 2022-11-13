import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AppText from "../components/AppText";
import LottieView from 'lottie-react-native'


import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/Forms";
import OptionSliderForm from "../components/Forms/OptionSliderForm";
import appStyles from "../config/appStyles";
import routes from "../navigation/routes";
import Generating from "./LoadingScreen";
import LoadGenerateScreen from "./GenerateScreen";
import LoadGenerating from "./LoadingScreen";

const validationSchema = Yup.object().shape({
  background: Yup.string().required().min(1).label("Background Description"),
  product: Yup.string().required().min(1).label("Product Description"),
  target: Yup.string().required().min(1).label("Target Audience"),
  style: Yup.object().required().nullable().label("Style"),
});

function PromptScreen ({ navigation }) {

    const handleSubmit = async (values) => {
          console.log(values)
          navigation.navigate(routes.GENERATE)      
    }

  return (
      <>
    <ScrollView style={[styles.container, appStyles.statusBar]}>

        <Form
            initialValues={{
              background: "",
              product: "",
              target: "",
              style: null,
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={validationSchema}
            >
            <AppText style={styles.header}>Background Description</AppText>
            <FormField
                maxLength={255}
                name="background"
                placeholder="A photo of a delicious pizza on a table" />
            <AppText style={styles.header}>Product Description</AppText>
            <FormField
                style={styles.desc}
                maxLength={225}
                name="product"
                placeholder="Food delivery app."
                />
            <AppText style={styles.header}>Target Audience</AppText>
            <FormField
                maxLength={255}
                multiline
                name="target"
                numberOfLines={3}
                placeholder="Sick people."
                />
            <AppText style={styles.header}>Style</AppText>
            <OptionSliderForm
            name="style"
            />

            <View style={styles.submitContainer}>
                <SubmitButton
                    color={appStyles.themes.black}
                    textColor={appStyles.themes.white}
                    title="Let's go"
                    size={24}
                    />
            </View>

        </Form>
        </ScrollView>
      </>
        
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "500"
  },
  submitButton: {
    marginTop: "38%",
    position: "absolute",
  },
  desc: {

  },
  submitContainer: {
    marginTop: "10%"
  }

});
export default PromptScreen;
