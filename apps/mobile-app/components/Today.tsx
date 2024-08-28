import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { IList } from "@whatTodo/models";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { useLists } from "@/hooks/queries/useLists";

import { TodoList } from "./List/TodoList";

const ItemSeparator = () => <View style={{ height: 4 }} />;

export default function Today() {
  const { t } = useTranslation();
  const { data: lists, arePending } = useLists();

  const renderItem = useCallback(({ item, index }: { item: IList; index: number }) => {
    return <TodoList listId={item.id} key={`todolist-${index}`} />;
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
          data={lists}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
}
