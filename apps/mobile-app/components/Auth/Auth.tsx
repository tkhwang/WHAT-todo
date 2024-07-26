import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/AuthProvider";
import { useCallback } from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function Auth() {
  const { login, setCredential } = useAuth();

  const fakeLogin = useCallback(() => {
    setCredential({ user: "test@whattodo.ai" });
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      {/* <Button title="Fake Login" onPress={fakeLogin} /> */}
      <Button variant="default" size="lg" onPress={fakeLogin}>
        <Text>Fake Login</Text>
      </Button>
    </View>
  );
}
