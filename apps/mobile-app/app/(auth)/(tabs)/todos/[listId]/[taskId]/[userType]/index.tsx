import { useLocalSearchParams } from "expo-router";
import { UserType } from "@whatTodo/models";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import TaskDetail from "@/components/Task/TaskDetail";

export default function TodoScreen() {
  const { listId, taskId, userType } = useLocalSearchParams<{
    listId: string;
    taskId: string;
    userType: UserType;
  }>();

  return (
    <ScreenWrapper>
      <TaskDetail userType={userType} listId={listId} taskId={taskId} />
    </ScreenWrapper>
  );
}
