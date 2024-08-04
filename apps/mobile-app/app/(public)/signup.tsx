import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { authIsSignedInAtom } from "@/states/auth";
import { useEffect } from "react";
import { useAtom } from "jotai";

export default function PublicSignupScreen() {
  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);

  useEffect(function clearAuthIsSignedIn() {
    return () => {
      setAuthIsSignedIn(false);
    };
  }, []);

  return (
    <View className="items-center justify-center flex-1">
      <Text>Signup</Text>
    </View>
  );
}
