import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={
              route.name === "index" ? "briefcase-outline" : "bookmark-outline"
            }
            size={size}
            color={color}
          />
        ),
      })}>
      <Tabs.Screen
        name='index'
        options={{ title: "Jobs" }}
      />
      <Tabs.Screen
        name='bookmark'
        options={{ title: "Bookmarks" }}
      />
    </Tabs>
  );
}
