import { View } from "react-native";

import { Sun } from "@/lib/icons/Sun";
import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function TabTwoScreen() {
  return (
    <ScreenWrapper>
      <MainHeader />
      <View className={"flex-1 justify-center items-center"}>
        <Text className={"text-xl font-semibold"}>{"My"}</Text>
      </View>
    </ScreenWrapper>
  );
}
