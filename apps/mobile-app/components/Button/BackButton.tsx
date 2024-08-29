import { Pressable, StyleSheet } from "react-native";
import { Router } from "expo-router";
import { clsx } from "clsx";

import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  router: Router;
  onBackPress?: () => void;
}

export default function BackButton({ size = 26, router, onBackPress }: Props) {
  const { isDarkColorScheme } = useColorScheme();

  const styles = StyleSheet.create({
    button: {
      alignSelf: "flex-start",
      padding: 5,
      borderRadius: appTheme.radius.sm,
      backgroundColor: isDarkColorScheme ? appTheme.colors.dark : appTheme.colors.whiteSecondary,
    },
  });

  const handlePress = () => {
    if (onBackPress) onBackPress();
    router.back();
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Icon name={"arrowLeft"} strokeWidth={2.5} size={size} color={appTheme.colors.text} />
    </Pressable>
  );
}
