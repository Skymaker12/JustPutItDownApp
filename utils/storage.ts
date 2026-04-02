import AsyncStorage from "@react-native-async-storage/async-storage";
const KEYS = {
  USERNAME: "username",
  BEST_SESSION: "best_session",
  LAST_SESSION: "last_session",
};

export async function saveUsername(username: string) {
  try {
    await AsyncStorage.setItem(KEYS.USERNAME, username);
  } catch (error) {
    console.error(error);
  }
}

export async function getUsername() {
  const username = await AsyncStorage.getItem(KEYS.USERNAME);
  return username;
}

export async function saveBestSession(seconds: number) {
  try {
    await AsyncStorage.setItem(KEYS.BEST_SESSION, String(seconds));
  } catch (error) {
    console.error(error);
  }
}

export async function getBestSession() {
  const bestSession = await AsyncStorage.getItem(KEYS.BEST_SESSION);
  return bestSession ? parseInt(bestSession) : null;
}

export async function saveLastSession(seconds: number) {
  try {
    await AsyncStorage.setItem(KEYS.LAST_SESSION, String(seconds));
  } catch (error) {
    console.error(error);
  }
}

export async function getLastSession() {
  const lastSession = await AsyncStorage.getItem(KEYS.LAST_SESSION);
  return lastSession ? parseInt(lastSession) : null;
}

export function formatTimeCompact(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}
