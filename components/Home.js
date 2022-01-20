/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CardComponent from './CardComponent';

const Home = (props) => {
    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <ScrollView>
                {props.reminders.map(card => { return <CardComponent reminders={props.reminders} reminderController={props.reminderController} key={card.id} data={card} /> })}

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height,
    },
});

export default Home;
