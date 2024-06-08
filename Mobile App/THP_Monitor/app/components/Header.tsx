import { Text, View, StyleSheet } from "react-native";

export default function Header(props) {
  return (
    <View
      style={styles.header}
    >
      <Text style={styles.headerLocationText}>{props.location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 45,
    marginBottom: 0,
  },
  headerMainText: { // for Application Name
    fontSize: 25,
    paddingBottom: 5,
    justifyContent: "center",
    textAlign: "center",
    color : '#D8D8D8',
  },
  headerLocationText : {
    fontSize: 25,
    justifyContent: "center",
    textAlign: "center",
    color : '#D8D8D8',
    }
});