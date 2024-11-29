import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignInPage = async () => {
  const user = await getCurrent();

  // ! execute redirect on client side
  if (typeof window !== "undefined" && user) redirect("/");

  return <SignInCard />;
};

export default SignInPage;
