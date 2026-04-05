import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function CooldownPage() {
  const TIMEOUT = 10;
  const [elapsed, setElapsed] = useState(TIMEOUT);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (elapsed === 0) router.push("/");
  }, [elapsed, router]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.text}>Don&apos;t Give Up.</Text>

        <View style={styles.coutDownContainer}>
          <Text style={styles.countDownText}>{elapsed}</Text>
        </View>
        <Text style={styles.subtitleText}>
          Put it back down to continue the session
        </Text>
        <Pressable
          onPress={async () => {
            router.back();
          }}
        >
          <Text style={{ color: "red", paddingLeft: 16 }}>
            Simulate Putdown
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
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 32,
  },
  countDownText: {
    color: "#DEAF57",
    fontSize: 64,
    fontWeight: "bold",
  },
  coutDownContainer: {
    marginVertical: 50,
    width: 140,
    height: 230,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#DEAF57",
    backgroundColor: "#150800",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  subtitleText: {
    color: "rgba(255,255,255, 0.4)",
    fontSize: 16,
    fontWeight: "600",
    maxWidth: 250,
    textAlign: "center",
    paddingTop: 10,
  },
});
