import { FlatList, View } from "react-native";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import { COLLECTIONS, ITask } from "@whatTodo/models";
import { useCollection } from "react-query-firestore";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { currentListIdAtom } from "@/states/list";
import { useList } from "@/hooks/queries/useList";
import Icon from "@/assets/icons";

import TaskListItem from "../Task/TaskListItem";
import { TaskListDoneItem } from "../Task/TaskListDoneItem";

interface Props {
  listId: string;
}

const ItemSeparator = () => <View style={{ height: 4 }} />;

export function TodoList({ listId }: Props) {
  const { t } = useTranslation();
  const setCurrentListId = useSetAtom(currentListIdAtom);

  const { data: list, isLoading } = useList(listId);

  const { data: tasks } = useCollection(
    COLLECTIONS.TASKS,
    {
      onSuccess: console.log,
    },
    {
      where: [
        ["listId", "==", listId],
        ["isDone", "==", false],
      ],
    },
  );

  const sortedTasks = useMemo(() => {
    return tasks?.sort((a, b) => b.updatedAt - a.updatedAt);
  }, [tasks]);

  const { data: doneTasks } = useCollection(
    COLLECTIONS.TASKS,
    {
      onSuccess: console.log,
    },
    {
      where: [
        ["listId", "==", listId],
        ["isDone", "==", true],
      ],
    },
  );

  const sortedDoneTasks = useMemo(() => {
    return doneTasks?.sort((a, b) => b.updatedAt - a.updatedAt);
  }, [doneTasks]);

  useEffect(() => {
    setCurrentListId(listId);

    return () => {
      setCurrentListId(null);
    };
  }, [listId, setCurrentListId]);

  const renderItem = useCallback(({ item, index }: { item: ITask; index: number }) => {
    return <TaskListItem todo={item} />;
  }, []);

  const renderDoneItem = useCallback(({ item, index }: { item: ITask; index: number }) => {
    return <TaskListDoneItem todo={item} />;
  }, []);

  if (isLoading) return null;

  return (
    <View className={"flex-1"}>
      {/* List Title */}
      <View className={"flex-row gap-4 items-center py-4"}>
        <Icon name={"leftToRightListBullet"} size={26} strokeWidth={2} />
        <Text className={"text-2xl font-semibold"}>{list?.title}</Text>
      </View>

      {/* tasks list */}
      <View style={{ flexShrink: 1 }}>
        <FlatList
          data={sortedTasks}
          renderItem={renderItem}
          keyExtractor={(item) => `tasks-list-${item.id}`}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>

      {/* List Title */}
      <View className={"flex-row gap-4 items-center py-4"}>
        <Icon name={"leftToRightListBullet"} size={26} strokeWidth={2} />
        <Text className={"text-2xl font-semibold"}>{t("todo.list.isDone")}</Text>
      </View>

      {/* tasks list */}
      <View style={{ flexShrink: 1 }}>
        <FlatList
          data={sortedDoneTasks}
          renderItem={renderDoneItem}
          keyExtractor={(item) => `tasks-list-${item.id}`}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
}
