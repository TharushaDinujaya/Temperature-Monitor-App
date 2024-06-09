import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import DetailsData from './components/DetailsData'
import Icon from './components/Icon'
import Date from './components/Date'
import MainDetails from './components/MainDetails'
import ForecastHourly from './components/ForecastHourly'
import ForecastDaily from './components/ForecastDaily'
import Details from './components/Details'
import AirQuality from './components/AirQuality'
import SunDetails from './components/SunDetails'

export default function Weather(props) {

  const mainData = {
    temperature: 25,
    condition: 'Clouds',
    icon: '03d',
    humidity: 50,
    wind: 5,
    pressure: 1013,
    feelsLike: 27,
    windAngle: 4.94,
  }
  return (
      <ScrollView style={styles.container} >
        <View style={styles.weatherInfo} >
            <Date />
            <MainDetails mainData={mainData}/>
            <ForecastHourly />
            <ForecastDaily />
            <Details />
            <AirQuality/>
            <SunDetails/>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#484B5B', // Dark background
  },
  weatherInfo: {
    width: '100%',
    flex: 0.6,
    alignItems: 'center',
  },
});