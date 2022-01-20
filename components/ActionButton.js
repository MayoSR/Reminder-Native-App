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
    Button,
    TouchableOpacity
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CardComponent from './CardComponent';

import Icon from 'react-native-vector-icons/FontAwesome';

const ActionButton = (props) => {


    return (
        <TouchableOpacity style={styles.viewStyle} activeOpacity={0.8} onPress={() => props.controller(true)}>

            <View>
                <View style={styles.actionButtonContainer}>

                    <Icon name="plus" size={30} color="#900" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    actionButton: {
        margin: 0,
        padding: 0,
    },
    actionButtonContainer: {
        padding: 20,
        backgroundColor: "#ff0000",
        height: 75,
        width: 75,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        elevation: 10,
    },
    viewStyle: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        zIndex: 100,
        height: 75,
        width: 75,
    }
});

export default ActionButton;
