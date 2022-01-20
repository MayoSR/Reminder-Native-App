/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Platform,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CardComponent from './components/CardComponent';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import CardInfo from './components/CardInfo';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionButton from './components/ActionButton';
import PushNotification, { Importance } from 'react-native-push-notification';
import CreateReminderModal from './components/CreateReminderModal';
import { AsyncStorage } from 'react-native';

const Stack = createNativeStackNavigator();

PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  requestPermissions: Platform.OS === 'ios'
})

PushNotification.createChannel(
  {
    channelId: "note-app-id", // (required)
    channelName: "Note App", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [modalVisibility, setModalVisibility] = useState(false)
  const [reminders, setReminders] = useState([])

  useEffect(
    readReminders
    , [reminders]
  )

  function readReminders() {
    AsyncStorage.getItem('reminders').then(value => value === null ? setReminders([]) : setReminders(JSON.parse(value)))
    // AsyncStorage.clear()
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: 'Welcome' }}
        >
          {props => <Home reminders={reminders} reminderController={setReminders} />}
        </Stack.Screen>
        <Stack.Screen name="Info" component={CardInfo} />
      </Stack.Navigator>
      <ActionButton controller={setModalVisibility} />
      <CreateReminderModal reminders={reminders} reminderController={setReminders} status={modalVisibility} controller={setModalVisibility} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({


});

export default App;
