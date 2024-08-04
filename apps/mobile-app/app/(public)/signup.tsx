import { Dimensions, Pressable, TextInput, View } from "react-native";
import { Text } from "@/components/ui/text";
import { authIsSignedInAtom } from "@/states/auth";
import { useEffect } from "react";
import { useAtom } from "jotai";
import MainLayout from "@/components/MainLayout";
import { Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function PublicSignupScreen() {
  const { t } = useTranslation();

  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);
  const windowWidth = Dimensions.get("window").width;

  useEffect(function clearAuthIsSignedIn() {
    return () => {
      setAuthIsSignedIn(false);
    };
  }, []);

  return (
    <MainLayout>
      <View className="w-full h-full gap-4 p-4">
        <Text className="text-2xl font-bold text-center">Signup</Text>
        <View className="flex-col justify-center gap-4">
          <Text className="text-xl font-bold">{t("auth.name")}</Text>
          <Input placeholder={t("auth.name.placehold")} />
        </View>
        <Pressable className="items-center justify-center bg-blue-500 rounded-md h-11" onPress={() => {}}>
          <Text className="text-xl text-white">Register</Text>
        </Pressable>
      </View>
    </MainLayout>
  );
}
