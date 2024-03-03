import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InternetHandlingScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check internet connection
        const { isConnected } = await NetInfo.fetch();
        if (isConnected) {
          // Fetch data from API
          const response = await fetch('https://mocki.io/v1/cead1ab5-8153-4557-a587-f6ebb2710769');
          const jsonData = await response.json();
          // Save data to local storage
          await AsyncStorage.setItem('data', JSON.stringify(jsonData));
          setData(jsonData);
        } else {
          // No internet connection, retrieve data from local storage
          const storedData = await AsyncStorage.getItem('data');
          if (storedData !== null) {
            setData(JSON.parse(storedData));
            setOfflineMode(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Check internet connection
//         const { isConnected } = await NetInfo.fetch('https://www.google.com/');
//         if (isConnected) {
//           // Navigate to the Home screen if internet connection is available
//           navigation.navigate('Home');
//         } else {
//           // No internet connection, navigate to offline mode screen
//           const storedData = await AsyncStorage.getItem('data');
//           if (storedData !== null) {
//             // Data exists in local storage, set offline mode flag
//             setOfflineMode(true);
//           }
//           navigation.navigate('Music');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {offlineMode ? (
        <Text>Offline Mode: Showing cached data</Text>
      ) : (
        <Text>No internet connection</Text>
      )}
    </View>
  );
};

export default InternetHandlingScreen;
