import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Badge } from "@/shared/components";
import { BookOpen, Users, BarChart3, Zap } from "lucide-react-native";

interface Lesson {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number;
  studentsEnrolled: number;
  totalQuizzes: number;
  status: "active" | "draft" | "archived";
  createdDate: string;
}

export default function LessonsScreen() {
  const router = useRouter();
  const [lessons] = useState<Lesson[]>([
    {
      id: "1",
      title: "React Fundamentals",
      subject: "Web Development",
      description: "Learn the basics of React framework",
      duration: 60,
      studentsEnrolled: 24,
      totalQuizzes: 3,
      status: "active",
      createdDate: "Mar 5, 2026",
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      subject: "JavaScript",
      description: "Master advanced JavaScript concepts",
      duration: 90,
      studentsEnrolled: 18,
      totalQuizzes: 4,
      status: "active",
      createdDate: "Feb 28, 2026",
    },
    {
      id: "3",
      title: "TypeScript Essentials",
      subject: "TypeScript",
      description: "Introduction to TypeScript",
      duration: 75,
      studentsEnrolled: 12,
      totalQuizzes: 2,
      status: "draft",
      createdDate: "Mar 10, 2026",
    },
    {
      id: "4",
      title: "React Hooks Deep Dive",
      subject: "Web Development",
      description: "Advanced hooks concepts and patterns",
      duration: 120,
      studentsEnrolled: 31,
      totalQuizzes: 5,
      status: "active",
      createdDate: "Mar 1, 2026",
    },
  ]);

  const handleLessonPress = (lessonId: string) => {
    router.push(`/(mentor)/lessons/${lessonId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return COLORS.success;
      case "draft":
        return COLORS.warning;
      case "archived":
        return COLORS.gray500;
      default:
        return COLORS.gray400;
    }
  };

  const activeCount = lessons.filter((l) => l.status === "active").length;
  const draftCount = lessons.filter((l) => l.status === "draft").length;
  const totalStudents = lessons.reduce((sum, l) => sum + l.studentsEnrolled, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Lessons</Text>
        <Text style={styles.subtitle}>Manage and monitor your lessons</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{lessons.length}</Text>
            <Text style={styles.statLabel}>Total Lessons</Text>
          </View>
          <BookOpen size={24} color={COLORS.primary} />
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <Zap size={24} color={COLORS.success} />
        </Card>
      </View>

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{totalStudents}</Text>
            <Text style={styles.statLabel}>Total Students</Text>
          </View>
          <Users size={24} color={COLORS.info} />
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{draftCount}</Text>
            <Text style={styles.statLabel}>Draft</Text>
          </View>
          <BarChart3 size={24} color={COLORS.warning} />
        </Card>
      </View>

      {/* Lessons List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Lessons</Text>

        {lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => handleLessonPress(lesson.id)}
            activeOpacity={0.7}
          >
            <Card style={styles.lessonCard}>
              <View style={styles.lessonHeader}>
                <View style={styles.lessonTitleSection}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Badge
                    label={lesson.status}
                    variant={lesson.status === "active" ? "success" : "warning"}
                  />
                </View>
                <Text style={styles.lessonSubject}>{lesson.subject}</Text>
              </View>

              <Text style={styles.lessonDescription}>{lesson.description}</Text>

              <View style={styles.lessonStats}>
                <View style={styles.statItem}>
                  <BookOpen size={16} color={COLORS.gray600} />
                  <Text style={styles.statText}>{lesson.duration} mins</Text>
                </View>
                <View style={styles.statItem}>
                  <Users size={16} color={COLORS.gray600} />
                  <Text style={styles.statText}>{lesson.studentsEnrolled} students</Text>
                </View>
                <View style={styles.statItem}>
                  <BarChart3 size={16} color={COLORS.gray600} />
                  <Text style={styles.statText}>{lesson.totalQuizzes} quizzes</Text>
                </View>
              </View>

              <View style={styles.lessonFooter}>
                <Text style={styles.createdDate}>Created {lesson.createdDate}</Text>
                <View style={styles.manageButton}>
                  <Text style={styles.manageButtonText}>Manage →</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingBottom: SPACING["6xl"],
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.9)",
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginTop: -SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    fontWeight: "700",
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.lg,
  },
  lessonCard: {
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  lessonHeader: {
    marginBottom: SPACING.md,
  },
  lessonTitleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  lessonTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    fontWeight: "700",
    flex: 1,
  },
  lessonSubject: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: SPACING.xs,
  },
  lessonDescription: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  lessonStats: {
    flexDirection: "row",
    gap: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    marginBottom: SPACING.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  statText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "600",
  },
  lessonFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createdDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
  },
  manageButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  manageButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "600",
  },
});
