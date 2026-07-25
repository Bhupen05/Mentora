import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Badge, Button } from "@/shared/components";
import { BookOpen, CheckCircle2, Circle, AlertCircle, X } from "lucide-react-native";

interface Quiz {
  id: string;
  title: string;
  duration: number;
  status: "pending" | "completed";
  score?: number;
}

interface Lesson {
  id: string;
  mentorName: string;
  mentorImage: string | null;
  initials: string;
  subject: string;
  topic?: string;
  date: string;
  duration?: number;
  status: string;
  rating?: number;
  quizzes?: Quiz[];
}

export function MyLessonsScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);
  const [showDetailModal, setShowDetailModal] = React.useState(false);

  const upcomingLessons: Lesson[] = [
    {
      id: "1",
      mentorName: "Sarah Chen",
      mentorImage: "https://i.pravatar.cc/150?img=5&u=sarah-chen",
      initials: "SC",
      subject: "Web Development",
      topic: "React Advanced Patterns",
      date: "Today at 2:00 PM",
      duration: 60,
      status: "scheduled",
      quizzes: [
        {
          id: "q1",
          title: "React Patterns Quiz",
          duration: 15,
          status: "pending",
        },
      ],
    },
    {
      id: "2",
      mentorName: "James Rodriguez",
      mentorImage: "https://i.pravatar.cc/150?img=6&u=james-rodriguez",
      initials: "JR",
      subject: "JavaScript",
      topic: "Async/Await",
      date: "Tomorrow at 10:00 AM",
      duration: 45,
      status: "scheduled",
      quizzes: [
        {
          id: "q2",
          title: "Async/Await Quiz",
          duration: 20,
          status: "pending",
        },
      ],
    },
  ];

  const completedLessons: Lesson[] = [
    {
      id: "3",
      mentorName: "Emily Watson",
      mentorImage: "https://i.pravatar.cc/150?img=7&u=emily-watson",
      initials: "EW",
      subject: "React Hooks",
      topic: "Understanding Hooks Deep Dive",
      date: "2 days ago",
      status: "completed",
      rating: 5,
      quizzes: [
        {
          id: "q3",
          title: "Hooks Mastery Quiz",
          duration: 20,
          status: "completed",
          score: 95,
        },
      ],
    },
    {
      id: "4",
      mentorName: "Michael Park",
      mentorImage: "https://i.pravatar.cc/150?img=8&u=michael-park",
      initials: "MP",
      subject: "TypeScript",
      topic: "Advanced Types",
      date: "1 week ago",
      status: "completed",
      rating: 4,
      quizzes: [
        {
          id: "q4",
          title: "TypeScript Advanced",
          duration: 25,
          status: "completed",
          score: 88,
        },
      ],
    },
  ];

  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowDetailModal(true);
  };

  const getStatusIcon = (status?: string) => {
    if (status === "completed") {
      return <CheckCircle2 size={16} color={COLORS.success} />;
    }
    return <Circle size={16} color={COLORS.gray400} />;
  };

  const getStatusColor = (status?: string) => {
    if (status === "completed") return COLORS.success;
    return COLORS.info;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Lessons</Text>
        <Text style={styles.subtitle}>Stay on track with upcoming and completed lessons.</Text>
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

      {/* All Resources Button */}
      <TouchableOpacity
        style={styles.allResourcesButton}
        onPress={() => router.push("/(student)/lessons/resources")}
      >
        <BookOpen size={20} color={COLORS.white} />
        <Text style={styles.allResourcesButtonText}>All Resources</Text>
      </TouchableOpacity>

      <ScrollView style={styles.lessonList} showsVerticalScrollIndicator={false}>
        {selectedTab === "upcoming" ? (
          upcomingLessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => handleLessonPress(lesson)}
              activeOpacity={0.7}
            >
              <Card style={styles.lessonCard}>
                <View style={styles.lessonCardContent}>
                  <View style={styles.mentorAvatarWrap}>
                    {lesson.mentorImage ? (
                      <Image source={{ uri: lesson.mentorImage }} style={styles.mentorAvatar} />
                    ) : (
                      <Text style={styles.mentorAvatarText}>{lesson.initials}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <CardHeader title={lesson.mentorName} subtitle={lesson.subject} />
                    <Text style={styles.topic}>{lesson.topic}</Text>
                    <View style={styles.lessonInfo}>
                      <Text style={styles.infoText}>📅 {lesson.date}</Text>
                      <Text style={styles.infoText}>⏱️ {lesson.duration} mins</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.resourcesButton}>
                    <BookOpen size={16} color={COLORS.info} />
                    <Text style={styles.resourcesButtonText}>Resources</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          completedLessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => handleLessonPress(lesson)}
              activeOpacity={0.7}
            >
              <Card style={styles.lessonCard}>
                <View style={styles.lessonCardContent}>
                  <View style={styles.mentorAvatarWrap}>
                    {lesson.mentorImage ? (
                      <Image source={{ uri: lesson.mentorImage }} style={styles.mentorAvatar} />
                    ) : (
                      <Text style={styles.mentorAvatarText}>{lesson.initials}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <CardHeader title={lesson.mentorName} subtitle={lesson.subject} />
                    <Text style={styles.topic}>{lesson.topic}</Text>
                    <Text style={styles.completedDate}>{lesson.date}</Text>
                    <Badge label={`Rating: ${lesson.rating}⭐`} variant="success" />
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.resourcesButton}>
                    <BookOpen size={16} color={COLORS.info} />
                    <Text style={styles.resourcesButtonText}>Resources</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailCard}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDetailModal(false)}
            >
              <X size={24} color={COLORS.dark} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Lesson Header */}
              <View style={styles.detailHeader}>
                <Text style={styles.detailMentorName}>{selectedLesson?.mentorName}</Text>
                <Text style={styles.detailSubject}>{selectedLesson?.subject}</Text>
              </View>

              {/* Details Section */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Lesson Details</Text>
                
                {selectedLesson?.topic && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Topic</Text>
                    <Text style={styles.detailValue}>{selectedLesson.topic}</Text>
                  </View>
                )}

                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Date & Time</Text>
                  <Text style={styles.detailValue}>{selectedLesson?.date}</Text>
                </View>

                {selectedLesson?.duration && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>{selectedLesson.duration} minutes</Text>
                  </View>
                )}

                {selectedLesson?.rating && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Rating</Text>
                    <Text style={styles.detailValue}>{selectedLesson.rating}⭐</Text>
                  </View>
                )}
              </View>

              {/* Quizzes Section */}
              {selectedLesson?.quizzes && selectedLesson.quizzes.length > 0 && (
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Associated Quizzes</Text>
                  {selectedLesson.quizzes.map((quiz) => (
                    <View key={quiz.id} style={styles.quizDetailItem}>
                      <View style={styles.quizDetailHeader}>
                        <View style={styles.quizDetailTitleRow}>
                          {getStatusIcon(quiz.status)}
                          <Text style={styles.quizDetailTitle}>{quiz.title}</Text>
                        </View>
                        <Text
                          style={[
                            styles.quizDetailStatus,
                            { color: getStatusColor(quiz.status) },
                          ]}
                        >
                          {quiz.status === "completed" ? `${quiz.score}%` : "Pending"}
                        </Text>
                      </View>
                      <Text style={styles.quizDetailDuration}>
                        ⏱️ {quiz.duration} minutes
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Start Lesson</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.actionButtonSecondary]}
                  onPress={() => router.push("/(student)/lessons/resources")}
                >
                  <Text style={styles.actionButtonTextSecondary}>View Resources</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: SPACING.xs,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.base,
    marginTop: -SPACING.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: SPACING.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  lessonList: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  lessonCard: {
    marginBottom: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  lessonCardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  buttonContainer: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.base,
  },
  joinButton: {
    flex: 1,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    alignItems: "center",
  },
  joinButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "600",
  },
  resourcesButton: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.info,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.xs,
  },
  resourcesButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.info,
    fontWeight: "600",
  },
  allResourcesButton: {
    flexDirection: "row",
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.base,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.info,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
  },
  allResourcesButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.base,
  },
  detailCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    maxHeight: "85%",
    width: "100%",
    padding: SPACING.lg,
  },
  closeButton: {
    position: "absolute",
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
    padding: SPACING.sm,
  },
  detailHeader: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.xl,
  },
  detailMentorName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  detailSubject: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: "600",
  },
  detailSection: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontWeight: "700",
  },
  detailItem: {
    marginBottom: SPACING.md,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
    fontWeight: "600",
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  quizDetailItem: {
    backgroundColor: COLORS.light,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  quizDetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  quizDetailTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    flex: 1,
  },
  quizDetailTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    flex: 1,
  },
  quizDetailStatus: {
    ...TYPOGRAPHY.label,
    fontWeight: "700",
  },
  quizDetailDuration: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  actionButtons: {
    flexDirection: "column",
    gap: SPACING.md,
    marginTop: SPACING.lg,
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
    backgroundColor: COLORS.info,
  },
  actionButtonTextSecondary: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    fontWeight: "700",
  },
});
