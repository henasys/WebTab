import React, {useState, useRef} from 'react';
import {StyleSheet, SafeAreaView, View, Platform} from 'react-native';
import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen() {
  const webview = useRef(null);
  const [canGoBack, SetCanGoBack] = useState(false);
  const url = 'https://m.naver.com/';
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (webview.current && canGoBack) {
          webview.current.goBack();
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [canGoBack]),
  );
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
          console.log(navState);
          SetCanGoBack(navState.canGoBack);
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
