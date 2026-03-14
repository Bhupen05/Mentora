import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Badge, Button } from "@/shared/components";

export function MyLessonsScreen() {
  const [selectedTab, setSelectedTab] = React.useState<"upcoming" | "completed">(
    "upcoming"
  );

  const upcomingLessons = [
    {
      id: "1",
      mentorName: "Sarah Chen",
      subject: "Web Development",
      topic: "React Advanced Patterns",
      date: "Today at 2:00 PM",
      duration: 60,
      status: "scheduled",
    },
    {
      id: "2",
      mentorName: " James Rodriguez",
      subject: "JavaScript",
      topic: "Async/Await",
      date: "Tomorrow at 10:00 AM",
      duration: 45,
      status: "scheduled",
    },
  ];

  const completedLessons = [
    {
      id: "3",
      mentorName: "Emily Watson",
      subject: "React Hooks",
      date: "2 days ago",
      rating: 5,
    },
    {
      id: "4",
      mentorName: "Michael Park",
      subject: "TypeScript",
      date: "1 week ago",
      rating: 4,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Lessons</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "upcoming" && styles.tabActive]}
          onPress={() => setSelectedTab("upcoming")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "upcoming" && styles.tabTextActive,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "completed" && styles.tabActive]}
          onPress={() => setSelectedTab("completed")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "completed" && styles.tabTextActive,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.lessonList} showsVerticalScrollIndicator={false}>
        {selectedTab === "upcoming" ? (
          upcomingLessons.map((lesson) => (
            <Card key={lesson.id} style={styles.lessonCard}>
              <View>
                <CardHeader title={lesson.mentorName} subtitle={lesson.subject} />
                <Text style={styles.topic}>{lesson.topic}</Text>
                <View style={styles.lessonInfo}>
                  <Text style={styles.infoText}>📅 {lesson.date}</Text>
                  <Text style={styles.infoText}>⏱️ {lesson.duration} mins</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </Card>
          ))
        ) : (
          completedLessons.map((lesson) => (
            <Card key={lesson.id} style={styles.lessonCard}>
              <View>
                <CardHeader title={lesson.mentorName} subtitle={lesson.subject} />
                <Text style={styles.completedDate}>{lesson.date}</Text>
                <Badge label={`Rating: ${lesson.rating}⭐`} variant="success" />
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primary,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.base,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  lessonList: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  lessonCard: {
    marginBottom: SPACING.base,
  },
  topic: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray700,
    marginTop: SPACING.sm,
  },
  lessonInfo: {
    flexDirection: "row",
    gap: SPACING.lg,
    marginTop: SPACING.base,
  },
  infoText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
  },
  completedDate: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
  },
  joinButton: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    marginTop: SPACING.base,
    alignItems: "center",
  },
  joinButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "600",
  },
});
