import { Auth } from "@/components/Auth";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function login() {
  return (
    <VStack className="flex-1 justify-center items-center" space="md">
      <Text className="text-2xl font-bold text-black">Welcome back to WhatTodo</Text>
      <Auth />
    </VStack>
  );
}
