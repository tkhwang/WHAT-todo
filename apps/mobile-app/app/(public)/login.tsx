import { Auth } from "@/components/Auth/Auth";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { AppleLogin } from "@/components/Auth/AppleLogin";

export default function login() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 w-screen h-screen justify-center items-center">
      <AppleLogin />
      <Auth />
    </View>
  );
}
