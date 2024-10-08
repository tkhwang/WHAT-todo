import { Image, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";

import { Text } from "@/components/ui/text";
import { AppleLoginButton } from "@/components/Auth/AppleLoginButton";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";
import GoogleSigninButton from "@/components/Auth/GoogleSigninButton";

export default function PublicSigninScreen() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <StatusBar style={"dark"} />
      <View style={styles.container}>
        {/* Welcom image */}
        <Image
          style={styles.welcomeImage}
          resizeMode={"contain"}
          source={require("../../assets/images/team-checklist-pana.png")}
        />
        {/* Title */}
        <View style={{ gap: 20 }}>
          <Text className={"text-4xl font-bold text-center"}>{t("app.name")}</Text>
          <Text className={"text-xl font-semibold text-center"}>{t("app.punchline")}</Text>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <AppleLoginButton />
          <GoogleSigninButton />
        </View>
        {/* <Auth /> */}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "white",
    marginHorizontal: wp(10),
  },
  welcomeImage: {
    height: hp(35),
    width: wp(100),
  },
  title: {
    color: appTheme.colors.text,
    fontSize: hp(3.5),
    textAlign: "center",
    fontWeight: appTheme.fonts.extraBold,
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(5),
    fontSize: hp(2),
    color: appTheme.colors.text,
  },
  footer: {
    gap: 30,
    width: "100%",
  },
});
