import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

import Date from './components/Date'
import MainDetails from './components/MainDetails'
import ForecastHourly from './components/ForecastHourly'
import ForecastDaily from './components/ForecastDaily'
import Details from './components/Details'
import AirQuality from './components/AirQuality'
import SunDetails from './components/SunDetails'
import SunIndicator from './components/SunIndicator'
import Location from './components/Location'

import { Colors } from '@/constants/Colors';

export default function Weather(props) {
  const colorScheme = useColorScheme();

  const mainData = {
    temperature: 25,
    condition: 'Clouds',
    icon: '09n',
    humidity: 50,
    wind: 5,
    pressure: 1013,
    feelsLike: 27,
    windAngle: 4.94,
  }

  const UTCTime = {
    'offset' : 19800,
    'sunrise' : 1718065515,
    'sunset' : 1718110433,
    'currentTime' : 1718050845,
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: '2.5%',
      paddingTop: '5%'
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%',
    },
    date:{
      width: '100%',
      flex: 1,
      alignItems: 'center',
    },
    location:{
      width: '100%',
      flex: 1,
      alignItems: 'center',
      paddingBottom: '2%',
    },
    mainDetails: {
      width: '100%',
      marginTop: '5%',
      flex: 1,
      alignItems: 'center',
    },
    hourlyForecast: {
      width: '100%',
      marginTop: '5%',
      flex: 1,
      alignItems: 'center',
    },
    dailyForecast: {
      width: '100%',
      marginTop: '5%',
      flex: 1,
      alignItems: 'center',
    },
    details: {
      width: '100%',
      marginTop: '5%',
      flex: 1,
      alignItems: 'center',
    },
    airQuality: {
      width: '100%',
      marginTop: '5%',
      flex: 1,
      alignItems: 'center',
    },
    sunDetails: {
      width: '100%',
      marginTop: '5%',
      marginBottom: '5%',
      flex: 1,
      alignItems: 'center',
    },
  });

  return (
      <View style={{flex: 1}}>
          <LinearGradient
            colors={[Colors[colorScheme ?? 'light'].gradientContainerHigh, Colors[colorScheme ?? 'light'].gradientContainerLow]}
            style={styles.background}
          />
          <ScrollView style={styles.container} >
            <View style={styles.location}>
                <Location location='Ambalangoda/Sri Lanka'/>
            </View>
            <View style={styles.date}>
                <Date/>
            </View>
            <View style={styles.mainDetails} >
                <MainDetails mainData={mainData}/>
            </View>
            <View style={styles.hourlyForecast}>
                <ForecastHourly />
            </View>
            <View style={styles.dailyForecast}>
                <ForecastDaily />
            </View>
            <View style={styles.details}>
                <Details />
            </View>
            <View style={styles.airQuality}>
                <AirQuality />
            </View>
            <View style={styles.sunDetails}>
                <SunDetails UTCTime={UTCTime}/>
            </View>
          </ScrollView>
      </View>
  );
}