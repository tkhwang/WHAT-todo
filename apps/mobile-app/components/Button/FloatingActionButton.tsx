import React, { useCallback } from "react";
import { FloatingAction } from "react-native-floating-action";

import Icon from "@/assets/icons";
import { hp } from "@/helpers/common";
import useTextColor from "@/hooks/useTextColor";
import { appTheme } from "@/constants/uiConsts";

export default function FloatingActionButton() {
  const textColor = useTextColor();

  const actions = [
    {
      text: "Task",
      icon: <Icon name={"checkmarkSquare"} size={hp(3.2)} strokeWidth={2} color={textColor} />,
      color: appTheme.colors.secondary,
      name: "task",
      position: 0,
    },
  ];

  const handlePress = useCallback((name?: string) => {
    console.log(`selected button: ${name}`);
  }, []);

  return <FloatingAction actions={actions} color={appTheme.colors.primary} onPressItem={handlePress} />;
}
