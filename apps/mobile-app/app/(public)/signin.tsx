import { Auth } from "@/components/Auth/Auth";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { AppleLogin } from "@/components/Auth/AppleLogin";

export default function PublicSigninScreen() {
  const { t } = useTranslation();

  return (
    <View
      className="items-center justify-center flex-1 w-screen h-screen"
      style={{
        gap: 16
      }}
    >
      <AppleLogin />
      <Auth />
    </View>
  );
}
