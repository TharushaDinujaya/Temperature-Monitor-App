import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Details(props) {
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
                colors={['#232329', 'transparent', '#232329']}
                style={styles.background}
              />
              <Text style={styles.mainTitle}>Details</Text>
              <View style={styles.conditions}>
                <View style={styles.cellLeft}>
                    <Text style={styles.testing}>Image</Text>
                </View>
                <View style={styles.cellRight}>
                    {details.map((details) => (
                      <Data detailsData={details} />
                    ))}
                </View>
              </View>
              <Text style={styles.footerText}>Tonight - Clear. Winds from SW to SSW at 10 to 11 mph (16.1 to 17.7 kph). The overnight low will be 69° F (20.0 ° C)</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
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
    textAlign: 'Left',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '2%',
  },
  conditions:{
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  cellLeft:{
    width: '40%',
    height: '100%',
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  cellRight:{
    width: '60%',
    paddingLeft: '10%',
    paddingRight: '5%',
    flex: 1,
    paddingBottom: '5%'
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  head: {
    width: '100%',
    paddingTop: 10,
    PaddingBottom: 10,
    alignItems: 'right',
    flexDirection: 'row',
    marginLeft: '60%'

  },
  text:{
    color: '#979797',
    fontSize: 12,
    textAlign: 'center',
    width: '20%'
  },
  detailsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    verticalAlign: 'middle',
    flexDirection: 'row',
    paddingTop: 10,
  },
  title: {
    color: 'white',
    fontSize: 15,
    },
  value:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  testing:{
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText:{
    color: '#979797',
    fontSize: 10,
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
  }
});