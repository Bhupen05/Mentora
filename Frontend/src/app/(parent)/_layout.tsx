import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS } from "@/shared/theme";
import {
  HomeIcon,
  WalletIcon,
  ProfileIcon,
  SearchIcon,
  LessonsIcon,
  CurvedTabBar,
} from "@/shared/components";

export default function ParentLayout() {
  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => <CurvedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: styles.scene,
      }}
    >
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          headerTitle: "My Schedule",
          tabBarLabel: "Schedule",
          tabBarIcon: ({ focused }) => (
            <LessonsIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.primaryDark : COLORS.dark}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          headerTitle: "Browse",
          tabBarLabel: "Browse",
          tabBarIcon: ({ focused }) => (
            <SearchIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.primaryDark : COLORS.dark}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.primaryDark : COLORS.dark}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerTitle: "Wallet",
          tabBarLabel: "Wallet",
          tabBarIcon: ({ focused }) => (
            <WalletIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.primaryDark : COLORS.dark}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.primaryDark : COLORS.dark}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scene: {
    paddingBottom: 60,
  },
});
