import React from "react";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";

import { HomeNavigation } from "./app/navigation/HomeNavigation";
import { GamesProvider } from "./app/context/GamesContext";
import { StatusBar } from "react-native";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Noah-Black": require("./app/assets/fonts/Noah-Black.ttf"),
    "Noah-Bold": require("./app/assets/fonts/Noah-Bold.ttf"),
    "Noah-BoldItalic": require("./app/assets/fonts/Noah-BoldItalic.ttf"),
    "Noah-Regular": require("./app/assets/fonts/Noah-Regular.ttf"),
    "Noah-RegularItalic": require("./app/assets/fonts/Noah-RegularItalic.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <GamesProvider>
        <SafeAreaProvider>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <NavigationContainer>
            <HomeNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </GamesProvider>
    );
  }
}
