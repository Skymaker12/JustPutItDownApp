import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 150,
        }}
      >
        <Stack.Screen
          name="leaderboard"
          options={{ presentation: "modal", animation: "default" }}
        />
        <Stack.Screen name="active" />
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
