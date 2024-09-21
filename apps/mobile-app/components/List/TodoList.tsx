import { FlatList, View } from "react-native";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo } from "react";
import { ITask } from "@whatTodo/models";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { currentListIdAtom } from "@/states/list";
import { useList } from "@/hooks/queries/useList";
import Icon from "@/assets/icons";
import { useTasks } from "@/hooks/queries/useTasks";

import TaskListItem from "../Task/TaskListItem";
import { TaskListDoneItem } from "../Task/TaskListDoneItem";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface Props {
  listId: string;
}

const ItemSeparator = () => <View style={{ height: 12 }} />;

export function TodoList({ listId }: Props) {
  const { t } = useTranslation();
  const setCurrentListId = useSetAtom(currentListIdAtom);

  const { data: list, isLoading } = useList(listId);

  const { data: tasks } = useTasks(listId);

  const activeTasks = useMemo(() => {
    return (tasks ?? []).filter((task) => !task.isDone).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return (tasks ?? []).filter((task) => task.isDone).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [tasks]);

  useEffect(() => {
    setCurrentListId(listId);

    return () => {
      setCurrentListId(null);
    };
  }, [listId, setCurrentListId]);

  const renderItem = useCallback(({ item }: { item: ITask }) => {
    return <TaskListItem todo={item} />;
  }, []);

  const renderDoneItem = useCallback(({ item }: { item: ITask }) => {
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
          data={activeTasks}
          renderItem={renderItem}
          keyExtractor={(item) => `tasks-list-${item.id}`}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={{ paddingVertical: 4 }}
        />
      </View>

      {/* Completed */}
      {completedTasks && completedTasks.length > 0 && (
        <View className={"flex-row gap-4 items-center py-4"}>
          <Collapsible>
            <CollapsibleTrigger className={"py-4"}>
              <View className={"flex-row gap-4 items-center"}>
                <Icon name={"checkList"} size={26} strokeWidth={2} />
                <Text className={"text-xl font-normal"}>{t("todo.list.isDone")}</Text>
              </View>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <FlatList
                data={completedTasks}
                renderItem={renderDoneItem}
                keyExtractor={(item) => `tasks-list-${item.id}`}
                ItemSeparatorComponent={ItemSeparator}
              />
            </CollapsibleContent>
          </Collapsible>
        </View>
      )}
    </View>
  );
}
