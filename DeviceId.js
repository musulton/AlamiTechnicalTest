import React from 'react';
import type {Node} from 'react';
import {NativeModules, Text, View, StyleSheet} from 'react-native';

const DeviceId: () => Node = () => {
  const DeviceInfo = NativeModules.DeviceInfoGet;
  const [deviceInfo, setDeviceInfo] = React.useState();
  React.useEffect(() => {
    DeviceInfo.getDeviceID((err, deviceId) => {
      if (!err) {
        setDeviceInfo(deviceId);
      }
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Id: </Text>
      <Text>{deviceInfo}</Text>
    </View>
  );
};

export default DeviceId;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
});
