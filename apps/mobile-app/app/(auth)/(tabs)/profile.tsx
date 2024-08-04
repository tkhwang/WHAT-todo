import { Button, View } from "react-native";
import { getBuildNumber, getVersion } from "react-native-device-info";
import { Text } from "@/components/ui/text";

import { useAuth } from "@/context/AuthProvider";
import { useEffect } from "react";
import { EAS_UPDATE_VERSION } from "@/constants/appConsts";

export default function TabTwoScreen() {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log("two", user);
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View className="flex flex-col items-center justify-center flex-1 px-4">
      <Text>Account</Text>
      <Text>Email : {user?.email}</Text>
      <Text>User Id : {user.uid}</Text>
      <Button title="Log out" onPress={logout} />
      <Text>Version : {getVersion()}</Text>
      <Text>BuildNumber : {getBuildNumber()}</Text>
      <Text>Version : {EAS_UPDATE_VERSION}</Text>
    </View>
  );
}
