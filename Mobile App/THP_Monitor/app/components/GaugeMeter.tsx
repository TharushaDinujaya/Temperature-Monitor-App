// gauge is not aligned well. make sure to correct it before finalizing the App
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const { width } = Dimensions.get('window');

export default function GaugeMeter(props){
    const airCondition = {
        '0' : 'Normal',
        '1' : 'Normal',
        '2' : 'Normal',
        '3' : 'Normal',
        '4' : 'Normal',
        '5' : 'Normal'
    }
    return(
        <View >
          <AnimatedCircularProgress
            size={width * 0.3}
            width={20}
            fill={props.value*20}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875"
            arcSweepAngle={240}
            rotation={240}
            tintColorSecondary='red'
            style={styles.gauge}/>
          <View style={styles.condition}>
            <Text style={styles.value}>{props.value}</Text>
            <Text style={styles.text}>{airCondition[props.value]} </Text>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        gap:0
    },
    gauge:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        horizontalAlign: 'center',
    },
    condition:{
        top: -width * 0.15,
    },
    text: {
        fontSize: 12,
        color: 'white',
        textAlign: 'center'
    },
    value: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})