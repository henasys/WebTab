import React from 'react';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: '<h1>Hello world</h1>' }}
    />
  );
}
