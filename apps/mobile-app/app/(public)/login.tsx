import { Auth } from "@/components/Auth";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function login() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold text-black mb-4">Welcome back to WhatTodo</Text>
      <Auth />
    </View>
  );
}
