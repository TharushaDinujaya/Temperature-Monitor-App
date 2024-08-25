import { Text, View, StyleSheet, useColorScheme, Dimensions, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import SwitchSelector from "react-native-switch-selector";
import axios from 'axios';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

import SensorGauge from './SensorGauge';
import SensorDataTrends from './SensorDataTrends';
import DeviceOptions from './DeviceOptions';

const { width } = Dimensions.get('window');

const BASE_URL = 'https://backend-testing-node.vercel.app/api/v1';

export default function SensorData(props){
    const [deviceId, setDeviceID ] = useState(props.deviceId);

    const sensorIds = [
             {value: "1", label: "Temperature Sensor"},
             {value: "2", label: "Humidity Sensor"},
             {value: "3", label: "Pressure Sensor"},
             {value: "4", label: "Soil Moisture Sensor"}
         ];
    const sensors = [
        "Temperature", "Humidity", "Pressure", "Soil Moisture"
    ]
    const [ sensor, setSensor ] = useState(sensorIds[0].label); // sensor name
    const [ sensorMode, setSensorMode ] = useState(0); // sensor mode code
    const [ sensorId, setSensorId ] = useState(1); // sensor id

    const options = [
        { label: "01", value: 1, activeColor: 'black' },
        { label: "02", value: 2, activeColor: 'black' },
        { label: "03", value: 3, activeColor: 'black' },
        { label: "04", value: 4, activeColor: 'black' },
    ];

    const handleChangeSensor = (value) => {
        setSensor(sensorIds[value-1].label); // set sensor mode text
        setSensorId(value) // set sensor mode id
    };

    const handleChangeMode = (value) => {
        setSensorMode(value); // set sensor mode code
    };
    // ------------------------------- sample data-------------
    const [stackData, setStackData] = useState ([
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        },
        {
          stacks: [
            {value: 0, color: 'blue'},
            {value: 0, color: 'red', marginBottom: 2},
          ],
        }
      ])

      const [data, setData] = useState(
        { 'max' : '31°C',
          'min' : '26°C',
          'current' : '27°C',
          'gauge' : 9}
      )
    // --------------------------------------------------------

    //-------------------------------- API calls get current data / stored data from DB --------------
    useEffect(() => {
        const fetchData = async () => {
          // get stored data from database by sensor id and device id
          try {
          console.log("Getting the sensor data from the database")
            const response = await axios.get(`${BASE_URL}/data/storedData-${deviceId}-${sensorId}`);
            if (response.data.state){
                console.log('Stored Data Fetched Successfully !');
                const readings = response.data.reading;
                const updatedStackData = [...stackData];

                // Update the stackData array using a for loop
                for (let i = 0; i < updatedStackData.length && i < readings.length && i < 10; i++) {
                    updatedStackData[i].stacks[0].value = readings[i].reading;
                }

                setStackData(updatedStackData);
            }
          } catch (error) {
            console.log('Error in getting stored data', error);
          }

          // get current data by sensor id and device id
          try {
            console.log("Getting the sensor data from the device")
            const response = await axios.get(`${BASE_URL}/device/getSensorReading-${deviceId}-${sensorId}`);
            if (response.data.state){
                setData(response.data)
                console.log('Sensor Data Fetched Successfully !');
            }
          } catch (error) {
            console.log('Error in getting sensor data', error);
          }
        };
        fetchData();
    }, [sensorId]);

    //---------------------------------------------------------

    return(
        <View style={styles.container}>
            <View style={styles.dropdownContainer}>
                <SwitchSelector
                  options={options}
                  initial={0}
                  onPress={handleChangeSensor}
                />
            </View>
            <Text style={styles.sensorText}>{sensor}</Text>

                <View style={styles.sensorData}>
                    <SensorGauge
                        sensor={sensors[sensorId-1]}
                        data={data}
                    />

                    <SensorDataTrends
                        sensor={sensors[sensorId-1]}
                        stackData={stackData}
                    />

                    <DeviceOptions
                        deviceId={props.deviceId}
                        mode={sensorMode}
                        sensorId={sensorId}
                    />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingBottom:'5%'
    },
    dropdownContainer: {
        width: '80%',
        alignItems: 'center',
        marginBottom: '10%',
        marginTop: '10%'
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
    },
    sensorText: {
        fontSize:24,
        color: 'white',
        paddingBottom: '5%'
    }
})