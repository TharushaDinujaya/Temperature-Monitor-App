import {Text, View, StyleSheet} from 'react-native';

export default function ForecastDailyItem(props){
    return(
        <View style={styles.container}>
            <Text style={styles.day}>{props.forecastData.day}</Text>
            <View style={styles.icon}></View>
            <Text style={styles.maxTemp}>{props.forecastData.max_temperature}°C</Text>
            <Text style={styles.minTemp}>{props.forecastData.min_temperature}°C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    day: {
        fontSize: 15,
        color: 'white',
        width: '40%',
        paddingLeft: '2%'
    },
    maxTemp:{
        fontSize: 15,
        fontWidth: 'bold',
        color: 'white',
        width: '30%',
        paddingLeft: '10%',
        textAlign: 'center'
    },
    minTemp:{
        fontSize: 15,
        fontWidth: 'bold',
        color: 'white',
        width: '20%',
        textAlign: 'center',
    },
    icon: {
        width: '10%',
        height: 25,
        backgroundColor: 'red'
    }
})