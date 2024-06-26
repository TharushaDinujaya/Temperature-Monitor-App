import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

import SensorData from './DevelopmentComponents/SensorData';
import AddNewDevice from './DevelopmentComponents/AddNewDevice';

const { width } = Dimensions.get('window');

export default function Development() {
    const colorScheme = useColorScheme();

    const [ deviceIds, setDeviceIds ] = useState([
            {label: 'Device 01', value: 'd_01'},
            {label: 'Device 02', value: 'd_02'},
            {label: 'Device 03', value: 'd_03'},
            {label: 'Device 04', value: 'd_04'},
            {label: 'Device 05', value: 'd_05'},
            {label: 'Device 06', value: 'd_06'},
            {label: 'Add new Device ...', value: 'add'},
    ]);

    const [ isDeviceIdSelected, setIsDeviceIdSelected ] = useState(false);
    const [ currentDeviceId, setCurrentDeviceId] = useState(null);
    const [ isDeviceAvailable, setIsDeviceAvailable ] = useState(true);



    const [ newDeviceId, setNewDeviceId ] = useState(null);
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        // check currentDeviceId is correct or not
        console.log(currentDeviceId)
        if(currentDeviceId === null) {
            setIsDeviceIdSelected(false)
            return
        }
        // if add new device is selected
        if(currentDeviceId === 'add') {
            setIsDeviceIdSelected(true)
            setIsDeviceAvailable(false)
            return
        }
        // if device is available and get data using currentDeviceId
        setIsDeviceAvailable(true)
        setSensorIds()
        setIsDeviceIdSelected(true)
    }, [currentDeviceId])

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <LinearGradient
                colors={[Colors[colorScheme].gradientContainerHigh, Colors[colorScheme].gradientContainerLow]}
                style={styles.background}
                />

                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        open={open}
                        value={currentDeviceId}
                        items={deviceIds}
                        setOpen={setOpen}
                        setValue={setCurrentDeviceId}
                        max={5}
                        style={styles.dropdown}
                        placeholder={'Select Device ID'}
                        labelStyle={styles.dropdownLabel}
                        containerStyle={styles.dropdownContainer}
                    />
                </View>

                <View style={styles.scrollContainer}>
                    <SensorData/>
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
    dropdown: {
        alignItems: 'center',
    },
    dropdownContainer: {
        width: '80%',
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '5%'
    }
})

//                 {isDeviceIdSelected ? isDeviceAvailable ? <SensorData/> :
//                     currentDeviceId === 'add' ? <AddNewDevice/> :
//                     <Text>Device Unavailable</Text> : <Text> Select Device ID</Text>
//                 }