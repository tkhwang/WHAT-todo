import { Dimensions, Pressable, View } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { useGlobalSearchParams } from "expo-router";
import { AuthSignupRequest, AuthVerifyIdRequest } from "@whatTodo/models";
import { Text } from "@/components/ui/text";
import { authIsSignedInAtom } from "@/states/auth";
import MainLayout from "@/components/MainLayout";
import { Input } from "@/components/ui/input";
import { useAuthSignup } from "@/hooks/mutations/useAuthSignup";
import { useAuthVerifyId } from "@/hooks/mutations/useAuthVerifyId";
import { cn } from "@/lib/utils";
import { useAuthVerifyIdReducer } from "@/hooks/reducers/useAuthVerifyIdReducer";
import { useAuthNameReducer } from "@/hooks/reducers/useAuthNameReducer";

export default function PublicSignupScreen() {
  const { t } = useTranslation();

  const { email, uid } = useGlobalSearchParams() ?? "";
  const windowWidth = Dimensions.get("window").width;

  const [authIsSignedIn, setAuthIsSignedIn] = useAtom(authIsSignedInAtom);

  const [{ state: authVerifyIdReducerState, id, idError }, dispatchAuthVerifyId] = useAuthVerifyIdReducer();
  const [{ state: authNameReducerState, name, nameError }, dispatchAuthName] = useAuthNameReducer();

  const { mutateAsync: authSignupMutationAsync } = useAuthSignup();
  const { mutateAsync: authVerifyIdMutationAsync } = useAuthVerifyId();

  useEffect(
    function clearAuthIsSignedIn() {
      return () => {
        setAuthIsSignedIn(false);
      };
    },
    [setAuthIsSignedIn],
  );

  /*
   *  ID
   */
  const handleChangeId = useCallback(
    (idText: string) => {
      dispatchAuthVerifyId({ type: "update", id: idText });
    },
    [dispatchAuthVerifyId],
  );

  const IdCheckstring = useMemo(() => {
    if (authVerifyIdReducerState === "VERIFIED") return t("auth.id.check.verified");
    return t("auth.id.check");
  }, [authVerifyIdReducerState, t]);

  const handleClickIdCheck = useCallback(async () => {
    if (!id) return;

    try {
      const requestDto: AuthVerifyIdRequest = { id };
      await authVerifyIdMutationAsync(requestDto);
      dispatchAuthVerifyId({ type: "verify", id });
    } catch (error: unknown) {
      dispatchAuthVerifyId({ type: "update", id });
    }
  }, [authVerifyIdMutationAsync, dispatchAuthVerifyId, id]);

  /*
   *   Name
   */
  const handleChangeName = useCallback(
    (nameText: string) => {
      dispatchAuthName({ type: "update", name: nameText });
    },
    [dispatchAuthName],
  );

  /*
   * Register
   */
  const handleClickRegister = useCallback(async () => {
    const authSignupRequest: AuthSignupRequest = {
      id: uid,
      email,
      whatTodoId: id,
      name,
      provider: "apple",
    };

    await authSignupMutationAsync(authSignupRequest);
  }, [uid, email, id, name, authSignupMutationAsync]);

  return (
    <MainLayout>
      <View className={"w-full h-full gap-4 p-4"}>
        {/* TITLE */}
        <Text className={"p-4 text-2xl font-bold text-center"}>{t("auth.title")}</Text>
        {/* Email */}
        <View className={"flex-row gap-4"}>
          <Text className={"text-xl font-bold"}>{t("auth.email")}</Text>
          <Text className={"text-xl text-center"}>{email}</Text>
        </View>
        {/* UID */}
        <View className={"flex-row gap-4"}>
          <Text className={"text-xl font-bold"}>{t("auth.uid")}</Text>
          <Text className={"text-base"}>{uid}</Text>
        </View>
        {/* ID */}
        <View className={"flex-col justify-center gap-4"}>
          <Text className={"text-xl font-bold"}>{t("auth.id")}</Text>
          <View className={"flex-row items-start justify-center w-full gap-4"}>
            <Input
              style={{ flex: 3 }}
              className={"flex-[3]"}
              placeholder={t("auth.id.placehold")}
              value={id}
              autoCapitalize={"none"}
              onChangeText={handleChangeId}
            />
            <Pressable
              className={cn(
                "flex-[1] items-center justify-center rounded-xl h-14",
                authVerifyIdReducerState === "READY" ? "bg-blue-500" : "bg-gray-400",
              )}
              onPress={handleClickIdCheck}
              disabled={
                authVerifyIdReducerState === "SHORT" ||
                authVerifyIdReducerState === "LONG" ||
                authVerifyIdReducerState === "VERIFIED"
              }
            >
              <Text className={"text-xl text-white"}>{IdCheckstring}</Text>
            </Pressable>
          </View>
          {idError && <Text className={"text-red-400"}>{idError}</Text>}
        </View>
        {/* Name */}
        <View className={"flex-col justify-center gap-4"}>
          <Text className={"text-xl font-bold"}>{t("auth.name")}</Text>
          <Input
            placeholder={t("auth.name.placehold")}
            value={name}
            onChangeText={handleChangeName}
            autoCapitalize={"none"}
          />
          {nameError && <Text className={"text-red-400"}>{nameError}</Text>}
        </View>
        {/* Register button */}
        <View className={"pt-4"}>
          <Pressable
            className={cn(
              "items-center justify-center rounded-2xl h-16",
              authVerifyIdReducerState === "VERIFIED" && authNameReducerState === "READY"
                ? "bg-blue-500"
                : "bg-gray-400",
            )}
            onPress={handleClickRegister}
            disabled={!(authVerifyIdReducerState === "VERIFIED" && authNameReducerState === "READY")}
          >
            <Text className={"text-xl text-white"}>{t("auth.action.register")}</Text>
          </Pressable>
        </View>
      </View>
    </MainLayout>
  );
}
