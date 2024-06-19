import { Text, View, StyleSheet, Appearance, TouchableOpacity, } from "react-native";
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

export default function Header() {
    const [colorScheme, setColorScheme] = useState(useColorScheme());

    const styles = StyleSheet.create({
      header: {
        marginTop: 45,
        marginBottom: 0,
        flexDirection: "row",
      },
      headerLocationText : {
        width: '85%',
        fontSize: DimensionsValues.common.extraLargeTextSize,
        justifyContent: "center",
        textAlign: "center",
        color : Colors[colorScheme ?? 'light'].appNameText,
        },
      themeBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10, // Border radius
        borderWidth: 2, // Border size
        borderColor: 'white', // Border color
      },
      themeBtn: {
        backgroundColor : 'transparent',
        padding: 5,

      }
    });
    function changeTheme(){
        console.log('changeTheme');
        Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
        console.log(Appearance.getColorScheme());
    }

    return (
        <View
          style={styles.header}>
            <Text style={styles.headerLocationText}>THP Monitor</Text>
            <View style={styles.themeBtnContainer}>
                <TouchableOpacity onPress={changeTheme} style={styles.themeBtn}>
                  { colorScheme === 'dark' ?
                    <MaterialIcons name='dark-mode' size={DimensionsValues.themeIcon.iconWidth} color="white" />
                    : <Entypo name='light-up' size={DimensionsValues.themeIcon.iconWidth} color="white" />}
                </TouchableOpacity>
            </View>
        </View>
    );
}
