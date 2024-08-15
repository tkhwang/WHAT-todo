import { Button, TouchableOpacity, StyleSheet, View, Alert } from "react-native";
import { getBuildNumber, getVersion } from "react-native-device-info";
import { useCallback, useEffect } from "react";
import { Router, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/AuthProvider";
import { EAS_UPDATE_VERSION } from "@/constants/appConsts";
import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import { appTheme } from "@/constants/uiConsts";
import Header from "@/components/MainLayout/Header";
import { hp, wp } from "@/helpers/common";
import Icon from "@/assets/icons";

interface UserHeaderProps {
  user: any;
  router: Router;
  handleLogout: () => void;
}

function UserHeader({ user, router, handleLogout }: UserHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, paddingHorizontal: wp(4) }}>
      <View>
        <Header title={t("screen.profile.title")} showBackButton />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name={"logout"} color={appTheme.colors.rose} onPress={handleLogout} />
        </TouchableOpacity>
        <View className={"flex-col justify-center px-4 items-center"}>
          <Text className={"text-base font-normal"}>{"Account"}</Text>
          <Text>
            {"Email : "}
            {user?.email}
          </Text>
          <Text>
            {"User Id : "}
            {user.uid}
          </Text>
          <Text>
            {"Version : "}
            {getVersion()}
          </Text>
          <Text>
            {"BuildNumber : "}
            {getBuildNumber()}
          </Text>
          <Text>
            {"Version : "}
            {EAS_UPDATE_VERSION}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const { user, setUser, logout } = useAuth();

  const handleLogout = useCallback(() => {
    Alert.alert(t("screen.profile.logout.title"), t("screen.profile.logout.description"), [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => logout(), style: "destructive" },
    ]);
  }, [logout, t]);

  if (!user) return <Text>{"Loading..."}</Text>;

  return (
    <ScreenWrapper>
      <UserHeader user={user} router={router} handleLogout={handleLogout} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: appTheme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: "500",
    color: appTheme.colors.textDark,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: appTheme.colors.textLight,
  },

  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: appTheme.radius.sm,
    backgroundColor: "#fee2e2",
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: appTheme.colors.text,
  },
});
