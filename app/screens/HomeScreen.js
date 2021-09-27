import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";
import axios from "../api/axios";
import requests from "../api/Requests";
import { GamesContext } from "../context/GamesContext";
import { LinearGradient } from "expo-linear-gradient";
import { GameCard } from "../components/GameCard";
import { Chip, TabView, Icon } from "react-native-elements";

import { Tab } from "react-native-elements";
import { Modal } from "react-native";
import { ActivityIndicator } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [games, setGames] = useContext(GamesContext);
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

  const fetchGames = async (type, chipID) => {
    setGames(null);
    setSelectedChip(chipID);
    try {
      setLoading(true);
      const request = await axios.get(type);

      if (type == fetchMustPlayGames) {
        const newGameList = request.data.results;
        let items = newGameList.map((item) => {
          return {
            result: item.game,
            id: item.game.id,
            name: item.game.name,
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

  const renderItem = ({ item, index }) => (
    <GameCard key={index} game={item} navigation={navigation} />
  );

  const renderChip = ({ item, index }) => (
    <Chip
      key={index}
      type={selectedChip === item.id ? "solid" : "outline"}
      title={item.title}
      onPress={() => fetchGames(item.search, item.id)}
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
    fetchGames(fetchTrendingGames, 0);
  }, []);

  // useEffect(() => {
  //   setRefresh(!refresh);
  // }, [games]);

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
        <View style={styles.header}>
          <Text style={{ ...styles.h2, paddingHorizontal: 15 }}>ARCADE</Text>

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
              // marginBottom: 30,
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
                Loading {chips[selectedChip].title} Games...
              </Text>
            </View>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Icon
                name={chips[selectedChip].iconName}
                type={chips[selectedChip].iconType}
                color="#517fa4"
              />
              <Text
                style={{
                  ...styles.h3,
                  textAlign: "right",
                  paddingHorizontal: 15,
                  marginBottom: 10,
                }}
              >
                {chips[selectedChip].title} Games
              </Text>
            </View>
            <FlatList
              key={1}
              data={games}
              extraData={games}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ alignItems: "center" }}
            />
          </>
        )}

        {/* <FlatList
          data={games}
          extraData={games}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ alignItems: "center" }}
        /> */}
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
    backgroundColor: "transparent",
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
  grainOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  header: {
    // paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default HomeScreen;
