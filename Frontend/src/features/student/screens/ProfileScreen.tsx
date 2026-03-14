import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge } from "@/shared/components";

export function ProfileScreen() {
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "student",
    joinedDate: "January 2024",
    completedLessons: 15,
    currentStreak: 7,
    totalHours: 22,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>AJ</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Badge label={user.role} variant="primary" />
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.completedLessons}</Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.totalHours}</Text>
            <Text style={styles.statLabel}>Total Hours</Text>
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.currentStreak}🔥</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </Card>
      </View>

      {/* Profile Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user.role}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Joined</Text>
            <Text style={styles.infoValue}>{user.joinedDate}</Text>
          </View>
        </Card>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Card>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Edit Profile</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Password</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Privacy Settings</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, styles.logoutItem]}>
            <Text style={styles.logoutText}>Logout</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
}

interface TouchableOpacityProps {
  style?: any;
  onPress?: () => void;
  children?: React.ReactNode;
}

const TouchableOpacity: React.FC<TouchableOpacityProps> = ({ 
  style, 
  onPress = () => {}, 
  children 
}) => (
  <View style={style}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  headerSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.base,
  },
  avatar: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.white,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  email: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: SPACING.base,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.base,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.base,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  infoLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  settingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
  },
  arrow: {
    fontSize: 18,
    color: COLORS.gray400,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    fontWeight: "600",
  },
});
