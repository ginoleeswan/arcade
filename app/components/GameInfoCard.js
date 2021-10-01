import React, { useContext, useEffect, useState } from "react";
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
import { Image, Icon } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import axios from "../api/axios";
import requests from "../api/Requests";
import { SharedElement } from "react-navigation-shared-element";
import { GameLoadingContext } from "../context/GameLoadingContext";

const API_KEY = "a5dc51990cf541aba0f759e85e41a324";

export const GameInfoCard = ({ game, navigation, key }) => {
  let consoleLogoName = null;
  let consoleLogoType = null;
  const [loading, setLoading] = useState(false);
  const [gameLoading, setGameLoading] = useContext(GameLoadingContext);

  const { getGameByID } = requests;

  //   const parentPlatforms = game.parent_platforms.map(({ platform }) => {
  //     if (platform.slug.startsWith("playstation")) {
  //       consoleLogoName = "logo-playstation";
  //       consoleLogoType = "ionicon";
  //     } else if (platform.slug.startsWith("pc")) {
  //       consoleLogoName = "microsoft-windows";
  //       consoleLogoType = "material-community";
  //     } else if (platform.slug.startsWith("mac")) {
  //       consoleLogoName = "logo-apple";
  //       consoleLogoType = "ionicon";
  //     } else if (platform.slug.startsWith("linux")) {
  //       consoleLogoName = "linux";
  //       consoleLogoType = "font-awesome";
  //     } else if (platform.slug.startsWith("android")) {
  //       consoleLogoName = "android";
  //       consoleLogoType = "font-awesome";
  //     } else if (platform.slug.startsWith("ios")) {
  //       consoleLogoName = "apple-ios";
  //       consoleLogoType = "material-community";
  //     } else if (platform.slug.startsWith("web")) {
  //       consoleLogoName = "web";
  //       consoleLogoType = "material-community";
  //     } else if (platform.slug.startsWith("xbox")) {
  //       consoleLogoName = "microsoft-xbox";
  //       consoleLogoType = "material-community";
  //     }
  //     if (platform.slug.startsWith("nintendo")) {
  //       return (
  //         <Image
  //           source={require("../assets/icons/nintendo.png")}
  //           style={{ width: 25, height: 13, resizeMode: "contain" }}
  //         />
  //       );
  //     } else if (platform.slug.startsWith("atari")) {
  //       return (
  //         <Image
  //           source={require("../assets/icons/atari.png")}
  //           style={{ width: 25, height: 13, resizeMode: "contain" }}
  //         />
  //       );
  //     } else if (platform.slug.startsWith("sega")) {
  //       return (
  //         <Image
  //           source={require("../assets/icons/sega.png")}
  //           style={{ width: 25, height: 13, resizeMode: "contain" }}
  //         />
  //       );
  //     } else if (platform.slug.startsWith("commodore-amiga")) {
  //       return (
  //         <Image
  //           source={require("../assets/icons/commodore-amiga.png")}
  //           style={{ width: 25, height: 13, resizeMode: "contain" }}
  //         />
  //       );
  //     } else if (platform.slug.startsWith("neo-geo")) {
  //       return (
  //         <Image
  //           source={require("../assets/icons/neo-geo.png")}
  //           style={{ width: 25, height: 13, resizeMode: "contain" }}
  //         />
  //       );
  //     } else if (platform.slug.startsWith("3do")) {
  //       return (
  //         <Image
  //           source={require("../assets/icons/3do.png")}
  //           style={{ width: 25, height: 13, resizeMode: "contain" }}
  //         />
  //       );
  //     } else {
  //       return (
  //         <Icon
  //           name={consoleLogoName}
  //           color={COLORS.lightGrey}
  //           type={consoleLogoType}
  //           size={16}
  //           style={{ paddingHorizontal: 5 }}
  //         />
  //       );
  //     }
  //   });

  const searchGame = async () => {
    try {
      setLoading(true);
      setGameLoading(true);
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
      setGameLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setGameLoading(false);
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
          {
            gameLoading == true ? null : searchGame(game);
          }

          //   console.log(game.name);
          //   console.log(game.id);
          //   console.log(game.slug);
        }}
        style={{ ...styles.shadow, ...styles.infoCard }}
      >
        <MaskedView
          style={{ ...styles.gameCard }}
          maskElement={
            <SquircleView
              style={StyleSheet.absoluteFill}
              squircleParams={{
                cornerRadius: 25,
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

        <View
          style={{
            flexWrap: "wrap",
            height: 75,
            flexDirection: "column",
            // backgroundColor: "blue",
            justifyContent: "space-around",
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              ...styles.h2,
              fontSize: 16,
              paddingLeft: 5,
              width: 210,
              //   backgroundColor: "blue",
              flexWrap: "wrap",
            }}
          >
            {game.name}
          </Text>
          {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 210,
              overflow: "hidden",
              //   backgroundColor: "blue",
            }}
          >
            {game.parent_platforms ? parentPlatforms : null}
          </View> */}
          <View
            style={{
              flexDirection: "row",
              width: 210,
              //   backgroundColor: "blue",
              justifyContent: "flex-start",
              paddingLeft: 4,
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Icon
              name={"star"}
              iconType={"material-community"}
              color={"#FFD300"}
              size={16}
            />
            <Text style={{ ...styles.p, marginLeft: 4 }}>{game.rating}</Text>
          </View>
        </View>
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
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    backgroundColor: "#383838",
    borderRadius: 30,
    marginBottom: 20,
  },
  gameCard: {
    width: 80,
    height: 80,
    // borderRadius: 40,
    marginHorizontal: 10,
    marginVertical: 10,
    // marginBottom: 20,
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
