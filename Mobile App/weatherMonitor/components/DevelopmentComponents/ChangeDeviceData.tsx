import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions } from "react-native";
import { useState, useEffect } from "react";

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function ChangeDeviceData(){

    return (
        <View style={styles.container}>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'red',
        width: 100,
        height: 100,
        paddingTop: '5%'
    }
})