import { Image, View, StyleSheet } from 'react-native'

const icons = {
    '01d' : require('../../assets/icons/01d.png'),
    '01n' : require('../../assets/icons/01n.png'),
    '02d' : require('../../assets/icons/02d.png'),
    '02n' : require('../../assets/icons/02n.png'),
    '03d' : require('../../assets/icons/03d.png'),
    '03n' : require('../../assets/icons/03n.png'),
    '04d' : require('../../assets/icons/04d.png'),
    '04n' : require('../../assets/icons/04n.png'),
    '09d' : require('../../assets/icons/09d.png'),
    '09n' : require('../../assets/icons/09n.png'),
    '10d' : require('../../assets/icons/10d.png'),
    '10n' : require('../../assets/icons/10n.png'),
    '11d' : require('../../assets/icons/11d.png'),
    '11n' : require('../../assets/icons/11n.png'),
    '13d' : require('../../assets/icons/13d.png'),
    '13n' : require('../../assets/icons/13n.png'),
    '50d' : require('../../assets/icons/50d.png'),
    '50n' : require('../../assets/icons/50n.png'),
    '01H' : require('../../assets/icons/01H.png'),
    '01S' : require('../../assets/icons/01S.png'),
    '02S' : require('../../assets/icons/02S.png'),
    '01P' : require('../../assets/icons/01P.png'),
};
export default function Icon(props){

    return (
        <View style={styles.container}>
            <Image
                source={icons[props.icon]}
                style={styles.icon}
                resizeMode='contain'
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    icon: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
    }
})