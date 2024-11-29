import { getCurrent } from "@/features/auth/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  // ! execute redirect on client side
  if (typeof window !== "undefined" && user) redirect("/sign-in");

  return (
    <div className="h-full p-4 bg-neutral-500">
      <CreateWorkspaceForm />
    </div>
  );
}
