import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/lib/useColorScheme";
import Icon from "@/assets/icons";
import { hp } from "@/helpers/common";
import useTextColor from "@/hooks/useTextColor";

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
          title: t("app.screen.today"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"checkmarkSquare"} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"upcoming"}
        options={{
          title: t("app.screen.upcoming"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"calendar"} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"expert"}
        options={{
          title: t("app.screen.expert"),
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={"inboxCheck"} color={color} />,
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
        name={"newTask"}
        options={{
          tabBarButton: () => null, // This hides the screen from the tab bar
        }}
      />
    </Tabs>
  );
}
