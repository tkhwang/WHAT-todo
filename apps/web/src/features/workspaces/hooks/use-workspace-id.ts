import { useParams } from "next/navigation";

export function useWorkspaceId() {
  const params = useParams();

  return params.workspaceId as string;
}
