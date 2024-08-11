import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  backgroundColor: string;
}

export default function ScreenWrapper({ children, backgroundColor }: Props) {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        backgroundColor,
      }}
    >
      {children}
    </View>
  );
}
