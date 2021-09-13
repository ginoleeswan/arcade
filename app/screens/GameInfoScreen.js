import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  FlatList,
} from "react-native";
// import { Image } from "react-native-elements";
import axios from "../api/IGDB";
import IDGBrequests from "../api/IGDBrequests";
import { printTable } from "console-table-printer";
import cTable from "console.table";
import { table } from "table";
import Accordion from "react-native-collapsible/Accordion";
import dateFormat from "dateformat";
import { Image as ImageElement } from "react-native-elements";

import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { COLORS } from "../styles/colors";
import IGDBrequests from "../api/IGDBrequests";
import { Icon, Rating, AirbnbRating } from "react-native-elements";
import { SharedElement } from "react-navigation-shared-element";
import Gallery from "react-native-image-gallery";
import Lightbox from "react-native-lightbox-v2";

const regex = /(<([^>]+)>)/gi;

const GameInfoScreen = ({ route, navigation }) => {
  const { game, key, screenshots } = route.params;

  const [visible, setIsVisible] = useState(false);

  const [activeSections, setActiveSections] = useState([]);
  const [arrowDirection, setArrowDirection] = useState(true);

  const opacity = useRef(new Animated.Value(0)).current;

  const [deck, setDeck] = useState("");

  const summary = game.description.replace(regex, "");

  let consoleLogo = null;
  let consoleLogoName = null;
  let consoleLogoType = null;

  const activeLightboxProps = {
    resizeMode: "contain",
    marginHorizontal: 20,
    flex: 1,
    width: null,
  };

  const SECTIONS = [
    {
      title: "About",
      content: summary,
    },
  ];

  // let consoles = game.platforms.filter(
  //   (item) =>
  //     item.platform.slug.startsWith("play") ||
  //     item.platform.slug.startsWith("xbox")
  // );

  // let firstConsole = consoles[0];

  let screenshotURI = screenshots.results.map(({ image, id }) => {
    // console.log(screenshot);
    // return (
    //   <Lightbox>
    //     <ImageElement
    //       source={{ uri: image }}
    //       style={{ width: 200, height: 200, margin: 10 }}
    //     />
    //   </Lightbox>
    // );
    return { uri: image, id: id };

    // console.log(image);
  });

  const consoles = game.platforms.map(({ platform }) => {
    // platform.filter((console) => console.slug.startsWith("playstation")

    if (platform.slug.startsWith("playstation")) {
      // item.platform.slug.slice(0);
      // consoleLogo = require(`../assets/icons/playstation3.png`);
      consoleLogoName = "logo-playstation";
      consoleLogoType = "ionicon";
    } else if (platform.slug === "pc") {
      // consoleLogo = require(`../assets/icons/pc.png`);
      consoleLogoName = "microsoft-windows";
      consoleLogoType = "material-community";
    } else if (platform.slug === "macos") {
      // consoleLogo = require(`../assets/icons/pc.png`);
      consoleLogoName = "logo-apple";
      consoleLogoType = "ionicon";
    } else if (platform.slug === "linux") {
      // consoleLogo = require(`../assets/icons/pc.png`);
      consoleLogoName = "linux";
      consoleLogoType = "font-awesome";
    } else if (platform.slug === "nintendo-switch") {
      // consoleLogo = require(`../assets/icons/nintendo-switch.png`);
      consoleLogoName = "nintendo-switch";
      consoleLogoType = "material-community";
    } else if (platform.slug === "xbox-one" || platform.slug === "xbox360") {
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
          style={{ padding: 5 }}
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
    // const gameArray = Object.values(game.platforms);
    // // printTable(gameArray);
    // console.log(firstConsole);
    // game.platforms.forEach((item) => {
    //   // console.log(table(item.platform.slug));
    //   console.table(item.platform.slug);
    // });
    // getIGDBInfo();
    // console.table(game.ratings);
    // console.log(screenshots);
  }, []);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      key={key}
      source={require("../assets/images/noise.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <SafeAreaView
        edges={["right", "top", "left"]}
        style={styles.appContainer}
      >
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
              <SharedElement id={game.id}>
                <Image
                  source={{ uri: game.background_image }}
                  style={styles.gameBackgroundImage}
                  // PlaceholderContent={<ActivityIndicator />}
                />
              </SharedElement>
              <View style={styles.imageOverlay}></View>
              {/* <View style={styles.gameLogoContainer}>
                <Image
                  source={require("../assets/icons/grand-theft-auto-v.png")}
                  style={{ width: 400, height: 200, resizeMode: "cover" }}
                />
              </View> */}
            </View>
            <Animated.View style={{ ...styles.gameMainInfoContainer, opacity }}>
              <View
                style={{
                  width: 80,
                  backgroundColor: COLORS.lightGrey,
                  alignItems: "center",
                  marginBottom: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    ...styles.p,
                    textTransform: "uppercase",
                    color: COLORS.darkGrey,
                  }}
                >
                  {dateFormat(game.released, "mmm d, yyyy")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {consoles}
              </View>
              <Text
                style={{ ...styles.h2, textAlign: "center", marginBottom: 20 }}
              >
                {game.name}
              </Text>
              <View style={{ top: -30 }}>
                <AirbnbRating
                  count={5}
                  size={20}
                  reviewSize={12}
                  starContainerStyle={{ top: -10 }}
                  isDisabled
                  defaultRating={Math.floor(game.rating)}
                  // tintColor="transparent"

                  reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                  showRating
                />
              </View>

              <View
                style={{
                  justifyContent: "flex-start",

                  top: 20,
                }}
              >
                <View style={styles.infoContainer}>
                  <Accordion
                    sections={SECTIONS}
                    activeSections={activeSections}
                    underlayColor={COLORS.mediumGrey}
                    renderHeader={(content, index, isActive, sections) => {
                      return (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.h2}>{content.title}</Text>
                          <Icon
                            name={isActive ? "angle-up" : "angle-down"}
                            color={COLORS.lightGrey}
                            type="font-awesome-5"
                            style={{ marginLeft: 10 }}
                          />
                        </View>
                      );
                    }}
                    renderContent={(section) => {
                      return (
                        <Text style={{ ...styles.p }}>{section.content}</Text>
                      );
                    }}
                    onChange={setActiveSections}
                  />
                </View>
                <View style={styles.screenshotsContainer}>
                  <Text style={styles.h2}>Screenshots</Text>

                  <FlatList
                    horizontal
                    data={screenshotURI}
                    renderItem={({ item }) => (
                      <ImageElement
                        source={{ uri: item.uri }}
                        style={{
                          width: 300,
                          height: 200,
                          marginRight: 15,
                          borderRadius: 10,
                        }}
                        PlaceholderContent={
                          <ActivityIndicator
                            color={COLORS.darkGrey}
                            size="large"
                          />
                        }
                      />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                      top: 10,
                      height: 210,
                      // width: "100%",
                      // borderColor: "white",
                      // borderWidth: 2,
                      alignItems: "center",
                    }}
                  />
                </View>
              </View>
            </Animated.View>
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
    height: 350,
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
    alignItems: "center",
    padding: 10,
    top: 150,
    left: 0,
    zIndex: 0,
  },
  infoContainer: {
    width: "100%",
    // height: "100%",
    marginVertical: 15,
    zIndex: 0,
  },
  screenshotsContainer: {
    width: "100%",
    // height: "100%",
    // marginVertical: 15,
    zIndex: 0,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 350,
    backgroundColor: "black",
    borderRadius: 40,

    opacity: 0.4,
    zIndex: 3,
  },
});

export default GameInfoScreen;
