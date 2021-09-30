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
  FlatList,
} from "react-native";
// import { Image } from "react-native-elements";
import axios from "../api/IGDB";
import IDGBrequests from "../api/IGDBrequests";
import cTable from "console.table";
import { table } from "table";
import Accordion from "react-native-collapsible/Accordion";
import dateFormat from "dateformat";
import { Image as ImageElement, Chip } from "react-native-elements";
import ReadMore from "@fawazahmed/react-native-read-more";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../components/Header";
import { COLORS } from "../styles/colors";
import IGDBrequests from "../api/IGDBrequests";
import { Icon, Rating, AirbnbRating } from "react-native-elements";
import { SharedElement } from "react-navigation-shared-element";
import Lightbox from "react-native-lightbox-v2";
import { Video } from "expo-av";
import { GameCard } from "../components/GameCard";

const regex = /(<([^>]+)>)/gi;

const GameInfoScreen = ({ route, navigation }) => {
  const { game, key, screenshots, trailers, stores, series } = route.params;

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
    // resizeMode: "contain",
    // marginHorizontal: 20,
    // flex: 1,
    // width: null,
  };

  const insets = useSafeAreaInsets();

  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 270 + insets.top],
    outputRange: [0, insets.top - 270],
    extrapolate: "clamp",
  });
  const translateYGameTitle = scrollY.interpolate({
    inputRange: [0, 270 + insets.top],
    outputRange: [0, insets.top + 18],
    extrapolate: "clamp",
  });
  const sizeGameTitle = scrollY.interpolate({
    inputRange: [180, 270 + insets.top],
    outputRange: [1, 0.7],
    extrapolate: "clamp",
  });
  const translateYGameImage = scrollY.interpolate({
    inputRange: [0, 270 + insets.top],
    outputRange: [0, insets.top + 180],
    extrapolate: "clamp",
  });
  const fadeOutOnScroll = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const SECTIONS = [
    {
      title: "About",
      content: summary,
    },
  ];

  let screenshotURI = screenshots.results.map(({ image, id }) => {
    // return (
    //   <Lightbox>
    //     <ImageElement
    //       source={{ uri: image }}
    //       style={{ width: 200, height: 200, margin: 10 }}
    //     />
    //   </Lightbox>
    // );
    return { uri: image, id: id };
  });

  let gameTrailers = trailers.results.map(({ name, preview, data, id }) => {
    return { thumbnailURI: preview, id: id, name: name, videoURI: data };
  });

  let gameSeries = series.results.map(({ name, background_image, id }) => {
    return { background_image: background_image, id: id, name: name };
  });

  const parentPlatforms = game.parent_platforms.map(({ platform }) => {
    if (platform.slug.startsWith("playstation")) {
      consoleLogoName = "logo-playstation";
      consoleLogoType = "ionicon";
    } else if (platform.slug.startsWith("pc")) {
      consoleLogoName = "microsoft-windows";
      consoleLogoType = "material-community";
    } else if (platform.slug.startsWith("mac")) {
      consoleLogoName = "logo-apple";
      consoleLogoType = "ionicon";
    } else if (platform.slug.startsWith("linux")) {
      consoleLogoName = "linux";
      consoleLogoType = "font-awesome";
    } else if (platform.slug.startsWith("android")) {
      consoleLogoName = "android";
      consoleLogoType = "font-awesome";
    } else if (platform.slug.startsWith("ios")) {
      consoleLogoName = "apple-ios";
      consoleLogoType = "material-community";
    } else if (platform.slug.startsWith("web")) {
      consoleLogoName = "web";
      consoleLogoType = "material-community";
    } else if (platform.slug.startsWith("xbox")) {
      consoleLogoName = "microsoft-xbox";
      consoleLogoType = "material-community";
    }
    if (platform.slug.startsWith("nintendo")) {
      return (
        <Image
          source={require("../assets/icons/nintendo.png")}
          style={{ width: 35, height: 20, resizeMode: "contain" }}
        />
      );
    } else if (platform.slug.startsWith("atari")) {
      return (
        <Image
          source={require("../assets/icons/atari.png")}
          style={{ width: 35, height: 20, resizeMode: "contain" }}
        />
      );
    } else if (platform.slug.startsWith("sega")) {
      return (
        <Image
          source={require("../assets/icons/sega.png")}
          style={{ width: 35, height: 20, resizeMode: "contain" }}
        />
      );
    } else if (platform.slug.startsWith("commodore-amiga")) {
      return (
        <Image
          source={require("../assets/icons/commodore-amiga.png")}
          style={{ width: 35, height: 20, resizeMode: "contain" }}
        />
      );
    } else if (platform.slug.startsWith("neo-geo")) {
      return (
        <Image
          source={require("../assets/icons/neo-geo.png")}
          style={{ width: 35, height: 20, resizeMode: "contain" }}
        />
      );
    } else if (platform.slug.startsWith("3do")) {
      return (
        <Image
          source={require("../assets/icons/3do.png")}
          style={{ width: 35, height: 20, resizeMode: "contain" }}
        />
      );
    } else {
      return (
        <Icon
          name={consoleLogoName}
          color={COLORS.lightGrey}
          type={consoleLogoType}
          style={{ padding: 5 }}
        />
      );
    }
  });

  const platforms = game.platforms.map(({ platform }) => {
    return (
      <>
        <Text
          style={{
            ...styles.p,
            lineHeight: 18,
            textDecorationLine: "underline",
          }}
        >
          {platform.name}
        </Text>
        <Text style={{ ...styles.p, marginRight: 5 }}>,</Text>
      </>
    );
  });

  const genres = game.genres.map(({ name }) => {
    return (
      <>
        <Text
          style={{
            ...styles.p,
            textDecorationLine: "underline",
          }}
        >
          {name}
        </Text>
        <Text style={{ ...styles.p, marginRight: 5 }}>,</Text>
      </>
    );
  });

  const developers = game.developers.map(({ name }) => {
    return (
      <>
        <Text
          style={{
            ...styles.p,
            textDecorationLine: "underline",
          }}
        >
          {name}
        </Text>
        <Text style={{ ...styles.p, marginRight: 5 }}>,</Text>
      </>
    );
  });

  const publishers = game.publishers.map(({ name }) => {
    return (
      <>
        <Text
          style={{
            ...styles.p,
            textDecorationLine: "underline",
          }}
        >
          {name}
        </Text>
        <Text style={{ ...styles.p, marginRight: 5 }}>,</Text>
      </>
    );
  });

  const tags = game.tags.map(({ name }) => {
    return (
      <>
        {/* <Text
          style={{
            ...styles.p,
            textDecorationLine: "underline",
          }}
        >
          {name}
        </Text>
        <Text style={{ ...styles.p, marginRight: 5 }}>,</Text> */}

        <Chip
          type={"solid"}
          title={name}
          buttonStyle={{
            backgroundColor: COLORS.plum,
            marginRight: 5,
            marginVertical: 4,
            padding: 2,
            paddingHorizontal: 5,
          }}
          titleStyle={{ ...styles.p }}
        />
      </>
    );
  });

  const renderGameCard = ({ item, index }) => (
    <GameCard key={item.id} game={item} navigation={navigation} />
  );

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
    // console.log(game.id);
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
      <SafeAreaView edges={["right", "left"]} style={styles.appContainer}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={{ position: "absolute", top: 50, left: 0, zIndex: 20 }}>
          <Header title={""} backbutton={true} navigation={navigation} />
        </View>

        <Animated.View
          style={{
            ...styles.gameBackgroundImageContainer,
            transform: [{ translateY: translateY }],
          }}
        >
          {/* <Animated.View
            style={{
              transform: [{ translateY: translateYGameImage }],
            }}
          > */}
          <SharedElement id={game.id}>
            <Image
              source={{ uri: game.background_image }}
              style={styles.gameBackgroundImage}
              // PlaceholderContent={<ActivityIndicator />}
            />
          </SharedElement>
          <View style={styles.imageOverlay}></View>
          {/* </Animated.View> */}
          {/* <View style={styles.gameLogoContainer}>
                <Image
                source={require("../assets/icons/grand-theft-auto-v.png")}
                style={{ width: 400, height: 200, resizeMode: "cover" }}
                />
              </View> */}

          <Animated.View
            style={{
              ...styles.gameMainInfoContainer,
              opacity,
            }}
          >
            <Animated.View
              style={{
                width: 80,
                backgroundColor: COLORS.lightGrey,
                alignItems: "center",
                marginBottom: 5,
                borderRadius: 5,
                opacity: fadeOutOnScroll,
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
            </Animated.View>
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                opacity: fadeOutOnScroll,
              }}
            >
              {parentPlatforms}
            </Animated.View>
            <Animated.View
              style={{
                // backgroundColor: "blue",
                transform: [
                  { translateY: translateYGameTitle },
                  { scale: sizeGameTitle },
                ],
              }}
            >
              <Text
                style={{ ...styles.h2, textAlign: "center", marginBottom: 20 }}
              >
                {game.name}
              </Text>
            </Animated.View>
            <Animated.View style={{ top: -30, opacity: fadeOutOnScroll }}>
              <AirbnbRating
                count={5}
                size={20}
                reviewSize={12}
                starContainerStyle={{ top: -10 }}
                isDisabled
                defaultRating={game.rating_top}
                // tintColor="transparent"

                reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                showRating
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 350, top: 340 }}
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          scrollEventThrottle={6}
        >
          <Animated.View style={{ ...styles.infoContainer, opacity }}>
            {/* <View style={{ padding: 10 }}>
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
                  return <Text style={{ ...styles.p }}>{section.content}</Text>;
                }}
                onChange={setActiveSections}
              />
            </View> */}

            <View style={{ padding: 10 }}>
              <Text style={styles.h2}>About</Text>
              <ReadMore
                numberOfLines={3}
                style={styles.p}
                seeMoreText={"Read More"}
              >
                {summary}
              </ReadMore>
            </View>

            <View
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <View style={{ width: "60%" }}>
                <Text style={styles.h2}>Platforms</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingRight: 30,
                  }}
                >
                  {platforms}
                </View>
              </View>

              <View style={{ width: "40%" }}>
                <Text style={styles.h2}>Genre</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingRight: 10,
                  }}
                >
                  {genres}
                </View>
              </View>
            </View>

            <View
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <View style={{ width: "60%" }}>
                <Text style={styles.h2}>Developers</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingRight: 10,
                  }}
                >
                  {developers}
                </View>
              </View>

              <View style={{ width: "40%" }}>
                <Text style={styles.h2}>Publishers</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingRight: 10,
                  }}
                >
                  {publishers}
                </View>
              </View>
            </View>

            <View style={{ padding: 10, paddingBottom: 0 }}>
              <Text style={styles.h2}>Screenshots</Text>
            </View>
            <FlatList
              horizontal
              data={screenshotURI}
              renderItem={({ item }) => (
                <Lightbox activeProps={activeLightboxProps}>
                  <ImageElement
                    source={{ uri: item.uri }}
                    style={{
                      width: 300,
                      height: 200,
                      marginRight: 15,
                      borderRadius: 10,
                    }}
                    PlaceholderContent={
                      <ActivityIndicator color={COLORS.darkGrey} size="large" />
                    }
                  />
                </Lightbox>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                height: 220,
                // width: "100%",
                // borderColor: "white",
                // borderWidth: 2,
                paddingLeft: 8,
                alignItems: "center",
              }}
            />

            {gameTrailers.length != 0 ? (
              <>
                <View style={{ padding: 10, paddingBottom: 10 }}>
                  <Text style={styles.h2}>Trailers</Text>
                </View>
                <FlatList
                  horizontal
                  data={gameTrailers}
                  renderItem={({ item }) => (
                    <View style={{ width: 320 }}>
                      <Text
                        style={{
                          ...styles.p,
                          flexWrap: "wrap",
                          paddingBottom: 8,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Video
                        source={{ uri: item.videoURI.max }}
                        posterSource={{ uri: item.thumbnailURI }}
                        // usePoster
                        style={{
                          width: 300,
                          height: 200,
                          marginRight: 15,
                          borderRadius: 10,
                        }}
                        useNativeControls
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={{
                    height: 220,
                    // width: "100%",
                    // borderColor: "white",
                    // borderWidth: 2,
                    paddingLeft: 8,
                    alignItems: "center",
                  }}
                />
              </>
            ) : null}

            {gameSeries.length != 0 ? (
              <>
                <View style={{ padding: 10, paddingBottom: 10 }}>
                  <Text style={styles.h2}>Games in Series</Text>
                </View>
                <FlatList
                  horizontal
                  data={gameSeries}
                  renderItem={renderGameCard}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={{
                    height: 220,
                    // width: "100%",
                    // borderColor: "white",
                    // borderWidth: 2,
                    paddingLeft: 8,
                    alignItems: "center",
                  }}
                />
              </>
            ) : null}

            <View style={{ padding: 10, paddingBottom: 20 }}>
              <Text style={styles.h2}>Tags</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {tags}
              </View>
            </View>
          </Animated.View>
        </ScrollView>
        {/* </View> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    // height: Dimensions.get("window").height,
    // width: Dimensions.get("window").width,
    // overflow: "hidden",
    backgroundColor: COLORS.darkGrey,
    flex: 1,
  },
  appContainer: {
    flex: 1,
    // backgroundColor: "red",
    // justifyContent: "center",
    // alignItems: "center",
  },
  h2: {
    fontFamily: "Noah-Black",
    fontSize: 25,
    color: COLORS.lightGrey,
  },
  h3: {
    fontFamily: "Noah-Bold",
    fontSize: 18,
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
    // borderRadius: 40,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  gameBackgroundImageContainer: {
    width: "100%",
    // height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    // overflow: "hidden",
    backgroundColor: "red",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.55,
    shadowRadius: 3.84,

    elevation: 10,
  },
  gameLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: -250,
    left: 0,
    // zIndex: 4,
  },
  gameMainInfoContainer: {
    width: "100%",
    // height: "100%",
    position: "absolute",
    alignItems: "center",
    // backgroundColor: "pink",
    padding: 10,
    top: 150,
    left: 0,

    // zIndex: 0,
  },
  infoContainer: {
    marginVertical: 8,
    justifyContent: "space-between",

    // top: 350,
    // zIndex: 0,
  },
  screenshotsContainer: {
    width: "100%",
    // height: "100%",
    // marginVertical: 15,
    // zIndex: 0,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 350,
    backgroundColor: "black",
    // borderRadius: 40,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,

    opacity: 0.4,
    // zIndex: 3,
  },
});

export default GameInfoScreen;
