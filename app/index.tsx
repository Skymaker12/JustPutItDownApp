import { useAccelerometer } from "@/hooks/useAccelerometer";
import {
  formatTimeCompactSeconds,
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

  const isFaceDown = useAccelerometer();

  useEffect(() => {
    if (isFaceDown) router.push("/active");
    console.log("Session Active");
  }, [isFaceDown, router]);

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
      }

      loadData();

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
      setIsLoading(false);
    }, [router]),
  );

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
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Put it Down</Text>
        <Text style={styles.subtitleText}>
          Put your phone face down on the table to begin.
        </Text>
        <View style={styles.directionContainer}>
          <Ionicons name="flash" size={18} color="#FFC764" />
          <Text style={styles.directionText}>3 Flashes = Session Started</Text>
        </View>
      </View>

      <Text style={styles.mantra}>{curMantra}</Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Best Session</Text>
          <Text style={styles.statValue}>
            {bestSession ? formatTimeCompactSeconds(bestSession) : "-"}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Last Session</Text>
          <Text style={styles.statValue}>
            {lastSession ? formatTimeCompactSeconds(lastSession) : "-"}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Pressable
          onPress={() => {
            AsyncStorage.clear();
            alert("Async Storage Cleared");
          }}
        >
          <Text style={{ color: "red", paddingLeft: 16 }}>Reset Storage</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push("/active");
          }}
        >
          <Text style={{ color: "red", paddingLeft: 16 }}>
            Start Demo Session
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
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
  mainTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainText: {
    color: "#FFFFFF",
    fontSize: 55,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  subtitleText: {
    color: "rgba(255,255,255, 0.4)",
    fontSize: 16,
    fontWeight: "600",
    maxWidth: 250,
    textAlign: "center",
    paddingTop: 10,
  },
  mantra: {
    textAlign: "center",
    fontSize: 15,
    fontStyle: "italic",
    color: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 16,
    marginBottom: 8,
    paddingBottom: 12,
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
  directionContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(255, 180, 0, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(255, 180, 0, 0.3)",
    borderRadius: 15,
    alignContent: "center",
    padding: 12,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    marginHorizontal: 38,
  },
  directionText: {
    color: "#DEAF57",
    fontWeight: "bold",
  },
});
