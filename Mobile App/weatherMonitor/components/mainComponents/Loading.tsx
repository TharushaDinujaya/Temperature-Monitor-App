import { View, Text, StyleSheet, Image, useColorScheme, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


import { Colors } from '../../constants/Colors';


export default function Loading(){
    const colorScheme = useColorScheme();
      const [isLoading, setIsLoading] = useState(true);
      const opacity = useSharedValue(0);

      useEffect(() => {
        // Start the fade-in animation
        opacity.value = withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        });

        // Simulate loading for 3 seconds
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
      }, []);

      const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: opacity.value,
        };
      });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
        },
        background: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
        },
        image: {
            width: '80%',
            marginTop: '50%',
            left: '10%',
            height: '50%'
        }
    })

    return(
        <View style={styles.container}>
            <LinearGradient
            colors={[
                Colors[colorScheme].LoadingScreenGradientHigh,
                Colors[colorScheme].LoadingScreenGradientLow]}
            style={styles.background}
            />
            <Animated.View style={[styles.loadingContainer, animatedStyle]}>
                <Image
                    source={require('../../assets/images/loading.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <ActivityIndicator size="large" color="white" style={{paddingBottom: '50%'}}/>
            </Animated.View>
            <Text> </Text>
        </View>
    );
}