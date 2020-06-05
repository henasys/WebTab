import React, {useRef} from 'react';
import {StyleSheet, SafeAreaView, View, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

export default function HomeScreen() {
  const webview = useRef(null);
  const url = 'https://m.naver.com/';
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webview}
        source={{uri: url}}
        style={styles.webView}
        renderError={(errorDomain, errorCode, errorDesc) => {
          console.log('WebView renderError', errorDomain, errorCode, errorDesc);
          return <View />;
        }}
        onError={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;
          console.log('WebView onError', Platform.OS, nativeEvent);
        }}
        onLoad={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;
          console.log('WebView onLoad', Platform.OS, nativeEvent.url);
        }}
        onHttpError={(syntheticEvent) => {
          const {nativeEvent} = syntheticEvent;
          console.log('WebView onHttpError', Platform.OS, nativeEvent);
        }}
        // onShouldStartLoadWithRequest={(request) => {
        //   console.log(
        //     'WebView onShouldStartLoadWithRequest',
        //     Platform.OS,
        //     request,
        //   );
        //   return true;
        // }}
        onNavigationStateChange={(navState) => {
          console.log(
            'WebView onNavigationStateChange',
            Platform.OS,
            navState.loading,
            navState.url,
          );
        }}
        onFileDownload={({nativeEvent}) => {
          const {downloadUrl} = nativeEvent;
          console.log('WebView onFileDownload', Platform.OS, downloadUrl);
          console.log(nativeEvent);
        }}
      />
    </SafeAreaView>
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
