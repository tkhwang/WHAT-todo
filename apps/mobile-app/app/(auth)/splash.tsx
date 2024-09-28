import { Image, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { usePrefetchQuery, useQueryClient } from "@tanstack/react-query";

import ScreenWrapper from "@/components/MainLayout/ScreenWrapper";
import { Text } from "@/components/ui/text";
import { EAS_UPDATE_VERSION_SEMVER } from "@/constants/appConsts";
import { useLists } from "@/hooks/queries/useLists";

export default function SplashScreen() {
  const router = useRouter();

  // prefetch queries
  const { data: lists } = useLists();
  console.log("🚀 ~ SplashScreen ~ lists:", lists);

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/(tabs)/");
    }, 500);
  }, [router]);

  return (
    <ScreenWrapper>
      <View className={"flex-1 justify-between items-center mb-6"}>
        <Image
          className={"w-60 h-60 mt-auto mb-auto"}
          source={require("@/assets/images/splash.png")}
        />
        <Text className={"text-sm text-gray-400"}>{"WHAT-todo"}</Text>
        <Text className={"text-sm text-gray-400"}>
          {"Version: $"}
          {EAS_UPDATE_VERSION_SEMVER}
        </Text>
      </View>
    </ScreenWrapper>
  );
}
