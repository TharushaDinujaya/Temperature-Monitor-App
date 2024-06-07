import { Text, View, StyleSheet } from "react-native";

export default function Header(props) {
  return (
    <View
      style={styles.header}
    >
      <Text style={styles.headerText}>{props.location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 45,
    marginBottom: 10,
  },
  headerText : {
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    color : 'white',
    }
});