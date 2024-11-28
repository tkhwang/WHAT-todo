import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getCurrent();
  console.log("🚀 ~ SignInPage ~ user:", user);

  if (user) redirect("/");

  return <SignInCard />;
};

export default SignInPage;
