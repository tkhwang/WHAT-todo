import { Sun } from "@/lib/icons/Sun";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold">Me</Text>
      <Sun />
    </View>
  );
}
