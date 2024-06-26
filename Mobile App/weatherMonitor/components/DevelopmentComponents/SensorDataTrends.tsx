import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { BarChart } from "react-native-gifted-charts";

import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function SensorDataTrends(){
    const stackData = [
        {
          stacks: [
            {value: 26, color: 'blue'},
            {value: 31, color: 'red', marginBottom: 2},
          ],
          label: 'Jan',
        },
        {
          stacks: [
            {value: 27, color: 'blue'},
            {value: 30, color: 'red', marginBottom: 2},
          ],
          label: 'Mar',
        },
        {
          stacks: [
            {value: 29, color: 'blue'},
            {value: 33, color: 'red', marginBottom: 2},
          ],
          label: 'Feb',
        },
        {
          stacks: [
            {value: 27, color: 'blue'},
            {value: 30, color: 'red', marginBottom: 2},
          ],
          label: 'Mar',
        },
      ];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Temperature data Trends</Text>
            <View style={styles.chartContainer}>
                <BarChart
                width={200}
                noOfSections={4}
                stackData={stackData}
                barWidth={20}
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