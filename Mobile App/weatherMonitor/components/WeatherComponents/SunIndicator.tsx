import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function SunIndicator(props){
    const colorScheme = useColorScheme();
    const radius = DimensionsValues.sun.radius;
    const diameter = radius * 2;
    const currentTime = props.timeData.currentTime.hours * 60 + props.timeData.currentTime.minutes;
    const sunriseTime = props.timeData.sunrise.hours * 60 + props.timeData.sunrise.minutes;
    const sunsetTime = props.timeData.sunset.hours * 60 + props.timeData.sunset.minutes;

    const totalMinutes = sunsetTime - sunriseTime;
    const elapsedMinutes = currentTime - sunriseTime;

    // Convert angle to radians for position calculation
    const angleInRadians = ((elapsedMinutes / totalMinutes) * Math.PI);
    const sunX = elapsedMinutes <= totalMinutes / 2 ? (diameter - diameter * Math.cos(angleInRadians)) : diameter + diameter * Math.sin(angleInRadians - (Math.PI / 2));
    const sunY = elapsedMinutes <= totalMinutes / 2 ? (diameter * Math.sin(angleInRadians)) : diameter * Math.cos(angleInRadians - (Math.PI / 2));

    const moonAngleInRadians = (((currentTime - sunsetTime) / (sunriseTime + (24 * 60 - sunsetTime))) * Math.PI);
    const moonX = elapsedMinutes <= totalMinutes / 2 ? (diameter - diameter * Math.cos(moonAngleInRadians)) : diameter + diameter * Math.sin(moonAngleInRadians - (Math.PI / 2));
    const moonY = elapsedMinutes <= totalMinutes / 2 ? (diameter * Math.sin(moonAngleInRadians)) : diameter * Math.cos(moonAngleInRadians - (Math.PI / 2));

    const isDaytime = currentTime >= sunriseTime && currentTime <= sunsetTime;

    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
      },
    });

    return (
    <View style={styles.container}>
      <Svg width='100%' height='100%' viewBox={`0 0 ${radius * 2} ${radius}`}>
        <Path
          d={`M 0 ${radius} A ${radius} ${radius} 0 0 1 ${radius * 2} ${radius}`}
          fill="none"
          stroke={Colors[colorScheme ?? 'light'].sunPathColor}
          strokeWidth="0.5"
          strokeDasharray="3,3"
        />
        <Line
          x1={radius} y1={radius}
          x2={isDaytime ? sunX/2 : moonX/2}
          y2={isDaytime ? radius - sunY/2 : radius - moonY/2}
          stroke={Colors[colorScheme ?? 'light'].sunIndicatorColor}
          strokeWidth="0.5"
          strokeDasharray="3,3"
        />
      </Svg>
      {isDaytime ? (
        <Image
          source={require('../../assets/icons/01d.png')}
          style={{ position: 'absolute', left: -DimensionsValues.subConditions.iconWidth/2 + sunX, bottom: sunY, width: DimensionsValues.subConditions.iconWidth, height: DimensionsValues.subConditions.iconHeight }}
        />
      ) : (
        <Image
          source={require('../../assets/icons/01n.png')}
          style={{ position: 'absolute', left: -DimensionsValues.subConditions.iconHeight/2 + moonX, bottom: moonY, width: DimensionsValues.subConditions.iconWidth, height: DimensionsValues.subConditions.iconHeight }}
        />
      )}
    </View>
    );
};