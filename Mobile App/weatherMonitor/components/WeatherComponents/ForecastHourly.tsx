import { FlatList, Text, View, StyleSheet, Dimensions} from 'react-native';

import ForecastHourlyItem from './ForecastHourlyItem';

const { width } = Dimensions.get('window');

export default function ForecastHourly(props){

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
                data={props.hourlyForecastData}
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