/*import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const API_KEY = 'itoMaM6DJBtqD54BHSZQY9WdWR5xI_CnpZdxa3SG5i7N0M37VK1HklDDF4ifYh8SI-P2kI_mRj5KRSF4_FhTUAkEw322L8L8RY6bF1UB8jFx3TOR0-wW6Tk0KftNXXYx';
const API_URL = 'https://api.yelp.com/v3/businesses/search';

const CardWithArrows = ({ cards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const goToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };
  const location = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        try {
          // Fetch restaurants from Yelp API
          const response = await fetch(
            `${API_URL}?latitude=${latitude}&longitude=${longitude}&categories=restaurants&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );
          const data = await response.json();
          setRestaurants(data.businesses);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching restaurants:', error);
          setLoading(false);
        }
      },
      error => {
        console.error('Error getting location:', error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);
  }

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text>{cards[currentCardIndex]}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goToPreviousCard}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToNextCard}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text>{item.name}</Text>
              <Text>{item.location.address1}</Text>
              <Text>{item.location.city}, {item.location.state}</Text>
            </View>
          )}
        />
      )}
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, flexDirection: 'row
  card: {
      backgroundColor: 'lightgrey',
      size: 100,
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonContainer: {
   ',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CardWithArrows;
*/