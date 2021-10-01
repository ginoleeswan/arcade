import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";
import axios from "../api/axios";
import requests from "../api/Requests";
import { GamesContext } from "../context/GamesContext";
import { LinearGradient } from "expo-linear-gradient";
import { GameCard } from "../components/GameCard";
import { GameInfoCard } from "../components/GameInfoCard";
import { GameCardWide } from "../components/GameCardWide";
import { Chip, TabView, Icon } from "react-native-elements";
import { SearchBar } from "react-native-elements";

import { Tab } from "react-native-elements";
import { Modal } from "react-native";
import { ActivityIndicator } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Keyboard } from "react-native";
import { GameLoadingContext } from "../context/GameLoadingContext";

const HomeScreen = ({ navigation }) => {
  const [games, setGames] = useContext(GamesContext);
  const [gameLoading, setGameLoading] = useContext(GameLoadingContext);
  const [query, setQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [indexToAnimate, setIndexToAnimate] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const {
    fetchTrendingGames,
    fetchMustPlayGames,
    fetchIndieGames,
    fetchRacingGames,
    fetchStrategyGames,
    fetchSimulationGames,
    fetchCasualGames,
    fetchShooterGames,
    fetchSportGames,
    fetchRPGGames,
    fetchAdventureGames,
  } = requests;

  const [chips, setChips] = useState([
    {
      id: 0,
      title: "Trending",
      search: fetchTrendingGames,
      filled: true,
      iconName: "trending-up",
      iconType: "feather",
    },
    {
      id: 1,
      title: "Must Play",
      search: fetchMustPlayGames,
      filled: false,
      iconName: "star",
      iconType: "material-community",
    },
    {
      id: 2,
      title: "Indie",
      search: fetchIndieGames,
      filled: false,
      iconName: "heart",
      iconType: "material-community",
    },
    {
      id: 3,
      title: "Racing",
      search: fetchRacingGames,
      filled: false,
      iconName: "car",
      iconType: "font-awesome-5",
    },
    {
      id: 4,
      title: "Strategy",
      search: fetchStrategyGames,
      filled: false,
      iconName: "strategy",
      iconType: "material-community",
    },
    {
      id: 5,
      title: "Simulation",
      search: fetchSimulationGames,
      filled: false,
      iconName: "person",
      iconType: "ionicon",
    },
    {
      id: 6,
      title: "Casual",
      search: fetchCasualGames,
      filled: false,
      iconName: "checkerboard",
      iconType: "material-community",
    },
    {
      id: 7,
      title: "Sport",
      search: fetchSportGames,
      filled: false,
      iconName: "soccer",
      iconType: "material-community",
    },
    {
      id: 8,
      title: "Shooter",
      search: fetchShooterGames,
      filled: false,
      iconName: "crosshairs",
      iconType: "font-awesome-5",
    },
    {
      id: 9,
      title: "RPG",
      search: fetchRPGGames,
      filled: false,
      iconName: "shield",
      iconType: "material-community",
    },
    {
      id: 10,
      title: "Adventure",
      search: fetchAdventureGames,
      filled: false,
      iconName: "compass",
      iconType: "material-community",
    },
  ]);

  const [gameSectionTitle, setGameSectionTitle] = useState(
    chips[selectedChip].title
  );

  const [gameSectionIconName, setGameSectionIconName] = useState(
    chips[selectedChip].iconName
  );

  const [gameSectionIconType, setGameSectionIconType] = useState(
    chips[selectedChip].iconType
  );

  const insets = useSafeAreaInsets();

  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 200 + insets.top],
    outputRange: [0, insets.top - 260],
    extrapolate: "clamp",
  });
  const fadeOutOnScroll = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const fetchGames = async (chip) => {
    setGames(null);
    setSelectedChip(chip.id);
    setGameSectionTitle(chip.title);
    setGameSectionIconName(chip.iconName);
    setGameSectionIconType(chip.iconType);
    try {
      setLoading(true);
      const request = await axios.get(chip.search);

      if (chip.search == fetchMustPlayGames) {
        const newGameList = request.data.results;
        let items = newGameList.map((item) => {
          return {
            result: item.game,
            id: item.game.id,
            name: item.game.name,
            parent_platforms: item.game.parent_platforms,
            rating: item.game.rating,
            background_image: item.game.background_image,
          };
        });
        setGames(items);
        setLoading(false);
      } else {
        setGames(request.data.results);
        setLoading(false);
      }
      // console.log(games);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setQuery("");
    setGames(null);
    setGameSectionTitle("Search");
    setGameSectionIconName("search");
    setGameSectionIconType("material-icons");
    // const formattedQuery = text.toLowerCase();
    // const data = heroNames.filter((item) => {
    //   // return contains(name, formattedQuery);
    //   return item.name.toLowerCase().includes(formattedQuery);
    // });
    // setFilteredHeroNames(data);
    setQuery(text);
    try {
      setLoading(true);
      const request = await axios.get(
        `games?search=${text}&key=a5dc51990cf541aba0f759e85e41a324&ordering=~rating`
      );

      setGames(request.data.results);
      setLoading(false);
      // console.log(games);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <GameCard key={index} game={item} navigation={navigation} />
  );

  const renderGameInfoItem = ({ item, index }) => (
    <GameInfoCard key={index} game={item} navigation={navigation} />
  );

  const renderWideItem = ({ item, index }) => (
    <GameCardWide key={index} game={item} navigation={navigation} />
  );

  const renderChip = ({ item, index }) => (
    <Chip
      key={index}
      type={selectedChip === item.id ? "solid" : "outline"}
      title={item.title}
      onPress={() => fetchGames(item)}
      buttonStyle={{
        // backgroundColor: COLORS.mediumGrey,
        borderWidth: 2,
        marginHorizontal: 5,
      }}
      // containerStyle={{ horizontalMargin: 10 }}
      titleStyle={{ fontFamily: "Noah-Bold", color: COLORS.lightGrey }}
      icon={{
        name: item.iconName,
        type: item.iconType,
        size: 20,
        color: COLORS.lightGrey,
      }}
    />
  );

  const renderTab = ({ item, index }) => (
    <Tab.Item
      // type={item.filled ? "solid" : "outline"}
      title={item.title}
      onPress={() => fetchGames(item.search)}
      buttonStyle={{
        // backgroundColor: COLORS.mediumGrey,
        borderWidth: 2,
        marginHorizontal: 5,
      }}
      // containerStyle={{ horizontalMargin: 10 }}
      titleStyle={{ fontFamily: "Noah-Bold", color: COLORS.lightGrey }}
      icon={{
        name: item.iconName,
        type: item.iconType,
        size: 20,
        color: COLORS.lightGrey,
      }}
    />
  );

  useEffect(() => {
    fetchGames(chips[selectedChip]);
    setQuery("");
    Keyboard.dismiss;
  }, []);

  useEffect(() => {
    if (query == "") {
      fetchGames(chips[selectedChip]);
    }
  }, [query]);

  return (
    <ImageBackground
      source={require("../assets/images/noise.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      <SafeAreaView
        style={styles.appContainer}
        edges={["right", "top", "left"]}
      >
        <StatusBar
          // translucent
          backgroundColor={COLORS.darkGrey}
          barStyle="light-content"
          style={{ zIndex: 30 }}
        />
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Text style={{ ...styles.h2, paddingHorizontal: 15 }}>ARCADE</Text>

            <SearchBar
              placeholder="Search..."
              onChangeText={handleSearch}
              value={query}
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.input}
              // onClear={fetchGames(chips[selectedChip])}
              leftIconContainerStyle={{ left: 5 }}
              inputStyle={{ ...styles.p, fontSize: 16 }}
              searchIcon={{ size: 25 }}
              round={true}
            />
          </View>

          <FlatList
            data={chips}
            extraData={chips}
            horizontal={true}
            renderItem={renderChip}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              // width: "100%",
              alignItems: "center",
              justifyContent: "space-evenly",
              // marginTop: 10,
              marginHorizontal: 5,
              height: 50,
            }}
          />
        </View>

        {/* <Tab value={tabIndex} onChange={setTabIndex}>
          <Tab.Item title="trending" />
          <Tab.Item
            title="Must Play"
            onPress={fetchGames(fetchMustPlayGames)}
          />
          <Tab.Item title="Indie" />
          <Tab.Item title="Strategy" />
        </Tab> */}

        {loading === true ? (
          // <Modal statusBarTranslucent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ top: -40 }}>
              <ActivityIndicator size="large" />
              <Text
                style={{
                  ...styles.p,
                  top: 5,
                  left: 2,
                }}
              >
                Loading {gameSectionTitle} Games...
              </Text>
            </View>
          </View>
        ) : (
          <Animated.View
            style={{
              transform: query == "" ? [{ translateY: translateY }] : null,
            }}
          >
            {query == "" ? (
              <Animated.View style={{ opacity: fadeOutOnScroll }}>
                <Carousel
                  data={games.slice(0, 4)}
                  sliderWidth={Dimensions.get("window").width}
                  itemWidth={300}
                  renderItem={renderWideItem}
                  loop={true}
                  scrollEnabled={!gameLoading}
                  inactiveSlideShift={0}
                  inactiveSlideOpacity={Platform.OS === "ios" ? 0.5 : 1}
                />
              </Animated.View>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Icon
                name={gameSectionIconName}
                type={gameSectionIconType}
                color="#517fa4"
              />
              <Text
                style={{
                  ...styles.h3,
                  textAlign: "right",
                  paddingHorizontal: 15,
                }}
              >
                {gameSectionTitle} Games
              </Text>
            </View>
            <View>
              <FlatList
                data={games.slice(5, games.length)}
                extraData={games}
                onScroll={(e) => {
                  scrollY.setValue(e.nativeEvent.contentOffset.y);
                  Keyboard.dismiss;
                }}
                keyboardShouldPersistTaps={"always"}
                keyboardDismissMode={"on-drag"}
                scrollEventThrottle={16}
                renderItem={renderGameInfoItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 450,
                  top: query == "" ? 0 : 0,
                  alignItems: "center",
                }}
              />
            </View>
          </Animated.View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    overflow: "hidden",
    backgroundColor: COLORS.darkGrey,
    flex: 1,
  },
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.darkGrey,
    // paddingBottom: -40,
    // justifyContent: "center",
    // alignItems: "center",
  },
  h2: {
    fontFamily: "Noah-Black",
    fontSize: 30,
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
  inputContainer: {
    // width: "95%",
    width: 200,
    height: 40,
    // paddingHorizontal: 10,
    // marginBottom: 8,
    backgroundColor: COLORS.navy,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    // borderWidth: 2,
    borderRadius: 30,
    borderWidth: 0,
    zIndex: 2,
  },
  input: {
    // backgroundColor: "transparent",
    width: "100%",
    height: 40,
    borderColor: COLORS.navy,
    // borderWidth: 2,
    borderRadius: 20,
  },
  grainOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  header: {
    // paddingHorizontal: 15,
    zIndex: 1000,
    backgroundColor: COLORS.darkGrey,
    paddingBottom: 15,
  },
});

export default HomeScreen;
