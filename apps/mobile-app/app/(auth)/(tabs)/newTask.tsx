import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSharedValue } from "react-native-reanimated";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";
import { useColorScheme } from "@/lib/useColorScheme";
import { BottomSheet } from "@/components/BottomSheet";

export default function NewTaskScreen() {
  const { colorScheme } = useColorScheme();
  const isOpen = useSharedValue(false);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  const contentStyle = {
    color: colorScheme === "light" ? "#001a72" : "#f8f9ff",
    textDecorationColor: colorScheme === "light" ? "#001a72" : "#f8f9ff",
  };

  return (
    <ScreenWrapper>
      <MainHeader />
      <View style={styles.safeArea}>
        <View style={styles.flex} />
        <Pressable style={styles.toggleButton} onPress={toggleSheet}>
          <Text style={styles.toggleButtonText}>{"Toggle bottom sheet"}</Text>
        </Pressable>
        <View style={styles.flex} />
      </View>
      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <Animated.Text style={contentStyle}>
          {"Discover the indispensable convenience of a bottom sheet in mobile app. Seamlessly integrated, it provides"}
          {"quick access to supplementary features and refined details."}
        </Animated.Text>
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.bottomSheetButton]}>
            <Text style={[styles.bottomSheetButtonText, contentStyle]}>{"Read more"}</Text>
          </Pressable>
        </View>
      </BottomSheet>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: 250,
  },
  buttonContainer: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  toggleButton: {
    backgroundColor: "#b58df1",
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: "white",
    padding: "0.5rem",
  },
  safeArea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bottomSheetButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 2,
  },
  bottomSheetButtonText: {
    fontWeight: 600,
    textDecorationLine: "underline",
  },
});
