import { Text, StyleSheet, View } from 'react-native';
import moment from 'moment';
import { useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

export default function Date(){
    const date = moment().format('dddd, DD MMMM');
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex : 1,
            alignItems: 'center',
            borderRadius : 50,
            paddingTop : 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: Colors[colorScheme ?? 'light'].dateBackColor,
        },
        text: {
            fontSize: DimensionsValues.common.titleTextSize,
            color: Colors[colorScheme ?? 'light'].invertedTextColor
        }
    })

    return(
        <View style={styles.container}>
            <Text style={styles.text}> {date} </Text>
        </View>
    )
}

