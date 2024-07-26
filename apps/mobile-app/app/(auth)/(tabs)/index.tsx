import { Auth } from "@/components/Auth/Auth";
import { MoonStar } from "@/lib/icons/MoonStar";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl font-bold">{t("app.name")}</Text>
      <MoonStar />
    </View>
  );
}
