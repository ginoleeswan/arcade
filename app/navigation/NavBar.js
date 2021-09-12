import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import { COLORS } from "../styles/colors";
import ProfileScreen from "../screens/ProfileScreen";

// import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size, style }) => {
          let iconName;

          if (route.name === "Discover") {
            iconName = focused ? "game-controller" : "game-controller-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          }

          // You can return any component that you like here!
          if (route.name === "Discover" || route.name === "Profile") {
            return (
              <View style={{ position: "absolute", top: "50%" }}>
                <Ionicons
                  name={iconName}
                  size={size}
                  color={color}
                  containerStyle={{ textAlignVertical: "center" }}
                />
              </View>
            );
          } else if (route.name === "Search") {
            return (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: -30,
                  width: 70,
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 70,
                  borderColor: "grey",
                  borderWidth: 1,
                  backgroundColor: COLORS.darkGrey,
                  ...styles.shadow,
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Ionicons
                  name={iconName}
                  size={size}
                  color={COLORS.beige}
                  containerStyle={{ textAlignVertical: "center" }}
                />
              </TouchableOpacity>
            );
          }
        },

        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.lightGrey,
        tabBarLabel: ({ focused }) => {
          if (route.name === "Discover" || route.name === "Profile") {
            return focused ? (
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Noah-Black",
                  top: 15,
                  color: COLORS.white,
                  textTransform: "uppercase",
                }}
              >
                {route.name}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Noah-Black",
                  top: 15,
                  color: COLORS.lightGrey,
                  textTransform: "uppercase",
                }}
              >
                {route.name}
              </Text>
            );
          }
        },
        // tabBarShowLabel: false,
        tabBarLabelStyle: { top: 15 },
        headerTitleAlign: "center",

        tabBarStyle: {
          position: "absolute",
          flex: 1,
          alignSelf: "center",
          bottom: 0,
          //   left: 20,
          //   right: 20,
          elevation: 0,
          padding: 0,
          backgroundColor: COLORS.mediumGrey,
          borderWidth: 0,
          height: 70,
          // ...styles.shadow,
        },
      })}
    >
      <Tab.Screen name="Discover" component={HomeScreen} />
      {/* <Tab.Screen name="Search" component={SearchScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default NavBar;
