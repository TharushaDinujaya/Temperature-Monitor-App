import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

import GaugeMeter from './GaugeMeter';
import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function AirQuality(props) {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: '100%',
        gap: width * 0.0125,
      },
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        borderRadius: width * 0.05,
      },
      mainTitle:{
        textAlign: 'left',
        color: Colors[colorScheme].mainTitleTextColor,
        fontSize: DimensionsValues.common.mainTitleTextSize,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '5%',
      },
      headerLine:{
        width: '100%',
        height: 0.5,
        backgroundColor: Colors[colorScheme].lineColor,
      },
      conditions:{
        paddingLeft: '5%',
        paddingRight: '5%',
        width: '100%',
        top: 0,
        height: DimensionsValues.gauge.gaugeWidth * 1.1,
        flexDirection: 'row',
      },
      cellLeft:{
        width: '40%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cellRight:{
        width: '60%',
        paddingLeft: '10%',
        paddingRight: '5%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      detailsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        verticalAlign: 'middle',
        flexDirection: 'row',
        paddingTop: 5,
      },
      title: {
        color: Colors[colorScheme].normalTextColor,
        fontSize: DimensionsValues.common.smallTextSize,
        textAlign:'right',
        width: '60%',
        paddingRight: '10%'
        },
      value:{
        color: Colors[colorScheme].titleTextColor,
        fontSize: DimensionsValues.common.smallTextSize,
        fontWeight: 'bold',
        width: '40%',
        textAlign:'left'
      },
      footerText:{
        color: Colors[colorScheme].subTextColor,
        fontSize: DimensionsValues.common.extraSmallTextSize,
        textAlign: 'center',
        paddingBottom: '5%',
      }
    });

    const Data = (props) =>{
      return (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{props.detailsData.title}</Text>
          <Text style={styles.value}>{props.detailsData.value}</Text>
        </View>
      )
    };
    return (
        <View style={styles.container}>
              <LinearGradient
                colors={[
                    Colors[colorScheme ?? 'light'].tabBackGradientHigh,
                    Colors[colorScheme ?? 'light'].tabBackGradientMid,
                    Colors[colorScheme ?? 'light'].tabBackGradientLow]}
                style={styles.background}
              />
              <Text style={styles.mainTitle}>Air Quality</Text>

              <View style={styles.headerLine}/>

              <View style={styles.conditions}>
                <View style={styles.cellLeft}>
                    <GaugeMeter value={props.gaugeValue} />
                </View>
                <View style={styles.cellRight}>
                    {props.airQualityData.map((data) => (
                      <Data key={data.title} detailsData={data} />
                    ))}
                </View>
              </View>
              <Text style={styles.footerText}>PM2.5 and PM10 denote fine and coarse airborne particulate matter, respectively, which can impact respiratory health due to their small size and ability to penetrate deep into the lungs.</Text>
        </View>
    );
}