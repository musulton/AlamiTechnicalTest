import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

const ProgressBar: () => Node = () => {
  const counter = React.useRef(new Animated.Value(0)).current;

  const handleStart = () => {
    Animated.timing(counter, {
      duration: 10000,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  };

  const handlePause = () => {
    Animated.timing(counter).stop();
  };

  const handleReset = () => {
    handlePause();
    counter.setValue(0);
  };

  const progressInterpolate = counter.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  const progressStyle = {
    width: progressInterpolate,
    bottom: 0,
    backgroundColor: '#00E676',
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handlePause}
        onPressOut={handleStart}>
        <View style={styles.progressContainer}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.progress, progressStyle]} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonContainer}>
        <Button title="Start" color="#00C853" onPress={handleStart} />
        <Button title="Reset" color="#DD2C00" onPress={handleReset} />
      </View>
    </View>
  );
};
export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  progressContainer: {
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 15,
    overflow: 'hidden',
    width: '100%',
    marginVertical: 10,
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
  },
});
