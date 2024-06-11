import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

import Weather from "./Weather";
import Development from "./Development";
import Header from './mainComponents/Header';
import { Colors } from '@/constants/Colors';

const Tab = createMaterialTopTabNavigator();

export default function Index() {
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent',
        fontWeight: 'bold',
      },
      header: {
        flex: 0.075,
      },
      background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      },
    });

    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
           <View style={styles.container}>
                 <LinearGradient
                   colors={[Colors[colorScheme ?? 'light'].gradientHeaderHigh, Colors[colorScheme ?? 'light'].gradientHeaderLow]}
                   style={styles.background}
                 />
                <Header style={styles.header}/>
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
                          backgroundColor: Colors[colorScheme ?? 'light'].tabBarIndicatorColor,
                          height: 1,
                          width: '10%',
                          left: '20%',
                        },
                            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].mainTitleTextColor,
                            tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].subTextColor,
                        }}>
                  <Tab.Screen
                        name="Weather"
                        component={Weather}
                        />
                  <Tab.Screen name="Development" component={Development} style={styles.tabItem}/>
                </Tab.Navigator>
           </ View>
      </ThemeProvider>
    );
}