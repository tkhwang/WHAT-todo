import { StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { Text } from "@/components/ui/text";
import { hp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";

import BackButton from "../BackButton";

interface Props {
  title: string;
  showBackButton?: boolean;
  marginBottom?: number;
}

export default function Header({ title, showBackButton = false, marginBottom = 10 }: Props) {
  const router = useRouter();

  return (
    <View style={[styles.container, { marginBottom }]}>
      {showBackButton && (
        <View style={styles.BackButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text className={"text-2xl font-semibold"} style={styles.title}>
        {title ?? ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(2.7),
    fontWeight: appTheme.fonts.semibold,
    // color: appTheme.colors.textDark,
  },
  BackButton: {
    position: "absolute",
    left: 0,
  },
});
