import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Button, Badge } from "@/shared/components";

export function ParentDashboardScreen() {
  const [children] = useState([
    {
      id: "1",
      name: "Emma",
      grade: "10th Grade",
      upcomingLessons: 3,
      recentScore: 85,
    },
    {
      id: "2",
      name: "Oliver",
      grade: "8th Grade",
      upcomingLessons: 2,
      recentScore: 92,
    },
  ]);

  const [walletBalance] = useState(450);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Hello, Parent 👋</Text>
        <Text style={styles.subGreeting}>Manage your children's learning</Text>
      </View>

      {/* Wallet */}
      <View style={styles.section}>
        <Card style={styles.walletCard}>
          <Text style={styles.walletLabel}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>${walletBalance}</Text>
          <Button title="Add Funds" onPress={() => {}} size="small" />
        </Card>
      </View>

      {/* Children */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Children</Text>
        {children.map((child) => (
          <Card key={child.id}>
            <View>
              <CardHeader title={child.name} subtitle={child.grade} />
              <View style={styles.childStats}>
                <View>
                  <Text style={styles.stat}>📚 {child.upcomingLessons} upcoming</Text>
                  <Text style={styles.stat}>⭐ Last score: {child.recentScore}%</Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Button title="Book Lesson for Child" onPress={() => {}} />
        <Button
          title="View Progress"
          variant="secondary"
          style={styles.secondButton}
          onPress={() => {}}
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
  welcomeSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  subGreeting: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.sm,
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  walletCard: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  walletLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
  },
  walletAmount: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    marginVertical: SPACING.base,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.base,
  },
  childStats: {
    marginTop: SPACING.base,
  },
  stat: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginVertical: SPACING.xs,
  },
  secondButton: {
    marginTop: SPACING.base,
  },
});
