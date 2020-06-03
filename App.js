import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import Tabs from './src/screens/Tabs';

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
