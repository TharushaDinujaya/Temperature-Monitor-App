import {View, Text, StyleSheet, useColorScheme } from 'react-native';
import { useContext } from 'react';

import Icon from './Icon';
import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

export default function MainDetails(props){
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        mainRow1: {
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            paddingBottom: '2%',
        },
        mainRowCell: {
            width: '50%',
            height: DimensionsValues.mainConditions.iconHeight,
            flexDirection: 'column',
            paddingLeft: '2%',
            paddingRight: '2%',
            alignItems: 'center',
        },
        mainIcon:{
            width: '100%',
            height: '100%',
            alignItems: 'left',
            justifyContent: 'center',
        },
        temperatureText:{
            fontSize: DimensionsValues.mainConditions.mainTempTextSize,
            color: Colors[colorScheme ?? 'light'].mainTitleTextColor
        },
        conditionText:{
            fontSize: DimensionsValues.mainConditions.mainConditionTextSize,
            color: Colors[colorScheme ?? 'light'].titleTextColor,
        },
        conditionSubText:{
            marginTop: 3,
            fontSize: DimensionsValues.common.titleTextSize,
            color: Colors[colorScheme ?? 'light'].titleTextColor,
        },
    //---------------------------------------Sub Info--------------------
        mainRow2: {
            width: '90%',
            paddingTop: '20%',
            flex: 1,
            flexDirection: 'column',
        },
        mainRow2SubRow: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '2%',
            paddingRight: '2%',
            paddingBottom: '2%'
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
            width: DimensionsValues.subConditions.iconWidth,
            height: DimensionsValues.subConditions.iconHeight,
            justifyContent: 'center',
            marginRight: '5%',
        },
        titleText:{
            fontSize: DimensionsValues.common.normalTextSize,
            color: Colors[colorScheme ?? 'light'].normalTextColor,
            marginRight: '3%',
        },
        valueText:{
            fontSize: DimensionsValues.common.normalTextSize,
            color: Colors[colorScheme ?? 'light'].titleTextColor,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.mainRow1}>
                <View style={styles.mainRowCell}>
                    <View style={styles.mainIcon} >
                        <Icon icon={props.mainData.icon}/>
                    </View>
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
                        <View style={styles.icon} >
                            <Icon icon='02d'/>
                        </View>
                        <Text style={styles.titleText} >Wind Angle</Text>
                        <Text style={styles.valueText}>{props.mainData.windAngle}°</Text>
                    </View>
                    <View style={styles.mainRow2CellRight}>
                        <View style={styles.icon}>
                            <Icon icon='01H'/>
                        </View>
                        <Text style={styles.titleText} >Humidity</Text>
                        <Text style={styles.valueText}>{props.mainData.humidity}%</Text>
                    </View>
                </View>
                <View style={styles.mainRow2SubRow}>
                    <View style={styles.mainRow2CellLeft}>
                        <View style={styles.icon}>
                            <Icon icon='01d'/>
                        </View>
                        <Text style={styles.titleText}>Wind Speed</Text>
                        <Text style={styles.valueText}>{props.mainData.wind} km/h</Text>
                    </View>
                    <View style={styles.mainRow2CellRight}>
                        <View style={styles.icon}>
                            <Icon icon='01P'/>
                        </View>
                        <Text style={styles.titleText}>Pressure</Text>
                        <Text style={styles.valueText}>{props.mainData.pressure / 1000} kPa</Text>
                    </View>
               </View>
            </View>
        </View>
        );
}