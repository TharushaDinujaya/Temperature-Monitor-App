import { Text, View, StyleSheet, useColorScheme, Dimensions, Pressable } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from 'react-native-dropdown-picker';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

import SensorGauge from './SensorGauge';
import SensorDataTrends from './SensorDataTrends';
import DeviceOptions from './DeviceOptions';

const { width } = Dimensions.get('window');

export default function SensorData(){
    const [ sensorIds, setSensorIds ] = useState([
             {value: "s_01", label: "Temperature"},
             {value: "s_02", label: "Humidity"},
             {value: "s_03", label: "Pressure"},
             {value: "s_04", label: "CO2"},
             {value: "s_05", label: "PM2.5"},
             {value: "s_06", label: "PM10"},
         ]);
    const [ open, setOpen ] = useState(false);
    const [ currentSensorId, setCurrentSensorId ] = useState('a');
    const [ isChangePressed, setChangePressed ] = useState(false);
    const [ pressIn, setPressIn ] = useState(false);

    const handleChange = () => {
        console.log("Change Pressed")
        setChangePressed(!isChangePressed)
    }

    const handlePressIn = () => {
        console.log("Change Press in")
        setPressIn(!pressIn)
    }
    return(
        <View style={styles.container}>
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={open}
                    value={currentSensorId}
                    items={sensorIds}
                    setOpen={setOpen}
                    setValue={setCurrentSensorId}
                    max={5}
                    style={styles.dropdown}
                    placeholder={'Select Sensor '}
                    containerStyle={styles.dropdownContainer}
                />
            </View>
            { currentSensorId !== null ?
                <View style={styles.sensorData}>
                    <SensorGauge/>
                    <SensorDataTrends/>

                    <Pressable
                    onPress={handleChange}
                    onPressIn={handlePressIn}>
                    <Text style={[pressIn && styles.pressIn, styles.changeText]}>Change Device ID Sensor Mode</Text>
                    </Pressable>
                    {
                        isChangePressed ? <DeviceOptions /> : null
                    }
                </View> : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    dropdownContainer: {
        width: '80%',
        alignItems: 'center',
        marginBottom: '5%'
    },
    dropdown: {
        alignItems: 'center',
    },
    sensorData: {
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%'
    },
    changeText: {
        fontSize: 12,
        marginTop: '5%',
        color: 'white',
        textAlign: 'left',
    },
    pressIn: {
        textDecorationLine: 'underline'
    }
})