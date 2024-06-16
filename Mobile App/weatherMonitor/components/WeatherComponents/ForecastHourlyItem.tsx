import {Text, View, StyleSheet, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Icon from './Icon';
import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

const { width } = Dimensions.get('window');

const getTimeFromUnixTimestamp = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export default function ForecastHourlyItem(props){
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: width * 0.15,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: width * 0.025,
            paddingTop: width * 0.05,
            paddingBottom: width * 0.05,
            borderRadius: width * 0.1,
        },
        background: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
            borderRadius: width * 0.1,
        },
        icon:{
            width: '80%',
            height: DimensionsValues.forecastIcons.iconHeight
        },
        time: {
            fontSize: DimensionsValues.common.normalTextSize,
            color: Colors[colorScheme ?? 'light'].normalTextColor,
        },
        temperature:{
            fontSize: DimensionsValues.common.titleTextSize,
            fontWeight: 'bold',
            color: Colors[colorScheme ?? 'light'].titleTextColor,
        },
    });

    return(
        <View>
            <LinearGradient
                colors={[
                        Colors[colorScheme ?? 'light'].forecastGradientHigh,
                        Colors[colorScheme ?? 'light'].forecastGradientMid,
                        Colors[colorScheme ?? 'light'].forecastGradientLow]}
                style={styles.background}
            />
            <View style={styles.container}>
                <Text style={styles.time}>{getTimeFromUnixTimestamp(props.forecastData.time)}</Text>
                <View style={styles.icon}>
                    <Icon icon={props.forecastData.icon}/>
                </View>
                <Text style={styles.temperature}>{props.forecastData.temperature}°C</Text>
            </View>
        </View>
    );
};