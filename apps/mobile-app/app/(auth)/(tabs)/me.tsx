import { View } from "react-native";

import { Sun } from "@/lib/icons/Sun";
import { Text } from "@/components/ui/text";

export default function TabTwoScreen() {
  return (
    <View className={"items-center justify-center flex-1"}>
      <Text className={"text-4xl font-bold"}>{"Me"}</Text>
      <Sun />
    </View>
  );
}
