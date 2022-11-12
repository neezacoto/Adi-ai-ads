import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";
import AppText from "../components/AppText";


import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/Forms";
import OptionSliderForm from "../components/Forms/OptionSliderForm";
import appStyles from "../config/appStyles";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image.")
});

function PromptScreen() {
  return (
    <ScrollView style={[styles.container, appStyles.statusBar]}>
        
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: []
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppText style={styles.header}>Background Description</AppText>
        <FormField 
            maxLength={255} 
            name="title" 
            numberOfLines={3}
            placeholder="A photo of a delicious pizza on a table" />
        <AppText style={styles.header}>Product Description</AppText>
        <FormField
          maxLength={225}
          name="price"
          numberOfLines={3}
          placeholder="Food delivery app."
          />
          <AppText style={styles.header}>Target Audience</AppText>
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <AppText style={styles.header}>Style</AppText>
        <OptionSliderForm />
        <SubmitButton 
            color={appStyles.themes.black} 
            textColor={appStyles.themes.white}
            title="Let's go" 
            size={24}
            style={styles.submitButton}
        />
      </Form>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "400"
  },
  submitButton: {
    marginTop: 28
  }
});
export default PromptScreen;
