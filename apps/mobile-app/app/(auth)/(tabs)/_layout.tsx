import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/lib/useColorScheme";
import Icon from "@/assets/icons";
import { hp } from "@/helpers/common";

function TabBarIcon({ name, color }: { name: string; color: string }) {
  return <Icon name={name} size={hp(3.2)} strokeWidth={2} color={color} />;
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={"index"}
        options={{
          title: t("todo.default.list"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"checkmarkSquare"} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"supervisor"}
        options={{
          title: t("app.screen.supervisor"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"policeCap"} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"expert"}
        options={{
          title: t("app.screen.expert"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"aiChemistry"} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"profile"}
        options={{
          title: t("app.screen.profile"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"user"} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"todos/[listId]/[taskId]/[userType]/index"}
        options={{
          tabBarButton: () => null, // This hides the screen from the tab bar
        }}
      />
      <Tabs.Screen
        name={"sendTodo"}
        options={{
          tabBarButton: () => null, // This hides the screen from the tab bar
        }}
      />
    </Tabs>
  );
}
