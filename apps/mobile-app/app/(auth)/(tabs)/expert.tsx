import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { FloatingAction } from "react-native-floating-action";
import { useMemo } from "react";
import { useRouter } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import Icon from "@/assets/icons";
import { appTheme } from "@/constants/uiConsts";
import ListContainer from "@/components/List/ListContainer";

export default function TabFourScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const actions = useMemo(() => {
    return [
      {
        text: t("expert.menu.send"),
        icon: <Icon name={"checkList"} size={26} strokeWidth={2} />,
        name: "export/sendTodo",
        position: 0,
        color: appTheme.colors.secondary,
      },
    ];
  }, [t]);

  return (
    <ScreenWrapper>
      <MainHeader />

      <View className={"flex-1 w-screen justify-start"}>
        <ListContainer userType={"expert"} />
      </View>

      <FloatingAction
        actions={actions}
        color={appTheme.colors.primary}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          router.navigate("/sendTodo");
        }}
      />
    </ScreenWrapper>
  );
}
