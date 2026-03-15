/**
 * Mentor Stack Navigation
 * Tab navigation for mentor role
 * Routes: Dashboard, Earnings, Profile
 */

import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/shared/theme";
import { HomeIcon, EarningsIcon, ProfileIcon, CurvedTabBar } from "@/shared/components";

export default function MentorLayout() {
  return (
    <Tabs
      tabBar={(props) => <CurvedTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.dark,
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

      {/* Earnings Tab */}
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarLabel: "Earnings",
          headerTitle: "My Earnings",
          tabBarIcon: EarningsIcon,
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
