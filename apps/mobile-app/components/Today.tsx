import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { IList } from "@whatTodo/models";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { useLists } from "@/hooks/queries/useLists";

import { TodoList } from "./List/TodoList";

const ItemSeparator = () => <View style={{ height: 4 }} />;

dayjs.extend(isoWeek);

export default function Today() {
  const { data: lists } = useLists();
  console.log("🚀 ~ Today ~ lists:", lists);

  const renderItem = useCallback(({ item, index }: { item: IList; index: number }) => {
    return <TodoList listId={item.id} key={`todolist-${index}`} />;
  }, []);

  return (
    <View className={"flex-1 p-4 gap-4"}>
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
