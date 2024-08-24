import { StyleSheet, View, TextInput, TextInputProps, ViewProps } from "react-native";
import { LegacyRef } from "react";

import { appTheme } from "@/constants/uiConsts";
import { hp } from "@/helpers/common";
import { useColorScheme } from "@/lib/useColorScheme";

interface Props extends TextInputProps {
  containerStyles?: ViewProps;
  icon?: React.ReactElement;
  inputRef?: LegacyRef<TextInput>;
  fontSize?: number;
}

export default function Input({ containerStyles, icon, inputRef, ...props }: Props) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View style={[styles.container, containerStyles && containerStyles]}>
      {icon && icon}
      <TextInput
        style={{
          flex: 1,
          color: isDarkColorScheme ? appTheme.colors.textDark : appTheme.colors.text,
        }}
        placeholderTextColor={isDarkColorScheme ? appTheme.colors.gray : appTheme.colors.text}
        ref={inputRef && inputRef}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: hp(7.2),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.4,
    borderRadius: appTheme.radius.xxl,
    borderCurve: "continuous",
    paddingHorizontal: 18,
    gap: 12,
  },
});
