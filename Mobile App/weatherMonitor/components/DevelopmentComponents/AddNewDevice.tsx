import { Text, View, StyleSheet, useColorScheme, Dimensions, TextInput } from "react-native";
import { useState, useEffect } from "react";
import SpinnerButton from 'react-native-spinner-button';

import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function AddNewDevice(){

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignItems: 'center',
    },
    label: {
        color: '#fff',
        marginBottom: 8,
        textAlign: 'left',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '80%',
        marginTop: '5%',
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
    return(
    <View style={styles.container}>
        <Text style={styles.label}>Enter device id (marked on the device)</Text>
        <TextInput
            style={styles.input}
            value={deviceId}
            onChangeText={setDeviceId}
            placeholder="Enter device ID"
            placeholderTextColor="#999"
        />
        <View style={styles.buttonContainer}>
            <SpinnerButton
                buttonStyle={styles.findButton}
                isLoading={isLoading}
                onPress={handleFindPress}
                spinnerColor="black"
                spinnerType="WaveIndicator"
                disabled={isDisabled}
            >
                <Text style={styles.buttonText}>Find</Text>
            </SpinnerButton>
        </View>
    </View>
    );
}

