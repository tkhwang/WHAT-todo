import { FlatList, View } from "react-native";
import { useCallback } from "react";
import { IList, UserType } from "@whatTodo/models";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

import { useLists } from "@/hooks/queries/useLists";

import { TodoList } from "./TodoList";

const ItemSeparator = () => <View style={{ height: 4 }} />;

dayjs.extend(isoWeek);

interface Props {
  userType: UserType;
}

export default function ListContainer({ userType }: Props) {
  const { data: lists } = useLists(userType);

  const renderItem = useCallback(
    ({ item, index }: { item: IList; index: number }) => {
      return <TodoList userType={userType} listId={item.id} key={`todolist-${index}`} />;
    },
    [userType],
  );

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
