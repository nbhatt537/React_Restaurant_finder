import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-swipe-gestures';
import { Ionicons } from '@expo/vector-icons';

const SwipeableCard = ({ text }) => {
  const [position] = useState(new Animated.ValueXY({ x: 0, y: 0 }));

  const onSwipeLeft = () => {
    // Handle swipe left action
    console.log('Swiped left');
  };

  const onSwipeRight = () => {
    // Handle swipe right action
    console.log('Swiped right');
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <View style={styles.container}>
      <Swipeable
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={styles.cardContainer}
      >
        <Animated.View style={position.getLayout()}>
          <View style={styles.card}>
            <Text>{text}</Text>
          </View>
        </Animated.View>
      </Swipeable>
      <TouchableOpacity style={styles.leftButton} onPress={onSwipeLeft}>
        <Ionicons name="arrow-back" size={40} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightButton} onPress={onSwipeRight}>
        <Ionicons name="arrow-forward" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: 'pink',
      borderRadius: 10,
    marginTop:90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftButton: {
    position: 'absolute',
    top: '50%',
      left: 20,
      marginLeft:40,
    marginTop:200,
    transform: [{ translateY: -20 }]
  },
  rightButton: {
    position: 'absolute',
    top: '50%',
      right: 20,
      marginRight:40,
    marginTop:200,
    transform: [{ translateY: -20 }]
  }
});

export default SwipeableCard;
