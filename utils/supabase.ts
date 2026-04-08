import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseURL, supabaseAnonKey);

export async function submitSession(username: string, duration: number) {
  await supabase.from("sessions").insert({ username, duration });
}

export async function fetchLeaderboard() {
  const { data } = await supabase
    .from("sessions")
    .select("username, duration")
    .order("duration", { ascending: false })
    .limit(20);

  return data;
}
