// gauge is not aligned well. make sure to correct it before finalizing the App
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function GaugeMeter(props){
    const colorScheme = useColorScheme();
    const airCondition = {
        '1' : 'Good',
        '2' : 'Fair',
        '3' : 'Moderate',
        '4' : 'Poor',
        '5' : 'Very Poor'
    }

    const styles = StyleSheet.create({
        container:{
            alignItems: 'center',
        },
        gauge:{
            top: DimensionsValues.gauge.gaugeWidth * 0.3,
            left: DimensionsValues.gauge.gaugeWidth * 0.1
        },
        condition:{
            top: -(DimensionsValues.gauge.gaugeWidth / 2)+ DimensionsValues.gauge.gaugeWidth * 0.1,
            left: (DimensionsValues.gauge.gaugeWidth * 0.6) - DimensionsValues.gauge.gaugeBarWidth * 1.5,
            width: DimensionsValues.gauge.gaugeBarWidth * 3,
        },
        text: {
            fontSize: DimensionsValues.common.titleTextSize,
            color: Colors[colorScheme ?? 'light'].titleTextColor,
            textAlign: 'center'
        },
        value: {
            fontSize: DimensionsValues.common.extraLargeTextSize,
            color: Colors[colorScheme ?? 'light'].titleTextColor,
            fontWeight: 'bold',
            textAlign: 'center'
        }
    })
    return(
        <View >
          <AnimatedCircularProgress
            size={DimensionsValues.gauge.gaugeWidth}
            width={DimensionsValues.gauge.gaugeBarWidth}
            fill={props.value * 20}
            tintColor={Colors[colorScheme ?? 'light'].gaugeColor}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor={Colors[colorScheme ?? 'light'].gaugeBackColor}
            arcSweepAngle={240}
            rotation={240}
            tintColorSecondary={Colors[colorScheme ?? 'light'].gaugeSecondaryColor}
            style={styles.gauge}/>
          <View style={styles.condition}>
            <Text style={styles.value}>{props.value}</Text>
            <Text style={styles.text}>{airCondition[props.value]} </Text>
          </View>
        </View>
    );
}