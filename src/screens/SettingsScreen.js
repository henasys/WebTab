import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, Button} from 'react-native';

import Navigator from '../modules/navigator';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Settings!</Text>
      <View style={styles.spacer} />
      <Button
        title="go to Home"
        onPress={() => {
          Navigator.navigate('Home');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    padding: 5,
  },
});
