import { flash } from "@/utils/flashlight";
import { setCurrentElapsed } from "@/utils/sessionStore";
import { formatTimeCompactSeconds } from "@/utils/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ActivePage() {
  const [elapsed, setElapsed] = useState(0);

  useFocusEffect(
    useCallback(() => {
      flash(3);
      const interval = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          setCurrentElapsed(next);
          if (next > 0 && next % 1800 === 0) flash(2);
          return next;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []),
  );
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.timerText}>
          {formatTimeCompactSeconds(elapsed)}
        </Text>
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
