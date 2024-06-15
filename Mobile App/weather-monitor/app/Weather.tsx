import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

import tempData from './data.json';
import tempAirData from './airData.json';

export default function Weather(props) {
  //-----------------------------------------API Call-----------------------------------
const [statusCode, setStatusCode] = useState(null);
    const [data, setData] = useState(tempData);
    const [airData, setAirData] = useState(tempAirData);
    const [longitude, setLongitude] = useState(80.05380000);
    const [latitude, setLatitude] = useState(6.2355);

    const [mainData, setMainData] = useState(null);
    const [UTCTime, setUTCTime] = useState(null);
    const [details, setDetails] = useState(null);
    const [dailyForecastData, setDailyForecastData] = useState(null);
    const [hourlyForecastData, setHourlyForecastData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [detailsIcon, setDetailsIcon] = useState(null);
    const [gaugeValue, setGaugeValue] = useState(null);

    const API_KEY = '6bc3c7860e0102e662900ee0f8cbfe12';
    const BASE_URL = 'https://api.openweathermap.org/data';

  useEffect(() => {
    const fetchData = async () => {
//       try {
//         const weatherResponse = await axios.get(`${BASE_URL}/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely&appid=${API_KEY}`);
//         setData(weatherResponse.data);
//         console.log('Weather Data Fetched Successfully !');
//       } catch (error) {
//         console.error('Error in getting weather data', error);
//         setStatusCode(404); // Set error code
//       }
//       try {
//         const airQualityResponse = await axios.get(`${BASE_URL}/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
//         setAirData(airQualityResponse.data);
//         console.log('Air Quality Data Fetched Successfully !');
//       } catch (error) {
//         console.error('Error in getting air quality data', error);
//         setStatusCode(404); // Set error code
//       }
        setData(tempData);
        setAirData(tempAirData);
    };
    fetchData();
  }, [latitude, longitude]);

    useEffect(() => {
      try {
        const mainData = {
          'temperature': data.current.temp,
          'condition': data.current.weather[0].main,
          'icon': data.current.weather[0].icon,
          'humidity': data.current.humidity,
          'wind': data.current.wind_speed,
          'pressure': data.current.pressure,
          'feelsLike': data.current.feels_like,
          'windAngle': data.current.wind_deg,
        };
        setMainData(mainData);
      } catch (error) {
        console.log('Error in getting Main Data', error);
      }
    }, [data]);

    useEffect(() => {
      try {
        const UTCTime = {
          offset: data.timezone_offset,
          sunrise: data.current.sunrise,
          sunset: data.current.sunset,
          currentTime: data.current.dt,
        };
        setUTCTime(UTCTime);
      } catch (error) {
        console.log('Error in getting UTC Time', error);
      }
    }, [data]);

    useEffect(() => {
      try {
        const detailsIcon = data.current.weather[0].icon;
        const gaugeValue = airData.list[0].main.aqi;
        setDetailsIcon(detailsIcon);
        setGaugeValue(gaugeValue);
      } catch (error) {
        console.log('Error in getting Gauge Value', error);
      }
    }, [data]);

    useEffect(() => {
      try {
        const details = [
          { title: 'Feels like', value: data.current.feels_like + '°C' },
          { title: 'Humidity', value: data.current.humidity + '%' },
          { title: 'Visibility', value: data.current.visibility + ' mi' },
          { title: 'UV Index', value: data.current.uvi + ' Low 0' },
          { title: 'Dew point', value: data.current.dew_point + '°' },
        ];
        setDetails(details);
      } catch (error) {
        console.log('Error in getting Details', error);
      }
    }, [data]);

    useEffect(() => {
      try {
        const hourlyForecastData = [];
        for (let i = 0; i < data.hourly.length; i++) {
          hourlyForecastData.push({
            temperature: data.hourly[i].temp,
            icon: data.hourly[i].weather[0].icon,
            time: data.hourly[i].dt,
          });
        }
        setHourlyForecastData(hourlyForecastData);
      } catch (error) {
        console.log('Error in getting Hourly Forecast Data', error);
      }
    }, [data]);

    useEffect(() => {
      try {
        const dailyForecastData = [];
        dailyForecastData.push({
          day: 'Today',
          icon: data.daily[0].weather[0].icon,
          max_temperature: data.daily[0].temp.max,
          min_temperature: data.daily[0].temp.min,
        });

        for (let i = 1; i < data.daily.length; i++) {
          dailyForecastData.push({
            day: data.daily[i].dt,
            icon: data.daily[i].weather[0].icon,
            max_temperature: data.daily[i].temp.max,
            min_temperature: data.daily[i].temp.min,
          });
        }
        setDailyForecastData(dailyForecastData);
      } catch (error) {
        console.log('Error in getting Daily Forecast Data', error);
      }
    }, [data]);

    useEffect(() => {
      try {
        const components = ['no', 'no2', 'o3', 'so2', 'nh3', 'pm2_5', 'pm10'];
        const titles = ['NO', 'NO2', 'O3', 'SO2', 'NH3', 'PM2.5', 'PM10'];
        const airQualityData = [];

        for (let i = 0; i < components.length; i++) {
          airQualityData.push({
            title: titles[i],
            value: airData.list[0].components[components[i]],
          });
        }
        setAirQualityData(airQualityData);
      } catch (error) {
        console.log('Error in getting Air Quality Data', error);
      }
    }, [airData]);
  //-----------------------------------------Hooks-----------------------------------
  const colorScheme = useColorScheme();
  //-----------------------------------------Data-----------------------------------
//   const mainData = {
//     temperature: 25,
//     condition: 'Clouds',
//     icon: '09n',
//     humidity: 50,
//     wind: 5,
//     pressure: 1013,
//     feelsLike: 27,
//     windAngle: 4.94,
//   }
//   const gaugeValue = 1;
//   const airQualityData = [
//   {
//     title: 'NO',
//     value: '0.76',
//   },
//   {
//     title: 'NO2',
//     value: '5.1',
//   },
//   {
//     title: 'O3',
//     value: '30.4',
//   },
//   {
//     title: 'SO3',
//     value: '0.78',
//   },
//   {
//     title: 'NH3',
//     value: '1.99',
//   },
//   {
//     title: 'PM2.5',
//     value: '4.54',
//   },
//   {
//     title: 'PM10',
//     value: '0.7',
//   },
//   ]
//   const UTCTime = {
//     'offset' : 19800,
//     'sunrise' : 1718065515,
//     'sunset' : 1718110433,
//     'currentTime' : 1718050845,
//   }
//   const icon = '02d';
//   const details = [
//   {
//     title: 'Feels like',
//     value: '20°C',
//   },
//   {
//     title: 'Humidity',
//     value: '63%',
//   },
//   {
//     title: 'Visibility',
//     value: '10 mi',
//   },
//   {
//     title: 'UV Index',
//     value: 'Low 0',
//   },
//   {
//     title: 'Dew point',
//     value: '56°',
//   },
//   ]
//   const dailyForecastData = [{
//       day: 'Today',
//       icon: '01d',
//       max_temperature: 30,
//       min_temperature: 20,
//       },
//       {
//       day: 'Tuesday',
//       icon: '03d',
//       max_temperature: 30,
//       min_temperature: 20,
//       },
//       {
//       day: 'Wednesday',
//       icon: '09d',
//       max_temperature: 30,
//       min_temperature: 20,
//       },
//       {
//       day: 'Thursday',
//       icon: '50d',
//       max_temperature: 30,
//       min_temperature: 20,
//       },
//       {
//       day: 'Friday',
//       icon: '02d',
//       max_temperature: 30,
//       min_temperature: 20,
//       },
//   ]
//   const hourlyForecastData = [{
//           temperature: 22,
//           icon: '01d',
//           time: '01:00'
//       },
//       {
//           temperature: 23,
//           icon: '01n',
//           time: '02:00'
//       },
//       {
//           temperature: 24,
//           icon: '02d',
//           time: '04:00'
//       },
//       {
//           temperature: 25,
//           icon: '02n',
//           time: '05:00'
//       },{
//           temperature: 27,
//           icon: '03d',
//           time: '12:00'
//       },
//       {
//           temperature: 28,
//           icon: '03n',
//           time: '13:00'
//       },
//       {
//           temperature: 29,
//           icon: '04d',
//           time: '14:00'
//       },
//       {
//           temperature: 21,
//           icon: '04n',
//           time: '15:00'
//       },
//       {
//           temperature: 22,
//           icon: '09d',
//           time: '16:00'
//       },
//       {
//           temperature: 23,
//           icon: '09n',
//           time: '17:00'
//       },
//       {
//           temperature: 24,
//           icon: '10d',
//           time: '18:00'
//       },
//       {
//           temperature: 25,
//           icon: '10n',
//           time: '19:00'
//       },
//       {
//           temperature: 26,
//           icon: '11d',
//           time: '20:00'
//       },
//       {
//           temperature: 27,
//           icon: '11n',
//           time: '21:00'
//       },
//       {
//           temperature: 28,
//           icon: '13d',
//           time: '22:00'
//       },
//       {
//           temperature: 29,
//           icon: '13n',
//           time: '23:00'
//       },
//       ]
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
              {mainData === null ? <Text> Loading </Text> : <ScrollView style={styles.container} >
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
                    <Details details={details} icon={detailsIcon}/>
                </View>
                <View style={styles.airQuality}>
                    <AirQuality airQualityData={airQualityData} gaugeValue={gaugeValue}/>
                </View>
                <View style={styles.sunDetails}>
                    <SunDetails UTCTime={UTCTime}/>
                </View>
              </ScrollView>}
          </View>
  );
}