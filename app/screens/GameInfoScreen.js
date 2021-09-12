import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import axios from "../api/IGDB";
import IDGBrequests from "../api/IGDBrequests";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { COLORS } from "../styles/colors";
import IGDBrequests from "../api/IGDBrequests";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native";

const regex = /(<([^>]+)>)/gi;

const GameInfoScreen = ({ route, navigation }) => {
  const { game } = route.params;

  const [deck, setDeck] = useState("");

  const summary = game.description.replace(regex, "");

  let consoleLogo = null;
  let consoleLogoName = null;
  let consoleLogoType = null;

  const consoles = game.platforms.map((item) => {
    if (
      item.platform.slug === "playstation3" ||
      item.platform.slug === "playstation4" ||
      item.platform.slug === "playstation5"
    ) {
      // consoleLogo = require(`../assets/icons/playstation3.png`);
      consoleLogoName = "logo-playstation";
      consoleLogoType = "ionicon";
    } else if (item.platform.slug === "pc") {
      // consoleLogo = require(`../assets/icons/pc.png`);
      consoleLogoName = "microsoft-windows";
      consoleLogoType = "material-community";
    } else if (item.platform.slug === "macos") {
      // consoleLogo = require(`../assets/icons/pc.png`);
      consoleLogoName = "logo-apple";
      consoleLogoType = "ionicon";
    } else if (item.platform.slug === "linux") {
      // consoleLogo = require(`../assets/icons/pc.png`);
      consoleLogoName = "linux";
      consoleLogoType = "font-awesome";
    } else if (item.platform.slug === "nintendo-switch") {
      // consoleLogo = require(`../assets/icons/nintendo-switch.png`);
      consoleLogoName = "nintendo-switch";
      consoleLogoType = "material-community";
    } else if (
      item.platform.slug === "xbox-one" ||
      item.platform.slug === "xbox360"
    ) {
      // consoleLogo = require(`../assets/icons/xbox-one.png`);
      consoleLogoName = "microsoft-xbox";
      consoleLogoType = "material-community";
    }
    return (
      <>
        {/* <Text>{item.platform.name}</Text> */}

        <Icon
          name={consoleLogoName}
          color={COLORS.lightGrey}
          type={consoleLogoType}
        />

        {/* <Image source={consoleLogo} style={{ width: 20, height: 20 }} /> */}
      </>
    );
  });

  const getIGDBInfo = () => {
    axios({
      url: `https://api.igdb.com/v4/games/?search=${game.name}&fields=name,slug,summary`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": "zswi78m04chi1vcofi7ze5dxk13b1f",
        Authorization: "Bearer o5f4eeqg06i6084za79fxoqoo13wi3",
      },
      // data: `fields name, summary, follows; sort follows desc;`,
    })
      .then((response) => {
        const IGDBdata = response.data[0];
        console.log(response.data);
        setDeck(IGDBdata.summary);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const IGDBdata = request.data[0];
  // setDeck(IGDBdata.summary);

  // console.log(request.data);

  // const requestCover = await axios.get(
  //   `https://api.igdb.com/v4/covers/?id=${coverID}&fields=height,width,url`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Client-ID": "zswi78m04chi1vcofi7ze5dxk13b1f",
  //       Authorization: "Bearer o5f4eeqg06i6084za79fxoqoo13wi3",
  //     },
  //   }
  // );
  // console.log(requestCover.data);
  // } catch (error) {
  //   console.log(error);
  // }

  useEffect(() => {
    game.platforms.forEach((item) => {
      console.log(item.platform.slug);
    });

    // getIGDBInfo();
  }, []);

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
        <Header title={""} backbutton={true} navigation={navigation} />
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -2,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <View style={styles.gameBackgroundImageContainer}>
              <Image
                source={{ uri: game.background_image }}
                style={styles.gameBackgroundImage}
                PlaceholderContent={<ActivityIndicator />}
              />
              <View style={styles.imageOverlay}></View>
              <View style={styles.gameLogoContainer}>
                <Image
                  source={require("../assets/icons/grand-theft-auto-v.png")}
                  style={{ width: 400, height: 200, resizeMode: "cover" }}
                />
              </View>
            </View>
            <View style={styles.gameMainInfoContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                {consoles}
              </View>
              <Text
                style={{ ...styles.h2, textAlign: "center", marginBottom: 20 }}
              >
                {game.name}
              </Text>
            </View>
            <View style={styles.aboutContainer}>
              <Text style={styles.h2}>About</Text>
              <Text style={{ ...styles.p, textAlign: "center" }}>
                {summary}
              </Text>
            </View>
          </ScrollView>
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
    fontSize: 25,
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
  gameBackgroundImage: {
    width: "100%",
    height: 400,
    borderRadius: 40,
  },
  gameBackgroundImageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  gameLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: -250,
    left: 0,
    zIndex: 4,
  },
  gameMainInfoContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    padding: 10,
    top: 320,
    left: 0,
    zIndex: 0,
  },
  aboutContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    padding: 10,
    top: 400,
    left: 0,
    zIndex: 0,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 400,
    backgroundColor: "black",
    borderRadius: 40,

    opacity: 0.4,
    zIndex: 3,
  },
});

export default GameInfoScreen;
