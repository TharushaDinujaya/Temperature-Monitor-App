import {View, Text, StyleSheet} from 'react-native';

import Icon from '../components/Icon';

export default function MainDetails(props){
    return (
        <View style={styles.container}>
            <View style={styles.mainRow1}>
                <View style={styles.mainRowCell}>
                    <View style={styles.mainIcon} ></View>
                </View>
                <View style={styles.mainRowCell}>
                      <Text style={styles.temperatureText} > {props.mainData.temperature}° </Text>
                      <Text style={styles.conditionText} > {props.mainData.condition} </Text>
                      <Text style={styles.conditionSubText} >Feels Like {props.mainData.feelsLike}°C</Text>
                </View>
            </View>
            <View style={styles.mainRow2}>
                <View style={styles.mainRow2SubRow}>
                    <View style={styles.mainRow2CellLeft}>
                        <View style={styles.icon} ></View>
                        <Text style={styles.titleText} >Wind Angle</Text>
                        <Text style={styles.valueText}>{props.mainData.windAngle}</Text>
                    </View>
                    <View style={styles.mainRow2CellRight}>
                        <View style={styles.icon}></View>
                        <Text style={styles.titleText} >Humidity</Text>
                        <Text style={styles.valueText}>{props.mainData.humidity}%</Text>
                    </View>
                </View>
                <View style={styles.mainRow2SubRow}>
                    <View style={styles.mainRow2CellLeft}>
                        <View style={styles.icon}></View>
                        <Text style={styles.titleText}>Wind Speed</Text>
                        <Text style={styles.valueText}>{props.mainData.wind} km/h</Text>
                    </View>
                    <View style={styles.mainRow2CellRight}>
                        <View style={styles.icon}></View>
                        <Text style={styles.titleText}>Pressure</Text>
                        <Text style={styles.valueText}>{props.mainData.pressure / 1000} kPa</Text>
                    </View>
               </View>
            </View>
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
    },
//---------------------------------------Main Info--------------------
    mainRow1: {
        width: '100%',
        flex: 0.7,
        flexDirection: 'row',
        paddingBottom: '5%',
    },
    mainRowCell: {
        width: '50%',
        flexDirection: 'column',
        paddingLeft: '2%',
        paddingRight: '2%',
        alignItems: 'center',
    },
    mainIcon:{
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
    },
    temperatureText:{
        fontSize: 55,
        color: 'white',
    },
    conditionText:{
        fontSize: 25,
        color: 'white',
    },
    conditionSubText:{
        marginTop: 3,
        fontSize: 15,
        color: 'white',
    },
//---------------------------------------Sub Info--------------------
    mainRow2: {
        width: '100%',
        flex: 0.3,
        flexDirection: 'column',
    },
    mainRow2SubRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: 10
    },
    mainRow2CellLeft:{
        width: '50%',
        flexDirection: 'row',
        paddingRight: '5%',
        alignItems: 'center',
    },
    mainRow2CellRight:{
        width: '50%',
        flexDirection: 'row',
        paddingLeft: '5%',
        alignItems: 'center',
    },
    icon: {
        width: '10%',
        height: '100%',
        marginRight: '5%',
        backgroundColor: 'red',
    },
    titleText:{
        fontSize: 12,
        color: '#9B9EAD',
        marginRight: '3%',
    },
    valueText:{
        fontSize: 12,
        color: 'white',
    },
});