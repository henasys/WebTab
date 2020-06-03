import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

import Navigator from '../modules/navigator';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
      <Button
        title="go to Home"
        onPress={() => {
          Navigator.navigate('Home');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
