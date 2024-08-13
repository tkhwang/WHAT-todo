import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

import { appTheme } from "@/constants/uiConsts";
import { hp, wp } from "@/helpers/common";
import Icon from "@/assets/icons";
import useTextColor from "@/hooks/useTextColor";

export default function MainHeader() {
  const { t } = useTranslation();
  const router = useRouter();

  const textColor = useTextColor();

  return (
    <View style={styles.container} className={"max-h-12"}>
      <View style={styles.header}>
        {/* app name */}
        <Text style={styles.title} className={"text-1xl"}>
          {t("app.name")}
        </Text>

        {/* icon */}
        <View style={styles.icons}>
          <Pressable onPress={() => router.push("/(auth)/(tabs)/me")}>
            <Icon name={"checkmarkSquare"} size={hp(3.2)} strokeWidth={2} color={textColor} />
          </Pressable>
          <Pressable onPress={() => router.push("/(auth)/(tabs)/expert")}>
            <Icon name={"inboxCheck"} size={hp(3.2)} strokeWidth={2} color={textColor} />
          </Pressable>
          <Pressable onPress={() => router.push("/(auth)/(tabs)/supervisor")}>
            <Icon name={"user"} size={hp(3.2)} strokeWidth={2} color={textColor} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: appTheme.colors.text,
    fontSize: hp(3.2),
    fontWeight: appTheme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: appTheme.radius.sm,
    borderCurve: "continuous",
    borderColor: appTheme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
});
