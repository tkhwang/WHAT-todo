import { Tabs } from "expo-router"
import React from "react"

import { TabBarIcon } from "@/components/navigation/TabBarIcon"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="receivedTodo"
        options={{
          title: "받은 todo",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "disc" : "disc-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sentTodo"
        options={{
          title: "보낸 todo",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "sparkles" : "sparkles-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="seeingTodo"
        options={{
          title: "보는 todo",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "eye" : "eye-outline"} color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "cog" : "cog-outline"} color={color} />,
        }}
      />
    </Tabs>
  )
}
