import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";
import BackButton from "./BackButton";

const Header = ({ title, backbutton, navigation }) => {
  if (backbutton) {
    return (
      <View style={styles.header}>
        <BackButton navigation={navigation} />
        <Text style={styles.appTitle}>{title}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.headerNoBackButton}>
        <Text style={styles.appTitle}>{title}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    // paddingHorizontal: 50,
    marginBottom: 30,
    alignItems: "center",
  },
  headerNoBackButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    // paddingHorizontal: 35,
    marginBottom: 30,
    alignItems: "center",
  },
  appTitle: {
    fontFamily: "Noah-Bold",
    fontSize: 30,
    alignSelf: "center",
    textAlign: "right",
    color: COLORS.lightGrey,
  },
});

export default Header;
