import {
  formatTimeCompactSeconds,
  getBestSession,
  saveBestSession,
  saveLastSession,
} from "@/utils/storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ActivePage() {
  const [elapsed, setElapsed] = useState(0);
  const router = useRouter();

  useFocusEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.timerText}>
          {formatTimeCompactSeconds(elapsed)}
        </Text>
        <Pressable
          onPress={async () => {
            await saveLastSession(elapsed);
            const best = await getBestSession();
            if (elapsed > (best ?? 0)) {
              await saveBestSession(elapsed);
            }

            router.push("/cooldown");
          }}
        >
          <Text style={{ color: "red", paddingLeft: 16 }}>Simulate Pickup</Text>
        </Pressable>
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
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 64,
  },
});
