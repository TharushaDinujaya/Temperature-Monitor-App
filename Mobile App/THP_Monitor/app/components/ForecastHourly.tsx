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
            icon: '01d',
            time: '02:00'
        },
        {
            temperature: 24,
            icon: '01d',
            time: '04:00'
        },
        {
            temperature: 25,
            icon: '01d',
            time: '05:00'
        },{
            temperature: 27,
            icon: '01d',
            time: '12:00'
        },
        {
            temperature: 28,
            icon: '01d',
            time: '13:00'
        },
        {
            temperature: 29,
            icon: '01d',
            time: '14:00'
        },
        {
            temperature: 21,
            icon: '01d',
            time: '15:00'
        },
        {
            temperature: 22,
            icon: '01d',
            time: '16:00'
        },
        {
            temperature: 23,
            icon: '01d',
            time: '17:00'
        },
        {
            temperature: 24,
            icon: '01d',
            time: '18:00'
        },
        {
            temperature: 25,
            icon: '01d',
            time: '19:00'
        },
        {
            temperature: 26,
            icon: '01d',
            time: '20:00'
        },
        {
            temperature: 27,
            icon: '01d',
            time: '21:00'
        },
        {
            temperature: 28,
            icon: '01d',
            time: '22:00'
        },
        {
            temperature: 29,
            icon: '01d',
            time: '23:00'
        },
        {
            temperature: 21,
            icon: '01d',
            time: '23:00'
        },
        ]

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
                    <ForecastHourlyItem forecastData={item}/>)}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                style={styles.list}
                ListEmptyComponent={EmptyList}
                ItemSeparatorComponent={ItemSeparator}/>
        </View>
    )
}

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