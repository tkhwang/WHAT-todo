"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrent } from "@/features/api/use-current";
import { useLogout } from "@/features/api/use-logout";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const { data, isLoading } = useCurrent();

  const { mutate: logout } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data, isLoading, router]);

  return (
    // <main className="flex flex-col items-center justify-center min-h-screen gap-10 p-24">
    //   <h1 className="text-4xl font-bold">WHAT-todo-dev</h1>
    //   Todo from experts with supervisors
    //   <Image
    //     src="/images/team-checklist-pana.png"
    //     alt="what-todo banner image"
    //     width={400}
    //     height={200}
    //   />
    // </main>
    <div>
      Only visible to logged in users
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}
