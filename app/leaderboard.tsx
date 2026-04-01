import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function LeaderboardPage() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Just Put It Down.</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  titleText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
});
