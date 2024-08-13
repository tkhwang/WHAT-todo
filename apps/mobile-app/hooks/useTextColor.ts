import { useColorScheme } from "@/lib/useColorScheme";
import { appTheme } from "@/constants/uiConsts";

export default function useTextColor() {
  const { isDarkColorScheme } = useColorScheme();

  return isDarkColorScheme ? appTheme.colors.white : appTheme.colors.black;
}
