import { View } from "react-native";

import MainHeader from "@/components/MainLayout/MainHeader";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import { Text } from "@/components/ui/text";

export default function SendTodo() {
  return (
    <ScreenWrapper>
      <MainHeader />
      <View className={"flex flex-1 justify-center items-center"}>
        <Text>{"SendTodo"}</Text>
      </View>
    </ScreenWrapper>
  );
}
