import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme"
import { Card, CardHeader, Badge, Button, Avatar } from "@/shared/components";

export function StudentDashboardScreen() {
  const [upcomingLessons] = useState([
    {
      id: "1",
      mentorName: "Sarah Chen",
      subject: "Web Development",
      date: "Today at 2:00 PM",
      duration: 60,
    },
    {
      id: "2",
      mentorName: "James Rodriguez",
      subject: "JavaScript Basics",
      date: "Tomorrow at 10:00 AM",
      duration: 45,
    },
  ]);

  const [recentSessions] = useState([
    {
      id: "1",
      mentorName: "Emily Watson",
      subject: "React Hooks",
      date: "2 days ago",
      status: "completed",
    },
    {
      id: "2",
      mentorName: "Michael Park",
      subject: "TypeScript Fundamentals",
      date: "1 week ago",
      status: "completed",
    },
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Hello, Alex! 👋</Text>
        <Text style={styles.subGreeting}>Here's your learning activity</Text>
      </View>

      {/* Upcoming Lessons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Lessons</Text>
        {upcomingLessons.map((lesson) => (
          <Card key={lesson.id}>
            <View style={styles.lessonCard}>
              <View>
                <CardHeader
                  title={lesson.mentorName}
                  subtitle={lesson.subject}
                />
                <Text style={styles.lessonInfo}>⏱️ {lesson.duration} mins</Text>
                <Text style={styles.lessonInfo}>📅 {lesson.date}</Text>
              </View>
              <Badge label="Join" variant="primary" />
            </View>
          </Card>
        ))}
      </View>

      {/* Recent Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        {recentSessions.map((session) => (
          <Card key={session.id}>
            <View>
              <CardHeader
                title={session.mentorName}
                subtitle={session.subject}
              />
              <Text style={styles.sessionInfo}>{session.date}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Button title="Find More Mentors" onPress={() => {}} />
        <Button
          title="Start a Quiz"
          onPress={() => {}}
          variant="secondary"
          style={styles.secondaryButton}
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
  lessonCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  lessonInfo: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  sessionInfo: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    marginTop: SPACING.base,
  },
  secondaryButton: {
    marginTop: SPACING.base,
  },
});
