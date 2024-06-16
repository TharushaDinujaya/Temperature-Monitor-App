import { Text, StyleSheet, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Colors } from '@/constants/Colors';
import { DimensionsValues } from '@/constants/DimensionsValues';

export default function LocationData(props){
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex : 1,
            alignItems: 'center',
            paddingTop : 5,
            paddingBottom: 5,
            width: '100%',
            //backgroundColor: Colors[colorScheme ?? 'light'].dateBackColor,
        },
        text: {
            fontSize: DimensionsValues.common.titleTextSize,
            color: Colors[colorScheme ?? 'light'].normalTextColor
        }
    })

    return(
        <View style={styles.container}>
            <Text style={styles.text}>--- {props.city}/{props.country} ---</Text>
        </View>
    )
}

