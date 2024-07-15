import "react-native-url-polyfill/auto"
import { createClient } from "@supabase/supabase-js"
import AsyncStorage from "@react-native-async-storage/async-storage"

if (!process.env.EXPO_PUBLIC_SUPABASE_URL) throw new Error("EXPO_PUBLIC_SUPABASE_URL not defined.")
if (!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) throw new Error("EXPO_PUBLIC_SUPABASE_ANON_KEY not defined.")

export const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
