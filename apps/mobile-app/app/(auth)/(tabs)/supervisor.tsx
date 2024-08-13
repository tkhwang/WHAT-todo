import { View } from "react-native";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function TabFourScreen() {
  return (
    <ScreenWrapper>
      <MainHeader />
      <View className={"flex-1 justify-center items-center"}>
        <Text className={"text-xl font-semibold"}>{"Supervisor"}</Text>
      </View>
    </ScreenWrapper>
  );
}
