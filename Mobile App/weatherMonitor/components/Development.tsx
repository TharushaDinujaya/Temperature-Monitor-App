import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

import SensorData from './DevelopmentComponents/SensorData';
import AddNewDevice from './DevelopmentComponents/AddNewDevice';

const { width } = Dimensions.get('window');

export default function Development() {
    const colorScheme = useColorScheme();
    const [ deviceId, setDeviceId] = useState(1);

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <LinearGradient
                colors={[Colors[colorScheme].gradientContainerHigh, Colors[colorScheme].gradientContainerLow]}
                style={styles.background}
                />
                <View style={styles.scrollContainer}>
                    <SensorData deviceId={deviceId}/>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer:{
        flex: 1,
        width: '100%',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
})