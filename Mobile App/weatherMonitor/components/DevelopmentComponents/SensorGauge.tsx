import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import AnimatedProgressWheel from 'react-native-progress-wheel';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function SensorGauge(){

    const tempData = {
        'maxTemperature' : 31,
        'minTemperature' : 26,
        'currentTemperature' : 27,
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.leftContainer}>
                    <AnimatedProgressWheel
                        size={180}
                        width={20}
                        color={'white'}
                        progress={10}
                        backgroundColor={'lightblue'}
                        labelStyle={styles.gaugeTitleText}
                        animateFromValue={0}
                        duration={3000}
                        showProgressLabel={true}
                        rotation={'-90deg'}
                        subtitle={'Sensor Data'}
                        subtitleStyle={styles.gaugeSubTitle}
                    />
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.mainText}>
                        Temperature
                    </Text>
                    <Text style={styles.mainTextValue}>
                        {tempData.currentTemperature}°C
                    </Text>
                    <Text style={styles.subText}>
                        Max : {tempData.maxTemperature}°
                    </Text>
                    <Text style={styles.subText}>
                        Min : {tempData.minTemperature}°C
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: '100%',
        paddingTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: 'white'
    },
    mainText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center'
    },
    mainTextValue: {
        color: 'white',
        fontSize: 40,
        textAlign: 'center'
    },
    subText: {
        color: 'gray',
        fontSize: 20,
        textAlign: 'center'
    },
    rightContainer: {
        flexDirection: 'column',
        width: '40%'
    },
    leftContainer: {
        flexDirection: 'column',
        width: '60%',
        alignItems: 'center',
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gaugeTitleText: {
        color: 'white',
        fontSize: 30,
    },
    gaugeSubTitle: {
        color: 'white',
        fontSize: 15,
    },

})