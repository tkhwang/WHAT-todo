import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import TaskDetail from "@/components/Task/TaskDetail";

export default function TodoScreen() {
  const { listId, taskId } = useLocalSearchParams<{ listId: string; taskId: string }>();

  return (
    <ScreenWrapper>
      <TaskDetail listId={listId} taskId={taskId} />
    </ScreenWrapper>
  );
}
