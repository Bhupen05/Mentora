import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS } from "@/shared/theme";
import { HomeIcon, WalletIcon, ProfileIcon, CurvedTabBar } from "@/shared/components";

export default function ParentLayout() {
  return (
    <Tabs
      tabBar={(props) => <CurvedTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerTintColor: COLORS.dark,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerTitle: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.dark : COLORS.gray200}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerTitle: "Wallet",
          tabBarIcon: ({ focused }) => (
            <WalletIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.dark : COLORS.gray200}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              focused={focused}
              size={18}
              color={focused ? COLORS.dark : COLORS.gray200}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.gray200,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.dark,
  },
});
