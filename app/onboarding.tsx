import { saveUsername } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Just Put It Down.</Text>
          <Text style={styles.descripText}>
            Track how long you can leave your phone alone. No tricks. No guilt.
            Just presence.
          </Text>
        </View>
        <View style={styles.textboxContainer}>
          <TextInput
            placeholder="What should we call you?"
            placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
            autoFocus
            autoCapitalize="none"
            onChangeText={setUsername}
            value={username}
            style={styles.textbox}
          ></TextInput>
          <Pressable
            style={
              username.trim().length > 0 ? styles.submitOn : styles.submitOff
            }
            onPress={() => {
              saveUsername(username);
              router.push("/");
            }}
            disabled={username.trim().length === 0}
          >
            <Text
              style={
                username.trim().length > 0
                  ? styles.submitTextOn
                  : styles.submitTextOff
              }
            >
              Lets go
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -2,
    textAlign: "center",
  },
  descripText: {
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.6)",
    margin: 18,
  },
  textboxContainer: {
    justifyContent: "space-between",
    gap: 22,
  },
  textbox: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    padding: 19,
    borderRadius: 15,
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  submitOn: {
    backgroundColor: "#FF6B35",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    padding: 19,
    borderRadius: 15,
  },
  submitTextOn: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  submitOff: {
    backgroundColor: "#090909",
    borderColor: "rgba(108, 108, 108, 0.1)",
    borderWidth: 1,
    padding: 19,
    borderRadius: 15,
  },
  submitTextOff: {
    color: "rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
