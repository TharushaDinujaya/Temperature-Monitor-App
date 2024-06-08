import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AirQuality(props) {
  const data = [
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
              <Text style={styles.mainTitle}>Air Quality</Text>
              <View style={styles.conditions}>
                <View style={styles.cellLeft}>
                </View>
                <View style={styles.cellRight}>
                    {data.map((data) => (
                      <Data key={data.title} detailsData={data} />
                    ))}
                </View>
              </View>
              <Text style={styles.footerText}>PM2.5 and PM10 denote fine and coarse airborne particulate matter, respectively, which can impact respiratory health due to their small size and ability to penetrate deep into the lungs.</Text>
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
  footerText:{
    color: '#979797',
    fontSize: 10,
    textAlign: 'center',
    paddingTop: '5%',
    paddingBottom: '5%',
  }
});