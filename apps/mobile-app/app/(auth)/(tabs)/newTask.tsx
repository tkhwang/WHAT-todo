import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import MainHeader from "@/components/MainLayout/MainHeader";

export default function NewTaskScreen() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <MainHeader />
      <View className={"flex-1 justify-center items-center"}>
        <Text className={"text-xl font-semibold"}>{t("app.screen.newTask")}</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
