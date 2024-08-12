import { Pressable, StyleSheet } from "react-native";
import { Router } from "expo-router";

import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";

interface Props {
  size?: number;
  router: Router;
}

export default function BackButton({ size = 26, router }: Props) {
  return (
    <Pressable onPress={() => router.replace("/(public)/signin")} style={styles.button}>
      <Icon name={"arrowLeft"} strokeWidth={2.5} size={size} color={appTheme.colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: appTheme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});
