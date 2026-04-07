import { OFF, ON, setStateAsync } from "expo-torch";
export function flash(count: number) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => setStateAsync(ON), i * 400);
    setTimeout(() => setStateAsync(OFF), i * 400 + 200);
  }
}
