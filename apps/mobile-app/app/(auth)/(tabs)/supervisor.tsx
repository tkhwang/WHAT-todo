import { View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import FloatingActionButton from "@/components/Button/FloatingActionButton";

export default function TabThreeScreen() {
  const { t } = useTranslation();
  return (
    <ScreenWrapper>
      <MainHeader />
      <View className={"flex-1 justify-center items-center"}>
        <Text className={"text-xl font-semibold"}>{t("app.screen.supervisor")}</Text>
      </View>
      {/* <FloatingActionButton /> */}
    </ScreenWrapper>
  );
}
