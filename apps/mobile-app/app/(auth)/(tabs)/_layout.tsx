import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
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
          title: "Home",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "checkmark-circle-sharp" : "checkmark-circle-outline"} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="expert"
        options={{
          title: "Expert",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="supervisor"
        options={{
          title: "Supervisor",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "eye" : "eye-outline"} color={color} />
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "cog" : "cog-outline"} color={color} />
        }}
      />
    </Tabs>
  );
}
