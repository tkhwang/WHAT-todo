import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSetAtom } from "jotai";
import React, { useCallback, useEffect, useMemo } from "react";
import { IList, ITask } from "@whatTodo/models";
import { useTranslation } from "react-i18next";
import { SwipeListView } from "react-native-swipe-list-view";

import { Text } from "@/components/ui/text";
import { currentListIdAtom } from "@/states/list";
import Icon from "@/assets/icons";
import { useTasks } from "@/hooks/queries/useTasks";
import { useLists } from "@/hooks/queries/useLists";
import { appTheme } from "@/constants/uiConsts";
import { useToggleTaskIsDone } from "@/hooks/mutations/useToggleTaskIsDone";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";

import TaskListItem from "../Task/TaskListItem";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface Props {
  listId: string;
}

const ItemSeparator = () => <View style={{ height: 12 }} />;

export function TodoList({ listId }: Props) {
  const { t } = useTranslation();
  const setCurrentListId = useSetAtom(currentListIdAtom);

  const { mutate: toggleTaskIsDoneMutate } = useToggleTaskIsDone();
  const { mutate: deleteTaskMutate } = useDeleteTask();

  const { data: list, isLoading } = useLists<IList | undefined>((lists: IList[]) =>
    lists.find((list) => list.id === listId),
  );

  const { data: tasks } = useTasks(listId);
  console.log("🚀 ~ TodoList ~ tasks.length:", tasks?.length);

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

  const renderItem = useCallback(
    ({ item }: { item: ITask }) => {
      return <TaskListItem listId={listId} task={item} />;
    },
    [listId],
  );

  const handleClickComplete = (item: ITask) => {
    toggleTaskIsDoneMutate({ taskId: item.id });
  };

  const handleClickDelete = (item: ITask) => {
    deleteTaskMutate({ taskId: item.id });
  };

  const renderHiddenItem = ({ item }: { item: ITask }) => (
    <View
      className={
        "relative flex flex-1 flex-row justify-between items-center pl-4 rounded-xl bg-gray-300"
      }
    >
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => handleClickComplete(item)}
      >
        <Text className={"text-white text-sm"}>
          {item.isDone ? t("task.list.swipe.left.uncomplete") : t("task.list.swipe.left.complete")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleClickDelete(item)}
      >
        <Text className={"text-white text-sm"}>{t("task.list.swipe.right")}</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) return null;
  if (!list) return null;

  return (
    <View className={"flex flex-1"}>
      {/* List Title */}
      <View className={"flex-row gap-4 items-center py-4"}>
        <Icon name={"leftToRightListBullet"} size={26} strokeWidth={2} />
        <Text className={"text-2xl font-semibold"}>{list?.title}</Text>
      </View>

      {/* tasks list */}
      <View style={{ flexShrink: 1 }}>
        <SwipeListView
          data={activeTasks}
          renderItem={renderItem}
          keyExtractor={(item) => `tasks-list-todo-${item.id}`}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={{ paddingVertical: 4 }}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>

      {/* Completed */}
      {completedTasks && completedTasks.length > 0 && (
        <View className={"flex-row gap-4 items-center py-4 w-full"}>
          <Collapsible className={"w-full"}>
            <CollapsibleTrigger className={"py-4"}>
              <View className={"flex-row gap-4 items-center"}>
                <Icon name={"checkList"} size={26} strokeWidth={2} />
                <Text className={"text-xl font-normal"}>{t("todo.list.isDone")}</Text>
              </View>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SwipeListView
                data={completedTasks}
                renderItem={renderItem}
                keyExtractor={(item) => `tasks-list-completed-${item.id}`}
                ItemSeparatorComponent={ItemSeparator}
                contentContainerStyle={{ paddingVertical: 4 }}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={80}
                rightOpenValue={-80}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            </CollapsibleContent>
          </Collapsible>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 80,
    borderRadius: 16,
  },
  backRightBtnLeft: {
    // backgroundColor: "blue",
    backgroundColor: appTheme.colors.secondary,
    left: 0,
  },
  backRightBtnRight: {
    // backgroundColor: "red",
    backgroundColor: appTheme.colors.primary,
    right: 0,
  },
});
