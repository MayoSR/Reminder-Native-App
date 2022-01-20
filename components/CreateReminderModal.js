/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react';
import {
    Button, StyleSheet,
    Text, View
} from 'react-native';
import Modal from "react-native-modal";
import { SafeAreaView, TextInput, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification, { Importance } from 'react-native-push-notification';
import { AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreateReminderModal = (props) => {

    const [title, setTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [time, setTime] = useState(null)

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    const createReminder = async (reminder) => {
        console.log("create reminder", reminder)
        AsyncStorage.removeItem('reminders')
        await AsyncStorage.setItem(
            "reminders", JSON.stringify(reminder)
        );
    };

    const sendNotification = () => {


        let date = time.split(" ")[0]
        let Y = parseInt(date.split("-")[0])
        let M = parseInt(date.split("-")[1]) - 1
        let D = parseInt(date.split("-")[2])
        let timeStamp = time.split(" ")[1]
        let H = parseInt(timeStamp.split(":")[0])
        let MM = parseInt(timeStamp.split(":")[1])
        console.log(new Date(Y, M, D, H, MM),)

        let id = genRanHex(16)

        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id: id,
            channelId: "note-app-id",
            message: message, // (required)
            date: new Date(Y, M, D, H, MM), // in 60 secs
            allowWhileIdle: true, // (optional) set notification to work while on doze, default: false

            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });

        let reminderObject = { id: id, title: title, message: message, time: new Date(Y, M, D, H, MM).toString().split("GMT")[0] }
        createReminder([...props.reminders, reminderObject])
        props.reminderController([...props.reminders, reminderObject])
        console.log(props.reminders)
    }


    return (
        <Modal isVisible={props.status}>
            <View style={styles.modalStyle} >
                <View style={styles.closeContainer}>
                    <Text style={{ color: 'black', fontSize: 32 }}>Reminder</Text>
                    <Icon name="close" size={30} color="blue" onPress={() => props.controller(false)} />
                </View>
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        placeholderTextColor="#000"
                        keyboardType="numeric"
                        onChangeText={(text) => { setTitle(text) }}
                    />
                </View>
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        numberOfLines={4}
                        placeholder="Reminder"
                        placeholderTextColor="#000"
                        keyboardType="numeric"
                        onChangeText={(text) => { setMessage(text) }}
                    />
                </View>
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="YYYY-MM-DD HH:MM"
                        placeholderTextColor="#000"
                        keyboardType="numeric"
                        onChangeText={(text) => setTime(text)}
                    />
                </View>

                <Button title="Create Reminder" onPress={() => {
                    props.controller(false); sendNotification()
                }} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    input: {
        borderBottomColor: 'black',
        color: 'black'
    },
    inputContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    closeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default CreateReminderModal;
