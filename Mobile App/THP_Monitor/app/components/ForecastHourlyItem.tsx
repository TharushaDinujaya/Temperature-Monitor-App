import {Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function ForecastHourlyItem(props){

    return(
        <View style={styles.container}>
            <Text style={styles.time}>{props.forecastData.time}</Text>
            <View style={styles.icon}></View>
            <Text style={styles.temperature}>{props.forecastData.temperature}°C</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width * 0.15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#32333E',
        gap: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: width * 0.1,
    },
    icon:{
        width: '80%',
        height: 25,
        backgroundColor: 'red',
    },
    time: {
        fontSize: 12,
        color: '#D8D8D8'
    },
    temperature:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },
});