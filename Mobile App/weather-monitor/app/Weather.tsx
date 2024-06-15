import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';

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

import data_1 from './data.json'
import airData_1 from './airData.json'

export default function Weather(props) {
  //-----------------------------------------Hooks-----------------------------------
  const [data, setData] = useState(data_1);
  const [airData, setAirData] = useState(airData_1);
  const [da, setDa] = useState(null);

    useEffect(() => {
    try {
     const d = {
       'temperature': data.current.temp,
       'condition': data.current.weather[0].main,
       'icon': data.current.weather[0].icon,
       'humidity': data.current.humidity,
       'wind': data.current.wind_speed,
       'pressure': data.current.pressure,
       'feelsLike': data.current.feels_like,
       'windAngle': data.current.wind_deg,
     };
     console.log(d);
     setDa(d);
    } catch (error) {
     console.log('Error in getting Main Data', error);
    }
    }, [data]);

  //-----------------------------------------States-----------------------------------
  const colorScheme = useColorScheme();
  //-----------------------------------------Data-----------------------------------
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
  const gaugeValue = 1;
  const airQualityData = [
  {
    title: 'NO',
    value: '0.76',
  },
  {
    title: 'NO2',
    value: '5.1',
  },
  {
    title: 'O3',
    value: '30.4',
  },
  {
    title: 'SO3',
    value: '0.78',
  },
  {
    title: 'NH3',
    value: '1.99',
  },
  {
    title: 'PM2.5',
    value: '4.54',
  },
  {
    title: 'PM10',
    value: '0.7',
  },
  ]
  const UTCTime = {
    'offset' : 19800,
    'sunrise' : 1718065515,
    'sunset' : 1718110433,
    'currentTime' : 1718050845,
  }
  const icon = '02d';
  const details = [
  {
    title: 'Feels like',
    value: '20°C',
  },
  {
    title: 'Humidity',
    value: '63%',
  },
  {
    title: 'Visibility',
    value: '10 mi',
  },
  {
    title: 'UV Index',
    value: 'Low 0',
  },
  {
    title: 'Dew point',
    value: '56°',
  },
  ]
  const dailyForecastData = [{
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
      const hourlyForecastData = [{
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
  //-----------------------------------------Styles-----------------------------------
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
                    <ForecastHourly hourlyForecastData={hourlyForecastData}/>
                </View>
                <View style={styles.dailyForecast}>
                    <ForecastDaily dailyForecastData={dailyForecastData}/>
                </View>
                <View style={styles.details}>
                    <Details details={details} icon={icon}/>
                </View>
                <View style={styles.airQuality}>
                    <AirQuality airQualityData={airQualityData} gaugeValue={gaugeValue}/>
                </View>
                <View style={styles.sunDetails}>
                    <SunDetails UTCTime={UTCTime}/>
                </View>
              </ScrollView>
          </View>
  );
}