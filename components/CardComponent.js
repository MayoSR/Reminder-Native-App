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
    TouchableOpacity,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AsyncStorage } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

const CardComponent = (props) => {

    const navigation = useNavigation();

    const deleteReminder = (deleteID) => {
        const reminderList = [...props.reminders.filter(reminder => reminder.id !== props.data.id)]
        props.reminderController(reminderList)
        deleteReminderFromStorage(reminderList, deleteID)
    }

    const deleteReminderFromStorage = async (reminder, id) => {
        AsyncStorage.removeItem('reminders')
        await AsyncStorage.setItem(
            "reminders", JSON.stringify(reminder)
        );
        PushNotification.cancelLocalNotifications({ id: id })
    };

    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate("Info", { data: props.data })} activeOpacity={0.8}>
            <View style={styles.cardStyle}>
                <Icon onPress={() => deleteReminder(props.data.id)} name="closecircle" size={30} style={styles.deleteIcon} color="#cecece" />
                <Text style={styles.textStyle} numberOfLines={1}>{props.data.title}</Text>
                <Text style={styles.messageStyle} numberOfLines={1}>{props.data.message}</Text>
                <Text style={styles.timeStyle}>{props.data.time}</Text>
            </View>

        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: '#502064',
        height: 150,
        margin: 20,
        marginBottom: 0,
        padding: 20,
        borderRadius: 15,
        position: 'relative',
    },
    textStyle: {
        fontSize: 32,
        marginBottom: 10,
    },
    messageStyle: {
        fontSize: 16,
    },
    timeStyle: {
        fontSize: 12,
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    deleteCard: {
        position: 'absolute',
        top: -10,
        right: -10,
        zIndex: 10,
        borderRadius: 50,
        backgroundColor: "#fff"
    },
    deleteIcon: {
        position: 'absolute',
        top: -10,
        right: -10,
        zIndex: 10,
        borderRadius: 50,
        backgroundColor: "#fff"
    }

});

export default CardComponent;
