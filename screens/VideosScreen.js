import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";
import axios from "axios";
import BannerCarousel from "../components/BannerCarousel";
import styles from "../styles/index";

const VideosScreen = () => {
  const [data, setData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/783f8c69-af91-45ff-87df-e675c3f11fef"
        );
        setBannerData(response.data.data[0].content_list);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/cead1ab5-8153-4557-a587-f6ebb2710769"
        );
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleVideoPress = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <ScrollView style={styles.container}>
      {bannerData.length > 0 && <BannerCarousel data={bannerData} />}
      {data.map((category) => (
        <View key={category.card_name} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.card_name}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.content_list.map((content) => (
              <TouchableOpacity
                key={content.content_id}
                style={styles.contentContainer}
                onPress={() =>
                  handleVideoPress(
                    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
                  )
                }
              >
                <Image
                  source={{ uri: content.image_url }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.contentTitle}>{content.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
      {selectedVideo && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: selectedVideo }}
            style={styles.videoPlayer}
            controls
            resizeMode="contain"
          />
        </View>
      )}
    </ScrollView>
  );
};

export default VideosScreen;
