import { Text, View, StyleSheet } from "react-native";
import { useColorScheme } from 'react-native';

import { Colors } from '../../constants/Colors';
import { DimensionsValues } from '../../constants/DimensionsValues';

export default function Header() {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
      header: {
        marginTop: 45,
        marginBottom: 0,
      },
      headerLocationText : {
        fontSize: DimensionsValues.common.extraLargeTextSize,
        justifyContent: "center",
        textAlign: "center",
        color : Colors[colorScheme ?? 'light'].appNameText,
        }
    });

    return (
        <View
          style={styles.header}>
            <Text style={styles.headerLocationText}>THP Monitor</Text>
        </View>
    );
}
