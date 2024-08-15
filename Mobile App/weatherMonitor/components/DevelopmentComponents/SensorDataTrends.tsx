import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { BarChart } from "react-native-gifted-charts";

import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function SensorDataTrends(props){

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.sensor} data Trends</Text>
            <View style={styles.chartContainer}>
                <BarChart
                width={280}
                noOfSections={10}
                stackData={props.stackData}
                barWidth={10}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        width: '100%',
        paddingTop: '10%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: 'white'
    },
    chartContainer: {
        width: '100%',
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10
    }
})