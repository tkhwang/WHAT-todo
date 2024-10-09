import { View } from "react-native";
import { useTranslation } from "react-i18next";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import ListContainer from "@/components/List/ListContainer";

export default function TabThreeScreen() {
  const { t } = useTranslation();
  return (
    <ScreenWrapper>
      <MainHeader />

      <View className={"flex-1 w-screen justify-end"}>
        <ListContainer userType={"supervisor"} />
      </View>
    </ScreenWrapper>
  );
}
