import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { ITodo } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import { useTodos } from "@/hooks/queries/useTodos";

import TodoItem from "./Todo/TodoItem";

export default function Today() {
  const { data: todos, arePending } = useTodos();

  const renderItem = useCallback(({ item, index }: { item: ITodo; index: number }) => {
    return <TodoItem todo={item} />;
  }, []);

  return (
    <View className={"flex-1 p-4 gap-4"}>
      <Text className={"text-4xl font-bold"}>{"Today"}</Text>

      {/* Overdue */}
      {/* <Text className={"text-2xl font-bold"}>{"Overdue"}</Text>
      <View className={"h-[1] bg-gray-400 mb-4"} /> */}

      {/* Today */}
      <Text className={"text-2xl font-bold"}>{new Date().toLocaleDateString()}</Text>
      <View className={"h-[1] bg-gray-400 mb-4"} />
      <View style={{ flexShrink: 1 }}>
        <FlatList data={todos} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    </View>
  );
}
