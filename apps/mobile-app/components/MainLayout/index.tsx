import { SafeAreaView, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <View className={"flex-1 w-screen h-screen"}>
      <SafeAreaView className={""}>{children}</SafeAreaView>
    </View>
  );
}
