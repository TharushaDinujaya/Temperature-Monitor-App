import { View, Text, StyleSheet, ScrollView } from "react-native";

import DetailsData from './components/DetailsData'

export default function Weather(props) {
  return (
      <ScrollView style={styles.container} >
        <View style={styles.weatherInfo} >
            <View style={styles.detailsTop} >
                <View style={styles.detailsTopLeft}>

                </View>
                <View style={styles.detailsTopRight}>
                    <Text style={styles.temperature}>33°</Text>
                    <Text style={styles.condition}>Cloudy</Text>

                </View>
            </View>
            <View style={styles.detailsBottom} >
                <View style={styles.detailsBottomUp}>
                    <DetailsData title='Feels Like' value='20°'/>
                </View>

            </View>
        </View>
        <View style={styles.forecast}>
        </View>
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Details</Text>
        </View>
        <View style={styles.airQualitySection}>
          <Text style={styles.sectionTitle}>Air Quality</Text>
        </View>
        <View style={styles.sunMoonSection}>
          <Text style={styles.sectionTitle}>Sun & Moon</Text>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2a2a2a', // Dark background
  },
  weatherInfo: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 48,
    color: '#fff',
  },
  condition: {
    fontSize: 24,
    color: '#fff',
  },

  detailsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsTopLeft: {
    height: '100%',
    width: '50%',
    backgroundColor: 'red',
    alignItems: 'center',
  },
  detailsTopRight: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
  },
  detailsBottom: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsBottomUp:{
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  forecast: {
    marginTop: 20,
  },
  detailsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#3e3e3e',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  airQualitySection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#3e3e3e',
    borderRadius: 10,
  },
  sunMoonSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#3e3e3e',
    borderRadius: 10,
  },
});