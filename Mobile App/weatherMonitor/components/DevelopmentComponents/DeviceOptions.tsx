import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions, TextInput } from "react-native";
import { useState, useEffect } from "react";
import SpinnerButton from 'react-native-spinner-button';
import DropDownPicker from 'react-native-dropdown-picker';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function DeviceOptions(){
    const [isLoading, setLoading] = useState(false);
    const [isFindPressed, setFindPressed] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [deviceId, setDeviceId] = useState('');

    const handleFindPress = () => {
        setFindPressed(true);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
    };

    const [ sensorModes, setSensorModes ] = useState([
             {value: "m_01", label: "Normal"},
             {value: "m_02", label: "Fast Measure"},
             {value: "m_03", label: "Analytical"},
             {value: "m_04", label: "Time Period"},
             {value: "m_05", label: "Hour by Hour"},
             {value: "m_06", label: "Random"},
         ]);
    const [ open, setOpen ] = useState(false);
    const [ currentSensorMode, setCurrentSensorMode ] = useState('a');

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
        findButton: {
            width: 100,
            height: 30,
            borderColor: '#999',
            borderRadius: 10,
            backgroundColor: isDisabled ? 'gray' : 'white',
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
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
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.detailsTitleText}>Device Details</Text>
            <Text style={styles.detailsText}>Device Name, Device sensors and other data</Text>
            <Text style={styles.detailsTitleText}>Sensor Details</Text>
            <Text style={styles.detailsText}>Sensor Name, Sensor details, Sensor Accuracy</Text>
            <View style={styles.column}>
                <View style={styles.leftContainer}>
                    <Text style={styles.detailsTitleText}>Sensor Mode</Text>
                        <DropDownPicker
                            open={open}
                            value={currentSensorMode}
                            items={sensorModes}
                            setOpen={setOpen}
                            setValue={setCurrentSensorMode}
                            max={2}
                            style={styles.dropdown}
                            placeholder={'Select Sensor mode'}
                            containerStyle={styles.dropdownContainer}
                        />
                </View>
                <View style={styles.rightContainer}>
                    <SpinnerButton
                        buttonStyle={styles.findButton}
                        isLoading={isLoading}
                        onPress={handleFindPress}
                        spinnerColor="black"
                        spinnerType="WaveIndicator"
                        disabled={isDisabled}
                    >
                        <Text style={styles.buttonText}>change</Text>
                    </SpinnerButton>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.leftContainer}>
                    <Text style={styles.detailsTitleText}>Device ID</Text>
                    <TextInput
                        style={styles.input}
                        value={deviceId}
                        onChangeText={setDeviceId}
                        placeholder="Enter new device ID"
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.rightContainer}>
                    <SpinnerButton
                        buttonStyle={styles.findButton}
                        isLoading={isLoading}
                        onPress={handleFindPress}
                        spinnerColor="black"
                        spinnerType="WaveIndicator"
                        disabled={isDisabled}
                    >
                        <Text style={styles.buttonText}>change</Text>
                    </SpinnerButton>
                </View>
            </View>
            <Text style={styles.detailsTitleText}>Sensor Mode Details</Text>
            <Text style={styles.detailsText}>Modes and Benefits</Text>

        </View>
    );
}

