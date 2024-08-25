import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import SpinnerButton from 'react-native-spinner-button';
import SwitchSelector from "react-native-switch-selector";
import axios from 'axios';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

const { width } = Dimensions.get('window');

const BASE_URL = 'https://backend-testing-node.vercel.app/api/v1';

export default function DeviceOptions(props){
    const options = [
        { label: "Normal", value: 0, activeColor: 'black' },
        { label: "Auto Read", value: 1, activeColor: 'black' },
        { label: "Fast Read", value: 2, activeColor: 'black' },
    ];
    const [ sensorModeId, setSensorModeId ] = useState(props.mode);

    const [ sensorId, setSensorId ] = useState(props.sensorId);
    const [ deviceId, setDeviceId ] = useState(props.deviceId);

    const modesDetails = [
        {id: '0', modeNumber: 0, mode: 'Normal Mode', function:  'Read the Sensor data when it request by the device'},
        {id: '1', modeNumber: 1, mode: 'Auto Read Mode', function:  'Read the Sensor data hourly and store it in database'},
        {id: '2', modeNumber: 2, mode: 'Fast Read Mode', function: 'Read the Sensor data every 30 minutes and store it in database'}
    ]

    function handleChangeMode(value){
        setSensorModeId(value)
    }
    // Need to call change sensor mode API setting up mode
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Updating the sensor mode into", sensorModeId)
        const response = await axios.put(`${BASE_URL}/device/setSensorMode-${deviceId}-${sensorId}`,{mode:sensorModeId});
        console.log('Sensor mode updated Successfully !');
      } catch (error) {
        console.log('Error in Sensor mode update', error);
      }
    };
    fetchData();
  }, [sensorModeId]);

    const styles = StyleSheet.create({
        container : {
            flex: 1,
            width: '100%',
            marginTop: '10%',
        },
        detailsTitleText: {
            fontSize: 15,
            color: 'white',
            marginBottom: 5,
            textAlign: 'left'
        },
        detailsText: {
            fontSize: 12,
            color: 'white',
            marginBottom: '5%',
            paddingLeft: '10%'
        },
        column: {
            flexDirection: 'row',
            width: '100%',
            marginBottom: '5%',
            marginTop: '5%'
        },
        leftContainer: {
            width: '70%',
            paddingLeft: '5%',
            alignItems: 'flex-start',
        },
        rightContainer: {
            width: '30%',
            paddingRight: '5%',
            alignItems: 'flex-end',
        },
        input: {
            width: '80%',
            height: 40,
            borderColor: '#999',
            borderBottomWidth: 1,
            paddingHorizontal: 8,
            color: '#fff',
            marginBottom: 16,
        },
        dropdownContainer: {
            width: '80%',
            alignItems: 'center',
            marginBottom: '5%',
        },
        dropdown: {
            alignItems: 'center',
        },
        picker: {
            paddingTop: '5%',
            paddingBottom:'5%'
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.detailsTitleText}>Device Details</Text>
            <Text style={styles.detailsText}>
                Device Id : {props.deviceId}
            </Text>
            <Text style={styles.detailsTitleText}>Sensor Details</Text>
            <Text style={styles.detailsText}>
                Sensor : {options[sensorModeId].label}
            </Text>
            <View>
                <Text style={styles.detailsTitleText}>Sensor Mode</Text>
                <SwitchSelector
                  options={options}
                  initial={0}
                  style={styles.picker}
                  onPress={ (value) => {
                    handleChangeMode(value)
                  }}
                />
            </View>

            <Text style={styles.detailsTitleText}>Sensor Mode Details</Text>
            <View style={{paddingBottom: 12}}>
                <Text style={{color: 'white', textAlign: 'left', fontSize: 16}}> {modesDetails[0].modeNumber} - {modesDetails[0].mode} </Text>
                <Text style={{color: 'white', textAlign: 'justify', fontSize: 12}}> {modesDetails[0].function} </Text>
            </View>
            <View style={{paddingBottom: 12}}>
                <Text style={{color: 'white', textAlign: 'left', fontSize: 16}}> {modesDetails[1].modeNumber} - {modesDetails[1].mode} </Text>
                <Text style={{color: 'white', textAlign: 'justify', fontSize: 12}}> {modesDetails[1].function} </Text>
            </View>
            <View style={{paddingBottom: 12}}>
                <Text style={{color: 'white', textAlign: 'left', fontSize: 16}}> {modesDetails[2].modeNumber} - {modesDetails[2].mode} </Text>
                <Text style={{color: 'white', textAlign: 'justify', fontSize: 12}}> {modesDetails[2].function} </Text>
            </View>
        </View>
    );
}