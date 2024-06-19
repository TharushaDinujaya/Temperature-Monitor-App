import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

import Date from './WeatherComponents/Date'
import MainDetails from './WeatherComponents/MainDetails'
import ForecastHourly from './WeatherComponents/ForecastHourly'
import ForecastDaily from './WeatherComponents/ForecastDaily'
import Details from './WeatherComponents/Details'
import AirQuality from './WeatherComponents/AirQuality'
import SunDetails from './WeatherComponents/SunDetails'
import SunIndicator from './WeatherComponents/SunIndicator'
import LocationData from './WeatherComponents/LocationData'

import { Colors } from '../constants/Colors';
import { DimensionsValues } from '../constants/DimensionsValues';

import tempData from './data.json';
import tempAirData from './airData.json';

export default function Weather(props) {
  //-----------------------------------------Set data-----------------------------------
    const [statusCode, setStatusCode] = useState(null);
    const [data, setData] = useState(tempData);
    const [airData, setAirData] = useState(tempAirData);
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [city, setCity] = useState(0);
    const [country, setCountry] = useState(0);

    const [mainData, setMainData] = useState(null);
    const [UTCTime, setUTCTime] = useState(null);
    const [details, setDetails] = useState(null);
    const [dailyForecastData, setDailyForecastData] = useState(null);
    const [hourlyForecastData, setHourlyForecastData] = useState(null);
    const [airQualityData, setAirQualityData] = useState(null);
    const [detailsIcon, setDetailsIcon] = useState(null);
    const [gaugeValue, setGaugeValue] = useState(null);

    const colorScheme = useColorScheme();

    const API_KEY = '6bc3c7860e0102e662900ee0f8cbfe11';
    const BASE_URL = 'https://api.openweathermap.org/data';

  //-----------------------------------------Location-----------------------------------
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        let geoCode = await Location.reverseGeocodeAsync({latitude: location.coords.latitude, longitude:location.coords.longitude});
        setCity(geoCode[0].city);
        setCountry(geoCode[0].country);
      })
      ();
    }, [city, country]);

  //-----------------------------------------Data Fetch-----------------------------------
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

  //-----------------------------------------Data Processing-----------------------------------
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
    loadingText : {
      color: Colors[colorScheme].mainTitleTextColor,
      fontSize: DimensionsValues.common.mainTitleTextSize,
      textAlign: 'center',
      paddingTop: '10%',
    }
  });

  return (
          <View style={{flex: 1}}>
              <LinearGradient
                colors={[Colors[colorScheme].gradientContainerHigh, Colors[colorScheme].gradientContainerLow]}
                style={styles.background}
              />
              {mainData === null ? <Text style={styles.loadingText}> Loading </Text> : <ScrollView style={styles.container} >
                <View style={styles.location}>
                    <LocationData city={city} country={country}/>
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