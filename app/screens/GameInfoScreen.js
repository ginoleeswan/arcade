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
import Lightbox from "react-native-lightbox-v2";
import { Video, AVPlaybackStatus } from "expo-av";
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

        <View style={styles.gameBackgroundImageContainer}>
          <View style={{ position: "absolute", top: 50, left: 0, zIndex: 200 }}>
            <Header title={""} backbutton={true} navigation={navigation} />
          </View>
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
              {parentPlatforms}
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
                defaultRating={game.rating_top}
                // tintColor="transparent"

                reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                showRating
              />
            </View>
          </Animated.View>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}>
          <Animated.View style={{ ...styles.infoContainer, opacity }}>
            <View style={{ padding: 10 }}>
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
                    paddingRight: 10,
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

            <View style={{ padding: 10, paddingBottom: 20 }}>
              <Text style={styles.h2}>Tags</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {tags}
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

            <View style={{ padding: 10, paddingBottom: 10 }}>
              <Text style={styles.h2}>Trailers</Text>
            </View>
            {gameTrailers.length != 0 ? (
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
                      usePoster
                      style={{
                        width: 300,
                        height: 200,
                        marginRight: 15,
                        borderRadius: 10,
                      }}
                      useNativeControls
                      resizeMode="contain"
                      // PlaceholderContent={
                      //   <ActivityIndicator color={COLORS.darkGrey} size="large" />
                      // }
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
            ) : (
              <View style={{ paddingHorizontal: 15 }}>
                <Text style={styles.p}>No Trailers</Text>
              </View>
            )}

            <View style={{ padding: 10, paddingBottom: 10 }}>
              <Text style={styles.h2}>Games in Series</Text>
            </View>
            <FlatList
              horizontal
              data={gameSeries}
              renderItem={
                renderGameCard
                // ({ item }) => (
                // <>
                //   <Lightbox>
                //     <ImageElement
                //       source={{ uri: item.background_image }}
                //       style={{
                //         width: 200,
                //         height: 200,
                //         marginRight: 15,
                //         borderRadius: 20,
                //       }}
                //       PlaceholderContent={
                //         <ActivityIndicator
                //           color={COLORS.darkGrey}
                //           size="large"
                //         />
                //       }
                //     />
                //   </Lightbox>
                //   <View
                //     style={{
                //       position: "absolute",
                //       left: 0,
                //       bottom: 0,
                //       padding: 12,
                //       width: 200,
                //       backgroundColor: "rgba(0,0,0,0.5)",
                //       alignItems: "center",
                //       borderBottomEndRadius: 20,
                //       borderBottomStartRadius: 20,
                //     }}
                //   >
                //     <Text
                //       style={{
                //         ...styles.h3,
                //         fontSize: 13,
                //         textAlign: "center",
                //         textShadowColor: "rgba(0, 0, 0, 1)",
                //         textShadowOffset: { width: -1, height: 1 },
                //         textShadowRadius: 5,
                //       }}
                //     >
                //       {item.name}
                //     </Text>
                //   </View>
                // </>
              }
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
    // width: "100%",
    // height: "100%",
    // position: "absolute",
    // top: 0,
    // left: 0,
    // zIndex: -1,
    // backgroundColor: "red",
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    height: "100%",
    position: "absolute",
    alignItems: "center",
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
