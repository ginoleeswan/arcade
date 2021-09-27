import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { COLORS } from "../styles/colors";
import { SquircleView } from "react-native-figma-squircle";
import MaskedView from "@react-native-masked-view/masked-view";
import InsetShadow from "react-native-inset-shadow";
import {} from "react-native";
import { Image } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import axios from "../api/axios";
import requests from "../api/Requests";
import { SharedElement } from "react-navigation-shared-element";

const API_KEY = "a5dc51990cf541aba0f759e85e41a324";

export const GameCard = ({ game, navigation, key }) => {
  const [loading, setLoading] = useState(false);

  const { getGameByID } = requests;

  const searchGame = async () => {
    try {
      setLoading(true);
      const request = await axios.get(
        `${getGameByID}${game.id}?key=${API_KEY}`
      );
      const requestScreenshots = await axios.get(
        `${getGameByID}${game.id}/screenshots/?key=${API_KEY}`
      );
      const requestTrailers = await axios.get(
        `${getGameByID}${game.id}/movies/?key=${API_KEY}`
      );
      const requestStores = await axios.get(
        `${getGameByID}${game.id}/stores/?key=${API_KEY}`
      );
      const requestGameSeries = await axios.get(
        `${getGameByID}${game.id}/game-series/?key=${API_KEY}`
      );
      const gameData = request.data;
      const gameScreenShots = requestScreenshots.data;
      const gameTrailers = requestTrailers.data;
      const gameStores = requestStores.data;
      const gameSeries = requestGameSeries.data;
      // console.log(gameScreenShots);
      navigation.push("Game Info", {
        game: gameData,
        screenshots: gameScreenShots,
        trailers: gameTrailers,
        stores: gameStores,
        series: gameSeries,
        key: key,
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    // <Animated.View
    //   key={key}
    //   style={[{ transform: [{ scale }] }, styles.shadow]}
    // >

    <SharedElement id={game.id}>
      <TouchableScale
        key={key}
        activeScale={0.9}
        tension={50}
        friction={4}
        onPress={() => {
          searchGame(game);
          console.log(game.name);
          console.log(game.id);
          console.log(game.slug);
        }}
        style={styles.shadow}
      >
        <MaskedView
          style={styles.gameCard}
          maskElement={
            <SquircleView
              style={StyleSheet.absoluteFill}
              squircleParams={{
                cornerRadius: 45,
                cornerSmoothing: 1,
                fillColor: "pink",
              }}
            />
          }
        >
          <InsetShadow
            shadowOpacity={1}
            shadowColor={COLORS.darkGrey}
            shadowRadius={10}
            elevation={15}
          >
            <Image
              source={{ uri: game.background_image }}
              resizeMode="cover"
              style={styles.cardImage}
              PlaceholderContent={<ActivityIndicator />}
            />

            <ImageBackground
              source={require("../assets/images/noise.png")}
              resizeMode="repeat"
              style={styles.cardBackground}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  paddingHorizontal: 5,
                  paddingVertical: 15,
                  paddingBottom: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    ...styles.h2,
                    fontSize: 20,
                    textAlign: "center",
                    textShadowColor: "rgba(0, 0, 0, 1)",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 5,
                  }}
                >
                  {game.name}
                </Text>
              </View>
              {loading === true ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    opacity: 0.4,
                  }}
                >
                  <ActivityIndicator size="large" color={COLORS.darkGrey} />
                </View>
              ) : null}
            </ImageBackground>
            {/* </LinearGradient> */}
          </InsetShadow>
        </MaskedView>
      </TouchableScale>
    </SharedElement>
    // </Animated.View>
  );
};

const styles = StyleSheet.create({
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
  cardBackground: {
    // overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    // borderRadius: 40,
    // padding: 10,
  },
  cardGradient: {
    // overflow: "hidden",
    backgroundColor: COLORS.plum,
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    // opacity: 0.5,
    // borderRadius: 40,
    padding: 10,
    height: "100%",
    width: "100%",
  },
  gameCard: {
    width: 170,
    height: 200,
    // borderRadius: 40,
    marginHorizontal: 8,

    marginBottom: 20,
    // backgroundColor: COLORS.plum,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    // borderColor: COLORS.darkGrey,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
