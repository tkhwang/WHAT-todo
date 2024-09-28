import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { APP_ERRORS, AuthSignupRequest, AuthVerifyIdRequest } from "@whatTodo/models";
import { useAtom } from "jotai";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";
import Input from "@/components/Input";
import Icon from "@/assets/icons";
import { useAuthVerifyIdReducer } from "@/hooks/reducers/useAuthVerifyIdReducer";
import { useAuthNameReducer } from "@/hooks/reducers/useAuthNameReducer";
import { useAuthSignup } from "@/hooks/mutations/useAuthSignup";
import { useAuthVerifyId } from "@/hooks/mutations/useAuthVerifyId";
import BackButton from "@/components/Button/BackButton";
import Button from "@/components/Button/Button";
import { authSignUpPlatformAtom } from "@/states/auth";

export default function PublicSignupScreen() {
  const router = useRouter();

  const { email, uid } = useGlobalSearchParams() ?? "";

  const { t } = useTranslation();

  const nameRef = useRef("");
  const idRef = useRef("");

  const [isIdLoading, setIsIdLoading] = useState(false);
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [authSignUpPlatform, setAuthSignUpPlatform] = useAtom(authSignUpPlatformAtom);

  const [{ state: authNameReducerState, name, nameError }, dispatchAuthName] = useAuthNameReducer();
  const [{ state: authVerifyIdReducerState, id, idError }, dispatchAuthVerifyId] =
    useAuthVerifyIdReducer();

  const { mutateAsync: authVerifyIdMutationAsync } = useAuthVerifyId();
  const { mutateAsync: authSignupMutationAsync } = useAuthSignup();

  const handleNameChange = useCallback(
    (nameText: string) => {
      dispatchAuthName({ type: "update", name: nameText });
    },
    [dispatchAuthName],
  );

  const handleIdChange = useCallback(
    (idText: string) => {
      dispatchAuthVerifyId({ type: "update", id: idText });
    },
    [dispatchAuthVerifyId],
  );

  /*
   *  ActionButton
   */
  const actionButtonState = useMemo(() => {
    if (authNameReducerState === "READY" && authVerifyIdReducerState === "VERIFIED")
      return "read-to-register";
    if (authNameReducerState === "READY" && authVerifyIdReducerState === "READY")
      return "read-to-check-id";

    setIsIdLoading(false);
    return "not-ready";
  }, [authNameReducerState, authVerifyIdReducerState]);

  useEffect(() => {
    if (authVerifyIdReducerState !== "VERIFIED") {
      setIsIdLoading(false);
    }
  }, [authVerifyIdReducerState]);

  const handleClickCheckId = useCallback(async () => {
    if (!id) return;

    const requestDto: AuthVerifyIdRequest = { id };

    try {
      setIsIdLoading(true);
      await authVerifyIdMutationAsync(requestDto);
      dispatchAuthVerifyId({ type: "verify", id });
    } catch (error: unknown) {
      if (error instanceof Error) {
        // check status code 400
        if (error?.response?.status === 400) {
          dispatchAuthVerifyId({ type: "duplicate", id });
        } else {
          console.log(`[-][handleClickCheckId] failed: ${error}`);
        }
      }
    } finally {
      setIsIdLoading(false);
    }
  }, [authVerifyIdMutationAsync, dispatchAuthVerifyId, id]);

  const handleClickRegister = useCallback(async () => {
    if (!authSignUpPlatform) throw new Error(APP_ERRORS.AUTH.PLATFORM_NOT_CONFIGURED);

    const authSignupRequest: AuthSignupRequest = {
      id: uid,
      email,
      whatTodoId: id,
      name,
      provider: authSignUpPlatform,
    };

    try {
      setIsNameLoading(true);
      await authSignupMutationAsync(authSignupRequest);
    } catch (error: unknown) {
      setIsNameLoading(false);
    } finally {
      setAuthSignUpPlatform(null);
    }
  }, [authSignUpPlatform, authSignupMutationAsync, email, id, name, setAuthSignUpPlatform, uid]);

  return (
    <ScreenWrapper>
      <StatusBar style={"dark"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          gap: 20,
          paddingHorizontal: wp(5),
        }}
      >
        <BackButton router={router} />
        <View className={"flex-1 justify-end"}>
          {/* Welcom Text */}
          <View>
            <Text className={"text-4xl font-bold"}>{t("auth.title.first")}</Text>
            <Text className={"text-4xl font-bold"}>{t("auth.title.second")}</Text>
          </View>

          {/* form */}
          <View style={styles.form}>
            <View className={"py-4"}>
              <Text className={"text-xl font-normal"}>{t("auth.register.description")}</Text>
            </View>

            {/* name */}
            <View style={styles.inputAndErrorContainer}>
              <Input
                inputRef={nameRef}
                icon={<Icon name={"user"} size={26} strokeWidth={1.6} />}
                placeholder={t("auth.name.placehold")}
                onChangeText={(value) => handleNameChange(value)}
                autoCapitalize={"none"}
                value={name}
                fontSize={18}
              />
              <Text className={"text-xl  text-red-600"}>{nameError}</Text>
            </View>

            {/* user id */}
            <View style={styles.inputAndErrorContainer}>
              <Input
                inputRef={idRef}
                icon={<Icon name={"tag"} size={26} strokeWidth={1.6} />}
                placeholder={t("auth.id.placehold")}
                onChangeText={(value) => handleIdChange(value)}
                autoCapitalize={"none"}
                value={id}
                fontSize={18}
              />
              <Text className={"text-xl  text-red-600"}>{idError}</Text>
            </View>

            {/* register button */}
            <View className={"pb-8"}>
              {actionButtonState === "read-to-register" ? (
                <Button
                  onPress={handleClickRegister}
                  title={t("auth.action.register")}
                  color={appTheme.colors.primary}
                  loading={isNameLoading}
                  buttonStyle={{ backgroundColor: appTheme.colors.primary }}
                />
              ) : (
                <Button
                  onPress={handleClickCheckId}
                  title={t("auth.action.checkId")}
                  disabled={actionButtonState === "not-ready"}
                  color={appTheme.colors.secondary}
                  loading={isIdLoading}
                  buttonStyle={{
                    backgroundColor:
                      actionButtonState === "not-ready"
                        ? appTheme.colors.gray
                        : appTheme.colors.secondary,
                  }}
                />
              )}
            </View>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: appTheme.fonts.bold,
    color: appTheme.colors.text,
  },
  form: {
    gap: 30,
  },
  inputAndErrorContainer: {
    flexDirection: "column",
    gap: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
