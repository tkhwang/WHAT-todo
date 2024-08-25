import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { ITodo } from "@whatTodo/models";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { useTodos } from "@/hooks/queries/useTodos";

import TodoListItem from "./Todo/TodoListItem";

export default function Today() {
  const { t } = useTranslation();
  const { data: todos } = useTodos();

  const renderItem = useCallback(({ item, index }: { item: ITodo; index: number }) => {
    return <TodoListItem todo={item} />;
  }, []);

  return (
    <View className={"flex-1 p-4 gap-4"}>
      {/* Default todo list */}
      <View className={""}>
        <Text className={"text-4xl font-bold"}>{t("todo.default.list")}</Text>
        <Text className={"text-2xl font-bold"}>{new Date().toLocaleDateString()}</Text>
      </View>

      <View style={{ flexShrink: 1 }}>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        />
      </View>

      {/* bottom div */}
      <View className={"h-[1] bg-gray-400"} />
    </View>
  );
}
