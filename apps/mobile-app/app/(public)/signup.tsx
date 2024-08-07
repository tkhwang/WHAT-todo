import { Dimensions, Pressable, TextInput, View } from "react-native";
import { Text } from "@/components/ui/text";
import { authIsSignedInAtom } from "@/states/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import MainLayout from "@/components/MainLayout";
import { Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useAuthSignup } from "@/hooks/mutations/useAuthSignup";
import { AuthSignupRequest } from "@whatTodo/models";

export default function PublicSignupScreen() {
  const { t } = useTranslation();

  const { email, uid } = useGlobalSearchParams() ?? "";

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);
  const windowWidth = Dimensions.get("window").width;

  const { mutateAsync: authSignupMutationAsync } = useAuthSignup();

  useEffect(function clearAuthIsSignedIn() {
    return () => {
      setAuthIsSignedIn(false);
    };
  }, []);

  const validateName = useCallback((text: string) => {
    if (!text || text.length < 3) return { isValid: false, message: t("auth.name.error.short") };
    if (text.length > 32) return { isValid: false, message: t("auth.name.error.long") };
    return { isValid: true, message: "" };
  }, []);

  const handleChangeText = useCallback((text: string) => {
    const { isValid, message } = validateName(text);

    if (!isValid) {
      setNameError(message);
    } else {
      setNameError("");
    }
    setName(text);
  }, []);

  const handleClickRegister = useCallback(async () => {
    const authSignupRequest: AuthSignupRequest = {
      uid,
      email,
      name
    };
    console.log("🚀 ~ handleClickRegister ~ authSignupRequest:", authSignupRequest);

    await authSignupMutationAsync(authSignupRequest);
  }, []);

  return (
    <MainLayout>
      <View className="w-full h-full gap-4 p-4">
        {/* TITLE */}
        <Text className="p-4 text-2xl font-bold text-center">{t("auth.title")}</Text>
        {/* Email */}
        <View className="flex-row gap-4">
          <Text className="text-xl font-bold">{t("auth.email")}</Text>
          <Text className="text-xl text-center">{email}</Text>
        </View>
        {/* UID */}
        <View className="flex-row gap-4">
          <Text className="text-xl font-bold">{t("auth.uid")}</Text>
          <Text className="text-base">{uid}</Text>
        </View>
        {/* Name */}
        <View className="flex-col justify-center gap-4">
          <Text className="text-xl font-bold">{t("auth.name")}</Text>
          <Input placeholder={t("auth.name.placehold")} value={name} onChangeText={handleChangeText} />
          <Text className="text-red-400">{nameError}</Text>
        </View>
        {/* Register button */}
        <View className="pt-4">
          <Pressable
            className={`items-center justify-center rounded-2xl h-16 ${nameError ? "bg-gray-400" : "bg-blue-500"}`}
            onPress={handleClickRegister}
            disabled={!!nameError}
          >
            <Text className="text-xl text-white">{t("auth.action.register")}</Text>
          </Pressable>
        </View>
      </View>
    </MainLayout>
  );
}
