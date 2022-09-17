/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

import DeviceId from './DeviceId';
import ProgressBar from './ProgressBar';
import Cart from './Cart';

const FEATURES = ['DEVICE_ID', 'PROGRESS_BAR', 'SHOPPING_CART'];

const App: () => Node = () => {
  const [showFeature, setShowFeature] = React.useState(FEATURES[0]);

  const Component = () => {
    switch (showFeature) {
      case FEATURES[0]:
        return <DeviceId />;
      case FEATURES[1]:
        return <ProgressBar />;
      case FEATURES[2]:
        return <Cart />;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.switchContainer}>
        {FEATURES.map((value, index) => (
          <View style={styles.switch} key={index}>
            <Button
              title={value}
              onPress={() => setShowFeature(value)}
              color="#3D5AFE"
            />
          </View>
        ))}
      </View>
      <View style={styles.featureContainer}>
        <Component />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    backgroundColor: '#E0E0E0',
  },
  switch: {
    margin: 10,
  },
  featureContainer: {
    height: '90%',
  },
});
