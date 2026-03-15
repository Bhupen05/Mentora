import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  Wallet,
  GraduationCap,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  TrendingUp,
} from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Button, Badge } from "@/shared/components";

export function ParentDashboardScreen() {
  const [children] = useState([
    {
      id: "1",
      name: "Emma",
      grade: "10th Grade",
      upcomingLessons: 3,
      recentScore: 85,
      attendance: 96,
      streak: 8,
    },
    {
      id: "2",
      name: "Oliver",
      grade: "8th Grade",
      upcomingLessons: 2,
      recentScore: 92,
      attendance: 93,
      streak: 5,
    },
  ]);

  const [walletBalance] = useState(450);
  const [monthlySpent] = useState(320);
  const [duePayments] = useState(120);

  const [pendingApprovals] = useState([
    {
      id: "a1",
      childName: "Emma",
      mentorName: "Sarah Thompson",
      subject: "Advanced React",
      time: "Tue, 4:00 PM",
      amount: 45,
    },
    {
      id: "a2",
      childName: "Oliver",
      mentorName: "Michael Lee",
      subject: "Mathematics",
      time: "Wed, 6:30 PM",
      amount: 35,
    },
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.greeting}>Hello, Parent</Text>
        <Text style={styles.subGreeting}>Manage your children's learning journey</Text>

        <Card style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroLabel}>Wallet Balance</Text>
              <Text style={styles.heroAmount}>${walletBalance}</Text>
            </View>
            <Badge label="2 approvals pending" variant="warning" />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.overviewGrid}>
          <Card style={styles.overviewCard}>
            <Wallet size={16} color={COLORS.info} strokeWidth={2.2} />
            <Text style={styles.overviewLabel}>Wallet</Text>
            <Text style={styles.overviewValue}>${walletBalance}</Text>
          </Card>
          <Card style={styles.overviewCard}>
            <CircleDollarSign size={16} color={COLORS.warning} strokeWidth={2.2} />
            <Text style={styles.overviewLabel}>Monthly Spent</Text>
            <Text style={styles.overviewValue}>${monthlySpent}</Text>
          </Card>
          <Card style={styles.overviewCard}>
            <Clock3 size={16} color={COLORS.error} strokeWidth={2.2} />
            <Text style={styles.overviewLabel}>Due Payments</Text>
            <Text style={styles.overviewValue}>${duePayments}</Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Children</Text>
        {children.map((child) => (
          <Card key={child.id}>
            <View style={styles.childHeaderRow}>
              <View>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childGrade}>{child.grade}</Text>
              </View>
              <Badge label={`${child.upcomingLessons} upcoming`} variant="primary" />
            </View>

            <View style={styles.metricsRow}>
              <View style={styles.metricPill}>
                <GraduationCap size={14} color={COLORS.primary} strokeWidth={2.2} />
                <Text style={styles.metricText}>Score: {child.recentScore}%</Text>
              </View>
              <View style={styles.metricPill}>
                <TrendingUp size={14} color={COLORS.success} strokeWidth={2.2} />
                <Text style={styles.metricText}>Streak: {child.streak} days</Text>
              </View>
            </View>

            <View style={styles.progressBlock}>
              <Text style={styles.progressLabel}>Attendance</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${child.attendance}%` }]} />
              </View>
              <Text style={styles.progressValue}>{child.attendance}%</Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pending Approvals</Text>
        {pendingApprovals.map((request) => (
          <Card key={request.id}>
            <View style={styles.approvalRow}>
              <View style={styles.approvalInfo}>
                <Text style={styles.approvalTitle}>{request.childName} • {request.subject}</Text>
                <Text style={styles.approvalSubtitle}>with {request.mentorName}</Text>
                <View style={styles.approvalMetaRow}>
                  <CalendarDays size={13} color={COLORS.gray500} strokeWidth={2.2} />
                  <Text style={styles.approvalMeta}>{request.time}</Text>
                  <Text style={styles.approvalMeta}>• ${request.amount}</Text>
                </View>
              </View>
              <View style={styles.approvalActions}>
                <Button title="Approve" size="small" onPress={() => {}} />
                <Button
                  title="Decline"
                  size="small"
                  variant="secondary"
                  style={styles.approvalSecondaryBtn}
                  onPress={() => {}}
                />
              </View>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Button title="Book Lesson for Child" onPress={() => {}} />
        <Button
          title="View Progress Reports"
          variant="secondary"
          style={styles.secondButton}
          onPress={() => {}}
        />
        <Button
          title="Add Funds"
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
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroLabel: {
    ...TYPOGRAPHY.caption,
    color: "rgba(255, 255, 255, 0.85)",
  },
  heroAmount: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
    marginTop: SPACING.xs,
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
  overviewGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  overviewCard: {
    flex: 1,
    minHeight: 104,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.xs,
    paddingVertical: SPACING.md,
  },
  overviewLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
    textAlign: "center",
  },
  overviewValue: {
    ...TYPOGRAPHY.bodyLarge,
    fontWeight: "700",
    color: COLORS.dark,
    marginTop: SPACING.xs,
  },
  childHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  childName: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.dark,
  },
  childGrade: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  metricsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.base,
  },
  metricPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    borderRadius: 999,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  metricText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginLeft: SPACING.xs,
  },
  progressBlock: {
    marginTop: SPACING.base,
  },
  progressLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.gray200,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLORS.success,
  },
  progressValue: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  approvalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: SPACING.base,
  },
  approvalInfo: {
    flex: 1,
  },
  approvalTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.dark,
  },
  approvalSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  approvalMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  approvalMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginLeft: SPACING.xs,
  },
  approvalActions: {
    width: 112,
  },
  approvalSecondaryBtn: {
    marginTop: SPACING.xs,
  },
  secondButton: {
    marginTop: SPACING.base,
  },
});
