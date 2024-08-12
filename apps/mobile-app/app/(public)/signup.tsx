import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import BackButton from "@/components/BackButton";
import { hp, wp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";
import Input from "@/components/Input";
import Icon from "@/assets/icons";
import { useColorScheme } from "@/lib/useColorScheme";
import Button from "@/components/Button";

interface Props {}

export default function PublicSignupScreen({}: Props) {
  const router = useRouter();

  const { isDarkColorScheme } = useColorScheme();
  const { t } = useTranslation();

  const nameRef = useRef("");

  return (
    <ScreenWrapper>
      <StatusBar style={"dark"} />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* Welcom Text */}
        <View>
          <Text className={"text-4xl font-bold"}>{t("auth.title.first")}</Text>
          <Text className={"text-4xl font-bold"}>{t("auth.title.second")}</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text className={"font-normal"}>{t("auth.register.description")}</Text>
          {/* name */}
          <Input
            icon={<Icon name={"accountSetting"} size={26} strokeWidth={1.6} />}
            placeholder={t("auth.name.placehold")}
            onChangeText={(value) => {
              nameRef.current = value;
            }}
          />
          {/* user id */}
          <View style={styles.id}>
            <Input
              icon={<Icon name={"tag"} size={26} strokeWidth={1.6} />}
              placeholder={t("auth.id.placehold")}
              onChangeText={(value) => {
                nameRef.current = value;
              }}
            />
            <Button
              title={"Check"}
              buttonStyle={{
                backgroundColor: appTheme.colors.secondary,
                paddingHorizontal: 4,
              }}
              onPress={() => {}}
            />
          </View>
          {/* register button */}
          <Button title={t("auth.action.register")} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
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
  id: {
    gap: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
