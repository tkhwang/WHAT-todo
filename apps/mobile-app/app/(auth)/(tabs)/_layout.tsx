import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("app.menu.home"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "today-sharp" : "today-outline"} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: t("app.menu.me"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "list-circle-sharp" : "list-circle-outline"} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="expert"
        options={{
          title: t("app.menu.expert"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="supervisor"
        options={{
          title: t("app.menu.supervisor"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "eye" : "eye-outline"} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("app.menu.profile"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "id-card" : "id-card-outline"} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
