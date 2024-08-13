import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthSignupRequest, AuthVerifyIdRequest } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import BackButton from "@/components/BackButton";
import { hp, wp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";
import Input from "@/components/Input";
import Icon from "@/assets/icons";
import Button from "@/components/Button";
import { useAuthVerifyIdReducer } from "@/hooks/reducers/useAuthVerifyIdReducer";
import { useAuthNameReducer } from "@/hooks/reducers/useAuthNameReducer";
import { useAuthSignup } from "@/hooks/mutations/useAuthSignup";
import { useAuthVerifyId } from "@/hooks/mutations/useAuthVerifyId";

interface Props {}

export default function PublicSignupScreen({}: Props) {
  const router = useRouter();

  const { email, uid } = useGlobalSearchParams() ?? "";

  const { t } = useTranslation();

  const nameRef = useRef("");
  const idRef = useRef("");

  const [isIdLoading, setIsIdLoading] = useState(false);
  const [isNameLoading, setIsNameLoading] = useState(false);

  const [{ state: authNameReducerState, name, nameError }, dispatchAuthName] = useAuthNameReducer();
  const [{ state: authVerifyIdReducerState, id, idError }, dispatchAuthVerifyId] = useAuthVerifyIdReducer();

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

  /*   *  ActionButton
   */
  const actionButtonState = useMemo(() => {
    if (authNameReducerState === "READY" && authVerifyIdReducerState === "VERIFIED") return "read-to-register";
    if (authNameReducerState === "READY" && authVerifyIdReducerState === "READY") return "read-to-check-id";

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
      dispatchAuthVerifyId({ type: "update", id });
      setIsIdLoading(false);
    }
  }, [authVerifyIdMutationAsync, dispatchAuthVerifyId, id]);

  const handleClickRegister = useCallback(async () => {
    const authSignupRequest: AuthSignupRequest = {
      id: uid,
      email,
      whatTodoId: id,
      name,
      provider: "apple",
    };

    try {
      setIsNameLoading(true);
      await authSignupMutationAsync(authSignupRequest);
    } catch (error) {
      setIsNameLoading(false);
    }
  }, [authSignupMutationAsync, email, id, name, uid]);

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
              value={id}
              fontSize={18}
            />
            <Text className={"text-xl  text-red-600"}>{idError}</Text>
          </View>

          {/* register button */}
          <View>
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
                  backgroundColor: actionButtonState === "not-ready" ? appTheme.colors.gray : appTheme.colors.secondary,
                }}
              />
            )}
          </View>
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
