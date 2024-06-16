import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

import Icon from './Icon';
import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

const { width } = Dimensions.get('window');

export default function Details(props) {
    const colorScheme = useColorScheme();

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
      conditions:{
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: '5%',
        paddingRight: '5%',
      },
      cellLeft:{
        width: '40%',
        height: DimensionsValues.mainConditions.iconHeight,
        justifyContent: 'center',
      },
      cellRight:{
        width: '60%',
        paddingLeft: '10%',
        paddingRight: '5%',
        flex: 1,
        paddingBottom: '5%'
      },
      head: {
        width: '100%',
        paddingTop: 10,
        PaddingBottom: 10,
        alignItems: 'right',
        flexDirection: 'row',
        marginLeft: '60%'
      },
      detailsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: width * 0.025,
      },
      title: {
        color: Colors[colorScheme ?? 'light'].normalTextColor,
        fontSize: DimensionsValues.common.titleTextSize,
      },
      value:{
        color: Colors[colorScheme ?? 'light'].titleTextColor,
        fontSize: DimensionsValues.common.titleTextSize,
        fontWeight: 'bold',
      },
      footerText:{
        color: Colors[colorScheme ?? 'light'].subTextColor,
        fontSize: DimensionsValues.common.extraSmallTextSize    ,
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
              <Text style={styles.mainTitle}>Details</Text>
              <View style={styles.headerLine}/>
              <View style={styles.conditions}>
                <View style={styles.cellLeft}>
                    <Icon icon={props.icon}/>
                </View>
                <View style={styles.cellRight}>
                    {props.details.map((details) => (
                      <Data key={details.title} detailsData={details} />
                    ))}
                </View>
              </View>
              <Text style={styles.footerText}>Tonight - Clear. Winds from SW to SSW at 10 to 11 mph (16.1 to 17.7 kph). The overnight low will be 69° F (20.0 ° C)</Text>
        </View>
    );
}