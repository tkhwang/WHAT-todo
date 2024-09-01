import { useLocalSearchParams } from "expo-router";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import TaskDetail from "@/components/Task/TaskDetail";

export default function TodoScreen() {
  const { id: taskId } = useLocalSearchParams() as { id: string };

  return (
    <ScreenWrapper>
      <TaskDetail taskId={taskId} />
    </ScreenWrapper>
  );
}
