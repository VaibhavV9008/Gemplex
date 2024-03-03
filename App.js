import { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import OriginalsScreen from "./screens/OriginalsScreen";
import MoviesScreen from "./screens/MoviesScreen";
import VideosScreen from "./screens/VideosScreen";
import MusicScreen from "./screens/MusicScreen";
import BannerCarousel from "./components/BannerCarousel";
import InternetHandlingScreen from "./InternetHandlingScreen";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles/index";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MainHeader = () => (
  <View style={styles.header}>
    <TouchableOpacity>
      <Ionicons
        name="menu-outline"
        size={24}
        color="white"
        style={styles.icon}
      />
    </TouchableOpacity>
    <Text style={styles.appName}>Gemplex</Text>
    <TouchableOpacity>
      <Ionicons
        name="search-outline"
        size={24}
        color="white"
        style={styles.searchIcon}
      />
    </TouchableOpacity>
    <TouchableOpacity>
      <Ionicons
        name="cart-outline"
        size={24}
        color="white"
        style={styles.icon}
      />
    </TouchableOpacity>
  </View>
);
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#252b2b" },
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const OriginalsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#252b2b" },
      headerShown: false,
    }}
  >
    <Stack.Screen name="Originals" component={OriginalsScreen} />
  </Stack.Navigator>
);

const MoviesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#252b2b" },
      headerShown: false,
    }}
  >
    <Stack.Screen name="Movies" component={MoviesScreen} />
  </Stack.Navigator>
);

const VideosStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#252b2b" },
      headerShown: false,
    }}
  >
    <Stack.Screen name="Videos" component={VideosScreen} />
  </Stack.Navigator>
);

const MusicStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "#252b2b" },
      headerShown: false,
    }}
  >
    <Stack.Screen name="Music" component={MusicScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check internet connection
        const { isConnected } = await NetInfo.fetch();
        if (isConnected) {
          // Fetch data from API
          const response = await fetch(
            "https://mocki.io/v1/cead1ab5-8153-4557-a587-f6ebb2710769"
          );
          const jsonData = await response.json();
          // Save data to local storage
          await AsyncStorage.setItem("data", JSON.stringify(jsonData));
          setData(jsonData);
        } else {
          // No internet connection, retrieve data from local storage
          const storedData = await AsyncStorage.getItem("data");
          if (storedData !== null) {
            setData(JSON.parse(storedData));
            setOfflineMode(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <NavigationContainer>
          <MainHeader />
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: { fontSize: 8, color: "#fff" },
              tabBarStyle: { backgroundColor: "#252b2b" },
            }}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Originals" component={OriginalsStack} />
            <Tab.Screen name="Movies" component={MoviesStack} />
            <Tab.Screen name="Videos" component={VideosStack} />
            <Tab.Screen name="Music" component={MusicStack} />
          </Tab.Navigator>
        </NavigationContainer>
        <View>
          {offlineMode ? (
            <Text>Offline Mode: Showing cached data</Text>
          ) : (
            <Text>Data fetched from API</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
