import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/components/user-button";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div>
      <UserButton />
    </div>
  );
}
