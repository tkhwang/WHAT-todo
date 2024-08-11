import { useCallback } from "react";
import { View } from "react-native";

import { Button } from "../ui/button";
import { Text } from "../ui/text";

import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/AuthProvider";

export function Auth() {
  const { login, setUser } = useAuth();

  const fakeLogin = useCallback(() => {
    setUser({ user: "test@whattodo.ai" });
  }, []);

  return (
    <View className={"w-48 h-11"}>
      {/* <Button title="Fake Login" onPress={fakeLogin} /> */}
      <Button variant={"default"} size={"lg"} onPress={fakeLogin}>
        <Text>{"Fake Login"}</Text>
      </Button>
    </View>
  );
}
