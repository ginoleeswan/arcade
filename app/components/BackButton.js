import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../styles/colors";
import TouchableScale from "react-native-touchable-scale";
import { SquircleView } from "react-native-figma-squircle";

const BackButton = ({ navigation: { goBack } }) => {
  return (
    <TouchableScale onPress={() => goBack()} style={styles.button}>
      {/* <SquircleView
        style={StyleSheet.absoluteFill}
        squircleParams={{
          cornerRadius: 18,
          cornerSmoothing: 1,
          fillColor: COLORS.plum,
        }}
      /> */}

      <Icon name="chevron-back" style={styles.backIcon}></Icon>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  backIcon: {
    color: COLORS.lightGrey,
    fontSize: 40,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    // marginLeft: 1,
  },
});

export default BackButton;
