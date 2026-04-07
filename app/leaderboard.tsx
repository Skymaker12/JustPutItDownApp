import { BlurView } from "expo-blur";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function LeaderboardPage() {
  const data = [
    { rank: 1, username: "Cam", time: "4h 4m 4s" },
    { rank: 2, username: "Josh", time: "3h 3m 3s" },
    { rank: 3, username: "Jesse", time: "2h 2m 2s" },
    { rank: 4, username: "Caleb", time: "1h 1m 1s" },
  ];
  return (
    <BlurView intensity={40} tint="dark" style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Global</Text>
        <Text style={styles.headerSubText}>All time best sessions.</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={data}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              borderRadius: 10,
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderWidth: 1,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              padding: 24,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: item.rank <= 3 ? "#DEAF57" : "rgba(255,255,255, 0.4)",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {item.rank}
            </Text>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: "bold",
                paddingLeft: 32,
                flex: 1,
              }}
            >
              {item.username}
            </Text>
            <Text
              style={{
                color: item.rank <= 3 ? "#DEAF57" : "#FFFFFF",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              {item.time}
            </Text>
          </View>
        )}
      ></FlatList>
      <View
        style={{
          justifyContent: "flex-end",
          backgroundColor: "#2E0F08",
          borderColor: "#8A381A",
          borderWidth: 1,
          borderRadius: 24,
          padding: 24,
          margin: 24,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 24 }}>
          You are ranked #11
        </Text>
      </View>
    </BlurView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 24,
  },
  headerText: {
    fontSize: 64,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  headerSubText: {
    color: "rgba(255,255,255, 0.4)",
    fontSize: 20,
    fontWeight: "600",
    paddingTop: 10,
  },
});
