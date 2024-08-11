import { Pressable, StyleSheet, Text, View } from "react-native";

import { appTheme } from "@/constants/uiConsts";
import { hp } from "@/helpers/common";

interface Props {
  buttonStyle: any;
  textStyle: any;
  title: string;
  onPress: () => void;
  loading: boolean;
  hasShadow: boolean;
}

export default function Button({
  buttonStyle,
  textStyle,
  title = "",
  onPress,
  loading = false,
  hasShadow = true,
}: Props) {
  const shadowStyle = {
    shadowColor: appTheme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return <View style={[styles.button, { backgroundColor: "white" }]} />;
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: appTheme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: appTheme.reduis.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    fontWeight: appTheme.fonts.bold,
  },
});
