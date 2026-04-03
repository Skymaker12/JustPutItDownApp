import {
  formatTimeCompact,
  getBestSession,
  getLastSession,
  getUsername,
} from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  const router = useRouter();

  const [curMantra, setMantra] = useState("");
  const [bestSession, setBestSession] = useState<number | null>(0);
  const [lastSession, setLastSession] = useState<number | null>(0);
  const [username, setUsername] = useState<string | null>("");
  const [isloading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        const last = await getLastSession();
        const best = await getBestSession();
        const username = await getUsername();

        if (!username) {
          router.replace("/onboarding");
          return;
        }

        setBestSession(best);
        setLastSession(last);
        setUsername(username);
        setIsLoading(false);
      }

      loadData();
    }, [router]),
  );

  useEffect(() => {
    const MANTRAS = [
      "Your phone will still be boring later",
      "Nothing important is happening on Twitter",
      "That email can definitely wait",
      "Your screen time report is judging you",
      "Touch grass. Seriously.",
      "Your ex isn't thinking about you either",
      "The group chat will survive without you",
      "That notification was probably spam anyway",
      "Your plant needs water more than you need TikTok",
      "Instagram explore page will still be there",
    ];
    const randMantra = Math.floor(Math.random() * MANTRAS.length);
    setMantra(MANTRAS[randMantra]);
  }, []);

  if (isloading) return null;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, {username}.</Text>
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            router.push("/leaderboard");
          }}
        >
          <Ionicons name="list" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
      <View style={styles.circleContainer}>
        <Pressable
          style={styles.circle}
          onPress={() => {
            router.push("/active");
          }}
        >
          <Text style={styles.readyText}>Ready</Text>
          <Text style={styles.tapText}>Tap to Begin</Text>
        </Pressable>
      </View>
      <Text style={styles.mantra}>{curMantra}</Text>
      <Text style={styles.hint}>Place your phone face down to begin</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Best Session</Text>
          <Text style={styles.statValue}>
            {bestSession ? formatTimeCompact(bestSession) : "-"}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Last Session</Text>
          <Text style={styles.statValue}>
            {lastSession ? formatTimeCompact(lastSession) : "-"}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          AsyncStorage.clear();
          alert("Async Storage Cleared");
        }}
      >
        <Text style={{ color: "red", paddingLeft: 16 }}>Reset Storage</Text>
      </Pressable>
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 32,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  circleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 288,
    height: 288,
    borderRadius: 144,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 53, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  readyText: {
    fontSize: 56,
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: -1,
  },
  tapText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  mantra: {
    textAlign: "center",
    fontSize: 15,
    fontStyle: "italic",
    color: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  hint: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.4)",
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
});
