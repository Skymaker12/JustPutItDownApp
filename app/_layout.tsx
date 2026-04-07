import { useAccelerometer } from "@/hooks/useAccelerometer";
import { currentElapsed } from "@/utils/sessionStore";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import "react-native-reanimated";

function NavigationController() {
  const isFaceDown = useAccelerometer();
  const router = useRouter();
  const pathname = usePathname();
  const hasBeenFaceDown = useRef(false);

  useEffect(() => {
    if (isFaceDown) hasBeenFaceDown.current = true;

    if (pathname === "/") {
      if (isFaceDown) router.navigate("/active");
    }

    if (pathname === "/active") {
      if (!isFaceDown && hasBeenFaceDown.current) {
        router.navigate({
          pathname: "/cooldown",
          params: { sessionElapsed: currentElapsed },
        });
      }
    }

    if (pathname === "/cooldown") {
      if (isFaceDown) router.back();
    }
  }, [isFaceDown, pathname, router]);

  return null;
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 150,
        }}
      >
        <Stack.Screen
          name="leaderboard"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="active" />
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="cooldown" />
      </Stack>
      <NavigationController />
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
