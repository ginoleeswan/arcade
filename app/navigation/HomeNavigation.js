import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "./NavBar";
import GameInfoScreen from "../screens/GameInfoScreen";
import { enableScreens } from "react-native-screens";
import HomeScreen from "../screens/HomeScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

enableScreens();

const Stack = createSharedElementStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen
        name="Game Info"
        component={GameInfoScreen}
        sharedElements={(route) => {
          return [
            {
              id: route.params.game.id,
              animation: "fade",
              resize: "clip",
              // align: ''left-top'
            },
          ];
        }}
      />
    </Stack.Navigator>
  );
};
