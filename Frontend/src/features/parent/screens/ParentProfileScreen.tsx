import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge } from "@/shared/components";

export function ParentProfileScreen() {
  const parent = {
    name: "Maria Rodriguez",
    email: "maria@example.com",
    role: "parent",
    children: ["Alex Johnson (Student)", "Emma Johnson (Student)"],
    joinedDate: "March 2024",
    totalSpent: "$850.00",
    activeSubscriptions: 2,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>MR</Text>
        </View>
        <Text style={styles.name}>{parent.name}</Text>
        <Text style={styles.email}>{parent.email}</Text>
        <Badge label={parent.role} variant="primary" />
      </View>

      {/* Children */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Children</Text>
        {parent.children.map((child, index) => (
          <Card key={index} style={styles.childCard}>
            <Text style={styles.text}>{child}</Text>
          </Card>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>${parent.totalSpent}</Text>
            <Text style={styles.statLabel}>Total Investment</Text>
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{parent.activeSubscriptions}</Text>
            <Text style={styles.statLabel}>Active Subscriptions</Text>
          </View>
        </Card>
      </View>

      {/* Joined Date */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Member Since</Text>
        <Card>
          <Text style={styles.text}>{parent.joinedDate}</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  avatar: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.white,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  email: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    marginBottom: SPACING.base,
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
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
  },
  childCard: {
    marginBottom: SPACING.base,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  statsSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.base,
  },
  statCard: {
    flex: 1,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  statItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    ...TYPOGRAPHY.h3,
    color: COLORS.secondary,
    fontWeight: "700",
  },
  statLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
});
