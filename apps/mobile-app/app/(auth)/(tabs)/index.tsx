import { Auth } from "@/components/Auth/Auth";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold">{t("app.name")}</Text>
    </View>
  );
}
