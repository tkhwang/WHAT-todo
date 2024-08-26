import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { ITask } from "@whatTodo/models";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { useTodos } from "@/hooks/queries/useTasks";

import TaskListItem from "./Task/TaskListItem";

export default function Today() {
  const { t } = useTranslation();
  const { data: todos } = useTodos();

  const renderItem = useCallback(({ item, index }: { item: ITask; index: number }) => {
    return <TaskListItem todo={item} />;
  }, []);

  return (
    <View className={"flex-1 p-4 gap-4"}>
      {/* Default todo list */}
      <View className={"gap-4"}>
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
    </View>
  );
}
