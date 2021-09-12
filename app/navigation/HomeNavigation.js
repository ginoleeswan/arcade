import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavBar from "./NavBar";
import GameInfoScreen from "../screens/GameInfoScreen";

const Stack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={NavBar} />
      <Stack.Screen name="Game Info" component={GameInfoScreen} />
    </Stack.Navigator>
  );
};
