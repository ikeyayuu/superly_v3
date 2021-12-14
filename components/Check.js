import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colours } from "./Colours";

//CheckBox component
export default function Check() {
  const [checkboxState, setCheckboxState] = useState(false);
  return (
    <TouchableOpacity>
      <BouncyCheckbox
        size={25}
        fillColor= {Colours.blue}
        unfillColor="white"
        isChecked={checkboxState}
        iconStyle={{ borderColor: "white" }}
        disableBuiltInState
        onPress={() => setCheckboxState(!checkboxState)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    marginLeft: 10,
  },
});