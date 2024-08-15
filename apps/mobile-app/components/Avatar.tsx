import { StyleSheet } from "react-native";
import React from "react";
import { Image, ImageStyle } from "expo-image";

import { appTheme } from "@/constants/uiConsts";
import { hp } from "@/helpers/common";
import { getUserImageSource } from "@/services/userService";

interface Props {
  uri: string;
  size: number;
  rounded: number;
  style: Partial<ImageStyle>;
}

export default function Avatar({ uri, size = hp(4.5), rounded = appTheme.radius.md, style = {} }: Props) {
  return (
    <Image
      source={getUserImageSource(uri)}
      transition={100}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: rounded,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: appTheme.colors.darkLight,
    borderWidth: 1,
  },
});
