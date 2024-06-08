import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ForecastDailyItem from './ForecastDailyItem';

const { width } = Dimensions.get('window');

export default function ForecastDaily(props) {
  const forecastData = [{
    day: 'Today',
    icon: 'cloud',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Tuesday',
    icon: 'cloud',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Wednesday',
    icon: 'cloud',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Thursday',
    icon: 'cloud',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Friday',
    icon: 'cloud',
    max_temperature: 30,
    min_temperature: 20,
    },
    ]

  return (
        <View style={styles.container}>
              <LinearGradient
                colors={['#232329', 'transparent', '#2E303A']}
                style={styles.background}
              />

              <View style={styles.head}>
                <Text style={styles.text}>High</Text>
                <Text style={styles.text}>Low</Text>
              </View>
              <FlatList
                data={forecastData}
                renderItem={({item}) => (
                  <ForecastDailyItem forecastData={item}/>
                )}
                showsHorizontalScrollIndicator={false}
              />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

  },
    background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    borderRadius: width * 0.05,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  head: {
    width: '100%',
    paddingTop: 10,
    PaddingBottom: 10,
    alignItems: 'right',
    flexDirection: 'row',
    marginLeft: '60%'

  },
  text:{
    color: '#979797',
    fontSize: 12,
    textAlign: 'center',
    width: '20%'
  }
});