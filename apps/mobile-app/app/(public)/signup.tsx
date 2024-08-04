import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { authIsSignedInAtom } from "@/states/auth";
import { useEffect } from "react";
import { useAtom } from "jotai";
import MainLayout from "@/components/MainLayout";

export default function PublicSignupScreen() {
  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);

  useEffect(function clearAuthIsSignedIn() {
    return () => {
      setAuthIsSignedIn(false);
    };
  }, []);

  return (
    <MainLayout>
      <Text className="text-2xl font-bold">Signup</Text>
    </MainLayout>
  );
}
