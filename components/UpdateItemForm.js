import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  StatusBar,
  SafeAreaView,
} from "react-native"
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native"
import { Colours } from './Colours'
StatusBar.setHidden(true)

export default function UpdateItemForm({ updateItem, itemName, itemKey }) {
  const navigation = useNavigation();

  const onValidate = (values) => {
    let invalid = {};

    if (!values.name) {
      alert("Product name cannot be empty");
      invalid.name = "Required";
    }
    return invalid;
  };

  const backHome = () => {
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Formik
          validate={onValidate}
          initialValues={{ name: itemName, key: itemKey }}
          onSubmit={(value, actions) => {
            actions.resetForm();
            updateItem(itemKey, value.name, item);
            console.log("New object", value);
            console.log("New item name: ", itemName);
          }}
        >
          {(props) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Product name"
                onChangeText={props.handleChange("name")}
                value={props.values.name}
              />
              <TextInput
                style={styles.input}
                placeholder="Type of product (e.g Fresh food)"
                onChangeText={props.handleChange("type")}
                value={props.values.type}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                onChangeText={props.handleChange("qty")}
                value={props.values.qty}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  backHome();
                }}
                onPressIn={props.handleSubmit}
              >
                <Text style={styles.text}>Update product</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeContainer: {
    //flex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colours.salmon,
    padding: 30,
  },
  inputContainer: {
    marginTop: 100,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 5,
    height: '50%',
    justifyContent: "center",
  },
  input: {
    padding: 10,
    width: '100%',
    height: 50,
    borderColor: Colours.grey,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 30,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.blue,
    borderRadius: 5,
    height: 55,
    marginTop: 50,
  },
  buttonDisabled: {
    backgroundColor: "red",
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
});