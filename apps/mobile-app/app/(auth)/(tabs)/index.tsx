import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/text";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";
import MainHeader from "@/components/MainLayout/MainHeader";
import FloatingActionButton from "@/components/Button/FloatingActionButton";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <MainHeader />
      <View className={"flex-1 justify-center items-center"}>
        <Text className={"text-xl font-semibold"}>{t("app.screen.today")}</Text>
      </View>
      <FloatingActionButton />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    color: appTheme.colors.text,
    fontSize: hp(3.2),
    fontWeight: appTheme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: appTheme.radius.sm,
    borderCurve: "continuous",
    borderColor: appTheme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: appTheme.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: appTheme.colors.secondary,
  },
  pillText: {
    color: "white",
    fontSize: hp(1.2),
    fontWeight: appTheme.fonts.bold,
  },
});
