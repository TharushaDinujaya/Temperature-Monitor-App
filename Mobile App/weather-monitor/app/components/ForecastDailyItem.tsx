import {Text, View, StyleSheet} from 'react-native';
import { useColorScheme } from 'react-native';

import Icon from './Icon';
import { Colors } from '@/constants/Colors';
import { DimensionsValues } from '@/constants/DimensionsValues';

const getWeekdayFromUnixTimestamp = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    const dayIndex = date.getUTCDay();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[dayIndex];
};

export default function ForecastDailyItem(props){
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            padding: 10,
        },
        day: {
            fontSize: DimensionsValues.common.titleTextSize,
            color: Colors[colorScheme ?? 'light'].normalTextColor,
            width: '40%',
            paddingLeft: '2%'
        },
        maxTemp:{
            fontSize: DimensionsValues.common.titleTextSize,
            fontWidth: 'bold',
            color: Colors[colorScheme ?? 'light'].titleTextColor,
            width: '30%',
            paddingLeft: '10%',
            textAlign: 'center'
        },
        minTemp:{
            fontSize: DimensionsValues.common.titleTextSize,
            fontWidth: 'bold',
            color: Colors[colorScheme ?? 'light'].titleTextColor,
            width: '20%',
            textAlign: 'center',
        },
        icon: {
            width: DimensionsValues.forecastIcons.iconWidth,
            height: DimensionsValues.forecastIcons.iconHeight,
        }
    })
    return(
        <View style={styles.container}>
            <Text style={styles.day}>{props.forecastData.day === 'Today' ? 'Today' : getWeekdayFromUnixTimestamp(props.forecastData.day)}</Text>
            <View style={styles.icon}>
                <Icon icon={props.forecastData.icon}/>
            </View>
            <Text style={styles.maxTemp}>{props.forecastData.max_temperature}°C</Text>
            <Text style={styles.minTemp}>{props.forecastData.min_temperature}°C</Text>
        </View>
    )
}