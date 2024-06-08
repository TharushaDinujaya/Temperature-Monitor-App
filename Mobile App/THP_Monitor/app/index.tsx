import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';


import Weather from "./Weather";
import Development from "./Development";
import Header from './components/Header';

const Tab = createMaterialTopTabNavigator();

export default function Index() {
  const data  = 'Cloudy';
  return (
       <View style={styles.container}>
            <Header location="Galle / Sri Lanka" style={styles.header}/>
            <Tab.Navigator
                initialRouteName="Weather"
                screenOptions={{
                    tabBarStyle: {
                      backgroundColor: 'transparent',
                      shadowColor: 'transparent',
                      textTransform: 'none',
                      marginTop: 0,
                    },
                    tabBarLabelStyle: {
                        textTransform: 'none',
                        marginBottom: -15,
                        fontSize: 15,
                    },
                    tabBarIndicatorStyle: {
                      backgroundColor: 'white',
                      height: 1,
                      width: '10%',
                      left: '20%',
                    },
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'gray',
                    }}>
              <Tab.Screen
                    name="Weather"
                    component={Weather}
                    />
              <Tab.Screen name="Development" component={Development} style={styles.tabItem}/>
            </Tab.Navigator>
       </ View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#484B5B',
    font: 'bold',
    color : 'white',
  },
  header: {
    flex: 0.075,
  },

});

// header - text color styles