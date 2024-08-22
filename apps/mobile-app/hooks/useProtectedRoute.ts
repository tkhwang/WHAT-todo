import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoute(user: FirebaseAuthTypes.User | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    console.log(`[*] inAuthGroup: ${inAuthGroup}`);

    if (!user && inAuthGroup) {
      router.replace("/signin");
    } else if (user && !inAuthGroup) {
      // router.replace("/(auth)/(tabs)/");
      router.replace("/(auth)/splash");
    }
  }, [user, segments]);
}
