import React from 'react';
import {WebView} from 'react-native-webview';

export default function HomeScreen() {
  return (
    <WebView source={{uri: 'https://infinite.red'}} style={{marginTop: 20}} />
  );
}
