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

const CardInfo = ({ route, navigaton }) => {


    const data = route.params
    console.log(data)

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollStyle}>
                <View>
                    <Text style={styles.titleStyle}>{data["data"].title}</Text>
                </View>
                <View>
                    <Text style={styles.timeStyle}>{data["data"].time}</Text>
                </View>
                <View>
                    <Text style={styles.textStyle}>{data["data"].message}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    scrollStyle: {
        padding: 20,
        height: Dimensions.get('window').height,
        backgroundColor: '#502064',
    },
    titleStyle: {
        fontSize: 64
    },
    timeStyle: {
        fontSize: 12,
        marginVertical: 10,
    },
    textStyle: {
        fontSize: 20
    }
});

export default CardInfo;
