import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSetAtom } from "jotai";
import React, { useCallback, useEffect, useMemo } from "react";
import { IList, ITask, UserType } from "@whatTodo/models";
import { useTranslation } from "react-i18next";
import { SwipeListView } from "react-native-swipe-list-view";

import { Text } from "@/components/ui/text";
import { currentListIdAtom } from "@/states/list";
import Icon from "@/assets/icons";
import { useTasks } from "@/hooks/queries/useTasks";
import { useLists } from "@/hooks/queries/useLists";
import { appTheme } from "@/constants/uiConsts";
import { useToggleUserTaskIsDone } from "@/hooks/mutations/useToggleUserTaskIsDone";
import { useDeleteTask } from "@/hooks/mutations/useDeleteTask";
import { useUserTasks } from "@/hooks/queries/useUserTasks";
import { useSelectListByListId } from "@/hooks/queries/select/useSelectListByListId";

import TaskListItem from "../Task/TaskListItem";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface Props {
  userType: UserType;
  listId: string;
}

const ItemSeparator = () => <View style={{ height: 12 }} />;

export function ListView({ userType, listId }: Props) {
  const { t } = useTranslation();
  const setCurrentListId = useSetAtom(currentListIdAtom);

  const { mutate: toggleTaskIsDoneMutate } = useToggleUserTaskIsDone();
  const { mutate: deleteTaskMutate } = useDeleteTask();

  const { data: userTasks } = useUserTasks(userType, listId);
  console.log(
    `[+][ListView] userTasks: ${JSON.stringify(
      userTasks?.map((userTask) => ({ id: userTask.id, task: userTask.task })),
    )}`,
  );

  const { data: tasks } = useTasks(userType, listId);
  console.log(
    `[+][ListView] tasks: ${JSON.stringify(
      tasks?.map((task) => ({ id: task.id, task: task.task })),
    )}`,
  );

  const { selectListByListId } = useSelectListByListId(listId);
  const { data: list, isLoading } = useLists<IList | undefined>(userType, selectListByListId);

  const activeTasks = useMemo(() => {
    return (tasks ?? [])
      .filter((task) => {
        const userTask = userTasks?.find((userTask) => userTask.id === task.id);
        return userTask?.isDone === false;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [tasks, userTasks]);
  console.log(
    `[+][ListView] activeTasks: ${JSON.stringify(
      activeTasks?.map((activeTask) => ({ id: activeTask.id, task: activeTask.task })),
    )}`,
  );

  const completedTasks = useMemo(() => {
    return (tasks ?? [])
      .filter((task) => {
        const userTask = userTasks?.find((userTask) => userTask.id === task.id);
        return userTask?.isDone === true;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [tasks, userTasks]);

  useEffect(() => {
    setCurrentListId(listId);

    return () => {
      setCurrentListId(null);
    };
  }, [listId, setCurrentListId]);

  const renderItem = useCallback(
    ({ item }: { item: ITask }) => {
      return <TaskListItem userType={userType} listId={listId} task={item} />;
    },
    [listId],
  );

  const handleClickComplete = (item: ITask) => {
    toggleTaskIsDoneMutate({ taskId: item.id });
  };

  const handleClickDelete = (item: ITask) => {
    deleteTaskMutate({ taskId: item.id });
  };

  const renderHiddenItem = ({ item }: { item: ITask }) => {
    const userTask = userTasks?.find((userTask) => userTask.id === item.id);

    return (
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
            {userTask?.isDone
              ? t("task.list.swipe.left.uncomplete")
              : t("task.list.swipe.left.complete")}
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
  };

  if (isLoading) return null;
  if (!list) return null;

  return (
    <View className={"flex rounded-3xl pb-4"}>
      {/* List Title */}
      <View className={"flex-row gap-4 items-center py-4"}>
        <Icon name={"leftToRightListBullet"} size={26} strokeWidth={2} />
        <Text className={"text-2xl font-semibold"}>{list?.title}</Text>
      </View>

      {/* tasks list */}
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
