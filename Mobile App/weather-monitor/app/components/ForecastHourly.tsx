import { FlatList, Text, View, StyleSheet, Dimensions} from 'react-native';

import ForecastHourlyItem from './ForecastHourlyItem';

const { width } = Dimensions.get('window');

export default function ForecastHourly(){
    const forecastData = [{
            temperature: 22,
            icon: '01d',
            time: '01:00'
        },
        {
            temperature: 23,
            icon: '01n',
            time: '02:00'
        },
        {
            temperature: 24,
            icon: '02d',
            time: '04:00'
        },
        {
            temperature: 25,
            icon: '02n',
            time: '05:00'
        },{
            temperature: 27,
            icon: '03d',
            time: '12:00'
        },
        {
            temperature: 28,
            icon: '03n',
            time: '13:00'
        },
        {
            temperature: 29,
            icon: '04d',
            time: '14:00'
        },
        {
            temperature: 21,
            icon: '04n',
            time: '15:00'
        },
        {
            temperature: 22,
            icon: '09d',
            time: '16:00'
        },
        {
            temperature: 23,
            icon: '09n',
            time: '17:00'
        },
        {
            temperature: 24,
            icon: '10d',
            time: '18:00'
        },
        {
            temperature: 25,
            icon: '10n',
            time: '19:00'
        },
        {
            temperature: 26,
            icon: '11d',
            time: '20:00'
        },
        {
            temperature: 27,
            icon: '11n',
            time: '21:00'
        },
        {
            temperature: 28,
            icon: '13d',
            time: '22:00'
        },
        {
            temperature: 29,
            icon: '13n',
            time: '23:00'
        },
        ]

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        list:{
            flexGrow: 0
        },
        separator: {
            width: width * 0.05,
            height: 1
        },
    })

    const Header = () => {
        return(
            <View>
                <Text>Hourly Forecast</Text>
            </View>
        )
    }
    const EmptyList = () => {
        return(
            <View>
                <Text>No data Found</Text>
            </View>
        )
    }
    const ItemSeparator = () => {
        return(
            <View style={styles.separator}/>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={forecastData}
                renderItem={({item}) => (
                    <ForecastHourlyItem key={item.time} forecastData={item}/>)}
                keyExtractor={(item) => item.time}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                style={styles.list}
                ListEmptyComponent={EmptyList}
                ItemSeparatorComponent={ItemSeparator}/>
        </View>
    )
}