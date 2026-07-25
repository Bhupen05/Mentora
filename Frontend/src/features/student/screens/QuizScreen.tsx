import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card } from "@/shared/components";
import { BookOpen, CheckCircle2, Circle, AlertCircle } from "lucide-react-native";

interface Quiz {
  id: string;
  title: string;
  questions: number;
  duration: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  passingScore: number;
  timestamp: string;
  score?: number;
  status?: "completed" | "pending" | "failed";
}

interface Lesson {
  id: string;
  lessonNumber: number;
  title: string;
  subject: string;
  subjectId: string;
  quizzes: Quiz[];
}

export function QuizScreen() {
  const [selectedLevel, setSelectedLevel] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");
  const [showLessonView, setShowLessonView] = useState(false);

  const allQuizzes: Quiz[] = [
    {
      id: "1",
      title: "React Fundamentals",
      questions: 10,
      duration: 15,
      difficulty: "Beginner",
      passingScore: 70,
      timestamp: "2 days ago",
      score: 95,
      status: "completed",
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      questions: 15,
      duration: 30,
      difficulty: "Intermediate",
      passingScore: 75,
      timestamp: "1 week ago",
      score: 88,
      status: "completed",
    },
    {
      id: "3",
      title: "TypeScript Mastery",
      questions: 20,
      duration: 45,
      difficulty: "Advanced",
      passingScore: 80,
      timestamp: "Just now",
      status: "pending",
    },
    {
      id: "4",
      title: "Components Quiz",
      questions: 12,
      duration: 20,
      difficulty: "Beginner",
      passingScore: 70,
      timestamp: "3 days ago",
      score: 88,
      status: "completed",
    },
    {
      id: "5",
      title: "Promises Quiz",
      questions: 14,
      duration: 25,
      difficulty: "Intermediate",
      passingScore: 75,
      timestamp: "1 day ago",
      score: 75,
      status: "completed",
    },
  ];

  const lessons: Lesson[] = [
    {
      id: "l1",
      lessonNumber: 1,
      title: "Introduction to React",
      subject: "React Fundamentals",
      subjectId: "s1",
      quizzes: [
        {
          id: "1",
          title: "React Basics Quiz",
          questions: 10,
          duration: 15,
          difficulty: "Beginner",
          passingScore: 70,
          timestamp: "2 days ago",
          score: 95,
          status: "completed",
        },
      ],
    },
    {
      id: "l2",
      lessonNumber: 2,
      title: "Components and Props",
      subject: "React Fundamentals",
      subjectId: "s1",
      quizzes: [
        {
          id: "4",
          title: "Components Quiz",
          questions: 12,
          duration: 20,
          difficulty: "Beginner",
          passingScore: 70,
          timestamp: "3 days ago",
          score: 88,
          status: "completed",
        },
      ],
    },
    {
      id: "l3",
      lessonNumber: 1,
      title: "JavaScript Fundamentals",
      subject: "JavaScript Basics",
      subjectId: "s2",
      quizzes: [
        {
          id: "2",
          title: "Advanced JavaScript",
          questions: 15,
          duration: 30,
          difficulty: "Intermediate",
          passingScore: 75,
          timestamp: "1 week ago",
          score: 88,
          status: "completed",
        },
      ],
    },
    {
      id: "l4",
      lessonNumber: 2,
      title: "Async/Await and Promises",
      subject: "JavaScript Basics",
      subjectId: "s2",
      quizzes: [
        {
          id: "5",
          title: "Promises Quiz",
          questions: 14,
          duration: 25,
          difficulty: "Intermediate",
          passingScore: 75,
          timestamp: "1 day ago",
          score: 75,
          status: "completed",
        },
      ],
    },
    {
      id: "l5",
      lessonNumber: 1,
      title: "TypeScript Basics",
      subject: "TypeScript Mastery",
      subjectId: "s3",
      quizzes: [
        {
          id: "3",
          title: "TypeScript Mastery",
          questions: 20,
          duration: 45,
          difficulty: "Advanced",
          passingScore: 80,
          timestamp: "Just now",
          status: "pending",
        },
      ],
    },
  ];

  const filteredQuizzes = useMemo(
    () => allQuizzes.filter((quiz) => selectedLevel === "All" || quiz.difficulty === selectedLevel),
    [allQuizzes, selectedLevel]
  );

  const totalQuestions = useMemo(
    () => filteredQuizzes.reduce((total, quiz) => total + quiz.questions, 0),
    [filteredQuizzes]
  );

  const totalMinutes = useMemo(
    () => filteredQuizzes.reduce((total, quiz) => total + quiz.duration, 0),
    [filteredQuizzes]
  );

  const getStatusIcon = (status?: string) => {
    if (status === "completed") {
      return <CheckCircle2 size={16} color={COLORS.success} />;
    } else if (status === "failed") {
      return <AlertCircle size={16} color={COLORS.warning} />;
    }
    return <Circle size={16} color={COLORS.gray400} />;
  };

  const getStatusColor = (status?: string) => {
    if (status === "completed") return COLORS.success;
    if (status === "failed") return COLORS.warning;
    return COLORS.info;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Quizzes</Text>
        <Text style={styles.subtitle}>Test your knowledge</Text>

        <View style={styles.summaryPill}>
          <Text style={styles.summaryPillText}>
            {filteredQuizzes.length} quizzes • {totalQuestions} questions • {totalMinutes} mins
          </Text>
        </View>
      </View>

      {/* View Toggle */}
      <View style={styles.toggleContainer}>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !showLessonView && styles.toggleButtonActive,
            ]}
            onPress={() => setShowLessonView(false)}
          >
            <Text
              style={[
                styles.toggleText,
                !showLessonView && styles.toggleTextActive,
              ]}
            >
              All Quizzes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              showLessonView && styles.toggleButtonActive,
            ]}
            onPress={() => setShowLessonView(true)}
          >
            <Text
              style={[
                styles.toggleText,
                showLessonView && styles.toggleTextActive,
              ]}
            >
              By Lesson
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quizList}>
        {!showLessonView ? (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.levelRow}
            >
              {["All", "Beginner", "Intermediate", "Advanced"].map((level) => {
                const active = selectedLevel === level;

                return (
                  <TouchableOpacity
                    key={level}
                    style={[styles.levelChip, active && styles.levelChipActive]}
                    onPress={() => setSelectedLevel(level as "All" | "Beginner" | "Intermediate" | "Advanced")}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.levelChipText, active && styles.levelChipTextActive]}>{level}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} style={styles.quizCard}>
                <View style={styles.quizContent}>
                  <View style={styles.quizHeader}>
                    <View style={styles.quizTitleRow}>
                      <Text style={styles.quizTitle}>{quiz.title}</Text>
                      {getStatusIcon(quiz.status)}
                    </View>
                  </View>
                  <View style={styles.quizMeta}>
                    <Text style={styles.metaItem}>❓ {quiz.questions} questions</Text>
                    <Text style={styles.metaItem}>⏱️ {quiz.duration} mins</Text>
                  </View>
                  <View style={styles.quizMeta}>
                    <Text style={styles.difficulty}>{quiz.difficulty}</Text>
                    <Text style={styles.passingScore}>Pass: {quiz.passingScore}%</Text>
                  </View>
                  {quiz.score && (
                    <Text style={[styles.score, { color: getStatusColor(quiz.status) }]}>
                      Score: {quiz.score}%
                    </Text>
                  )}
                  <Text style={styles.timestamp}>Available {quiz.timestamp}</Text>
                </View>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>
                    {quiz.status === "completed" ? "Review" : "Start"}
                  </Text>
                </TouchableOpacity>
              </Card>
            ))}

            {filteredQuizzes.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No quizzes in this level yet</Text>
                <Text style={styles.emptyBody}>Try another difficulty filter.</Text>
              </Card>
            ) : null}
          </>
        ) : (
          // Lesson View
          <View style={styles.lessonViewContainer}>
            {lessons.map((lesson) => {
              const completedQuizzes = lesson.quizzes.filter((q) => q.status === "completed").length;
              const totalLessonQuizzes = lesson.quizzes.length;

              return (
                <Card key={lesson.id} style={styles.lessonCard}>
                  <View style={styles.lessonHeader}>
                    <View style={styles.lessonTitleWrapper}>
                      <View style={styles.lessonNumberBadge}>
                        <Text style={styles.lessonNumberText}>{lesson.lessonNumber}</Text>
                      </View>
                      <View>
                        <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                        <Text style={styles.lessonTitle}>{lesson.title}</Text>
                      </View>
                    </View>
                    <View style={styles.lessonProgress}>
                      <Text style={styles.lessonProgressText}>
                        {completedQuizzes}/{totalLessonQuizzes}
                      </Text>
                      <BookOpen size={18} color={COLORS.info} />
                    </View>
                  </View>

                  {/* Quizzes in Lesson */}
                  <View style={styles.quizzesInLesson}>
                    {lesson.quizzes.map((quiz) => (
                      <View key={quiz.id} style={styles.lessonQuizItem}>
                        <View style={styles.lessonQuizHeader}>
                          <View style={styles.lessonQuizTitleRow}>
                            {getStatusIcon(quiz.status)}
                            <Text style={styles.lessonQuizTitle}>{quiz.title}</Text>
                          </View>
                          <Text
                            style={[
                              styles.lessonQuizStatus,
                              { color: getStatusColor(quiz.status) },
                            ]}
                          >
                            {quiz.status === "completed" ? `${quiz.score}%` : "Pending"}
                          </Text>
                        </View>
                        <View style={styles.lessonQuizMeta}>
                          <Text style={styles.lessonQuizMetaItem}>
                            {quiz.questions} Q • {quiz.duration} mins • {quiz.difficulty}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </Card>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  content: {
    paddingBottom: SPACING["6xl"],
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.sm,
  },
  summaryPill: {
    marginTop: SPACING.base,
    alignSelf: "flex-start",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  summaryPillText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: "700",
  },
  toggleContainer: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
  },
  viewToggle: {
    flexDirection: "row",
    gap: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.xs,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "transparent",
  },
  toggleButtonActive: {
    backgroundColor: "#e0e7ff",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  toggleText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
  },
  toggleTextActive: {
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  quizList: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  levelRow: {
    paddingBottom: SPACING.base,
    gap: SPACING.sm,
  },
  levelChip: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
  },
  levelChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#e0e7ff",
  },
  levelChipText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray700,
    fontWeight: "600",
  },
  levelChipTextActive: {
    color: COLORS.primaryDark,
  },
  quizCard: {
    marginBottom: SPACING.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  quizContent: {
    flex: 1,
  },
  quizHeader: {
    marginBottom: SPACING.sm,
  },
  quizTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  quizTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    flex: 1,
  },
  quizMeta: {
    flexDirection: "row",
    gap: SPACING.lg,
    marginTop: SPACING.sm,
  },
  metaItem: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
  },
  difficulty: {
    ...TYPOGRAPHY.label,
    color: COLORS.secondary,
    fontWeight: "600",
  },
  passingScore: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.success,
    fontWeight: "600",
  },
  score: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    marginTop: SPACING.sm,
  },
  timestamp: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: SPACING.base,
  },
  startButton: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  startButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "600",
  },
  emptyCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  emptyTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  emptyBody: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  lessonViewContainer: {
    marginBottom: SPACING.lg,
  },
  lessonCard: {
    marginBottom: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  lessonTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    flex: 1,
  },
  lessonNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.info,
    justifyContent: "center",
    alignItems: "center",
  },
  lessonNumberText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
    fontWeight: "700",
  },
  lessonSubject: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  lessonTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  lessonProgress: {
    alignItems: "center",
    gap: SPACING.sm,
  },
  lessonProgressText: {
    ...TYPOGRAPHY.label,
    color: COLORS.dark,
    fontWeight: "700",
  },
  quizzesInLesson: {
    gap: SPACING.md,
  },
  lessonQuizItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.light,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  lessonQuizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  lessonQuizTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  lessonQuizTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    flex: 1,
  },
  lessonQuizStatus: {
    ...TYPOGRAPHY.label,
    fontWeight: "700",
  },
  lessonQuizMeta: {
    marginTop: SPACING.sm,
  },
  lessonQuizMetaItem: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
});
