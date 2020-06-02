import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

export default function HomeScreen() {
  return (
    <WebView source={{uri: 'https://infinite.red'}} style={styles.webView} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    marginTop: 20,
  },
});
