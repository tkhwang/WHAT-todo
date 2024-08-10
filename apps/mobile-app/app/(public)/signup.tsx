import { Dimensions, Pressable, TextInput, View } from "react-native";
import { Text } from "@/components/ui/text";
import { authIsSignedInAtom } from "@/states/auth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const windowWidth = Dimensions.get("window").width;

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");

  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isIdVerified, setIsIdVerified] = useState(false);

  const { mutateAsync: authSignupMutationAsync } = useAuthSignup();

  useEffect(function clearAuthIsSignedIn() {
    return () => {
      setAuthIsSignedIn(false);
    };
  }, []);

  /*
   *  ID
   */
  const validateId = useCallback((idText: string) => {
    if (!idText || idText.length < 3) return { isValid: false, idErrorMessage: t("auth.id.error.short") };
    if (idText.length > 32) return { isValid: false, idErrorMessage: t("auth.id.error.long") };
    return { isValid: true, idErrorMessage: "" };
  }, []);

  const handleChangeId = useCallback((idText: string) => {
    const { isValid, idErrorMessage } = validateId(idText);

    if (!isValid) {
      setIdError(idErrorMessage);
    } else {
      setIdError("");
    }
    setId(idText);
  }, []);

  const IdCheckstring = useMemo(() => {
    if (!isIdChecked) return t("auth.id.check");
  }, []);

  const handleClickIdCheck = useCallback(() => {}, []);

  /*
   *   Name
   */
  const validateName = useCallback((nameText: string) => {
    if (!nameText || nameText.length < 3) return { isValid: false, nameErrorMessage: t("auth.name.error.short") };
    if (nameText.length > 32) return { isValid: false, nameErrorMessage: t("auth.name.error.long") };
    return { isValid: true, nameErrorMessage: "" };
  }, []);

  const handleChangeName = useCallback((nameText: string) => {
    const { isValid, nameErrorMessage } = validateName(nameText);

    if (!isValid) {
      setNameError(nameErrorMessage);
    } else {
      setNameError("");
    }
    setName(nameText);
  }, []);

  // Register
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
        {/* ID */}
        <View className="flex-col justify-center gap-4">
          <Text className="text-xl font-bold">{t("auth.id")}</Text>
          <View className="flex-row items-start justify-center gap-4">
            <Input
              className="flex-grow"
              placeholder={t("auth.id.placehold")}
              value={id}
              onChangeText={handleChangeId}
            />
            <Pressable
              className={`items-center justify-center rounded-xl w-28 h-12 ${idError ? "bg-gray-400" : "bg-blue-500"}`}
              onPress={handleClickIdCheck}
              disabled={!!id}
            >
              <Text className="text-xl text-white">{IdCheckstring}</Text>
            </Pressable>
          </View>
          {idError && <Text className="text-red-400">{idError}</Text>}
        </View>
        {/* Name */}
        <View className="flex-col justify-center gap-4">
          <Text className="text-xl font-bold">{t("auth.name")}</Text>
          <Input placeholder={t("auth.name.placehold")} value={name} onChangeText={handleChangeName} />
          {nameError && <Text className="text-red-400">{nameError}</Text>}
        </View>
        {/* Register button */}
        <View className="pt-4">
          <Pressable
            className={`items-center justify-center rounded-2xl h-16 ${
              nameError || !isIdVerified ? "bg-gray-400" : "bg-blue-500"
            }`}
            onPress={handleClickRegister}
            disabled={!!isIdVerified && !nameError}
          >
            <Text className="text-xl text-white">{t("auth.action.register")}</Text>
          </Pressable>
        </View>
      </View>
    </MainLayout>
  );
}
