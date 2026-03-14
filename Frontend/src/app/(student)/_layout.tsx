/**
 * Student Stack Navigation
 * Bottom tab navigation for student role with feature screens
 * Routes: Dashboard, Search Mentors, My Lessons, Quizzes, Profile
 */

import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/shared/theme";
import {
  HomeIcon,
  SearchIcon,
  LessonsIcon,
  QuizzesIcon,
  ProfileIcon,
} from "@/shared/components/TabIcons";

export default function StudentLayout() {
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
          headerTitle: "Welcome back",
          tabBarIcon: HomeIcon,
        }}
      />

      {/* Search Mentors Tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Find Mentors",
          tabBarLabel: "Search",
          headerTitle: "Find a Mentor",
          tabBarIcon: SearchIcon,
        }}
      />

      {/* My Lessons Tab */}
      <Tabs.Screen
        name="lessons"
        options={{
          title: "My Lessons",
          tabBarLabel: "Lessons",
          headerTitle: "My Lessons",
          tabBarIcon: LessonsIcon,
        }}
      />

      {/* Quizzes Tab */}
      <Tabs.Screen
        name="quizzes"
        options={{
          title: "Quizzes",
          tabBarLabel: "Quizzes",
          headerTitle: "Quizzes",
          tabBarIcon: QuizzesIcon,
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
