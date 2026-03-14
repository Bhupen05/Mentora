/**
 * Parent Stack Navigation
 * Tab navigation for parent role
 * Routes: Dashboard, Wallet, Profile
 */

import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/shared/theme";
import { HomeIcon, WalletIcon, ProfileIcon } from "@/shared/components/TabIcons";

export default function ParentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTintColor: COLORS.dark,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarLabel: "Home",
          headerTitle: "Dashboard",
          tabBarIcon: HomeIcon,
        }}
      />

      {/* Wallet Tab */}
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarLabel: "Wallet",
          headerTitle: "Wallet",
          tabBarIcon: WalletIcon,
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          headerTitle: "My Profile",
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    paddingBottom: SPACING.xs,
    paddingTop: SPACING.xs,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: -SPACING.xs,
  },
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
