import { Text, View, StyleSheet, ScrollView, useColorScheme, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import SpinnerButton from 'react-native-spinner-button';

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function DeviceOptions(){
    const [isLoading, setLoading] = useState(false);
    const [isFindPressed, setFindPressed] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [deviceId, setDeviceId] = useState('');

    const handleFindPress = () => {
        setFindPressed(true);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.detailsTitleText}>Device Details</Text>
            <Text style={styles.detailsText}>Device Name, Device sensors and other data</Text>
            <Text style={styles.detailsTitleText}>Sensor Details</Text>
            <Text style={styles.detailsText}>Sensor Name, Sensor details, Sensor Accuracy</Text>
            <View style={styles.row}>
                <View style={styles.left}>

                </View>
                <View style={styles.right}>
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
        </View>
    );
}

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
})