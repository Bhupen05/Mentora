import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  CalendarDays,
  Clock3,
  Star,
  DollarSign,
  MessageCircle,
  Users,
} from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Button, Badge } from "@/shared/components";

export function MentorDashboardScreen() {
  const [todayLessons] = useState([
    {
      id: "1",
      studentName: "Emily Wilson",
      subject: "React",
      time: "2:00 PM - 3:00 PM",
      duration: 60,
      status: "upcoming",
    },
    {
      id: "2",
      studentName: "James Taylor",
      subject: "TypeScript",
      time: "4:00 PM - 4:45 PM",
      duration: 45,
      status: "upcoming",
    },
  ]);

  const [pendingRequests] = useState([
    {
      id: "r1",
      studentName: "Liam Johnson",
      subject: "JavaScript Fundamentals",
      requestedTime: "Tomorrow, 10:00 AM",
    },
    {
      id: "r2",
      studentName: "Sophia Brown",
      subject: "Interview Preparation",
      requestedTime: "Tomorrow, 6:30 PM",
    },
  ]);

  const [earning] = useState({
    today: 95,
    thisWeek: 650,
    thisMonth: 2400,
  });

  const [performance] = useState({
    rating: 4.9,
    completedSessions: 128,
    responseRate: 97,
    activeStudents: 24,
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.greeting}>Welcome back, Sarah</Text>
        <Text style={styles.subGreeting}>You have {todayLessons.length} sessions today</Text>

        <Card style={styles.heroCard}>
          <View style={styles.heroCardRow}>
            <View>
              <Text style={styles.heroCardLabel}>Today's Earnings</Text>
              <Text style={styles.heroCardAmount}>${earning.today}</Text>
            </View>
            <View style={styles.heroTrendBadge}>
              <Text style={styles.heroTrendText}>+12% vs yesterday</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.earningGrid}>
          <Card style={styles.earningCard}>
            <DollarSign size={16} color={COLORS.success} strokeWidth={2.2} />
            <Text style={styles.earningLabel}>This Week</Text>
            <Text style={styles.earningAmount}>${earning.thisWeek}</Text>
          </Card>
          <Card style={styles.earningCard}>
            <CalendarDays size={16} color={COLORS.primary} strokeWidth={2.2} />
            <Text style={styles.earningLabel}>This Month</Text>
            <Text style={styles.earningAmount}>${earning.thisMonth}</Text>
          </Card>
          <Card style={styles.earningCard}>
            <Users size={16} color={COLORS.info} strokeWidth={2.2} />
            <Text style={styles.earningLabel}>Active Students</Text>
            <Text style={styles.earningAmount}>{performance.activeStudents}</Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Lessons</Text>
        {todayLessons.map((lesson) => (
          <Card key={lesson.id}>
            <View style={styles.lessonRow}>
              <View>
                <Text style={styles.lessonTitle}>{lesson.studentName}</Text>
                <Text style={styles.lessonSubtitle}>{lesson.subject}</Text>
                <View style={styles.lessonMetaRow}>
                  <Clock3 size={13} color={COLORS.gray500} strokeWidth={2.2} />
                  <Text style={styles.lessonMetaText}>{lesson.time}</Text>
                </View>
                <Text style={styles.duration}>{lesson.duration} mins</Text>
              </View>
              <Badge label="Start" variant="primary" />
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Requests</Text>
        {pendingRequests.map((request) => (
          <Card key={request.id}>
            <View style={styles.requestTopRow}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestName}>{request.studentName}</Text>
                <Text style={styles.requestSubject}>{request.subject}</Text>
                <Text style={styles.requestTime}>{request.requestedTime}</Text>
              </View>
              <View style={styles.requestActionButtons}>
                <Button title="Accept" size="small" onPress={() => {}} />
                <Button
                  title="Decline"
                  size="small"
                  variant="secondary"
                  style={styles.requestSecondaryButton}
                  onPress={() => {}}
                />
              </View>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <Card>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Star size={16} color={COLORS.warning} strokeWidth={2.2} />
              <Text style={styles.metricValue}>{performance.rating}</Text>
              <Text style={styles.metricLabel}>Rating</Text>
            </View>
            <View style={styles.metricItem}>
              <CalendarDays size={16} color={COLORS.primary} strokeWidth={2.2} />
              <Text style={styles.metricValue}>{performance.completedSessions}</Text>
              <Text style={styles.metricLabel}>Sessions</Text>
            </View>
            <View style={styles.metricItem}>
              <MessageCircle size={16} color={COLORS.success} strokeWidth={2.2} />
              <Text style={styles.metricValue}>{performance.responseRate}%</Text>
              <Text style={styles.metricLabel}>Response</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Button title="Create Lesson Listing" onPress={() => {}} />
        <Button
          title="Set Availability"
          variant="secondary"
          style={styles.secondButton}
          onPress={() => {}}
        />
        <Button
          title="View Full Earnings"
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
  heroSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  greeting: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
  },
  subGreeting: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.xs,
    marginBottom: SPACING.base,
  },
  heroCard: {
    marginVertical: 0,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
  },
  heroCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroCardLabel: {
    ...TYPOGRAPHY.caption,
    color: "rgba(255, 255, 255, 0.85)",
  },
  heroCardAmount: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
    marginTop: SPACING.xs,
  },
  heroTrendBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    backgroundColor: "rgba(16, 185, 129, 0.2)",
  },
  heroTrendText: {
    ...TYPOGRAPHY.caption,
    color: "#86efac",
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: "600",
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
    justifyContent: "center",
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.md,
    minHeight: 110,
  },
  earningLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
    textAlign: "center",
  },
  earningAmount: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: "700",
    color: COLORS.dark,
    marginTop: SPACING.xs,
  },
  lessonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  lessonTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.dark,
  },
  lessonSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  lessonMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  lessonMetaText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginLeft: SPACING.xs,
  },
  duration: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  requestTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: SPACING.base,
  },
  requestInfo: {
    flex: 1,
  },
  requestName: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.dark,
  },
  requestSubject: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  requestTime: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: SPACING.sm,
  },
  requestActionButtons: {
    width: 110,
  },
  requestSecondaryButton: {
    marginTop: SPACING.xs,
  },
  metricsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  metricItem: {
    flex: 1,
    alignItems: "center",
  },
  metricValue: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: "700",
    color: COLORS.dark,
    marginTop: SPACING.xs,
  },
  metricLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: 2,
  },
  secondButton: {
    marginTop: SPACING.base,
  },
});
