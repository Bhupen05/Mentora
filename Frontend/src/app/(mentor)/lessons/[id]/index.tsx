import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card } from "@/shared/components";
import {
  ArrowLeft,
  BookOpen,
  Users,
  BarChart3,
  Zap,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
} from "lucide-react-native";

interface Quiz {
  id: string;
  title: string;
  questions: number;
  duration: number;
  status: "active" | "draft";
}

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  quizzesCompleted: number;
  joinDate: string;
}

interface Workflow {
  id: string;
  step: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
}

interface Analytics {
  totalStudents: number;
  avgProgress: number;
  avgScore: number;
  completionRate: number;
  engagementRate: number;
}

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "details" | "workflow" | "analytics" | "students" | "quizzes"
  >("details");

  // Mock lesson data
  const lesson = {
    id: id,
    title: "React Fundamentals",
    subject: "Web Development",
    description: "Learn the basics of React framework including components, props, state, and hooks",
    duration: 60,
    level: "Beginner",
    language: "English",
    category: "Frontend Development",
    studentsEnrolled: 24,
    totalQuizzes: 3,
    status: "active" as const,
    createdDate: "Mar 5, 2026",
  };

  const quizzes: Quiz[] = [
    {
      id: "q1",
      title: "React Basics Quiz",
      questions: 10,
      duration: 15,
      status: "active",
    },
    {
      id: "q2",
      title: "Components & Props",
      questions: 12,
      duration: 20,
      status: "active",
    },
    {
      id: "q3",
      title: "State Management",
      questions: 15,
      duration: 25,
      status: "draft",
    },
  ];

  const students: Student[] = [
    {
      id: "s1",
      name: "Alex Johnson",
      email: "alex@example.com",
      progress: 85,
      quizzesCompleted: 2,
      joinDate: "Mar 10, 2026",
    },
    {
      id: "s2",
      name: "Sarah Smith",
      email: "sarah@example.com",
      progress: 100,
      quizzesCompleted: 3,
      joinDate: "Mar 5, 2026",
    },
    {
      id: "s3",
      name: "Mike Davis",
      email: "mike@example.com",
      progress: 45,
      quizzesCompleted: 1,
      joinDate: "Mar 12, 2026",
    },
  ];

  const workflows: Workflow[] = [
    {
      id: "w1",
      step: 1,
      title: "Course Setup",
      description: "Configure lesson settings and materials",
      status: "completed",
    },
    {
      id: "w2",
      step: 2,
      title: "Content Creation",
      description: "Record and upload lesson videos",
      status: "completed",
    },
    {
      id: "w3",
      step: 3,
      title: "Quiz Creation",
      description: "Create assessment quizzes",
      status: "in-progress",
    },
    {
      id: "w4",
      step: 4,
      title: "Launch",
      description: "Make lesson available to students",
      status: "pending",
    },
  ];

  const analytics: Analytics = {
    totalStudents: 24,
    avgProgress: 76,
    avgScore: 82,
    completionRate: 75,
    engagementRate: 88,
  };

  const renderDetailsTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Card style={styles.tabCard}>
        <Text style={styles.cardTitle}>Lesson Information</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Subject</Text>
          <Text style={styles.infoValue}>{lesson.subject}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Level</Text>
          <Text style={styles.infoValue}>{lesson.level}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Duration</Text>
          <Text style={styles.infoValue}>{lesson.duration} minutes</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Language</Text>
          <Text style={styles.infoValue}>{lesson.language}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>{lesson.category}</Text>
        </View>
      </Card>

      <Card style={styles.tabCard}>
        <Text style={styles.cardTitle}>Description</Text>
        <Text style={styles.descriptionText}>{lesson.description}</Text>
      </Card>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Lesson</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
          <Text style={styles.actionButtonTextSecondary}>Archive</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderWorkflowTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {workflows.map((workflow) => (
        <Card key={workflow.id} style={styles.tabCard}>
          <View style={styles.workflowHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepNumber}>{workflow.step}</Text>
            </View>
            <View style={styles.workflowInfo}>
              <Text style={styles.workflowTitle}>{workflow.title}</Text>
              <Text style={styles.workflowDesc}>{workflow.description}</Text>
            </View>
            {workflow.status === "completed" && (
              <CheckCircle2 size={24} color={COLORS.success} />
            )}
            {workflow.status === "in-progress" && (
              <Zap size={24} color={COLORS.warning} />
            )}
            {workflow.status === "pending" && (
              <AlertCircle size={24} color={COLORS.gray400} />
            )}
          </View>
        </Card>
      ))}
    </ScrollView>
  );

  const renderAnalyticsTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.analyticsGrid}>
        <Card style={styles.analyticsCard}>
          <View style={styles.analyticContent}>
            <Text style={styles.analyticsValue}>{analytics.totalStudents}</Text>
            <Text style={styles.analyticsLabel}>Total Students</Text>
          </View>
          <Users size={28} color={COLORS.info} />
        </Card>
        <Card style={styles.analyticsCard}>
          <View style={styles.analyticContent}>
            <Text style={styles.analyticsValue}>{analytics.avgProgress}%</Text>
            <Text style={styles.analyticsLabel}>Avg Progress</Text>
          </View>
          <TrendingUp size={28} color={COLORS.success} />
        </Card>
      </View>

      <View style={styles.analyticsGrid}>
        <Card style={styles.analyticsCard}>
          <View style={styles.analyticContent}>
            <Text style={styles.analyticsValue}>{analytics.avgScore}%</Text>
            <Text style={styles.analyticsLabel}>Avg Score</Text>
          </View>
          <BarChart3 size={28} color={COLORS.warning} />
        </Card>
        <Card style={styles.analyticsCard}>
          <View style={styles.analyticContent}>
            <Text style={styles.analyticsValue}>{analytics.engagementRate}%</Text>
            <Text style={styles.analyticsLabel}>Engagement</Text>
          </View>
          <Zap size={28} color={COLORS.primary} />
        </Card>
      </View>

      <Card style={styles.tabCard}>
        <Text style={styles.cardTitle}>Performance Metrics</Text>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Completion Rate</Text>
          <View style={styles.metricBar}>
            <View
              style={[
                styles.metricProgress,
                { width: `${analytics.completionRate}%` },
              ]}
            />
          </View>
          <Text style={styles.metricValue}>{analytics.completionRate}%</Text>
        </View>
      </Card>
    </ScrollView>
  );

  const renderStudentsTab = () => (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={styles.studentCard}>
          <View style={styles.studentHeader}>
            <View>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentEmail}>{item.email}</Text>
            </View>
          </View>
          <View style={styles.studentStats}>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Progress</Text>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${item.progress}%` }]}
                />
              </View>
              <Text style={styles.progressPercent}>{item.progress}%</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Quizzes</Text>
                <Text style={styles.statValue}>{item.quizzesCompleted}/3</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Joined</Text>
                <Text style={styles.statValue}>{item.joinDate}</Text>
              </View>
            </View>
          </View>
        </Card>
      )}
      scrollEnabled={false}
      ListHeaderComponent={
        <Text style={[styles.cardTitle, { marginLeft: 0, marginBottom: SPACING.md }]}>
          Enrolled Students ({students.length})
        </Text>
      }
    />
  );

  const renderQuizzesTab = () => (
    <FlatList
      data={quizzes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={styles.quizCard}>
          <View style={styles.quizHeader}>
            <View>
              <Text style={styles.quizTitle}>{item.title}</Text>
              <Text style={styles.quizInfo}>
                {item.questions} questions • {item.duration} mins
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === "active" ? COLORS.success : COLORS.warning,
                },
              ]}
            >
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Quiz</Text>
          </TouchableOpacity>
        </Card>
      )}
      scrollEnabled={false}
      ListHeaderComponent={
        <Text style={[styles.cardTitle, { marginLeft: 0, marginBottom: SPACING.md }]}>
          Associated Quizzes ({quizzes.length})
        </Text>
      }
    />
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerTop}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
          <Text style={styles.headerSubtitle}>{lesson.subject}</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabBar}
      >
        {[
          { key: "details" as const, label: "Details", icon: BookOpen },
          { key: "workflow" as const, label: "Workflow", icon: Zap },
          { key: "analytics" as const, label: "Analytics", icon: BarChart3 },
          { key: "students" as const, label: "Students", icon: Users },
          { key: "quizzes" as const, label: "Quizzes", icon: CheckCircle2 },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.tabActive,
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.key && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab Content */}
      <ScrollView
        style={styles.tabContent}
        contentContainerStyle={styles.contentPadding}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "details" && renderDetailsTab()}
        {activeTab === "workflow" && renderWorkflowTab()}
        {activeTab === "analytics" && renderAnalyticsTab()}
        {activeTab === "students" && renderStudentsTab()}
        {activeTab === "quizzes" && renderQuizzesTab()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerTop: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: SPACING.lg,
    paddingTop:SPACING["3xl"],
    paddingHorizontal: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.xs,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingHorizontal: SPACING.sm,
    gap: SPACING.xs,
    textAlign: "center",
    // alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    width: "auto",
    height: 48,
    paddingVertical: SPACING.md,
    // marginTop: 3,
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
    paddingHorizontal: SPACING.md,
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
    marginBottom: 0,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: COLORS.primary,
  },
  tabContent: {
    height: "100%",
    width: "100%",
  },
  contentPadding: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  tabCard: {
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontWeight: "500",
  },
  infoItem: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  infoLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
    fontWeight: "500",
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  descriptionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray700,
    lineHeight: 22,
  },
  actionButtons: {
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  actionButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    fontWeight: "700",
  },
  actionButtonSecondary: {
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  actionButtonTextSecondary: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  workflowHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  stepBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "700",
  },
  workflowInfo: {
    flex: 1,
  },
  workflowTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  workflowDesc: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  analyticsGrid: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  analyticsCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  analyticContent: {
    flex: 1,
  },
  analyticsValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    fontWeight: "700",
  },
  analyticsLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  metricItem: {
    marginBottom: SPACING.md,
  },
  metricLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.dark,
    marginBottom: SPACING.sm,
    fontWeight: "600",
  },
  metricBar: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: SPACING.sm,
  },
  metricProgress: {
    height: "100%",
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  metricValue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    textAlign: "right",
  },
  studentCard: {
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  studentHeader: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  studentName: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  studentEmail: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  studentStats: {
    gap: SPACING.md,
  },
  progressItem: {
    marginBottom: SPACING.md,
  },
  progressLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
    fontWeight: "600",
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.gray200,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: SPACING.xs,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.success,
    borderRadius: 3,
  },
  progressPercent: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    textAlign: "right",
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
    fontWeight: "600",
  },
  statValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  quizCard: {
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  quizHeader: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  quizTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  quizInfo: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 4,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  editButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    alignItems: "center",
  },
  editButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "600",
  },
});
