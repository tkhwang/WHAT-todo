import { Auth } from "@/components/Auth/Auth";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

export default function login() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center">
      <Auth />
    </View>
  );
}
