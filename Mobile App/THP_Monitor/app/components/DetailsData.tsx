import {View, Text, StyleSheet} from 'react-native';

export default function DetailsData(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title} >{props.title}</Text>
            <Text style={styles.value} >{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    title: {
        fontSize: 14,
        color: '#aaa',
    },
    value: {
        fontSize: 14,
        color: 'white',
    }
})