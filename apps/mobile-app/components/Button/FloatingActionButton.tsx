import React, { RefObject, useCallback } from "react";
import { FloatingAction } from "react-native-floating-action";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import Icon from "@/assets/icons";
import { hp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";

interface Props {
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
}

export default function FloatingActionButton({ bottomSheetModalRef }: Props) {
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

      bottomSheetModalRef.current?.present();
    },
    [bottomSheetModalRef],
  );

  return <FloatingAction actions={actions} color={appTheme.colors.primary} onPressItem={handlePress} />;
}
