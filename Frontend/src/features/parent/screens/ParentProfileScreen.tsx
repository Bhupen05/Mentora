import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge, Button } from "@/shared/components";

export function ParentProfileScreen() {
  const parent = {
    name: "Maria Rodriguez",
    email: "maria@example.com",
    role: "parent",
    children: [
      { name: "Alex Johnson", level: "Grade 8", nextLesson: "Tomorrow, 5:00 PM" },
      { name: "Emma Johnson", level: "Grade 6", nextLesson: "Wed, 4:30 PM" },
    ],
    joinedDate: "March 2024",
    totalSpent: "$850.00",
    activeSubscriptions: 2,
    weeklyLessons: 5,
    preferredPlan: "Family Plus",
  };
  const initials = parent.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <Text style={styles.screenTitle}>My Profile</Text>
        <Text style={styles.screenSubtitle}>Manage your family account and preferences.</Text>
        <View style={styles.heroPill}>
          <Text style={styles.heroPillText}>Family Account</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Card style={styles.profileCard} shadow={false}>
          <View style={styles.profileTopRow}>
            <View style={styles.avatarOuter}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{initials}</Text>
              </View>
            </View>
            <Badge label={parent.role.toUpperCase()} variant="primary" />
          </View>

          <Text style={styles.name}>{parent.name}</Text>
          <Text style={styles.email}>{parent.email}</Text>

          <View style={styles.planPill}>
            <Text style={styles.planPillLabel}>Current Plan</Text>
            <Text style={styles.planPillValue}>{parent.preferredPlan}</Text>
          </View>
        </Card>
      </View>

      <View style={styles.statsSection}>
        <Card style={styles.statCardPrimary}>
          <Text style={styles.statNumber}>{parent.totalSpent}</Text>
          <Text style={styles.statLabel}>Total Investment</Text>
        </Card>
        <Card style={styles.statCardSecondary}>
          <Text style={styles.statNumber}>{parent.activeSubscriptions}</Text>
          <Text style={styles.statLabel}>Active Subscriptions</Text>
        </Card>
        <Card style={styles.statCardPrimary}>
          <Text style={styles.statNumber}>{parent.weeklyLessons}</Text>
          <Text style={styles.statLabel}>Lessons This Week</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Children</Text>
          <Text style={styles.sectionAction}>Manage</Text>
        </View>
        {parent.children.map((child) => (
          <Card key={child.name} style={styles.childCard}>
            <View style={styles.childRow}>
              <View style={styles.childAvatar}>
                <Text style={styles.childAvatarText}>{child.name.split(" ").map((n) => n[0]).join("")}</Text>
              </View>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childMeta}>{child.level}</Text>
                <Text style={styles.childSchedule}>Next lesson: {child.nextLesson}</Text>
              </View>
              <Badge label="Active" variant="success" />
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Overview</Text>
        <Card style={styles.accountCard}>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Member Since</Text>
            <Text style={styles.accountValue}>{parent.joinedDate}</Text>
          </View>
          <View style={styles.accountDivider} />
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Primary Email</Text>
            <Text style={styles.accountValue}>{parent.email}</Text>
          </View>
          <View style={styles.accountDivider} />
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Family Plan</Text>
            <Text style={styles.accountValue}>{parent.preferredPlan}</Text>
          </View>
        </Card>
      </View>

      <View style={styles.actionsSection}>
        <Button title="Edit Profile" onPress={() => {}} style={styles.actionButton} />
        <Button
          title="Manage Family"
          onPress={() => {}}
          variant="outline"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  contentContainer: {
    paddingBottom: SPACING["6xl"],
  },
  heroSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING["3xl"],
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  screenTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: SPACING.xs,
  },
  heroPill: {
    alignSelf: "flex-start",
    marginTop: SPACING.base,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  heroPillText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: "700",
  },
  profileSection: {
    paddingHorizontal: SPACING.base,
    marginTop: -SPACING["3xl"],
  },
  profileCard: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#1e1b4b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  profileTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  avatarOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(99, 102, 241, 0.14)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.secondaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.white,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  email: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray500,
    marginBottom: SPACING.lg,
  },
  planPill: {
    backgroundColor: "#eef2ff",
    borderWidth: 1,
    borderColor: "#c7d2fe",
    borderRadius: 12,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
  },
  planPillLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginBottom: 2,
  },
  planPillValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.base,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
  },
  sectionAction: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: "600",
  },
  statsSection: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  statCardPrimary: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.base,
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#eef2ff",
    borderColor: "#c7d2fe",
  },
  statCardSecondary: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.base,
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#fdf2f8",
    borderColor: "#fbcfe8",
  },
  statNumber: {
    ...TYPOGRAPHY.h3,
    color: COLORS.secondary,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    textAlign: "center",
  },
  childCard: {
    marginBottom: SPACING.sm,
    borderRadius: 14,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  childAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.base,
  },
  childAvatarText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "700",
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  childMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: 1,
  },
  childSchedule: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    marginTop: 2,
  },
  accountCard: {
    borderRadius: 14,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    gap: SPACING.base,
  },
  accountLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray500,
  },
  accountValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
  },
  accountDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  actionsSection: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
    gap: SPACING.base,
  },
  actionButton: {
    borderRadius: 12,
  },
});
