/**
 * Mentor Stack Navigation
 * Tab navigation for mentor role
 * Routes: Dashboard, Workflow, Earnings, Profile, Students, Schedule, Messages, Analytics
 */

import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "@/shared/theme";
import {
  HomeIcon,
  EarningsIcon,
  ProfileIcon,
  LessonsIcon,
  StudentsIcon,
  ScheduleIcon,
  MessagesIcon,
  AnalyticsIcon,
  CurvedTabBar,
} from "@/shared/components";

export default function MentorLayout() {
  return (
    <Tabs
      tabBar={(props) => <CurvedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
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
          tabBarIcon: HomeIcon,
        }}
      />

    

      {/* Lessons Tab */}
      <Tabs.Screen
        name="lessons"
        options={{
          title: "Lessons",
          tabBarLabel: "Lessons",
          tabBarIcon: LessonsIcon,
        }}
      />

      {/* Earnings Tab */}
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarLabel: "Earnings",
          tabBarIcon: EarningsIcon,
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ProfileIcon,
        }}
      />

      {/* Students Tab */}
      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarLabel: "Students",
          tabBarIcon: StudentsIcon,
        }}
      />

      {/* Schedule Tab */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarLabel: "Schedule",
          tabBarIcon: ScheduleIcon,
        }}
      />

      {/* Messages Tab */}
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarLabel: "Messages",
          tabBarIcon: MessagesIcon,
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
