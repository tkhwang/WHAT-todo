import { View } from "react-native";
import { ReactNode } from "react";

import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

import { Switch } from "../ui/switch";

interface Props {
  switchStateNativeId: string;
  switchState: boolean;
  toggleSwitchState: () => void;
  TruthyIcon: ReactNode;
  truthyText: string;
  FalsyIcon: ReactNode;
  falseText: string;
}

export default function RadioSwitch({
  switchStateNativeId,
  switchState,
  toggleSwitchState,
  TruthyIcon,
  truthyText,
  FalsyIcon,
  falseText,
}: Props) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className={"flex flex-row items-center justify-center gap-1"}>
      {/* Left: Falsy */}
      <View
        className={cn(
          "flex flex-row items-center gap-1 px-3 py-2 rounded-full",
          isDarkColorScheme ? "bg-gray-800" : "bg-gray-200",
        )}
      >
        <Text className={"text-sm font-normal"}>{falseText}</Text>
        {FalsyIcon}
      </View>

      {/* Center: SWITCH */}
      <Switch
        checked={switchState}
        onCheckedChange={toggleSwitchState}
        nativeID={switchStateNativeId}
      />

      {/* RIGHT: Truthy */}
      <View
        className={cn(
          "flex flex-row items-center gap-1 px-3 py-2 rounded-full",
          isDarkColorScheme ? "bg-gray-800" : "bg-gray-200",
        )}
      >
        {TruthyIcon}
        <Text className={"text-sm font-normal"}>{truthyText}</Text>
      </View>
    </View>
  );
}
