import { getCurrent } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const user = await getCurrent();

  // ! execute redirect on client side
  if (typeof window === "undefined" && user) redirect("/");

  return <SignUpCard />;
};

export default SignUpPage;
