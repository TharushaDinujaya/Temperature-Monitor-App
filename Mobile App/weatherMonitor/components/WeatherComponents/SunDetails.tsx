import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

import SunIndicator from './SunIndicator';
import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

const { width } = Dimensions.get('window');

const convertUnixToLocalTime = (unixTimestamp, offsetSeconds) => {
  // Convert the Unix timestamp to milliseconds (JavaScript Date expects milliseconds)
  const utcDate = new Date(unixTimestamp * 1000);

  // Create a new date with the offset applied
  const localDate = new Date(utcDate.getTime() + offsetSeconds * 1000);

  // Extract hours and minutes
  const hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();

  return { hours, minutes };
};

export default function SunDetails(props) {
    const colorScheme = useColorScheme();

    const currentTime = convertUnixToLocalTime(props.UTCTime.currentTime, props.UTCTime.offset);
    const sunrise = convertUnixToLocalTime(props.UTCTime.sunrise, props.UTCTime.offset);
    const sunset = convertUnixToLocalTime(props.UTCTime.sunset, props.UTCTime.offset);

    const timeData = {
    'currentTime' : currentTime,
    'sunrise' : sunrise,
    'sunset' : sunset
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: '100%',
        gap: 5
      },
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        borderRadius: width * 0.05,
      },
      detailsContainer:{
        width: '100%',
        flexDirection: 'row',
        flex: 1,
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingBottom: '5%'
      },
      mainTitle:{
        textAlign: 'left',
        color: Colors[colorScheme ?? 'light'].mainTitleTextColor,
        fontSize: DimensionsValues.common.mainTitleTextSize,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '5%',
      },
      headerLine:{
        width: '100%',
        height: 0.5,
        backgroundColor: Colors[colorScheme ?? 'light'].lineColor,
      },
      sunDetailsText:{
        width: '25%',
        height: DimensionsValues.sun.sunSize,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
      sunPosition:{
        width: '50%',
        paddingLeft: '5%',
        paddingRight: '5%',
      },
      time:{
        fontSize: DimensionsValues.common.titleTextSize,
        fontWeight: 'bold',
        color: Colors[colorScheme ?? 'light'].titleTextColor
      },
      title:{
        fontSize: DimensionsValues.common.normalTextSize,
        color: Colors[colorScheme ?? 'light'].normalTextColor
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
              <Text style={styles.mainTitle}>Sun & Moon</Text>
              <View style={styles.headerLine}/>
              <View style={styles.detailsContainer}>
                  <View style={styles.sunDetailsText}>
                    <Text style={styles.time}> 05:57 AM</Text>
                    <Text style={styles.title}>Sunrise</Text>
                  </View>
                  <View style={styles.sunPosition}>
                    <SunIndicator timeData={timeData}/>
                  </View>
                  <View style={styles.sunDetailsText}>
                    <Text style={styles.time}>06:12 PM</Text>
                    <Text style={styles.title}>Sunset</Text>
                  </View>
              </View>
        </View>
    );
}