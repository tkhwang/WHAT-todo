import { View } from "react-native";
import { useTranslation } from "react-i18next";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import Header from "@/components/MainLayout/Header";

export default function SendTodo() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <View className={"flex flex-1 flex-col p-4"}>
        <Header title={t("title.expert.sendTodo")} showBackButton />
      </View>
    </ScreenWrapper>
  );
}
