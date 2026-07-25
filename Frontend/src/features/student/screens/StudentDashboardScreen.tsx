import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Badge, Button } from "@/shared/components";
import { BarChart3, Award, Target, Trophy } from "lucide-react-native";
import { LessonProgressCard } from "../components/LessonProgressCard";

interface Subject {
  id: string;
  name: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastUpdated: string;
  score: number;
}

interface QuizInfo {
  id: string;
  title: string;
  score?: number;
  maxScore: number;
  status: "pending" | "completed" | "failed";
}

interface LessonInfo {
  id: string;
  subjectId: string;
  subjectName: string;
  lessonNumber: number;
  title: string;
  progress: number;
  isCompleted: boolean;
  quizzes: QuizInfo[];
  completionDate?: string;
}

export function StudentDashboardScreen() {
  const [upcomingLessons] = useState([
    {
      id: "1",
      mentorName: "Sarah Chen",
      mentorImage: "https://i.pravatar.cc/150?img=5&u=sarah-chen",
      initials: "SC",
      subject: "Web Development",
      date: "Today at 2:00 PM",
      duration: 60,
    },
    {
      id: "2",
      mentorName: "James Rodriguez",
      mentorImage: "https://i.pravatar.cc/150?img=6&u=james-rodriguez",
      initials: "JR",
      subject: "JavaScript Basics",
      date: "Tomorrow at 10:00 AM",
      duration: 45,
    },
  ]);

  const [recentSessions] = useState([
    {
      id: "1",
      mentorName: "Emily Watson",
      mentorImage: "https://i.pravatar.cc/150?img=7&u=emily-watson",
      initials: "EW",
      subject: "React Hooks",
      date: "2 days ago",
      status: "completed",
    },
    {
      id: "2",
      mentorName: "Michael Park",
      mentorImage: "https://i.pravatar.cc/150?img=8&u=michael-park",
      initials: "MP",
      subject: "TypeScript Fundamentals",
      date: "1 week ago",
      status: "completed",
    },
  ]);

  const [subjects] = useState<Subject[]>([
    {
      id: "s1",
      name: "React Fundamentals",
      progress: 85,
      lessonsCompleted: 17,
      totalLessons: 20,
      lastUpdated: "Today",
      score: 92,
    },
    {
      id: "s2",
      name: "JavaScript Basics",
      progress: 65,
      lessonsCompleted: 13,
      totalLessons: 20,
      lastUpdated: "2 days ago",
      score: 78,
    },
    {
      id: "s3",
      name: "TypeScript Mastery",
      progress: 45,
      lessonsCompleted: 9,
      totalLessons: 20,
      lastUpdated: "5 days ago",
      score: 75,
    },
    {
      id: "s4",
      name: "Web Development",
      progress: 72,
      lessonsCompleted: 14,
      totalLessons: 20,
      lastUpdated: "1 day ago",
      score: 88,
    },
  ]);

  const [lessons] = useState<LessonInfo[]>([
    {
      id: "l1",
      subjectId: "s1",
      subjectName: "React Fundamentals",
      lessonNumber: 1,
      title: "Introduction to React",
      progress: 100,
      isCompleted: true,
      quizzes: [
        {
          id: "q1",
          title: "React Basics Quiz",
          score: 95,
          maxScore: 100,
          status: "completed",
        },
      ],
      completionDate: "Mar 10, 2026",
    },
    {
      id: "l2",
      subjectId: "s1",
      subjectName: "React Fundamentals",
      lessonNumber: 2,
      title: "Components and Props",
      progress: 100,
      isCompleted: true,
      quizzes: [
        {
          id: "q2",
          title: "Components Quiz",
          score: 88,
          maxScore: 100,
          status: "completed",
        },
      ],
      completionDate: "Mar 11, 2026",
    },
    {
      id: "l3",
      subjectId: "s1",
      subjectName: "React Fundamentals",
      lessonNumber: 3,
      title: "Hooks and State Management",
      progress: 75,
      isCompleted: false,
      quizzes: [
        {
          id: "q3",
          title: "Hooks Introduction",
          score: 82,
          maxScore: 100,
          status: "completed",
        },
        {
          id: "q4",
          title: "State Management Assessment",
          maxScore: 100,
          status: "pending",
        },
      ],
    },
    {
      id: "l4",
      subjectId: "s2",
      subjectName: "JavaScript Basics",
      lessonNumber: 1,
      title: "JavaScript Fundamentals",
      progress: 100,
      isCompleted: true,
      quizzes: [
        {
          id: "q5",
          title: "JS Basics Quiz",
          score: 90,
          maxScore: 100,
          status: "completed",
        },
      ],
      completionDate: "Mar 09, 2026",
    },
    {
      id: "l5",
      subjectId: "s2",
      subjectName: "JavaScript Basics",
      lessonNumber: 2,
      title: "Async/Await and Promises",
      progress: 60,
      isCompleted: false,
      quizzes: [
        {
          id: "q6",
          title: "Promises Quiz",
          score: 75,
          maxScore: 100,
          status: "completed",
        },
        {
          id: "q7",
          title: "Async/Await Assessment",
          maxScore: 100,
          status: "pending",
        },
        {
          id: "q8",
          title: "Advanced Async Patterns",
          maxScore: 100,
          status: "pending",
        },
      ],
    },
    {
      id: "l6",
      subjectId: "s3",
      subjectName: "TypeScript Mastery",
      lessonNumber: 1,
      title: "TypeScript Basics",
      progress: 100,
      isCompleted: true,
      quizzes: [
        {
          id: "q9",
          title: "TS Basics Quiz",
          score: 85,
          maxScore: 100,
          status: "completed",
        },
      ],
      completionDate: "Mar 08, 2026",
    },
  ]);

  const [showLessonView, setShowLessonView] = useState(false);

  const overallStats = {
    avgCompletion: Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length),
    totalLessons: subjects.reduce((sum, s) => sum + s.lessonsCompleted, 0),
    avgScore: Math.round(subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length),
    totalStudyHours: 48.5,
  };

  const weeklyActivity = [
    { day: "Mon", hours: 2.5, lessons: 3 },
    { day: "Tue", hours: 3.0, lessons: 4 },
    { day: "Wed", hours: 1.5, lessons: 2 },
    { day: "Thu", hours: 4.0, lessons: 5 },
    { day: "Fri", hours: 2.0, lessons: 3 },
    { day: "Sat", hours: 3.5, lessons: 4 },
    { day: "Sun", hours: 1.5, lessons: 2 },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return COLORS.success;
    if (progress >= 60) return COLORS.warning;
    if (progress >= 40) return COLORS.info;
    return COLORS.gray400;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>Hello, Alex! 👋</Text>
        <Text style={styles.subGreeting}>Here's your learning activity</Text>

        <View style={styles.heroStatsRow}>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatValue}>{upcomingLessons.length}</Text>
            <Text style={styles.heroStatLabel}>Upcoming</Text>
          </View>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatValue}>{recentSessions.length}</Text>
            <Text style={styles.heroStatLabel}>Completed</Text>
          </View>
          <View style={styles.heroStatCard}>
            <Text style={styles.heroStatValue}>{overallStats.avgScore}%</Text>
            <Text style={styles.heroStatLabel}>Avg Score</Text>
          </View>
        </View>
      </View>

      {/* Upcoming Lessons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Lessons</Text>
        {upcomingLessons.map((lesson) => (
          <Card key={lesson.id} style={styles.infoCard}>
            <View style={styles.lessonCard}>
              <View style={styles.mentorAvatarWrap}>
                {lesson.mentorImage ? (
                  <Image source={{ uri: lesson.mentorImage }} style={styles.mentorAvatar} />
                ) : (
                  <Text style={styles.mentorAvatarText}>{lesson.initials}</Text>
                )}
              </View>
              <View style={{ flex: 1, marginLeft: SPACING.base }}>
                <CardHeader
                  title={lesson.mentorName}
                  subtitle={lesson.subject}
                  // style={{marginBottom: 1}}
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
          <Card key={session.id} style={styles.infoCard}>
            <View style={styles.lessonCard}>
              <View style={styles.mentorAvatarWrap}>
                {session.mentorImage ? (
                  <Image source={{ uri: session.mentorImage }} style={styles.mentorAvatar} />
                ) : (
                  <Text style={styles.mentorAvatarText}>{session.initials}</Text>
                )}
              </View>
              <View style={{ flex: 1, marginLeft: SPACING.base }}>
                <CardHeader
                  title={session.mentorName}
                  subtitle={session.subject}
                />
                <Text style={styles.sessionInfo}>{session.date}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Overall Progress Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressStatsGrid}>
          <Card style={styles.progressStatCard}>
            <Target size={20} color={COLORS.primary} />
            <Text style={styles.progressStatLabel}>Avg Completion</Text>
            <Text style={styles.progressStatValue}>{overallStats.avgCompletion}%</Text>
          </Card>
          <Card style={styles.progressStatCard}>
            <Award size={20} color={COLORS.success} />
            <Text style={styles.progressStatLabel}>Lessons Done</Text>
            <Text style={styles.progressStatValue}>{overallStats.totalLessons}</Text>
          </Card>
          <Card style={styles.progressStatCard}>
            <BarChart3 size={20} color={COLORS.warning} />
            <Text style={styles.progressStatLabel}>Study Hours</Text>
            <Text style={styles.progressStatValue}>{overallStats.totalStudyHours.toFixed(1)}h</Text>
          </Card>
        </View>
      </View>

      {/* View Toggle */}
      <View style={styles.section}>
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
              Subject View
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
              Lesson View
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {!showLessonView ? (
        <>
          {/* Weekly Activity Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Activity</Text>
            <Card style={styles.chartCard}>
              <View style={styles.weeklyChart}>
                {weeklyActivity.map((day) => {
                  const maxHours = 4.5;
                  const height = (day.hours / maxHours) * 100;
                  return (
                    <View key={day.day} style={styles.dayColumn}>
                      <View
                        style={[
                          styles.bar,
                          {
                            height: `${height}%`,
                            backgroundColor: getProgressColor((day.hours / maxHours) * 100),
                          },
                        ]}
                      />
                      <Text style={styles.dayLabel}>{day.day}</Text>
                      <Text style={styles.dayValue}>{day.hours}h</Text>
                    </View>
                  );
                })}
              </View>
            </Card>
          </View>

          {/* Subject Progress */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Subject Progress</Text>
              <Text style={styles.subjectCount}>{subjects.length} subjects</Text>
            </View>

            {subjects.map((subject) => (
              <Card key={subject.id} style={styles.subjectCard}>
                <View style={styles.subjectHeader}>
                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.lastUpdated}>Updated {subject.lastUpdated}</Text>
                  </View>
                  <View
                    style={[
                      styles.scoreCircle,
                      {
                        borderColor: getProgressColor(subject.score),
                      },
                    ]}
                  >
                    <Text style={[styles.scoreText, { color: getProgressColor(subject.score) }]}>
                      {subject.score}
                    </Text>
                  </View>
                </View>

                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Learning Progress</Text>
                    <Text style={styles.progressPercent}>{subject.progress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progress,
                        {
                          width: `${subject.progress}%`,
                          backgroundColor: getProgressColor(subject.progress),
                        },
                      ]}
                    />
                  </View>

                  <View style={styles.statsRow}>
                    <Text style={styles.statText}>
                      {subject.lessonsCompleted} of {subject.totalLessons} lessons
                    </Text>
                    <Text style={styles.estimatedTime}>
                      ~{Math.ceil((subject.totalLessons - subject.lessonsCompleted) * 1.5)}h remaining
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </>
      ) : (
        // Lesson View with Quizzes
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lesson Progress</Text>
            <Text style={styles.subjectCount}>{lessons.length} lessons</Text>
          </View>
          {lessons.map((lesson) => (
            <LessonProgressCard key={lesson.id} {...lesson} />
          ))}
        </View>
      )}

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
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingBottom: SPACING["6xl"],
  },
  welcomeSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  subGreeting: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.sm,
    marginBottom: SPACING.base,
  },
  heroStatsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  heroStatCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: 12,
    paddingVertical: SPACING.sm,
    alignItems: "center",
  },
  heroStatValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  heroStatLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: SPACING.md,
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
    alignItems: "center",
    gap: SPACING.base,
  },
  mentorAvatarWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e7ff",
  },
  mentorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  mentorAvatarText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  infoCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  lessonInfo: {
    marginTop: -SPACING.xs,
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
  },  
  sessionInfo: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    // marginTop: SPACING.base,
  },
  secondaryButton: {
    marginTop: SPACING.base,
  },
  progressStatsGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  progressStatCard: {
    flex: 1,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
  },
  progressStatLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginVertical: SPACING.xs,
  },
  progressStatValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
  },
  viewToggle: {
    flexDirection: "row",
    gap: SPACING.sm,
    backgroundColor: COLORS.light,
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  toggleText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
  },
  toggleTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  subjectCount: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  chartCard: {
    padding: SPACING.md,
  },
  weeklyChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 180,
  },
  dayColumn: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: "70%",
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  dayLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  dayValue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.dark,
    fontWeight: "600",
  },
  subjectCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  lastUpdated: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    ...TYPOGRAPHY.h2,
    fontWeight: "700",
  },
  progressSection: {
    marginBottom: SPACING.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  progressLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  progressPercent: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },
  progress: {
    height: "100%",
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  estimatedTime: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
  },
});
