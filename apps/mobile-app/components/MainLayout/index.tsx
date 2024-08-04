import { SafeAreaView } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return <SafeAreaView className="flex-1 w-screen h-screen m-4">{children}</SafeAreaView>;
}
