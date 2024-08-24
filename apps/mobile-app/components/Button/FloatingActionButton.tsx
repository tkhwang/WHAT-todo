import React, { useCallback } from "react";
import { FloatingAction } from "react-native-floating-action";
import { useRouter, useSegments } from "expo-router";

import Icon from "@/assets/icons";
import { hp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";

export default function FloatingActionButton() {
  const router = useRouter();

  const segments = useSegments();

  const actions = [
    {
      text: "new Task",
      icon: <Icon name={"add"} size={hp(3.2)} strokeWidth={2} color={appTheme.colors.white} />,
      color: appTheme.colors.secondary,
      name: "new-task",
      position: 0,
    },
  ];

  const handlePress = useCallback(
    (name?: string) => {
      console.log(`selected button: ${name}`);
      if (!name) return;

      if (name === "new-task") {
        router.push("/(auth)/(tabs)/newTask");
        router.setParams({ previousSegments: segments });
      }
    },
    [router, segments],
  );

  return (
    <FloatingAction overrideWithAction actions={actions} color={appTheme.colors.primary} onPressItem={handlePress} />
  );
}
