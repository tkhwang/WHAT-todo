import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { IList } from "@whatTodo/models";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { Text } from "@/components/ui/text";
import { useLists } from "@/hooks/queries/useLists";

import { TodoList } from "./List/TodoList";

const ItemSeparator = () => <View style={{ height: 4 }} />;

dayjs.extend(isoWeek);

export default function Today() {
  const { data: lists, arePending } = useLists();

  const renderItem = useCallback(({ item, index }: { item: IList; index: number }) => {
    return <TodoList listId={item.id} key={`todolist-${index}`} />;
  }, []);

  const date = dayjs().format("MM/DD");
  const week = dayjs().isoWeek();

  return (
    <View className={"flex-1 p-4 gap-4"}>
      {/* Default todo list */}
      <View className={"gap-4"}>
        <Text className={"text-3xl font-bold"}>{`${date} | W${week}`}</Text>
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
