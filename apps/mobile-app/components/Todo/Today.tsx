import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/text";

export default function Today() {
  return (
    <View className={"flex-1 p-4 gap-4"}>
      <Text className={"text-4xl font-bold"}>{"Today"}</Text>
      {/* Overdue */}
      <Text className={"text-2xl font-bold"}>{"Overdue"}</Text>
      <View className={"h-[1] bg-gray-400 mb-4"} />

      {/* Today */}
      <Text className={"text-2xl font-bold"}>{new Date().toLocaleDateString()}</Text>
      <View className={"h-[1] bg-gray-400 mb-4"} />
    </View>
  );
}

const styles = StyleSheet.create({});
