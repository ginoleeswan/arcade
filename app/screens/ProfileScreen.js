import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";

const ProfileScreen = ({ navigator }) => {
  return (
    <ImageBackground
      source={require("../assets/images/noise.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <SafeAreaView style={styles.appContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View style={styles.header}>
          <Text style={styles.h2}>PROFILE</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    overflow: "hidden",
    backgroundColor: COLORS.darkGrey,
    flex: 1,
  },
  appContainer: {
    flex: 1,
    backgroundColor: "transparent",
    // justifyContent: "center",
    // alignItems: "center",
  },
  h2: {
    fontFamily: "Noah-Black",
    fontSize: 30,
    color: COLORS.lightGrey,
  },
  p: {
    fontFamily: "Noah-Regular",
    fontSize: 12,
    color: COLORS.lightGrey,
  },
  grainOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  header: {
    paddingHorizontal: 15,
  },
});

export default ProfileScreen;
