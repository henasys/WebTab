import React, {useState, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import Navigator from './src/modules/navigator';
import Tabs from './src/screens/Tabs';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Settings');
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('messaging().onMessage()', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      Navigator.navigate(remoteMessage.data.type);
    });
  }, []);
  if (loading) {
    return null;
  }
  return (
    <NavigationContainer
      ref={Navigator.navigationRef}
      onStateChange={(state) => {
        // console.log('New state is', state);
        const currentRouteName = Navigator.getActiveRouteName(state);
        Navigator.routeNameRef.current = currentRouteName;
        console.log('currentRouteName', currentRouteName);
      }}>
      <Tabs initialRouteName={initialRoute} />
    </NavigationContainer>
  );
}
