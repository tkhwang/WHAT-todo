import { Image, StyleSheet, Text as RNText, View } from "react-native";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";

import { AppleLogin } from "@/components/Auth/AppleLogin";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import { hp, wp } from "@/helpers/common";
import { appTheme } from "@/constants/uiConsts";

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
          <RNText style={styles.title}>{t("app.name")}</RNText>
          <RNText style={styles.punchline}>{t("app.punchline")}</RNText>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          {/* <Button title={"Getting Started"} buttonStyle={{ marginHorizontal: wp(3) }} onPress={() => {}} /> */}
          <AppleLogin />
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
