import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { useUserTodos } from "@/hooks/queries/useUserTodos";

export default function Today() {
  const { data: userTodos } = useUserTodos();

  return (
    <View className={"flex-1 p-4 gap-4"}>
      <Text className={"text-4xl font-bold"}>{"Today"}</Text>
      {(userTodos ?? []).map((userTodo, index) => (
        <Text key={userTodo.id} className={"text-xl font-normal"}>
          {userTodo.id}
        </Text>
      ))}
      {/* Overdue */}
      <Text className={"text-2xl font-bold"}>{"Overdue"}</Text>
      <View className={"h-[1] bg-gray-400 mb-4"} />

      {/* Today */}
      <Text className={"text-2xl font-bold"}>{new Date().toLocaleDateString()}</Text>
      <View className={"h-[1] bg-gray-400 mb-4"} />
    </View>
  );
}
