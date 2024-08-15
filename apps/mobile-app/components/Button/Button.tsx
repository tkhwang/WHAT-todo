import { Pressable, PressableProps, StyleSheet, Text, TextProps, View, ViewProps } from "react-native";

import { appTheme } from "@/constants/uiConsts";
import { hp } from "@/helpers/common";

import Loading from "../Loading";

interface Props {
  buttonStyle: PressableProps;
  textStyle: TextProps;
  title: string;
  onPress: () => void;
  color: string;
  disabled: boolean;
  loading: boolean;
  hasShadow: boolean;
}

export default function Button({
  buttonStyle,
  textStyle,
  title = "",
  onPress,
  color = appTheme.colors.primary,
  disabled = false,
  loading = false,
  hasShadow = true,
}: Props) {
  const shadowStyle = {
    shadowColor: appTheme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, { backgroundColor: "white" }]}>
        <Loading color={color} />
      </View>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
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
    borderRadius: appTheme.radius.xl,
  },
  text: {
    fontSize: hp(2.5),
    color: "white",
    fontWeight: appTheme.fonts.bold,
  },
});
