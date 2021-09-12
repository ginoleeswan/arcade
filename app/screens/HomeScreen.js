import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  StatusBar,
  Dimensions,
  FlatList,
  Pressable,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/colors";
import axios from "../api/axios";
import requests from "../api/Requests";
import { GamesContext } from "../context/GamesContext";
import { LinearGradient } from "expo-linear-gradient";
import { GameCard } from "../components/GameCard";
import { Chip } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";

const grainOverlay = {};

const HomeScreen = ({ navigation }) => {
  const [games, setGames] = useContext(GamesContext);
  const [indexToAnimate, setIndexToAnimate] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const {
    fetchTrendingGames,
    fetchMustPlayGames,
    fetchIndieGames,
    fetchRacingGames,
    fetchStrategyGames,
  } = requests;

  const [chips, setChips] = useState([
    {
      id: 1,
      title: "Trending",
      search: fetchTrendingGames,
      filled: true,
      iconName: "trending-up",
      iconType: "feather",
    },
    {
      id: 2,
      title: "Must Play",
      search: fetchMustPlayGames,
      filled: false,
      iconName: "trending-up",
      iconType: "feather",
    },
    {
      id: 3,
      title: "Indie",
      search: fetchIndieGames,
      filled: false,
      iconName: "trending-up",
      iconType: "feather",
    },
    {
      id: 4,
      title: "Racing",
      search: fetchRacingGames,
      filled: false,
      iconName: "trending-up",
      iconType: "feather",
    },
    {
      id: 5,
      title: "Strategy",
      search: fetchStrategyGames,
      filled: false,
      iconName: "trending-up",
      iconType: "feather",
    },
  ]);

  const fetchGames = async (type) => {
    try {
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
      } else {
        setGames(request.data.results);
      }
      // console.log(games);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <GameCard key={index} game={item} navigation={navigation} />
  );

  const renderChip = ({ item, index }) => (
    <Chip
      key={index}
      type={item.filled ? "solid" : "outline"}
      title={item.title}
      onPress={() => fetchGames(item.search, item)}
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
    fetchGames(fetchTrendingGames);
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
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.header}>
          <Text style={styles.h2}>ARCADE</Text>
        </View>
        <FlatList
          data={chips}
          extraData={chips}
          horizontal={true}
          renderItem={renderChip}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            // width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom: 30,
            height: 50,
          }}
        />
        <FlatList
          data={games}
          extraData={games}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ alignItems: "center" }}
        />
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
    // justifyContent: "center",
    // alignItems: "center",
  },
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
  grainOverlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default HomeScreen;
