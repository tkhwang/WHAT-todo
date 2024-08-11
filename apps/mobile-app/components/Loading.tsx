import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/constants/uiConsts";

interface Props {
  size: any;
  color: any;
}

export default function Loading({ size = "large", color = appTheme.colors.primary }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
