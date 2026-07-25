import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CalendarDays, DollarSign, TrendingUp, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Clock, Bolt, Eye, EyeOff } from "lucide-react-native";
import { Badge, Button, Card } from "@/shared/components";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";

const FONT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export function EarningsScreen() {
  const [expandedOpportunities, setExpandedOpportunities] = useState<boolean>(false);
  const [selectedPaymentTab, setSelectedPaymentTab] = useState<'pending' | 'completed'>('pending');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [expandedSlot, setExpandedSlot] = useState<number | null>(null);
  const earningsData = {
    totalEarnings: 2450,
    monthlyEarnings: 450,
    monthlyGoal: 500,
    pendingPayment: 150,
    lessonsTaughtThisMonth: 12,
    expectedWeeklyIncome: 780,
    bestPayingWindows: [
      { time: "Tue 6:00 PM - 8:00 PM", earning: "$45-60/hr", students: 8, booked: 6 },
      { time: "Thu 7:00 PM - 9:00 PM", earning: "$50-65/hr", students: 10, booked: 8 },
      { time: "Sat 10:00 AM - 12:00 PM", earning: "$40-55/hr", students: 7, booked: 5 },
    ],
    missedOpportunities: [
      { id: "m1", label: "Unaccepted requests", value: 120, percentage: 35, icon: AlertCircle, color: COLORS.error, bgColor: "#fef2f2" },
      { id: "m2", label: "Late cancellations", value: 45, percentage: 13, icon: Clock, color: COLORS.warning, bgColor: "#fffbeb" },
      { id: "m3", label: "Low-fill weekday slots", value: 65, percentage: 19, icon: Bolt, color: COLORS.info, bgColor: "#f0f9ff" },
    ],
    totalMissed: 230,
    bonusThreshold: 5,
    bonusAmount: 50,
  };

  const goalProgress = (earningsData.monthlyEarnings / earningsData.monthlyGoal) * 100;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Earnings Intelligence</Text>
        <Text style={styles.heroSubtitle}>Revenue visibility with optimization recommendations.</Text>
        <Card style={styles.heroCard}>
          <View style={styles.heroCardContent}>
            <View style={styles.heroLeftContent}>
              <Text style={styles.heroLabel}>Expected Weekly Income</Text>
              <Text style={styles.heroAmount}>${earningsData.expectedWeeklyIncome}</Text>
            </View>
            <Badge label="AI forecast" variant="success" />
          </View>
          <View style={styles.heroCardTrend}>
            <TrendingUp size={14} color={COLORS.success} />
            <Text style={styles.heroCardTrendText}>+12% vs last week</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.rowCards}>
          <Card style={[styles.metricCard, styles.metricCardSuccess] as any}>
            <View style={styles.metricIconBox}>
              <DollarSign size={18} color={COLORS.success} strokeWidth={2.2} />
            </View>
            <Text style={styles.metricLabel}>Total</Text>
            <Text style={styles.metricValue}>${earningsData.totalEarnings}</Text>
          </Card>
          <Card style={[styles.metricCard, styles.metricCardPrimary] as any}>
            <View style={styles.metricIconBox}>
              <CalendarDays size={18} color={COLORS.primary} strokeWidth={2.2} />
            </View>
            <Text style={styles.metricLabel}>This Month</Text>
            <Text style={styles.metricValue}>${earningsData.monthlyEarnings}</Text>
          </Card>
          <Card style={[styles.metricCard, styles.metricCardWarning] as any}>
            <View style={styles.metricIconBox}>
              <TrendingUp size={18} color={COLORS.warning} strokeWidth={2.2} />
            </View>
            <Text style={styles.metricLabel}>Pending</Text>
            <Text style={styles.metricValue}>${earningsData.pendingPayment}</Text>
          </Card>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Goal Progress</Text>
        <Card style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View>
              <Text style={styles.goalLabel}>Target This Month</Text>
              <Text style={styles.goalAmount}>${earningsData.monthlyGoal}</Text>
            </View>
            <View style={styles.goalBadge}>
              <Text style={styles.goalBadgeText}>{Math.round(goalProgress)}%</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(goalProgress, 100)}%`,
                  backgroundColor: goalProgress >= 100 ? COLORS.success : COLORS.primary,
                },
              ]}
            />
          </View>
          <View style={styles.goalFooter}>
            <Text style={styles.goalCurrent}>
              ${earningsData.monthlyEarnings} earned
            </Text>
            <Text style={styles.goalRemaining}>
              ${Math.max(0, earningsData.monthlyGoal - earningsData.monthlyEarnings)} to go
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best-Paying Time Windows</Text>
        <Card>
          <View style={styles.slotContainer}>
            {earningsData.bestPayingWindows.map((slot, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.slotItem, expandedSlot === idx && styles.slotItemExpanded]}
                onPress={() => setExpandedSlot(expandedSlot === idx ? null : idx)}
              >
                <View style={styles.slotRank}>
                  <Text style={styles.slotRankText}>#{idx + 1}</Text>
                </View>
                <View style={styles.slotContent}>
                  <Text style={styles.slotTime}>{typeof slot === 'string' ? slot : slot.time}</Text>
                  <Text style={styles.slotEarning}>
                    {typeof slot === 'string' ? 'Est. $45-60/hr' : slot.earning}
                  </Text>
                </View>
                <ChevronDown size={18} color={COLORS.gray600} style={[expandedSlot === idx && styles.chevronRotated]} />
              </TouchableOpacity>
            ))}
            {expandedSlot !== null && (
              <View style={styles.slotDetails}>
                <View style={styles.slotDetailRow}>
                  <Text style={styles.slotDetailLabel}>Potential Students:</Text>
                  <Text style={styles.slotDetailValue}>{earningsData.bestPayingWindows[expandedSlot].students}</Text>
                </View>
                <View style={styles.slotDetailRow}>
                  <Text style={styles.slotDetailLabel}>Currently Booked:</Text>
                  <Text style={styles.slotDetailValue}>{earningsData.bestPayingWindows[expandedSlot].booked}</Text>
                </View>
                <Button
                  title="Add More Slots"
                  onPress={() => {}}
                  style={styles.topGap}
                />
              </View>
            )}
          </View>
          <Button title="Apply Suggested Availability" style={styles.topGap} onPress={() => {}} />
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.missedHeader}>
          <TouchableOpacity
            style={styles.missedTitleRow}
            onPress={() => setExpandedOpportunities(!expandedOpportunities)}
          >
            <Text style={styles.sectionTitle}>Missed Earning Opportunities</Text>
            <ChevronDown
              size={20}
              color={COLORS.dark}
              style={[expandedOpportunities && styles.chevronRotated]}
            />
          </TouchableOpacity>
          <Text style={styles.missedTotal}>Total lost: ${earningsData.totalMissed}</Text>
        </View>
        {expandedOpportunities && (
          <Card>
            <Text style={styles.missedIntro}>Focus first on the biggest leak to recover revenue quickly.</Text>
            <View style={styles.missedItemsContainer}>
              {earningsData.missedOpportunities.map((item) => {
                const Icon = item.icon;
                return (
                  <View key={item.id} style={[styles.missedItemCard, { backgroundColor: item.bgColor }]}>
                    <View style={styles.missedItemLeft}>
                      <View style={[styles.missedIconBox, { backgroundColor: item.color + "20" }]}>
                        <Icon size={16} color={item.color} />
                      </View>
                      <View style={styles.missedItemInfo}>
                        <Text style={styles.missedLabel}>{item.label}</Text>
                        <Text style={styles.missedPercentage}>{item.percentage}% of lost revenue</Text>
                      </View>
                    </View>
                    <Text style={[styles.missedValue, { color: item.color }]}>-${item.value}</Text>
                  </View>
                );
              })}
            </View>
            <Button title="Fix Biggest Leak" style={styles.topGap} onPress={() => {}} />
            <Button title="View Detailed Recommendations" variant="outline" style={styles.topGap} onPress={() => {}} />
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Status</Text>
        <View style={styles.paymentTabs}>
          <TouchableOpacity
            style={[styles.paymentTab, selectedPaymentTab === 'pending' && styles.paymentTabActive]}
            onPress={() => setSelectedPaymentTab('pending')}
          >
            <Clock size={14} color={selectedPaymentTab === 'pending' ? COLORS.warning : COLORS.gray600} />
            <Text style={[styles.paymentTabText, selectedPaymentTab === 'pending' && styles.paymentTabTextActive]}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentTab, selectedPaymentTab === 'completed' && styles.paymentTabActive]}
            onPress={() => setSelectedPaymentTab('completed')}
          >
            <CheckCircle2 size={14} color={selectedPaymentTab === 'completed' ? COLORS.success : COLORS.gray600} />
            <Text style={[styles.paymentTabText, selectedPaymentTab === 'completed' && styles.paymentTabTextActive]}>Completed</Text>
          </TouchableOpacity>
        </View>
        <Card>
          {selectedPaymentTab === 'pending' ? (
            <>
              <View style={styles.paymentStatusRow}>
                <View>
                  <Text style={styles.paymentStatusLabel}>Pending Amount</Text>
                  <Text style={styles.paymentStatusValue}>${earningsData.pendingPayment}</Text>
                </View>
                <Badge label="Processing" variant="warning" />
              </View>
              <TouchableOpacity style={styles.withdrawButton} onPress={() => setShowPaymentModal(true)}>
                <Text style={styles.withdrawButtonText}>Request Withdrawal</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.completedPayment}>
              <CheckCircle2 size={24} color={COLORS.success} />
              <Text style={styles.completedText}>Last payment: $450</Text>
              <Text style={styles.completedDate}>Completed on Mar 10, 2026</Text>
            </View>
          )}
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bonus & Incentives</Text>
        <Card style={styles.bonusCard}>
          <View style={styles.bonusContent}>
            <View style={styles.bonusIcon}>
              <TrendingUp size={20} color={COLORS.success} strokeWidth={2.5} />
            </View>
            <View style={styles.bonusInfo}>
              <Text style={styles.bonusLabel}>Complete {earningsData.bonusThreshold} More Lessons</Text>
              <Text style={styles.bonusDetail}>Unlock ${earningsData.bonusAmount} bonus</Text>
            </View>
            <View style={styles.bonusProgress}>
              <Text style={styles.bonusProgressText}>12/17</Text>
            </View>
          </View>
          <View style={styles.bonusProgressBar}>
            <View style={[styles.bonusProgressFill, { width: '70%' }]} />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Card>
          <View style={styles.activityContent}>
            <View style={styles.activityNumber}>
              <Text style={styles.activityValue}>{earningsData.lessonsTaughtThisMonth}</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityLabel}>Lessons taught this month</Text>
              <Text style={styles.activityDetail}>Avg. $37.50 per lesson</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  heroSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  heroTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    fontWeight: FONT.black,
    fontSize: 24,
    letterSpacing: 0.5,
    lineHeight: 32,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: SPACING.sm,
    fontWeight: FONT.medium,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  heroCard: {
    marginVertical: SPACING.lg,
    borderWidth: 1,
    // borderColor: "rgba(255, 255, 255, 0.2)",
    // backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
  },
  heroCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  heroLeftContent: {
    flex: 1,
  },
  heroLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.dark,
    fontWeight: FONT.semibold,
    letterSpacing: 0.3,
    textTransform: "uppercase",
    fontSize: 10,
  },
  heroAmount: {
    ...TYPOGRAPHY.h2,
    color: COLORS.gray600,
    marginVertical: SPACING.sm,
    fontWeight: FONT.bold,
    fontSize: 22,
    letterSpacing: 0.4,
    lineHeight: 28,
  },
  heroCardTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  heroCardTrendText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    fontWeight: FONT.bold,
    letterSpacing: 0.3,
    fontSize: 12,
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    fontWeight: FONT.extrabold,
    fontSize: 18,
    marginBottom: SPACING.lg,
    letterSpacing: 0.3,
  },
  rowCards: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  metricCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    paddingHorizontal: SPACING.xs,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricCardSuccess: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  metricCardPrimary: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  metricCardWarning: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  metricIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  metricLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: FONT.semibold,
    letterSpacing: 0.2,
    textTransform: "uppercase",
    fontSize: 11,
  },
  metricValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    marginTop: SPACING.xs,
    letterSpacing: 0.3,
    lineHeight: 24,
    fontSize: 16,
  },
  slotContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  slotItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: "#f8f9fb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  slotRank: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  slotRankText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  slotContent: {
    flex: 1,
  },
  slotTime: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  slotEarning: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    fontWeight: FONT.medium,
    marginTop: SPACING.xs,
    letterSpacing: 0.2,
    fontSize: 12,
  },
  missedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  missedTotal: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontSize: 11,
  },
  missedIntro: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    marginBottom: SPACING.lg,
    letterSpacing: 0.3,
    lineHeight: 24,
    fontWeight: "600",
  },
  missedItemsContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  missedItemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  missedItemLeft: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.md,
    alignItems: "center",
  },
  missedIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  missedItemInfo: {
    flex: 1,
  },
  missedLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  missedPercentage: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
    fontWeight: FONT.semibold,
    letterSpacing: 0.2,
    fontSize: 11,
  },
  missedValue: {
    ...TYPOGRAPHY.h3,
    fontWeight: FONT.bold,
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  topGap: {
    marginTop: SPACING.md,
  },
  paymentTabs: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.lg,
    zIndex: 10,
  },
  paymentTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    backgroundColor: COLORS.white,
  },
  paymentTabActive: {
    backgroundColor: "#f8f9fb",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  paymentTabText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontSize: 11,
  },
  paymentTabTextActive: {
    color: COLORS.primary,
  },
  paymentStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: "#fffbeb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  paymentStatusLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "500",
    letterSpacing: 0.2,
    fontSize: 10,
  },
  paymentStatusValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.warning,
    fontWeight: FONT.bold,
    fontSize: 20,
    marginTop: SPACING.sm,
    letterSpacing: 0.3,
    lineHeight: 28,
  },
  withdrawButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: 10,
    alignItems: "center",
  },
  withdrawButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    fontWeight: FONT.bold,
    letterSpacing: 0.3,
    fontSize: 14,
  },
  completedPayment: {
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING["5xl"],
  },
  completedText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.success,
    fontWeight: FONT.bold,
    fontSize: 16,
    marginTop: SPACING.lg,
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  completedDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontSize: 11,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
  },
  activityNumber: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  activityValue: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    fontWeight: "600",
    letterSpacing: 0.4,
    lineHeight: 40,
  },
  activityInfo: {
    flex: 1,
  },
  activityLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    letterSpacing: 0.4,
    lineHeight: 26,
  },
  activityDetail: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontSize: 11,
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  goalCard: {
    padding: SPACING.lg,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#c7e9ff",
    borderRadius: 16,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  goalLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: FONT.semibold,
    letterSpacing: 0.2,
    textTransform: "uppercase",
    fontSize: 11,
  },
  goalAmount: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    fontWeight: FONT.bold,
    fontSize: 18,
    letterSpacing: 0.3,
    marginTop: SPACING.sm,
  },
  goalBadge: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  goalBadgeText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
    fontWeight: FONT.bold,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  goalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(59, 130, 246, 0.1)",
  },
  goalCurrent: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  goalRemaining: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  slotItemExpanded: {
    backgroundColor: "#f0f9ff",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  slotDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: "#eff6ff",
    borderRadius: 10,
    marginBottom: SPACING.md,
  },
  slotDetailLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  slotDetailValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  slotDetails: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  missedTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  bonusCard: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 16,
  },
  bonusContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  bonusIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  bonusInfo: {
    flex: 1,
  },
  bonusLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  bonusDetail: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    fontWeight: "500",
    letterSpacing: 0.2,
    marginTop: SPACING.xs,
  },
  bonusProgress: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.success,
  },
  bonusProgressText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontSize: 12,
  },
  bonusProgressBar: {
    height: 6,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  bonusProgressFill: {
    height: "100%",
    backgroundColor: COLORS.success,
    borderRadius: 3,
  },
  bottomSpacing: {
    height: SPACING["5xl"],
  },
});