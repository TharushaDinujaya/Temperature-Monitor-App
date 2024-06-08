import { Text, StyleSheet, View } from 'react-native';
import moment from 'moment';

export default function Date(){
    const date = moment().format('dddd, DD MMMM');
    return(
        <View style={styles.container}>
            <Text style={styles.text}> {date} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems: 'center',
        borderRadius : 50,
        paddingTop : 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#32333E',
    },
    text: {
        fontSize: 15,
        color: '#9B9EAD',
    }
})