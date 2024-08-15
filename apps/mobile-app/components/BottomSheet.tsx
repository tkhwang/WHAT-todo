import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useColorScheme } from "@/lib/useColorScheme";

interface Props {
  isOpen: boolean;
  toggleSheet: () => void;
  duration: number;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, toggleSheet, duration = 500, children }: Props) {
  const { colorScheme } = useColorScheme();
  const height = useSharedValue(0);
  const progress = useDerivedValue(() => withTiming(isOpen.value ? 0 : 1, { duration }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backgroundColorSheetStyle = {
    backgroundColor: colorScheme === "light" ? "#f8f9ff" : "#272B3C",
  };

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity style={sheetStyles.flex} onPress={toggleSheet} />
      </Animated.View>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, sheetStyle, backgroundColorSheetStyle]}
      >
        {children}
      </Animated.View>
    </>
  );
}

const sheetStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  sheet: {
    padding: 16,
    paddingRight: "2rem",
    paddingLeft: "2rem",
    height: 150,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
