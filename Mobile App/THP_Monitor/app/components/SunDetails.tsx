import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SunDetails(props) {

  return (
        <View style={styles.container}>
              <LinearGradient
                colors={['#232329', 'transparent', '#232329']}
                style={styles.background}
              />
              <Text style={styles.mainTitle}>Sun & Moon</Text>
              <View style={styles.detailsContainer}>
                  <View style={styles.sunDetailsText}>
                    <Text style={styles.time}> 05:57 AM</Text>
                    <Text style={styles.title}>Sunrise</Text>
                  </View>
                  <View style={styles.sunPosition}>
                  </View>
                  <View style={styles.sunDetailsText}>
                    <Text style={styles.time}>06:12 PM</Text>
                    <Text style={styles.title}>Sunset</Text>
                  </View>
              </View>
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
  detailsContainer:{
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: '5%'
  },
  mainTitle:{
    textAlign: 'Left',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '2%',
  },
  sunDetailsText:{
    width: '25%',
    height: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sunPosition:{
    width: '50%',
    paddingLeft: '5%',
    paddingRight: '5%',
    height: 80,
    backgroundColor: 'yellow'
  },
  time:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  title:{
    fontSize: 12,
    color: 'white'
  },
});