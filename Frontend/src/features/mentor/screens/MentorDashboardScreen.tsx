import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Button, Badge } from "@/shared/components";

export function MentorDashboardScreen() {
  const [todayLessons] = useState([
    {
      id: "1",
      studentName: "Emily Wilson",
      subject: "React",
      time: "2:00 PM",
      duration: 60,
    },
    {
      id: "2",
      studentName: "James Taylor",
      subject: "TypeScript",
      time: "4:00 PM",
      duration: 45,
    },
  ]);

  const [earning] = useState({
    today: 95,
    thisWeek: 650,
    thisMonth: 2400,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Welcome, Sarah 👋</Text>
        <Text style={styles.subGreeting}>Your teaching dashboard</Text>
      </View>

      {/* Earnings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Earnings</Text>
        <View style={styles.earningGrid}>
          <Card style={styles.earningCard}>
            <Text style={styles.earningLabel}>Today</Text>
            <Text style={styles.earningAmount}>${earning.today}</Text>
          </Card>
          <Card style={styles.earningCard}>
            <Text style={styles.earningLabel}>This Week</Text>
            <Text style={styles.earningAmount}>${earning.thisWeek}</Text>
          </Card>
          <Card style={styles.earningCard}>
            <Text style={styles.earningLabel}>This Month</Text>
            <Text style={styles.earningAmount}>${earning.thisMonth}</Text>
          </Card>
        </View>
      </View>

      {/* Today's Lessons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Lessons</Text>
        {todayLessons.map((lesson) => (
          <Card key={lesson.id}>
            <View style={styles.lessonRow}>
              <View>
                <CardHeader title={lesson.studentName} subtitle={lesson.subject} />
                <Text style={styles.lessonTime}>🕐 {lesson.time}</Text>
                <Text style={styles.duration}>⏱️ {lesson.duration} mins</Text>
              </View>
              <Badge label="Start" variant="primary" />
            </View>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Button title="Create Lesson Listing" onPress={() => {}} />
        <Button
          title="Set Availability"
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
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.base,
  },
  earningGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  earningCard: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.base,
  },
  earningLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  earningAmount: {
    ...TYPOGRAPHY.h3,
    color: COLORS.success,
    marginTop: SPACING.xs,
  },
  lessonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  lessonTime: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
  },
  duration: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  secondButton: {
    marginTop: SPACING.base,
  },
});
