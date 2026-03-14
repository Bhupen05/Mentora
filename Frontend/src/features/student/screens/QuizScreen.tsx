import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Button } from "@/shared/components";

export function QuizScreen() {
  const [selectedQuiz, setSelectedQuiz] = React.useState(null);

  const quizzes = [
    {
      id: "1",
      title: "React Fundamentals",
      questions: 10,
      duration: 15,
      difficulty: "Beginner",
      passingScore: 70,
      timestamp: "2 days ago",
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      questions: 15,
      duration: 30,
      difficulty: "Intermediate",
      passingScore: 75,
      timestamp: "1 week ago",
    },
    {
      id: "3",
      title: "TypeScript Mastery",
      questions: 20,
      duration: 45,
      difficulty: "Advanced",
      passingScore: 80,
      timestamp: "Just now",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>📝 Quizzes</Text>
        <Text style={styles.subtitle}>Test your knowledge</Text>
      </View>

      <View style={styles.quizList}>
        {quizzes.map((quiz) => (
          <Card key={quiz.id} style={styles.quizCard}>
            <View>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <View style={styles.quizMeta}>
                <Text style={styles.metaItem}>❓ {quiz.questions} questions</Text>
                <Text style={styles.metaItem}>⏱️ {quiz.duration} mins</Text>
              </View>
              <View style={styles.quizMeta}>
                <Text style={styles.difficulty}>{quiz.difficulty}</Text>
                <Text style={styles.passingScore}>Pass: {quiz.passingScore}%</Text>
              </View>
              <Text style={styles.timestamp}>Available {quiz.timestamp}</Text>
            </View>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </View>
    </ScrollView>
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
  subtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.sm,
  },
  quizList: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  quizCard: {
    marginBottom: SPACING.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  quizTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
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
});
