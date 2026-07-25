import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Card } from "@/shared/components";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { CheckCircle2, Circle, BookOpen } from "lucide-react-native";

interface QuizInfo {
  id: string;
  title: string;
  score?: number;
  maxScore: number;
  status: "pending" | "completed" | "failed";
}

interface LessonProgressCardProps {
  id: string;
  subjectName: string;
  lessonNumber: number;
  title: string;
  progress: number;
  isCompleted: boolean;
  quizzes: QuizInfo[];
  completionDate?: string;
}

export function LessonProgressCard({
  id,
  subjectName,
  lessonNumber,
  title,
  progress,
  isCompleted,
  quizzes,
  completionDate,
}: LessonProgressCardProps) {
  const [expandedQuizzes, setExpandedQuizzes] = useState(false);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return COLORS.success;
    if (progress >= 60) return COLORS.warning;
    if (progress >= 40) return COLORS.info;
    return COLORS.gray400;
  };

  const getQuizStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return COLORS.success;
      case "failed":
        return COLORS.error;
      default:
        return COLORS.warning;
    }
  };

  const completedQuizzes = quizzes.filter((q) => q.status === "completed");
  const pendingQuizzes = quizzes.filter((q) => q.status === "pending");

  const handleQuizPress = (quiz: QuizInfo) => {
    if (quiz.status === "pending") {
      Alert.alert(
        "Start Quiz",
        `Start "${quiz.title}" quiz?\n\nThis quiz has ${quiz.maxScore} points.`
      );
    } else {
      Alert.alert(
        "Quiz Results",
        `"${quiz.title}"\n\nYour Score: ${quiz.score}/${quiz.maxScore}\nPercentage: ${Math.round((quiz.score! / quiz.maxScore) * 100)}%`
      );
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.lessonLabel}>Lesson {lessonNumber}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subject}>{subjectName}</Text>
        </View>
        <View
          style={[
            styles.statusIcon,
            { borderColor: isCompleted ? COLORS.success : COLORS.gray300 },
          ]}
        >
          {isCompleted ? (
            <CheckCircle2 size={24} color={COLORS.success} />
          ) : (
            <Circle size={24} color={COLORS.gray400} />
          )}
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={[styles.progressPercent, { color: getProgressColor(progress) }]}>
            {progress}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              {
                width: `${progress}%`,
                backgroundColor: getProgressColor(progress),
              },
            ]}
          />
        </View>
      </View>

      {/* Quizzes Section */}
      {quizzes.length > 0 && (
        <View style={styles.quizzesSection}>
          <TouchableOpacity
            style={styles.quizzesHeader}
            onPress={() => setExpandedQuizzes(!expandedQuizzes)}
          >
            <View style={styles.quizzesTitle}>
              <BookOpen size={16} color={COLORS.info} />
              <Text style={styles.quizzesTitleText}>
                Assessments ({completedQuizzes.length}/{quizzes.length})
              </Text>
            </View>
            <Text style={styles.expandIcon}>{expandedQuizzes ? "▼" : "▶"}</Text>
          </TouchableOpacity>

          {expandedQuizzes && (
            <View style={styles.quizzesList}>
              {quizzes.map((quiz) => (
                <TouchableOpacity
                  key={quiz.id}
                  style={styles.quizItem}
                  onPress={() => handleQuizPress(quiz)}
                >
                  <View
                    style={[
                      styles.quizStatus,
                      { backgroundColor: getQuizStatusColor(quiz.status) },
                    ]}
                  >
                    {quiz.status === "completed" ? (
                      <Text style={styles.quizStatusIcon}>✓</Text>
                    ) : quiz.status === "failed" ? (
                      <Text style={styles.quizStatusIcon}>!</Text>
                    ) : (
                      <Text style={styles.quizStatusIcon}>?</Text>
                    )}
                  </View>
                  <View style={styles.quizContent}>
                    <Text style={styles.quizTitle}>{quiz.title}</Text>
                    {quiz.status === "completed" && (
                      <Text style={styles.quizScore}>
                        Score: {quiz.score}/{quiz.maxScore} (
                        {Math.round((quiz.score! / quiz.maxScore) * 100)}%)
                      </Text>
                    )}
                    {quiz.status === "pending" && (
                      <Text style={styles.quizPending}>Tap to start</Text>
                    )}
                  </View>
                  <Text style={styles.quizArrow}>→</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {completionDate && (
        <View style={styles.footer}>
          <Text style={styles.completionText}>
            Completed on {completionDate}
          </Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingVertical: SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.base,
  },
  titleSection: {
    flex: 1,
  },
  lessonLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.dark,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  subject: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
  },
  statusIcon: {
    borderWidth: 2,
    borderRadius: 12,
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  progressSection: {
    marginBottom: SPACING.base,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
  },
  progressPercent: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: "600",
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.gray200,
    borderRadius: 3,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 3,
  },
  quizzesSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    paddingTop: SPACING.base,
  },
  quizzesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  quizzesTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  quizzesTitleText: {
    ...TYPOGRAPHY.label,
    color: COLORS.dark,
    fontWeight: "600",
  },
  expandIcon: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  quizzesList: {
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  quizItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.light,
    borderRadius: 8,
  },
  quizStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quizStatusIcon: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "700",
  },
  quizContent: {
    flex: 1,
  },
  quizTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "500",
  },
  quizScore: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    marginTop: 2,
  },
  quizPending: {
    ...TYPOGRAPHY.caption,
    color: COLORS.warning,
    marginTop: 2,
  },
  quizArrow: {
    fontSize: 14,
    color: COLORS.gray400,
  },
  footer: {
    marginTop: SPACING.base,
    paddingTop: SPACING.base,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  completionText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontStyle: "italic",
  },
});
