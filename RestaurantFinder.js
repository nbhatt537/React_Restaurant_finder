import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Button, Animated, Dimensions, StyleSheet, ScrollView,TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Swipeable from 'react-native-swipe-gestures';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const RestaurantCard = ({ restaurant }) => (
  <View style={styles.cardContainer}>
    <Image source={{ uri: restaurant.image_url }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.rating}>Rating: {restaurant.rating}</Text>
    </View>
  </View>
);


const App_Restaurant = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation] = useState(new Animated.Value(width));
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const scrollViewRef = useRef();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('restaurants');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log('Current location:', currentLocation);

      loadRestaurants(currentLocation.coords.latitude, currentLocation.coords.longitude);
    })();
  }, []);

  const loadRestaurants = async (latitude, longitude) => {
    try {
      console.log('Loading restaurants...');
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        params: {
          term: query,
          latitude: latitude,
          longitude: longitude,
          limit:limit,
          offset:offset, // Offset to fetch next set of results
        },
        headers: {
          Authorization: 'Bearer itoMaM6DJBtqD54BHSZQY9WdWR5xI_CnpZdxa3SG5i7N0M37VK1HklDDF4ifYh8SI-P2kI_mRj5KRSF4_FhTUAkEw322L8L8RY6bF1UB8jFx3TOR0-wW6Tk0KftNXXYx',
        },
      });
      //console.log('Response:', response.data);
      setRestaurants(response.data.businesses);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };
  const onSwipeLeft = () => {
  // Logic for swipe left action
  if (currentIndex === restaurants.length - 1) {
    setCurrentIndex(0);
  } else {
    setCurrentIndex(currentIndex + 1);
  }
};

const onSwipeRight = () => {
  // Logic for swipe right action
  if (currentIndex === 0) {
    setCurrentIndex(restaurants.length - 1);
  } else {
    setCurrentIndex(currentIndex - 1);
  }
  };
  const handleScroll = event => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const distanceToEnd = contentSize.height - layoutMeasurement.height - contentOffset.y;
    if (distanceToEnd < 200 && !loading) {
      setOffset(offset + limit);
      setLoading(true);
    }
  };
   const handleInputChange = text => {
    setQuery(text);
  };
return (
  <View style={styles.container}>
     <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={query}
        placeholder="Enter query (e.g., restaurants)"
      />
      
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <Swipeable
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
          style={styles.cardContainer}>
          <RestaurantCard restaurant={restaurants[currentIndex]} />
        </Swipeable>
      )}
      <TouchableOpacity style={styles.leftButton} onPress={onSwipeLeft}>
        <Ionicons name="arrow-back" size={40} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightButton} onPress={onSwipeRight}>
        <Ionicons name="arrow-forward" size={40} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    width: width * 0.9,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'gray',
  },
  rating: {
    fontSize: 16,
    color: 'gray',
  },
  loadingIndicator: {
    marginTop: 20,
  },
   textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  leftButton: {
    position: 'absolute',
    left: 10,
    bottom: height * 0.3,
  },
  rightButton: {
    position: 'absolute',
    right: 10,
    bottom: height * 0.3,
  },
});

export default App_Restaurant;
