import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App_geo() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const locationPermissionAsync = async () => {
      let canUseLocation = false;
      const grantedPermission = await Location.getForegroundPermissionsAsync();
      if (grantedPermission.status === "granted") {
        canUseLocation = true;
      } else {
        const permissionResponse = await Location.requestForegroundPermissionsAsync();
        if (permissionResponse.status === "granted") {
          canUseLocation = true;
        }
      }
      if (canUseLocation) {
        try {
          const location = await Location.getCurrentPositionAsync();
          console.log("received location:", location);
          setLocation(location);
        } catch (error) {
          console.log("Error fetching location:", error);
          setErrorMsg("Error fetching location");
        }
      }
    };

    locationPermissionAsync();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <Text style={styles.paragraph}>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      ) : (
        <Text style={styles.paragraph}>Fetching location...</Text>
      )}
      {errorMsg && <Text style={styles.paragraph}>{errorMsg}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
     height: '100vh',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
