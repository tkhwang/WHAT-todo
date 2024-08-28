import { FlatList, View } from "react-native";
import { useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { ITask } from "@whatTodo/models";

import { Text } from "@/components/ui/text";
import { currentListIdAtom } from "@/states/list";
import { useList } from "@/hooks/queries/useList";
import { useTasks } from "@/hooks/queries/useTasks";
import Icon from "@/assets/icons";

import TaskListItem from "../Task/TaskListItem";

interface Props {
  listId: string;
}

const ItemSeparator = () => <View style={{ height: 4 }} />;

export function TodoList({ listId }: Props) {
  const setCurrentListId = useSetAtom(currentListIdAtom);

  const { data: list, isLoading } = useList(listId);
  const { data: tasks } = useTasks(listId);

  useEffect(() => {
    setCurrentListId(listId);

    return () => {
      setCurrentListId(null);
    };
  }, [listId, setCurrentListId]);

  const renderItem = useCallback(({ item, index }: { item: ITask; index: number }) => {
    return <TaskListItem todo={item} />;
  }, []);

  if (isLoading) return null;

  return (
    <View className={"flex-1"}>
      <View className={"flex-row gap-4 items-center py-4"}>
        <Icon name={"leftToRightListBullet"} size={26} strokeWidth={2} />
        <Text className={"text-2xl font-semibold"}>{list?.title}</Text>
      </View>
      <View style={{ flexShrink: 1 }}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
}
