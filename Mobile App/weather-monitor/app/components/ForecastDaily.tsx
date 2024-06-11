import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

import ForecastDailyItem from './ForecastDailyItem';
import { Colors } from '@/constants/Colors';
import { DimensionsValues } from '@/constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function ForecastDaily(props) {
  const forecastData = [{
    day: 'Today',
    icon: '01d',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Tuesday',
    icon: '03d',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Wednesday',
    icon: '09d',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Thursday',
    icon: '50d',
    max_temperature: 30,
    min_temperature: 20,
    },
    {
    day: 'Friday',
    icon: '02d',
    max_temperature: 30,
    min_temperature: 20,
    },
    ]
  const colorScheme = useColorScheme();


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
      textAlign: 'left',
      color: Colors[colorScheme ?? 'light'].mainTitleTextColor,
      fontSize: DimensionsValues.common.mainTitleTextSize,
      paddingTop: '2%',
      paddingBottom: '2%',
      paddingLeft: '5%',
    },
    head: {
      width: '100%',
      paddingTop: width* 0.025,
      flexDirection: 'row',
    },
    cell_1:{
        width: '40%',
        paddingLeft: '2%'
    },
    cell_2:{
        width: DimensionsValues.forecastIcons.iconWidth,
        height: DimensionsValues.forecastIcons.iconHeight,
    },
    cell_3:{
      color: Colors[colorScheme ?? 'light'].normalTextColor,
      fontSize: DimensionsValues.common.normalTextSize,
      width: '30%',
      paddingLeft: '10%',
      textAlign: 'center'
    },
    cell_4:{
      color: Colors[colorScheme ?? 'light'].normalTextColor,
      fontSize: DimensionsValues.common.normalTextSize,
      width: '20%',
      textAlign: 'center',
    },
    headerLine:{
      width: '100%',
      height: 0.5,
      backgroundColor: Colors[colorScheme ?? 'light'].lineColor,
    },
    row: {
      flex : 1,
      width: '100%',
    },
  });

  return (
        <View style={styles.container}>
              <LinearGradient
                colors={[
                    Colors[colorScheme ?? 'light'].tabBackGradientHigh,
                    Colors[colorScheme ?? 'light'].tabBackGradientMid,
                    Colors[colorScheme ?? 'light'].tabBackGradientLow]}
                style={styles.background}
              />
              <Text style={styles.title}>Daily Forecast</Text>
              <View style={styles.headerLine}/>

              <View style={styles.head}>
                <View style={styles.cell_1}/>
                <View style={styles.cell_2}/>
                <Text style={styles.cell_3}>High</Text>
                <Text style={styles.cell_4}>Low</Text>
              </View>
              <View style={styles.row}>
                  {forecastData.map((data) => (
                    <ForecastDailyItem  key={data.day} forecastData={data}/>
                  ))}
              </View>
        </View>
  );
}