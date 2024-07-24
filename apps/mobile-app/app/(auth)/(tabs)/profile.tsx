import { Button, StyleSheet, View, Text } from "react-native";
import { getBuildNumber, getVersion } from "react-native-device-info";

import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { EAS_UPDATE_VERSION } from "@/constants/appConsts";

export default function TabTwoScreen() {
  const { credential, logout } = useAuth();

  useEffect(() => {
    console.log("two", credential);
  }, []);

  if (!credential) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 flex flex-col justify-center px-4 items-center">
      <Text>Account</Text>
      <Text>{credential?.user || "No username"}</Text>
      <Button title="Log out" onPress={logout} />
      <Text>Version : {getVersion()}</Text>
      <Text>BuildNumber : {getBuildNumber()}</Text>
      <Text>Version : {EAS_UPDATE_VERSION}</Text>
    </View>
  );
}
