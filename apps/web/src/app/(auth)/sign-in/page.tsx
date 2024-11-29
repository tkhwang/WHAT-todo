import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const headersList = await headers();
  const isRSC = headersList.get("RSC");

  if (!isRSC) {
    const user = await getCurrent();
    if (user) redirect("/");
  }

  return <SignInCard />;
};

export default SignInPage;
